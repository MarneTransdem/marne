import React from 'react';
import { QuoteForm } from '../components/forms/QuoteForm';
import { MapProvider } from '../components/common/MapProvider';
import { SEO } from '../components/SEO';
import { ShieldCheck, MessageSquare, UserCheck, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { getBreadcrumbSchema } from '../lib/schema';
import { CONTACT } from '../constants';
import { trackConversion } from '../lib/public-analytics';

const QuoteRequest: React.FC = () => {
  const path = "/demande-de-devis";

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 md:py-20 transition-colors duration-300">
      <SEO 
        title="Demande de Devis Déménagement Paris | Estimation gratuite | Marne Transdem" 
        description="Obtenez votre devis de déménagement gratuit à Paris and en Île-de-France. Formulaire rapide, réponse sous 24h. Étude personnalisée de votre projet." 
        canonical={path}
        schema={getBreadcrumbSchema([
          { name: "Accueil", item: "/" },
          { name: "Demande de devis", item: path }
        ])}
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* 1. Hero de page */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-900 dark:text-white mb-6 tracking-tight leading-tight">
              Demande de devis <span className="text-accent italic font-serif">déménagement</span> à Paris
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Décrivez votre projet en quelques minutes. L’équipe Marne Transdem vous recontacte pour établir une estimation adaptée à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                onClick={() => trackConversion('phone_click', { placement: 'quote_hero' })}
                className="btn-premium bg-slate-100 dark:bg-slate-900 text-brand-900 dark:text-white px-8 py-4 rounded-full font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center gap-3 shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <Phone size={20} className="text-accent" />
                Appeler au {CONTACT.phone}
              </a>
            </div>
          </div>

          <h2 className="sr-only">Nos garanties et votre projet</h2>

          {/* 2. Bloc de réassurance */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
            {[
              { icon: ShieldCheck, title: "Devis personnalisé" },
              { icon: MessageSquare, title: "Réponse claire" },
              { icon: UserCheck, title: "Accompagnement professionnel" },
              { icon: Building2, title: "Particuliers & entreprises" }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center gap-4 group hover:shadow-xl hover:border-accent/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <p className="font-bold text-brand-900 dark:text-white text-sm md:text-base leading-tight tracking-tight px-2">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 3. Formulaire principal */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-8 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-accent rounded-full"></div>
                Votre formulaire de projet
              </h2>
              <MapProvider>
                <QuoteForm />
              </MapProvider>
            </div>

            {/* 5. Colonne latérale */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-white lg:hidden flex items-center gap-3">
                <div className="w-1.5 h-8 bg-accent rounded-full"></div>
                Assistance
              </h2>
              <div className="bg-brand-900 text-white p-8 rounded-3xl shadow-xl sticky top-8">
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
                      <p className="text-lg font-bold">contact@marnetransdem.com</p>
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
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
