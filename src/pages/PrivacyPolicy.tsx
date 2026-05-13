import React from 'react';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema } from '../lib/schema';

const PrivacyPolicy: React.FC = () => {
  const path = "/politique-de-confidentialite";

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <SEO 
        title="Politique de Confidentialité | Marne Transdem" 
        description="Consultez notre politique de confidentialité pour savoir comment nous traitons vos données personnelles." 
        canonical={path}
        schema={getBreadcrumbSchema([
          { name: "Accueil", item: "/" },
          { name: "Confidentialité", item: path }
        ])}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-brand-900 mb-8">Politique de Confidentialité</h1>
          
          <p className="lead text-slate-600 mb-10">
            Chez Marne Transdem, nous accordons une importance primordiale à la protection de vos données personnelles et au respect de votre vie privée. Cette politique vous explique comment nous collectons, utilisons et protégeons vos informations.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">1. Collecte des Données</h2>
            <p>Nous collectons les données que vous nous communiquez directement via nos formulaires de demande de devis ou de contact, notamment :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom et prénom</li>
              <li>Coordonnées (email, téléphone)</li>
              <li>Adresses de départ et d'arrivée</li>
              <li>Détails relatifs à votre déménagement (volume estimé, type de logement)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">2. Utilisation des Données</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Établir vos devis personnalisés</li>
              <li>Organiser et réaliser votre prestation de déménagement</li>
              <li>Communiquer avec vous tout au long de votre projet</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">3. Durée de Conservation</h2>
            <p>Nous conservons vos données uniquement le temps nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, conformément aux obligations légales en vigueur.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">4. Destinataires des Données</h2>
            <p>Vos données sont destinées exclusivement aux services internes de Marne Transdem. Nous ne vendons ni ne louons vos informations personnelles à des tiers.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">5. Vos Droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d'accès et de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="mt-4">Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>{CONTACT.email}</strong>.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">6. Cookies</h2>
            <p>Notre site utilise des cookies pour analyser le trafic et améliorer votre navigation. Vous pouvez gérer vos préférences via la bannière de consentement qui s'affiche lors de votre visite.</p>
          </section>

          <section className="mb-10 border-t border-slate-100 pt-10">
            <p className="text-sm text-slate-500 italic">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
