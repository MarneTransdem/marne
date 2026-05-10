import React from 'react';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema } from '../lib/schema';

const Legal: React.FC = () => {
  const path = "/mentions-legales";

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <SEO 
        title="Mentions Légales | Marne Transdem" 
        description="Consultez les mentions légales de Marne Transdem, votre déménageur de confiance à Paris." 
        canonical={path}
        schema={getBreadcrumbSchema([
          { name: "Accueil", item: "/" },
          { name: "Mentions Légales", item: path }
        ])}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-4xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-brand-900 mb-8">Mentions Légales</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">1. Éditeur du Site</h2>
            <p>Le site <strong>{CONTACT.domain}</strong> est édité par la société <strong>Marne Transdem</strong>.</p>
            <p>Statut : SARL au capital de [Votre Capital]</p>
            <p>Siège social : {CONTACT.fullAddress}</p>
            <p>Téléphone : {CONTACT.phone}</p>
            <p>Email : {CONTACT.email}</p>
            <p>SIRET : [Votre Siret]</p>
            <p>Directeur de la publication : [Nom du Responsable]</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">2. Hébergement</h2>
            <p>Le site est hébergé par Google Cloud Platform.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">3. Propriété Intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-brand-900 mb-4">4. Protection des Données (RGPD)</h2>
            <p>Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de rectification et d'opposition aux données personnelles vous concernant. Vous pouvez exercer ce droit en nous contactant à {CONTACT.email}.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
