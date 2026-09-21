import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Loader2, ChevronLeft, Calculator, RotateCcw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { getVisitAttribution, trackConversion } from '../../lib/public-analytics';

interface FormData {
  // Section A: Coordonnées
  fullName: string;
  phone: string;
  email: string;
  
  // Section B: Départ
  fromAddress: string;
  fromCity: string;
  fromZip: string;
  fromFloor: string;
  fromElevator: string;
  fromDifficulties: string;

  // Section C: Arrivée
  toAddress: string;
  toCity: string;
  toZip: string;
  toFloor: string;
  toElevator: string;
  toDifficulties: string;

  // Section D: Votre déménagement
  date: string;
  housingType: string;
  surface: string;
  volume: string;
  formula: string;
  visitPreference: string;
  needsLift: string;
  needsPacking: string;
  needsStorage: string;
  message: string;
  website?: string;

  // Section E: Consentement
  consent: boolean;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  phone: '',
  email: '',
  fromAddress: '',
  fromCity: '',
  fromZip: '',
  fromFloor: '',
  fromElevator: 'À préciser',
  fromDifficulties: '',
  toAddress: '',
  toCity: '',
  toZip: '',
  toFloor: '',
  toElevator: 'À préciser',
  toDifficulties: '',
  date: '',
  housingType: '',
  surface: '',
  volume: '',
  formula: '',
  visitPreference: 'a_definir',
  needsLift: 'À préciser',
  needsPacking: 'À préciser',
  needsStorage: 'À préciser',
  message: '',
  consent: false,
  website: ''
};

const LOCAL_STORAGE_KEY = 'marne_transdem_volume_estimate';

