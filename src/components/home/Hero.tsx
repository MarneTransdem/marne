import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT } from '../../constants';
import { trackConversion } from '../../lib/public-analytics';
import type { SelectedHomeAddress } from './HomeAddressAutocomplete';

const HomeAddressAutocomplete = React.lazy(() => import('./HomeAddressAutocomplete'));

// Public Google Maps listing checked on 20 September 2026. This is the
// establishment-wide rating, not an average of the five imported testimonials.
const GOOGLE_RATING = { score: 4.9, count: 508, verifiedAt: '2026-09-20' };
const GoogleBadge = () => (
  <a className="home-google-rating" href="https://maps.app.goo.gl/mgKeWdoyH5Mpt8xJ9" target="_blank" rel="noopener noreferrer"
    onClick={() => trackConversion('google_business_profile_click', { placement: 'hero_badge' })}
    aria-label="Google Maps : 4,9 sur 5, 508 avis. Vérifié le 20 septembre 2026. Consulter les avis (nouvel onglet).">
    <img src="/images/google-maps-attribution.svg" alt="Google Maps" height="18" width="90" className="home-google-logo" />
    <span className="home-google-score"><strong>{GOOGLE_RATING.score.toLocaleString('fr-FR')}</strong><span>/ 5</span><span className="home-google-stars" aria-hidden="true"><span>★★★★★</span><span style={{ width: `${GOOGLE_RATING.score / 5 * 100}%` }}>★★★★★</span></span></span>
    <span className="home-google-count">{GOOGLE_RATING.count} avis · Consulter les avis <ArrowRight size={13} aria-hidden="true" /></span>
    <span className="home-google-date">Vérifié le <time dateTime={GOOGLE_RATING.verifiedAt}>20/09/2026</time></span>
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
        <div className="home-hero-grid home-hero-impact">
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
      <div className="container mx-auto px-4 md:px-6">
        <nav className="home-chapters" aria-label="Explorer la page d’accueil"><a href="#votre-projet"><span>01</span> Votre projet <ArrowRight size={16} aria-hidden="true" /></a><a href="#nos-formules"><span>02</span> Nos formules <ArrowRight size={16} aria-hidden="true" /></a><a href="#vos-questions"><span>03</span> Vos questions <ArrowRight size={16} aria-hidden="true" /></a></nav>
        <div className="home-quick-quote" id="home-quick-quote">
          <div className="home-quick-intro"><p className="home-quote-kicker">Votre déménagement commence ici</p><h2>Préparons votre devis gratuit</h2><p>Indiquez votre trajet, puis complétez votre demande.</p></div>
          <form onSubmit={handleQuickSubmit} className="home-quick-fields">
            <div className="home-route-field"><label htmlFor="home-from"><span aria-hidden="true">01</span> Départ</label><input ref={fromRef} id="home-from" autoComplete="off" placeholder="Adresse de départ" onFocus={() => setAddressAssistance(true)} onKeyDownCapture={e => { if (e.key === 'Enter') e.preventDefault(); }} value={quickForm.fromAddress} onChange={(e) => setQuickForm(prev => ({ ...prev, fromAddress: e.target.value, fromCity: '', fromZip: '' }))} /></div>
            <div className="home-route-field"><label htmlFor="home-to"><span aria-hidden="true">02</span> Arrivée</label><input ref={toRef} id="home-to" autoComplete="off" placeholder="Adresse d’arrivée" onFocus={() => setAddressAssistance(true)} onKeyDownCapture={e => { if (e.key === 'Enter') e.preventDefault(); }} value={quickForm.toAddress} onChange={(e) => setQuickForm(prev => ({ ...prev, toAddress: e.target.value, toCity: '', toZip: '' }))} /></div>
            <fieldset><legend>Volume estimé <span className="home-volume-unit">m³</span></legend><div className="home-volume-options">{['15', '30', '50', '+'].map(v => (<button key={v} type="button" aria-pressed={quickForm.volume === (v === '+' ? '60' : v)} aria-label={v === '+' ? '60 mètres cubes ou plus' : v + ' mètres cubes'} onClick={() => setQuickForm(prev => ({ ...prev, volume: v === '+' ? '60' : v }))}>{v === '+' ? '60+' : v}</button>))}</div></fieldset>
            <button type="submit" className="home-button home-button-primary">Continuer ma demande <ArrowRight size={18} aria-hidden="true" /></button>
          </form>
          {addressAssistance && <React.Suspense fallback={null}><HomeAddressAutocomplete fromRef={fromRef} toRef={toRef} onSelect={selectAddress} /></React.Suspense>}
          <p className="home-quick-note">Une fois le formulaire complet envoyé, Marne Transdem reçoit votre demande pour préparer un devis adapté à votre projet.</p>
        </div>
      </div>
    </section>
  );
};
