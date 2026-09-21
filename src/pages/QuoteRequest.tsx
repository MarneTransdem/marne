import '../styles/quote-wizard.css';
import React from 'react';
import { QuoteGuide } from '../components/common/QuoteGuide';
import { QuoteForm } from '../components/forms/QuoteForm';
import { MapProvider } from '../components/common/MapProvider';
import { SEO } from '../components/SEO';
import { ShieldCheck, UserCheck, Phone, Mail, MapPin } from 'lucide-react';
import { getBreadcrumbSchema } from '../lib/schema';
import { trackConversion } from '../lib/public-analytics';

const QuoteRequest: React.FC = () => {
  const path = "/demande-de-devis";

  return (
    <div className="quote-page bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <SEO 
        title="Devis déménagement Paris et Île-de-France | Marne Transdem"
        description="Préparez votre devis de déménagement à Paris et en Île-de-France : trajet, volume, accès et prestations. Décrivez votre projet à Marne Transdem."
        canonical={path}
        schema={getBreadcrumbSchema([
          { name: "Accueil", item: "/" },
          { name: "Demande de devis", item: path }
        ])}
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <header className="quote-page-intro">
            <p className="quote-kicker">Un nouveau départ, bien accompagné</p>
            <h1>Votre devis de déménagement <em>à Paris et en Île-de-France</em></h1>
            <p>Quelques informations suffisent pour commencer. Décrivez votre projet à votre rythme ; notre équipe vous accompagne pour préciser la suite.</p>
            <div className="quote-reassurance"><span><ShieldCheck size={17} /> Devis personnalisé</span><span><UserCheck size={17} /> Une équipe à votre écoute</span><a href="tel:0144935486" onClick={() => trackConversion('phone_click', { placement: 'quote_hero' })}>01 44 93 54 86</a></div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 3. Formulaire principal */}
            <div id="formulaire-devis" className="lg:col-span-2 scroll-mt-32 min-w-0">
              <h2 className="sr-only">Votre formulaire de projet</h2>
              <MapProvider>
                <QuoteForm />
              </MapProvider>
            </div>

            {/* 5. Colonne latérale */}
            <div className="quote-assistance space-y-6">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-white lg:hidden flex items-center gap-3">
                <div className="w-1.5 h-8 bg-accent rounded-full"></div>
                Assistance
              </h2>
              <div className="quote-assistance-card bg-brand-900 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">Besoin d’aide ?</h3>
                <p className="text-white/70 mb-8 font-light">
                  Notre équipe vous accompagne pour préparer votre déménagement et choisir la formule la plus adaptée à votre situation.
                </p>
                
                <div className="space-y-6">
                  <a
                    href="tel:0144935486"
                    onClick={() => trackConversion('phone_click', { placement: 'quote_sidebar' })}
                    className="flex items-center gap-4 hover:text-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent/20">
                      <Phone size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5">Téléphone</p>
                      <p className="text-lg font-bold">01 44 93 54 86</p>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@marnetransdem.com"
                    onClick={() => trackConversion('email_click', { placement: 'quote_sidebar' })}
                    className="flex items-center gap-4 hover:text-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent/20">
                      <Mail size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5">Email</p>
                      <p className="text-lg font-bold break-all">contact@marnetransdem.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5">Adresse</p>
                      <p className="text-lg font-bold">43 rue des Maraîchers, 75020 Paris</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <QuoteGuide />
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
