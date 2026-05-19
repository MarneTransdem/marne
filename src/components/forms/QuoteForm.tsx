import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Loader2, ChevronLeft, Calculator, RotateCcw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

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
  needsLift: string;
  needsPacking: string;
  needsStorage: string;
  message: string;

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
  fromElevator: 'oui',
  fromDifficulties: '',
  toAddress: '',
  toCity: '',
  toZip: '',
  toFloor: '',
  toElevator: 'oui',
  toDifficulties: '',
  date: '',
  housingType: '',
  surface: '',
  volume: '',
  formula: '',
  needsLift: 'non',
  needsPacking: 'non',
  needsStorage: 'non',
  message: '',
  consent: false
};

const LOCAL_STORAGE_KEY = 'marne_transdem_volume_estimate';

export const QuoteForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimate, setEstimate] = useState<any>(null);
  
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [searchParams] = useSearchParams();
  
  const mapsLib = useMapsLibrary('places');
  const fromAutocompleteRef = useRef<HTMLInputElement>(null);
  const toAutocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!mapsLib || !fromAutocompleteRef.current || !toAutocompleteRef.current) return;

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

    fromAutocomplete.addListener('place_changed', () => {
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

    toAutocomplete.addListener('place_changed', () => {
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
  }, [mapsLib]);

  useEffect(() => {
    const from = searchParams.get('fromAddress');
    const fromCity = searchParams.get('fromCity');
    const fromZip = searchParams.get('fromZip');
    const to = searchParams.get('toAddress');
    const toCity = searchParams.get('toCity');
    const toZip = searchParams.get('toZip');
    const volume = searchParams.get('volume');

    if (from || to || volume) {
      setFormData(prev => ({
        ...prev,
        fromAddress: from || prev.fromAddress,
        fromCity: fromCity || prev.fromCity,
        fromZip: fromZip || prev.fromZip,
        toAddress: to || prev.toAddress,
        toCity: toCity || prev.toCity,
        toZip: toZip || prev.toZip,
        volume: volume ? `${volume} m³` : prev.volume,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
    if (!formData.fullName.trim()) newErrors.fullName = "Le nom et prénom sont requis";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    
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
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      const path = 'quotes';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // Send Email Notification
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'quote', data: formData })
      });

      if (!emailResponse.ok) {
        const errData = await emailResponse.json();
        console.error("Email API Error:", errData);
        // We still show success for the form submit to Firestore, 
        // but maybe warn about the notification failure if it's critical.
        // For now, let's just log it or set a silent error.
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      setIsSubmitting(false);
      handleFirestoreError(error, OperationType.CREATE, 'quotes');
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {estimate && (
        <div className="bg-brand-900 dark:bg-slate-950 text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Calculator size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Volume estimé depuis le calculateur</p>
              <p className="text-xl font-black text-white">{estimate.estimatedVolume} m³</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link to="/calculateur-volume" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                Modifier mon estimation
             </Link>
             <button onClick={clearEstimate} className="p-2 text-slate-500 hover:text-white transition-colors" title="Réinitialiser l'estimation">
                <RotateCcw size={18} />
             </button>
          </div>
        </div>
      )}
      <div className="p-5 md:p-10 lg:p-14">
        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-20">
          {/* Section A: Vos coordonnées */}
          <section className="space-y-8 md:space-y-10">
            <div className="border-l-4 border-accent pl-5 md:pl-6 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                A. Vos coordonnées
              </h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 md:mt-2 font-light text-sm">Informations essentielles pour notre premier échange.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Nom et prénom <span className="text-accent">*</span></label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} className={`form-input-premium w-full ${errors.fullName ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="Ex: Jean Dupont" required />
                {errors.fullName && <p className="text-red-500 text-xs ml-1 font-medium">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Téléphone <span className="text-accent">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`form-input-premium w-full ${errors.phone ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="06 12 34 56 78" required />
                {errors.phone && <p className="text-red-500 text-xs ml-1 font-medium">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Email <span className="text-accent">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-input-premium w-full ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="jean.dupont@email.com" required />
                {errors.email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* Section B: Adresse de départ */}
          <section className="space-y-8 md:space-y-10">
            <div className="border-l-4 border-accent pl-5 md:pl-6 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                B. Adresse de départ
              </h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 md:mt-2 font-light text-sm">L'adresse actuelle de votre logement. Saisie assistée.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Adresse exacte</label>
                <input 
                  ref={fromAutocompleteRef}
                  name="fromAddress" 
                  value={formData.fromAddress} 
                  onChange={handleChange} 
                  className={`form-input-premium w-full ${errors.fromAddress ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} 
                  placeholder="Saisissez et sélectionnez votre adresse de départ" 
                />
                {errors.fromAddress && <p className="text-red-500 text-xs ml-1 font-medium">{errors.fromAddress}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Ville</label>
                <input name="fromCity" value={formData.fromCity} onChange={handleChange} className={`form-input-premium w-full ${errors.fromCity ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="Paris" />
                {errors.fromCity && <p className="text-red-500 text-xs ml-1 font-medium">{errors.fromCity}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Code postal</label>
                <input name="fromZip" value={formData.fromZip} onChange={handleChange} className={`form-input-premium w-full ${errors.fromZip ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="75004" />
                {errors.fromZip && <p className="text-red-500 text-xs ml-1 font-medium">{errors.fromZip}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Étage</label>
                <input name="fromFloor" value={formData.fromFloor} onChange={handleChange} className="form-input-premium w-full" placeholder="Ex: 3" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Ascenseur</label>
                <select name="fromElevator" value={formData.fromElevator} onChange={handleChange} className="form-input-premium w-full">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Difficultés d’accès éventuelles</label>
                <textarea name="fromDifficulties" value={formData.fromDifficulties} onChange={handleChange} rows={2} className="form-input-premium w-full resize-none py-3" placeholder="Porte cochère étroite, cour intérieure, rue piétonne..."></textarea>
              </div>
            </div>
          </section>

          {/* Section C: Adresse d'arrivée */}
          <section className="space-y-8 md:space-y-10">
            <div className="border-l-4 border-accent pl-5 md:pl-6 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                C. Adresse d’arrivée
              </h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 md:mt-2 font-light text-sm">Où livrons-nous vos biens ? Saisie assistée.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Adresse exacte</label>
                <input 
                  ref={toAutocompleteRef}
                  name="toAddress" 
                  value={formData.toAddress} 
                  onChange={handleChange} 
                  className={`form-input-premium w-full ${errors.toAddress ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} 
                  placeholder="Saisissez et sélectionnez votre adresse d'arrivée" 
                />
                {errors.toAddress && <p className="text-red-500 text-xs ml-1 font-medium">{errors.toAddress}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Ville</label>
                <input name="toCity" value={formData.toCity} onChange={handleChange} className={`form-input-premium w-full ${errors.toCity ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="Paris" />
                {errors.toCity && <p className="text-red-500 text-xs ml-1 font-medium">{errors.toCity}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Code postal</label>
                <input name="toZip" value={formData.toZip} onChange={handleChange} className={`form-input-premium w-full ${errors.toZip ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="75008" />
                {errors.toZip && <p className="text-red-500 text-xs ml-1 font-medium">{errors.toZip}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Étage</label>
                <input name="toFloor" value={formData.toFloor} onChange={handleChange} className="form-input-premium w-full" placeholder="Ex: RDC" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Ascenseur</label>
                <select name="toElevator" value={formData.toElevator} onChange={handleChange} className="form-input-premium w-full">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Difficultés d’accès éventuelles</label>
                <textarea name="toDifficulties" value={formData.toDifficulties} onChange={handleChange} rows={2} className="form-input-premium w-full resize-none py-3" placeholder="Code d'accès, sens interdit, accès poids lourd..."></textarea>
              </div>
            </div>
          </section>

          {/* Section D: Votre déménagement */}
          <section className="space-y-8 md:space-y-10">
            <div className="border-l-4 border-accent pl-5 md:pl-6 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                D. Votre déménagement
              </h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 md:mt-2 font-light text-sm">Précisez les contours logistiques de votre projet.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Date souhaitée</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={`form-input-premium w-full ${errors.date ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} />
                {errors.date && <p className="text-red-500 text-xs ml-1 font-medium">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Type de logement</label>
                <select name="housingType" value={formData.housingType} onChange={handleChange} className={`form-input-premium w-full ${errors.housingType ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`}>
                  <option value="">Sélectionner</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="bureaux">Bureaux / Entreprise</option>
                </select>
                {errors.housingType && <p className="text-red-500 text-xs ml-1 font-medium">{errors.housingType}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Surface en m²</label>
                <input type="number" name="surface" value={formData.surface} onChange={handleChange} className={`form-input-premium w-full ${errors.surface ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`} placeholder="Ex: 45" />
                {errors.surface && <p className="text-red-500 text-xs ml-1 font-medium">{errors.surface}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Volume estimé en m³, si connu</label>
                <input name="volume" value={formData.volume} onChange={handleChange} className="form-input-premium w-full" placeholder="Ex: 25 m³" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Formule souhaitée</label>
                <select name="formula" value={formData.formula} onChange={handleChange} className={`form-input-premium w-full ${errors.formula ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : ''}`}>
                  <option value="">Choisir ma formule</option>
                  <option value="economique">Économique</option>
                  <option value="standard">Standard</option>
                  <option value="luxe">Luxe</option>
                  <option value="je ne sais pas">Je ne sais pas</option>
                </select>
                {errors.formula && <p className="text-red-500 text-xs ml-1 font-medium">{errors.formula}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Besoin de monte-meuble</label>
                <select name="needsLift" value={formData.needsLift} onChange={handleChange} className="form-input-premium w-full">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                  <option value="je ne sais pas">Je ne sais pas</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Besoin d’emballage</label>
                <select name="needsPacking" value={formData.needsPacking} onChange={handleChange} className="form-input-premium w-full">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Besoin de garde-meuble</label>
                <select name="needsStorage" value={formData.needsStorage} onChange={handleChange} className="form-input-premium w-full">
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-brand-900 dark:text-slate-300 ml-1">Message complémentaire</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="form-input-premium w-full resize-none py-3" placeholder="Informations utiles : objets fragiles, piano, coffre-fort, etc."></textarea>
              </div>
            </div>
          </section>

          {/* Section E: Consentement et envoi */}
          <section className="pt-10 border-t border-slate-100 dark:border-slate-800 space-y-12">
            <div className="border-l-4 border-accent pl-5 md:pl-6 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-900 dark:text-white tracking-tight">
                E. Consentement
              </h3>
              <p className="text-slate-400 dark:text-slate-500 mt-1 md:mt-2 font-light text-sm">Votre accord pour le traitement de votre demande.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="mt-1">
                  <input 
                    type="checkbox" 
                    name="consent" 
                    checked={formData.consent} 
                    onChange={handleChange}
                    className="w-6 h-6 rounded border-slate-300 dark:border-slate-700 text-accent focus:ring-accent transition-all cursor-pointer"
                  />
                </div>
                <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  J’accepte que Marne Transdem me contacte au sujet de ma demande de devis. Vos données sont traitées en toute confidentialité. <span className="text-accent">*</span>
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-sm ml-10 font-bold">{errors.consent}</p>}
            </div>

            <div className="flex justify-center md:justify-start">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-accent text-brand-900 px-14 py-6 rounded-full font-black shadow-[0_20px_50px_rgba(245,164,0,0.3)] flex items-center justify-center gap-4 hover:bg-accent-hover transition-all active:scale-95 disabled:opacity-50 group min-w-[320px]"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-brand-900" size={28} />
                ) : (
                  <>
                    <span className="text-xl hidden md:inline uppercase tracking-tight">Envoyer ma demande de devis</span>
                    <span className="text-xl md:hidden">Demander mon devis</span>
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
