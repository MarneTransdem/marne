import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT } from '../../constants';
import { trackConversion } from '../../lib/public-analytics';
import type { SelectedHomeAddress } from './HomeAddressAutocomplete';

const HomeAddressAutocomplete = React.lazy(() => import('./HomeAddressAutocomplete'));

const GoogleBadge = () => (
    <a 
      href="https://maps.app.goo.gl/mgKeWdoyH5Mpt8xJ9"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion('google_business_profile_click', { placement: 'hero_badge' })}
      className="flex items-center gap-4 bg-white border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm w-fit group hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="22" height="22" className="mr-1">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>
      <div className="h-5 w-[1px] bg-slate-100"></div>
      <div className="flex flex-col">
        <span className="text-[12px] font-black text-brand-900 stay-dark group-hover:text-accent transition-colors">Avis clients</span>
        <span className="text-[9px] text-brand-900 stay-dark font-bold uppercase tracking-wider">Consulter sur Google</span>
      </div>
    </a>
  );

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const [addressAssistance, setAddressAssistance] = useState(false);
  const [quickForm, setQuickForm] = useState({
    fromAddress: '',
    fromCity: '',
    fromZip: '',
    toAddress: '',
    toCity: '',
    toZip: '',
    volume: ''
  });

  const selectAddress = useCallback((side: 'from' | 'to', address: SelectedHomeAddress) => {
    setQuickForm(prev => ({ ...prev, [side + 'Address']: address.address, [side + 'City']: address.city, [side + 'Zip']: address.zip }));
  }, []);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackConversion('quick_quote_start', {
      placement: 'hero_quick_form',
      has_from_address: Boolean(quickForm.fromAddress),
      has_to_address: Boolean(quickForm.toAddress),
      has_volume: Boolean(quickForm.volume),
    });
    const params = new URLSearchParams();
    if (quickForm.fromAddress) params.set('fromAddress', quickForm.fromAddress);
    if (quickForm.fromCity) params.set('fromCity', quickForm.fromCity);
    if (quickForm.fromZip) params.set('fromZip', quickForm.fromZip);
    if (quickForm.toAddress) params.set('toAddress', quickForm.toAddress);
    if (quickForm.toCity) params.set('toCity', quickForm.toCity);
    if (quickForm.toZip) params.set('toZip', quickForm.toZip);
    if (quickForm.volume) params.set('volume', quickForm.volume);
    
    navigate(`/demande-de-devis?${params.toString()}`);
  };

  return (
    <section className="home-hero" aria-labelledby="home-hero-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow"><span aria-hidden="true" /> Paris & Île-de-France</p>
            <p className="home-signature">Un nouveau départ,<br /><em>bien accompagné.</em></p>
            <h1 id="home-hero-heading">Entreprise de <span>déménagement à Paris</span></h1>
            <p className="home-hero-description">Un appartement à Paris, une maison en Île-de-France ou des bureaux à transférer : Marne Transdem prépare votre déménagement selon vos accès, votre volume et les prestations que vous souhaitez déléguer.</p>
            <div className="home-hero-actions">
              <Link to="/demande-de-devis" onClick={() => trackConversion('quote_cta_click', { placement: 'hero_primary' })} className="home-button home-button-primary">Demander mon devis gratuit <ArrowRight size={20} aria-hidden="true" /></Link>
              <a href={'tel:' + CONTACT.phone.split(' ').join('')} onClick={() => trackConversion('phone_click', { placement: 'hero_primary' })} className="home-button home-button-secondary"><Phone size={18} aria-hidden="true" /> Appeler</a>
            </div>
            <div className="home-hero-review"><GoogleBadge /><span>Une équipe à votre écoute,<br />au cœur de Paris 20e.</span></div>
          </div>
          <figure className="home-hero-photo">
            <picture><source srcSet="/images/camion-demenageur-marne-transdem.avif" type="image/avif" /><img src="/images/camion-demenageur-marne-transdem.webp" width="1513" height="1135" alt="Camion de déménagement Marne Transdem" fetchPriority="high" decoding="async" /></picture>
            <figcaption>Marne Transdem · Paris</figcaption>
          </figure>
        </div>
        <nav className="home-chapters" aria-label="Explorer la page d’accueil"><a href="#votre-projet"><span>01</span> Votre projet <ArrowRight size={16} aria-hidden="true" /></a><a href="#nos-formules"><span>02</span> Nos formules <ArrowRight size={16} aria-hidden="true" /></a><a href="#vos-questions"><span>03</span> Vos questions <ArrowRight size={16} aria-hidden="true" /></a></nav>
        <div className="home-quick-quote" id="home-quick-quote">
          <div className="home-quick-intro"><h2>Préparons votre devis gratuit</h2><p>Indiquez votre trajet, puis complétez votre demande.</p></div>
          <form onSubmit={handleQuickSubmit} className="home-quick-fields">
            <div><label htmlFor="home-from">Départ</label><input ref={fromRef} id="home-from" autoComplete="off" placeholder="Adresse de départ" onFocus={() => setAddressAssistance(true)} onKeyDownCapture={e => { if (e.key === 'Enter') e.preventDefault(); }} value={quickForm.fromAddress} onChange={(e) => setQuickForm(prev => ({ ...prev, fromAddress: e.target.value, fromCity: '', fromZip: '' }))} /></div>
            <div><label htmlFor="home-to">Arrivée</label><input ref={toRef} id="home-to" autoComplete="off" placeholder="Adresse d’arrivée" onFocus={() => setAddressAssistance(true)} onKeyDownCapture={e => { if (e.key === 'Enter') e.preventDefault(); }} value={quickForm.toAddress} onChange={(e) => setQuickForm(prev => ({ ...prev, toAddress: e.target.value, toCity: '', toZip: '' }))} /></div>
            <fieldset><legend>Volume (m³)</legend><div className="home-volume-options">{['15', '30', '50', '+'].map(v => (<button key={v} type="button" aria-pressed={quickForm.volume === (v === '+' ? '60' : v)} aria-label={v === '+' ? '60 mètres cubes ou plus' : v + ' mètres cubes'} onClick={() => setQuickForm(prev => ({ ...prev, volume: v === '+' ? '60' : v }))}>{v === '+' ? '60+' : v}</button>))}</div></fieldset>
            <button type="submit" className="home-button home-button-primary">Continuer ma demande <ArrowRight size={18} aria-hidden="true" /></button>
          </form>
          {addressAssistance && <React.Suspense fallback={null}><HomeAddressAutocomplete fromRef={fromRef} toRef={toRef} onSelect={selectAddress} /></React.Suspense>}
          <p className="home-quick-note">Une fois le formulaire complet envoyé, Marne Transdem reçoit votre demande pour préparer un devis adapté à votre projet.</p>
        </div>
      </div>
    </section>
  );
};