export const QuoteForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimate, setEstimate] = useState<any>(null);
  
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [searchParams] = useSearchParams();
  const submissionPending = useRef(false);
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState('');
  const [dateMode, setDateMode] = useState('unknown');
  const [period, setPeriod] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
    formRef.current?.closest('.quote-wizard')?.scrollIntoView({ block: 'start' });
  }, [step]);
  useEffect(() => {
    if (Object.keys(errors).length) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);
  
  const mapsLib = useMapsLibrary('places');
  const fromAutocompleteRef = useRef<HTMLInputElement>(null);
  const toAutocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mapsLib || !import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY || !fromAutocompleteRef.current || !toAutocompleteRef.current) return;

    const fromAutocomplete = new google.maps.places.Autocomplete(fromAutocompleteRef.current, {
      componentRestrictions: { country: 'fr' },
      fields: ['address_components', 'formatted_address'],
      types: ['address']
    });

    const toAutocomplete = new google.maps.places.Autocomplete(toAutocompleteRef.current, {
      componentRestrictions: { country: 'fr' },
      fields: ['address_components', 'formatted_address'],
      types: ['address']
    });

    const fromListener = fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      if (place.address_components) {
        let city = '';
        let zip = '';
        place.address_components.forEach(comp => {
          if (comp.types.includes('locality')) city = comp.long_name;
          if (comp.types.includes('postal_code')) zip = comp.long_name;
        });
        setFormData(prev => ({
          ...prev,
          fromAddress: place.formatted_address || prev.fromAddress,
          fromCity: city || prev.fromCity,
          fromZip: zip || prev.fromZip
        }));
      }
    });

    const toListener = toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      if (place.address_components) {
        let city = '';
        let zip = '';
        place.address_components.forEach(comp => {
          if (comp.types.includes('locality')) city = comp.long_name;
          if (comp.types.includes('postal_code')) zip = comp.long_name;
        });
        setFormData(prev => ({
          ...prev,
          toAddress: place.formatted_address || prev.toAddress,
          toCity: city || prev.toCity,
          toZip: zip || prev.toZip
        }));
      }
    });
    return () => { fromListener.remove(); toListener.remove(); };
  }, [mapsLib]);

  useEffect(() => {
    const from = searchParams.get('fromAddress');
    const fromCity = searchParams.get('fromCity');
    const fromZip = searchParams.get('fromZip');
    const to = searchParams.get('toAddress');
    const toCity = searchParams.get('toCity');
    const toZip = searchParams.get('toZip');
    const volume = searchParams.get('volume');
    const requestedFormula = searchParams.get('formula');
    const formula = requestedFormula && ['economique', 'standard', 'luxe'].includes(requestedFormula)
      ? requestedFormula : '';

    if (from || to || volume || formula) {
      setFormData(prev => ({
        ...prev,
        fromAddress: from || prev.fromAddress,
        fromCity: fromCity || prev.fromCity,
        fromZip: fromZip || prev.fromZip,
        toAddress: to || prev.toAddress,
        toCity: toCity || prev.toCity,
        toZip: toZip || prev.toZip,
        volume: volume ? `${volume} m³` : prev.volume,
        formula: formula || prev.formula,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(LOCAL_STORAGE_KEY); } catch { return; }
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setEstimate(data);
        
        // Auto-fill fields if estimate exists
        setFormData(prev => ({
          ...prev,
          volume: `${data.estimatedVolume} m³`,
          message: prev.message || `Volume estimé via le calculateur : ${data.estimatedVolume} m³.
Nombre de cartons estimé : ${data.cartonsCount}.
Nombre d’objets estimé : ${data.itemsCount}.
Pièces renseignées : ${data.rooms.map((r: any) => r.name).join(', ')}.
Cette estimation est indicative et pourra être affinée selon les accès et les caractéristiques de votre projet.`
        }));
      } catch (e) {
        console.error("Failed to parse estimate", e);
      }
    }
  }, []);

  const clearEstimate = () => {
    try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch { /* Storage is optional. */ }
    setEstimate(null);
    setFormData(prev => ({
      ...prev,
      volume: '',
      message: ''
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Coordonnées (Mandatory)
    if (formData.fullName.trim().length < 2) newErrors.fullName = "Indiquez votre nom et prénom (au moins 2 caractères).";
    if (formData.phone.trim().length < 8 || formData.phone.length > 25) newErrors.phone = "Indiquez un numéro de téléphone valide.";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = "Vérifiez votre adresse email.";
    
    // Consentement (Mandatory for GDPR)
    if (!formData.consent) newErrors.consent = "Veuillez accepter le consentement pour envoyer";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionPending.current) return;
    if (step < 3) { setStep(step + 1); return; }
    setSubmitError('');
    if (!validateForm()) {
      return;
    }

    submissionPending.current = true;
    setIsSubmitting(true);
    
    // Honeypot spam prevention
    if (formData.website) {
      console.warn("Honeypot anti-spam triggered on QuoteForm!");
      // Quietly succeed to frustrate spammers
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        submissionPending.current = false;
      }, 1000);
      return;
    }

    try {
      const path = 'quotes';
      const { website, ...values } = formData;
      const cleanData = {
        ...values,
        fullName: values.fullName.trim(), phone: values.phone.trim(), email: values.email.trim(),
        date: dateMode === 'date' ? values.date : '',
        message: [dateMode === 'flexible' ? `Période flexible : ${period.trim() || 'à préciser'}.` : '', values.message].filter(Boolean).join('\n'),
      };
      const attribution = getVisitAttribution();
      const savedQuote = await addDoc(collection(db, path), {
        ...cleanData,
        volumeEstimate: estimate || null,
        ...(attribution ? { acquisition: attribution } : {}),
        createdAt: serverTimestamp()
      });

      // Firestore acknowledged the record: notification delivery is a separate concern.
      setIsSuccess(true);
      trackConversion('quote_form_submit', {
        has_volume: Boolean(cleanData.volume),
        has_pre_estimate: Boolean(estimate),
      }, savedQuote.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch { /* Optional local draft. */ }

      // Send Email Notification
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'quote', data: cleanData, website })
        });
        if (!emailResponse.ok) console.warn('Quote saved; notification was not delivered.');
      } catch {
        console.warn('Quote saved; notification request failed.');
      }

    } catch (error) {
      setSubmitError('Votre demande n’a pas pu être envoyée. Vos réponses sont conservées : réessayez ou appelez-nous au 01 44 93 54 86.');
      try { handleFirestoreError(error, OperationType.CREATE, 'quotes'); } catch { /* Error is displayed in the form. */ }
    } finally {
      submissionPending.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-slate-100 dark:border-slate-800"
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Check size={48} strokeWidth={3} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-4">Demande envoyée !</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg max-w-md mx-auto leading-relaxed">
          Votre demande a bien été envoyée. L’équipe Marne Transdem vous recontactera dans les meilleurs délais.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-brand-900 dark:bg-accent dark:text-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-brand-hover dark:hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Retour à l'accueil
        </button>
      </motion.div>
    );
  }

  const field = (name: keyof FormData, label: string, options: { type?: string; placeholder?: string; autoComplete?: string; required?: boolean; maxLength?: number } = {}) => (
    <div className="quote-field" key={name}>
      <label htmlFor={'quote-' + name}>{label}{options.required && <span> *</span>}</label>
      <input id={'quote-' + name} name={name} type={options.type || 'text'} value={String(formData[name] ?? '')} onChange={handleChange}
        autoComplete={options.autoComplete} placeholder={options.placeholder} required={options.required} maxLength={options.maxLength || 200}
        min={options.type === 'number' ? 0 : undefined} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? 'error-' + name : undefined} />
      {errors[name] && <p className="quote-error" id={'error-' + name}>{errors[name]}</p>}
    </div>
  );
  const select = (name: keyof FormData, label: string, choices: [string, string][]) => (
    <div className="quote-field" key={name}><label htmlFor={'quote-' + name}>{label}</label>
      <select id={'quote-' + name} name={name} value={String(formData[name])} onChange={handleChange}>
        {choices.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </div>
  );
  const uncertain: [string, string][] = [['À préciser', 'À préciser'], ['oui', 'Oui'], ['non', 'Non']];
  const steps = ['Votre trajet', 'Vos besoins', 'Vos coordonnées'];
  const routeLabel = (side: 'from' | 'to') => [formData[`${side}Address`], formData[`${side}City`], formData[`${side}Zip`]].filter(Boolean).join(' · ') || 'À préciser ensemble';
  const formulaLabel = ({economique:'Économique',standard:'Standard',luxe:'Luxe'} as Record<string,string>)[formData.formula] || 'À définir ensemble';
  return (
    <div className="quote-wizard">
      <nav aria-label="Étapes de votre demande" className="quote-progress"><ol>{steps.map((label, index) => (
        <li key={label}><button type="button" aria-current={step === index + 1 ? 'step' : undefined} disabled={index + 1 > step || isSubmitting} onClick={() => setStep(index + 1)}>
          <span aria-hidden="true">{index + 1 < step ? <Check size={16} /> : index + 1}</span><span>{label}</span>
        </button></li>
      ))}</ol></nav>
      <div className="quote-wizard-body">
        <p className="quote-step-count" aria-live="polite">Étape {step} sur 3</p>
        <h3 ref={headingRef} tabIndex={-1} className="quote-step-heading">{['D’où partez-vous, où allez-vous ?', 'Quel accompagnement souhaitez-vous ?', 'À qui envoyer votre devis ?'][step - 1]}</h3>
        <p className="quote-step-help">{step === 3 ? 'Les champs marqués * sont nécessaires pour vous recontacter.' : 'Renseignez ce que vous connaissez. Nous préciserons le reste ensemble.'}</p>
        <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
          <div hidden aria-hidden="true"><input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" /></div>
          <fieldset disabled={isSubmitting} className="quote-fields-root">
          <div hidden={step !== 1}>
            <div className="quote-route-grid">{(['from', 'to'] as const).map((side, index) => (
              <div className="quote-route" key={side}>
                <h4><span>{index + 1}</span>{side === 'from' ? 'Au départ' : 'À l’arrivée'}</h4>
                <div className="quote-field"><label htmlFor={'quote-' + side + 'Address'}>{side === 'from' ? 'Adresse de départ' : 'Adresse d’arrivée'}</label>
                  <input id={'quote-' + side + 'Address'} ref={side === 'from' ? fromAutocompleteRef : toAutocompleteRef} name={side + 'Address'} value={formData[`${side}Address`]} maxLength={200} autoComplete="off"
                    placeholder="Adresse ou ville, si connue" onChange={e => {
                      const value = e.target.value;
                      setFormData(prev => ({...prev, [`${side}Address`]:value, [`${side}City`]:'', [`${side}Zip`]:''}));
                    }} onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }} />
                </div>
                <details className="quote-details"><summary>Préciser la ville et le code postal</summary><div className="quote-grid">
                  {field(`${side}City`, 'Ville', {maxLength:100})}{field(`${side}Zip`, 'Code postal', {maxLength:20})}
                </div></details>
                <details className="quote-details"><summary>Étages, ascenseur et accès <span>Facultatif</span></summary><div className="quote-grid">
                  {field(`${side}Floor`, 'Étage', {placeholder:'RDC, 3e…'})}{select(`${side}Elevator`, 'Ascenseur', uncertain)}
                  <div className="quote-field quote-span"><label htmlFor={'quote-' + side + 'Difficulties'}>Difficultés d’accès</label><textarea id={'quote-' + side + 'Difficulties'} name={side + 'Difficulties'} value={formData[`${side}Difficulties`]} onChange={handleChange} rows={2} maxLength={2000} placeholder="Escalier étroit, stationnement éloigné…" /></div>
                </div></details>
              </div>
            ))}</div>
            <fieldset className="quote-date-options"><legend>Quand souhaitez-vous déménager ?</legend><div className="quote-choices">
              {[['unknown','À préciser'],['date','Une date prévue'],['flexible','Une période flexible']].map(([value,label]) => <label key={value}><input type="radio" name="dateMode" value={value} checked={dateMode === value} onChange={() => setDateMode(value)} /><span>{label}</span></label>)}
            </div></fieldset>
            {dateMode === 'date' && field('date','Date souhaitée',{type:'date'})}
            {dateMode === 'flexible' && <div className="quote-field"><label htmlFor="quote-period">Période envisagée, si connue</label><input id="quote-period" value={period} onChange={e => setPeriod(e.target.value)} maxLength={100} placeholder="Par exemple : fin octobre, dates flexibles" /></div>}
          </div>
          <div hidden={step !== 2}>
            {estimate && <div className="quote-estimate"><Calculator size={22} /><p>Votre estimation : <strong>{estimate.estimatedVolume} m³</strong></p><button type="button" onClick={clearEstimate} aria-label="Retirer l’estimation du calculateur"><RotateCcw size={18} /></button></div>}
            <div className="quote-grid">
              {select('housingType','Votre logement ou vos locaux',[['','À préciser'],['appartement','Appartement'],['maison','Maison'],['bureaux','Bureaux / Entreprise']])}
              {field('volume','Volume estimé, si connu',{placeholder:'Ex. : 20 m³'})}
            </div>
            <p className="quote-hint">Vous ne connaissez pas le volume ? Laissez ce champ vide : notre équipe vous aidera à l’estimer. Vous pouvez aussi utiliser le <Link to="/calculateur-volume" target="_blank" rel="noopener noreferrer">calculateur en m³ (nouvel onglet)</Link>.</p>
            <div className="quote-grid">
              {select('formula','Votre formule',[['','Aidez-moi à choisir'],['economique','Économique'],['standard','Standard'],['luxe','Luxe'],['je ne sais pas','Je ne sais pas']])}
              {select('visitPreference','Pour préciser votre projet',[['a_definir','À définir avec un conseiller'],['domicile','Une visite à domicile'],['visio','Un échange en visio']])}
            </div>
            <p className="quote-hint">Les prestations retenues seront précisées dans votre devis personnalisé.</p>
            <details className="quote-details"><summary>Ajouter des besoins particuliers <span>Facultatif</span></summary><div className="quote-grid">
              {field('surface','Surface en m², si connue',{type:'number',placeholder:'Ex. : 45'})}
              {select('needsLift','Monte-meuble',uncertain)}{select('needsPacking','Emballage',uncertain)}{select('needsStorage','Garde-meuble',uncertain)}
            </div></details>
            <div className="quote-field"><label htmlFor="quote-message">Un détail à nous signaler ? <span>Facultatif</span></label><textarea id="quote-message" name="message" value={formData.message} onChange={handleChange} rows={3} maxLength={5000} placeholder="Un piano, des objets fragiles, une contrainte de calendrier…" /></div>
          </div>
          <div hidden={step !== 3}>
            <div className="quote-recap"><h4>Votre projet en un coup d’œil</h4>
              <div><p><strong>Départ</strong>{routeLabel('from')}<strong>Arrivée</strong>{routeLabel('to')}<strong>Quand ?</strong>{dateMode === 'flexible' ? period || 'Période flexible à préciser' : dateMode === 'date' && formData.date ? formData.date.split('-').reverse().join('/') : 'À préciser ensemble'}</p><button type="button" onClick={() => setStep(1)}>Modifier le trajet</button></div>
              <div><p><strong>Accompagnement</strong>{formulaLabel} · {formData.volume || 'Volume à estimer'}</p><button type="button" onClick={() => setStep(2)}>Modifier les besoins</button></div>
            </div>
            {field('fullName','Nom et prénom',{autoComplete:'name',required:true,maxLength:100})}
            <div className="quote-grid">{field('phone','Téléphone',{type:'tel',autoComplete:'tel',required:true,maxLength:25})}{field('email','Email',{type:'email',autoComplete:'email',required:true,maxLength:254})}</div>
            <p className="quote-hint">Notre équipe vous recontacte pour préciser votre projet et préparer votre devis. L’envoi ne réserve pas de date.</p>
            <label className="quote-consent"><input id="quote-consent" type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'error-consent' : undefined} /><span>J’accepte que Marne Transdem me contacte au sujet de ma demande de devis. *</span></label>
            <p className="quote-hint">Consultez notre <Link to="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité (nouvel onglet)</Link>.</p>
            {errors.consent && <p className="quote-error" id="error-consent">{errors.consent}</p>}
          </div>
          </fieldset>
          {submitError && <p className="quote-error quote-send-error" role="alert">{submitError}</p>}
          <div className="quote-navigation">
            {step > 1 && <button className="quote-back" type="button" disabled={isSubmitting} onClick={() => setStep(step - 1)}><ChevronLeft size={17} />Retour</button>}
            {step < 3 ? <button key="continue" className="quote-next" type="button" onClick={e => { e.preventDefault(); setStep(step + 1); }}>Continuer <ArrowRight size={18} /></button> :
              <button key="send" className="quote-next" type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 size={18} className="animate-spin" />Envoi en cours…</> : <>Envoyer ma demande <ArrowRight size={18} /></>}</button>}
          </div>
          <p className="quote-footer-note">{step < 3 ? 'Vos réponses sont conservées lorsque vous changez d’étape.' : 'Votre demande est adressée directement à Marne Transdem.'}</p>
        </form>
      </div>
    </div>
  );
};
