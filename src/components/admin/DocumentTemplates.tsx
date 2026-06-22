import React, { useState } from 'react';
import { FileText, Printer, ShieldAlert, Truck, Users, Calendar, Download, Clock, MapPin } from 'lucide-react';

interface DocumentTemplatesProps {
  move: {
    id: string;
    clientName: string;
    devisId: string;
    volume: number;
    fromCity: string;
    toCity: string;
    date: string;
    teamLeader: string;
    crewSize: number;
    assignedMovers?: string[];
    assignedTruck?: string;
  };
  onClose: () => void;
}

export const DocumentTemplates: React.FC<DocumentTemplatesProps> = ({ move, onClose }) => {
  const [activeTemplate, setActiveTemplate] = useState<'lettre_voiture' | 'declaration_valeur' | 'fiche_equipe'>('lettre_voiture');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: activeTemplate,
          data: move
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur lors de la génération du PDF.");
      }

      // Download from server URL
      const link = document.createElement('a');
      link.href = result.url;
      link.target = '_blank';
      let docName = 'Lettre_de_Voiture';
      if (activeTemplate === 'declaration_valeur') docName = 'Declaration_de_Valeur';
      if (activeTemplate === 'fiche_equipe') docName = 'Fiche_Equipe';
      link.download = `${docName}_${move.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e: any) {
      console.error("Failed to generate official document PDF:", e);
      alert(`Une erreur est survenue lors du téléchargement du document PDF : ${e.message || e}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white print:relative print:z-0">
      
      {/* Load Google Fonts for premium branding */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Caveat:wght@700&display=swap" rel="stylesheet" />

      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Navigation header for templates selection - Hidden during printing */}
        <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="text-accent" size={18} />
            <span className="text-xs font-black uppercase tracking-wider">
              Éditeur de Documents Réglementaires 🇫🇷
            </span>
          </div>

          {/* Subtabs for template selection */}
          <div className="flex bg-slate-800 p-1.5 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTemplate('lettre_voiture')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'lettre_voiture' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Lettre de Voiture
            </button>
            <button
              onClick={() => setActiveTemplate('declaration_valeur')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'declaration_valeur' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Déclaration Valeur
            </button>
            <button
              onClick={() => setActiveTemplate('fiche_equipe')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${activeTemplate === 'fiche_equipe' ? 'bg-accent text-brand-950' : 'text-slate-400 hover:text-white'}`}
            >
              Fiche Équipe
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-accent text-brand-950 hover:bg-accent-hover text-[10px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download size={12} className={isGeneratingPdf ? 'animate-bounce' : ''} /> 
              {isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}
            </button>

            <button 
              onClick={handlePrint}
              className="bg-slate-800 text-white hover:bg-slate-700 text-[10px] font-black py-1.5 px-3 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Printer size={12} /> Imprimer / PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 ml-1"
            >
              Fermer [X]
            </button>
          </div>
        </div>

        {/* Printable View Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950 print:p-0 print:bg-white flex justify-center">
          
          {/* Inner Template display */}
          <div 
            id="official-doc-canvas"
            style={{ fontFamily: '"Outfit", sans-serif' }}
            className="bg-white text-slate-900 p-10 rounded-3xl shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0 w-full max-w-[210mm] min-h-[297mm] text-[10px] flex flex-col justify-between"
          >
            
            {/* 1. LETTRE DE VOITURE TEMPLATE */}
            {activeTemplate === 'lettre_voiture' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="grid grid-cols-2 border-b pb-5 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-10 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-sm font-black text-slate-950 leading-none font-black">MARNE TRANSDEM</h1>
                      <p style={{ fontFamily: '"Caveat", cursive' }} className="text-indigo-600 text-[10px] font-bold mt-1">Déménagez en toute sérénité !</p>
                      <p className="text-[7px] text-slate-400 font-light mt-1 uppercase tracking-wider">
                        14 Avenue du Général de Gaulle, 94000 Créteil<br />
                        Siret: 843 321 890 00012 • RCS Créteil
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-slate-955 text-white font-black px-3 py-1.5 rounded-xl text-[8.5px] uppercase tracking-wider shadow-sm" style={{ backgroundColor: '#0f172a' }}>
                      Lettre de Voiture Nationale
                    </span>
                    <p className="font-mono mt-3 font-black text-indigo-950 text-[11px] uppercase tracking-wider">
                      L.V. N° : LV-{move.id.replace('DEM-', '')}
                    </p>
                    <p className="text-slate-400 text-[7.5px] mt-0.5 font-medium">Arrêté Ministériel du 9 nov. 1999 • Transport Routier</p>
                  </div>
                </div>

                {/* Regulatory Notice (styled as premium Alert) */}
                <div className="bg-indigo-50/40 border border-indigo-150 rounded-2xl p-4 text-[8.5px] text-indigo-950 leading-relaxed flex items-start gap-3">
                  <ShieldAlert size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block uppercase text-[8px] tracking-wider text-indigo-900 mb-0.5">AVIS RÈGLEMENTAIRE RENSEIGNÉ</span>
                    La présente lettre de voiture constitue le contrat de transport obligatoire régissant le transfert de vos effets mobiliers. Elle doit être validée, signée et conservée à bord du véhicule Marne Transdem durant tout le trajet pour présentation en cas de contrôle routier.
                  </div>
                </div>

                {/* Core Columns Grid */}
                <div className="grid grid-cols-2 gap-5 mt-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Card 1 */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/30 border-l-4 border-l-slate-800 shadow-xs">
                      <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span> 1. CLIENT & DONNEUR D'ORDRE
                      </h4>
                      <div className="space-y-1.5 text-slate-700 text-[8.5px]">
                        <p className="flex justify-between border-b border-slate-100 pb-1"><span className="text-slate-400">Nom complet :</span> <strong className="text-slate-900 uppercase">{move.clientName}</strong></p>
                        <p className="flex justify-between border-b border-slate-100 pb-1"><span className="text-slate-400">Dossier Devis :</span> <strong className="text-slate-900 font-mono">#{move.devisId}</strong></p>
                        <p className="flex justify-between"><span className="text-slate-400">Type de voyage :</span> <strong className="text-slate-900">National Routier</strong></p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-indigo-50/10 border-l-4 border-l-indigo-600 shadow-xs">
                      <h4 className="font-black text-[9px] uppercase tracking-wider text-indigo-950 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> 2. OPÉRATION DE CHARGEMENT
                      </h4>
                      <div className="space-y-1.5 text-slate-750 text-[8.5px]">
                        <p className="flex justify-between border-b border-indigo-50 pb-1"><span className="text-slate-400">Lieu de chargement :</span> <strong className="text-slate-900">{move.fromCity}</strong></p>
                        <p className="flex justify-between border-b border-indigo-50 pb-1"><span className="text-slate-400">Volume estimé :</span> <strong className="text-indigo-750">{move.volume} m³</strong></p>
                        <p className="flex justify-between"><span className="text-slate-400">Date programmée :</span> <strong className="text-slate-900">{move.date}</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Card 3 */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-emerald-50/10 border-l-4 border-l-emerald-600 shadow-xs">
                      <h4 className="font-black text-[9px] uppercase tracking-wider text-emerald-950 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 3. OPÉRATION DE LIVRAISON
                      </h4>
                      <div className="space-y-1.5 text-slate-750 text-[8.5px]">
                        <p className="flex justify-between border-b border-emerald-50 pb-1"><span className="text-slate-400">Lieu de livraison :</span> <strong className="text-slate-900">{move.toCity}</strong></p>
                        <p className="flex justify-between border-b border-emerald-50 pb-1"><span className="text-slate-400">Date estimée :</span> <strong className="text-slate-900">{move.date}</strong></p>
                        <p className="flex justify-between"><span className="text-slate-400">Déchargement :</span> <strong className="text-slate-900">Direct à domicile</strong></p>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="border border-slate-200 rounded-2xl p-4 bg-blue-50/10 border-l-4 border-l-blue-600 shadow-xs">
                      <h4 className="font-black text-[9px] uppercase tracking-wider text-blue-950 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 4. INFRASTRUCTURE LOGISTIQUE
                      </h4>
                      <div className="space-y-1.5 text-slate-750 text-[8.5px]">
                        <p className="flex justify-between border-b border-blue-50 pb-1"><span className="text-slate-400">Chef d'équipe :</span> <strong className="text-slate-900">{move.teamLeader}</strong></p>
                        <p className="flex justify-between border-b border-blue-50 pb-1"><span className="text-slate-400">Véhicule assigné :</span> <strong className="text-slate-900 font-mono">{move.assignedTruck || 'Fourgon VL 20m³'}</strong></p>
                        <p className="flex justify-between"><span className="text-slate-400">Taille d'équipe :</span> <strong className="text-slate-900">{move.crewSize} déménageurs</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signatures and Décharge */}
                <div className="pt-3">
                  <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-400 mb-3">5. VALIDATION TECHNIQUE & SIGNATURES CONJOINTES</h4>
                  <div className="grid grid-cols-2 gap-5">
                    {/* Loading Sign */}
                    <div className="border border-dashed border-slate-200 p-4 rounded-2xl text-[8px] text-slate-500 bg-slate-50/50 flex flex-col justify-between h-36">
                      <div className="space-y-1.5">
                        <span className="font-black text-slate-800 uppercase block tracking-wider text-[8px] border-b pb-1">Phase A - Au Chargement</span>
                        <p className="leading-relaxed">Je certifie l'achèvement complet et sans incident du chargement de mes effets mobiliers par les soins de Marne Transdem.</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-[7px]">Fait à {move.fromCity}, le {move.date}</p>
                        <div className="border-t pt-1.5 border-slate-200 text-center font-bold text-slate-400 uppercase text-[7px] tracking-wider">
                          Signature Client (Bon pour accord)
                        </div>
                      </div>
                    </div>

                    {/* Delivery Sign */}
                    <div className="border border-dashed border-slate-200 p-4 rounded-2xl text-[8px] text-slate-500 bg-slate-50/50 flex flex-col justify-between h-36 relative overflow-hidden">
                      <div className="space-y-1.5">
                        <span className="font-black text-slate-800 uppercase block tracking-wider text-[8px] border-b pb-1">Phase B - À la Livraison</span>
                        <p className="leading-relaxed">Je soussigné certifie de la livraison conforme des meubles et de l'encaissement du solde final, sous réserve de réserves formulées sous 10 jours.</p>
                      </div>
                      
                      {/* Stamp placement inside signature box */}
                      <div className="absolute right-3 bottom-12 rotate-[-5deg] opacity-75 select-none pointer-events-none">
                        <div className="border border-red-500 rounded p-1 text-center text-red-500 font-black uppercase text-[5px] tracking-wider w-20">
                          <div className="text-[6px]">ACQUITTÉ</div>
                          <div className="border-t border-b border-red-500 my-0.5 font-bold text-[4px]">MARNE TRANSDEM</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="font-mono text-[7px]">Fait à {move.toCity}, le {move.date}</p>
                        <div className="border-t pt-1.5 border-slate-200 text-center font-bold text-slate-400 uppercase text-[7px] tracking-wider">
                          Signature Client (Décharge finale)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DÉCLARATION DE VALEUR TEMPLATE */}
            {activeTemplate === 'declaration_valeur' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="grid grid-cols-2 border-b pb-5 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-10 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-sm font-black text-slate-950 leading-none font-black">MARNE TRANSDEM</h1>
                      <p style={{ fontFamily: '"Caveat", cursive' }} className="text-indigo-600 text-[10px] font-bold mt-1">Déménagez en toute sérénité !</p>
                      <p className="text-[7px] text-slate-400 font-light mt-1 uppercase tracking-wider">
                        RC Professionnelle AXA Assurances N° 843210-94<br />
                        Couverture ad-valorem de base
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-indigo-900 text-white font-black px-3 py-1.5 rounded-xl text-[8.5px] uppercase tracking-wider shadow-sm">
                      Déclaration de Valeur Contractuelle
                    </span>
                    <p className="font-mono mt-3 font-black text-indigo-950 text-[11px] uppercase tracking-wider">
                      D.V. N° : DV-{move.id.replace('DEM-', '')}
                    </p>
                    <p className="text-slate-400 text-[7.5px] mt-0.5 font-medium">Obligatoire pour l'activation des garanties AXA</p>
                  </div>
                </div>

                {/* Amber Warning box */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 text-[8.5px] text-amber-950 leading-relaxed flex items-start gap-3">
                  <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black block uppercase text-[8px] tracking-wider text-amber-900 mb-0.5">DISPOSITIONS DE SÉCURITÉ ET ASSURANCES</span>
                    En cas de perte ou d'avarie fortuite de vos biens lors du transport, les indemnités d'assurance seront calculées sur la base de la déclaration ci-dessous. Le maximum garanti par objet individuel non listé est fixé forfaitairement à <strong>750 €</strong>.
                  </div>
                </div>

                {/* Identification Cards */}
                <div className="grid grid-cols-2 gap-5 mt-4">
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/30 border-l-4 border-l-slate-800 shadow-xs">
                    <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-800 mb-2">👤 LE MANDANT (CLIENT)</h4>
                    <div className="space-y-1.5 text-slate-700 text-[8.5px]">
                      <p><span className="text-slate-400">Nom complet :</span> <strong className="text-slate-900 uppercase">{move.clientName}</strong></p>
                      <p><span className="text-slate-400">Lieu de chargement :</span> <strong>{move.fromCity}</strong></p>
                      <p><span className="text-slate-400">Lieu de livraison :</span> <strong>{move.toCity}</strong></p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl p-4 bg-indigo-50/10 border-l-4 border-l-indigo-600 shadow-xs">
                    <h4 className="font-black text-[9px] uppercase tracking-wider text-indigo-950 mb-2">🏢 LE MANDATAIRE (MARNE TRANSDEM)</h4>
                    <div className="space-y-1.5 text-slate-700 text-[8.5px]">
                      <p><span className="text-slate-400">Assurance :</span> <strong className="text-slate-900">AXA Courtage Transport</strong></p>
                      <p><span className="text-slate-400">Valeur Globale Déclarée :</span> <strong className="text-indigo-800">15 000 €</strong></p>
                      <p><span className="text-slate-400">Date de Mission :</span> <strong>{move.date}</strong></p>
                    </div>
                  </div>
                </div>

                {/* Table of items */}
                <div className="mt-4">
                  <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-400 mb-2.5">📋 INVENTAIRE DES EFFETS INDIVIDUELS (VALEUR SUPÉRIEURE À 750 €)</h4>
                  <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-xs">
                    <table className="w-full text-left text-[9px] border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[8.5px] uppercase font-black tracking-wider">
                          <th className="py-2.5 px-4 border-r border-slate-800">Code Inventaire</th>
                          <th className="py-2.5 px-4 border-r border-slate-800">Description précise de l'effet</th>
                          <th className="py-2.5 px-4 text-right">Valeur Estimée HT (€)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-[8.5px]">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2 px-4 border-r font-mono font-bold text-slate-500">VAL-001</td>
                          <td className="py-2 px-4 border-r font-medium">Téléviseur OLED LG 65" avec support mural</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-slate-950">1 200 €</td>
                        </tr>
                        <tr className="bg-slate-50/20 hover:bg-slate-50/50">
                          <td className="py-2 px-4 border-r font-mono font-bold text-slate-500">VAL-002</td>
                          <td className="py-2 px-4 border-r font-medium">Canapé d'angle en cuir Roche Bobois</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-slate-950">2 500 €</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2 px-4 border-r font-mono font-bold text-slate-500">VAL-003</td>
                          <td className="py-2 px-4 border-r font-medium">Lave-linge tambour Siemens IQ800</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-slate-950">850 €</td>
                        </tr>
                        <tr className="bg-slate-50/10 italic text-slate-400">
                          <td className="py-2 px-4 border-r text-center font-bold font-mono">-</td>
                          <td className="py-2 px-4 border-r font-light">Aucun autre effet personnel ne dépasse la limite contractuelle de 750 €</td>
                          <td className="py-2 px-4 text-right font-light">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Mandat */}
                <div className="border border-dashed border-slate-200 p-4 bg-slate-50/50 rounded-2xl text-[8px] leading-relaxed text-slate-500 mt-6 relative overflow-hidden">
                  <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1">MANDAT & ENGAGEMENT DU CLIENT</span>
                  Je declare sur l'honneur que l'inventaire et les valeurs répertoriées ci-dessus reflètent la réalité immédiate de mon patrimoine mobilier confié.
                  
                  {/* Rotated stamp background style */}
                  <div className="absolute right-12 bottom-6 rotate-[-6deg] opacity-80 select-none pointer-events-none">
                    <div className="border border-dashed border-red-500 rounded p-1 text-center text-red-500 font-black uppercase text-[5.5px] tracking-wider w-24">
                      <div className="text-[6.5px]">MARNE TRANSDEM</div>
                      <div className="border-t border-b border-red-500 my-0.5 font-bold text-[4.5px]">AXA ASSURANCE</div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between font-bold text-slate-500">
                    <span className="flex flex-col"><span>Pour Marne Transdem :</span><span className="text-[6px] font-light mt-1">Signature du gérant validée</span></span>
                    <span className="mr-8 flex flex-col text-right"><span>Le Mandant Client :</span><span className="text-[6px] font-light mt-1">Mention manuscrite "Lu et approuvé"</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. FICHE ÉQUIPE TEMPLATE */}
            {activeTemplate === 'fiche_equipe' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="grid grid-cols-2 border-b pb-5 border-slate-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/logo-clair.webp" 
                      alt="Marne Transdem Logo" 
                      className="h-10 w-auto object-contain shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h1 className="text-sm font-black text-slate-950 leading-none font-black">MARNE TRANSDEM</h1>
                      <p style={{ fontFamily: '"Caveat", cursive' }} className="text-indigo-600 text-[10px] font-bold mt-1">Déménagez en toute sérénité !</p>
                      <p className="text-[7px] text-slate-400 font-light mt-1 uppercase tracking-wider">
                        Fiche de Route Interne Confidentielle<br />
                        Suivi opérationnel logistique
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-slate-900 text-white font-black px-3 py-1.5 rounded-xl text-[8.5px] uppercase tracking-wider shadow-sm">
                      Fiche d'Intervention Terrain
                    </span>
                    <p className="font-mono mt-3 font-black text-indigo-950 text-[11px] uppercase tracking-wider">
                      INTERV N° : FIT-{move.id.replace('DEM-', '')}
                    </p>
                    <p className="text-slate-400 text-[7.5px] mt-0.5 font-medium">À l'attention exclusive de l'équipe terrain</p>
                  </div>
                </div>

                {/* Dashboard logs boxes */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-slate-200 rounded-2xl p-4 text-center bg-indigo-50/10 border-b-4 border-b-indigo-600 shadow-xs">
                    <Users className="mx-auto text-indigo-600 mb-1.5" size={16} />
                    <span className="text-[7.5px] text-slate-400 block uppercase font-bold tracking-wider">Chef d'Équipe</span>
                    <strong className="text-slate-900 text-[10px] font-black uppercase mt-1 block">{move.teamLeader}</strong>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 text-center bg-blue-50/10 border-b-4 border-b-blue-600 shadow-xs">
                    <Truck className="mx-auto text-blue-600 mb-1.5" size={16} />
                    <span className="text-[7.5px] text-slate-400 block uppercase font-bold tracking-wider">Véhicule Assigné</span>
                    <strong className="text-slate-900 text-[10px] font-mono mt-1 block">{move.assignedTruck || 'TRK-AA-123-BB'}</strong>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 text-center bg-slate-50 border-b-4 border-b-slate-800 shadow-xs">
                    <Calendar className="mx-auto text-slate-600 mb-1.5" size={16} />
                    <span className="text-[7.5px] text-slate-400 block uppercase font-bold tracking-wider">Date d'Exécution</span>
                    <strong className="text-slate-900 text-[10px] font-black mt-1 block">{move.date}</strong>
                  </div>
                </div>

                {/* Timeline Routing */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" /> PROGRAMME DE LA MISSION LOGISTIQUE
                  </h4>
                  
                  <div className="relative border-l-2 border-indigo-200 pl-6 ml-3.5 space-y-6">
                    {/* Step 1 */}
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-xs border border-white">
                        1
                      </span>
                      <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                        <h5 className="font-black text-[10.5px] text-slate-900 flex items-center justify-between font-black">
                          <span>08h00 - CHARGEMENT TECHNIQUE</span>
                          <span className="bg-indigo-100 text-indigo-800 font-extrabold text-[7.5px] uppercase px-2 py-0.5 rounded-lg font-black">Départ</span>
                        </h5>
                        <p className="text-slate-450 font-light text-[8px] mt-1 flex items-center gap-1">
                          <MapPin size={10} className="text-slate-450" /> Client : {move.clientName} | Ville : {move.fromCity}
                        </p>
                        <p className="text-slate-650 font-light mt-2 leading-relaxed text-[8.5px]">
                          Vérifier avec le client l'état d'accès (ascenseur, escaliers) et installer la signalisation routière. Poser les couvertures épaisses de protection sur tous les mobiliers sensibles. Signer l'état de départ contradictoire.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-xs border border-white">
                        2
                      </span>
                      <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                        <h5 className="font-black text-[10.5px] text-slate-900 flex items-center justify-between font-black">
                          <span>12h00 - ACHEMINEMENT ROUTIER</span>
                          <span className="bg-blue-100 text-blue-800 font-extrabold text-[7.5px] uppercase px-2 py-0.5 rounded-lg font-black">Trajet</span>
                        </h5>
                        <p className="text-slate-650 font-light mt-2 leading-relaxed text-[8.5px]">
                          Vérifier le bon arrimage de la cargaison et la fermeture sécurisée du hayon avant le départ. Conduire de façon rationnelle. Respecter le temps de pause règlementaire et les restrictions de tonnage.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-xs border border-white">
                        3
                      </span>
                      <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-4 shadow-2xs">
                        <h5 className="font-black text-[10.5px] text-slate-900 flex items-center justify-between font-black">
                          <span>15h00 - LIVRAISON & RESTITUTION</span>
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[7.5px] uppercase px-2 py-0.5 rounded-lg font-black">Arrivée</span>
                        </h5>
                        <p className="text-slate-450 font-light text-[8px] mt-1 flex items-center gap-1">
                          <MapPin size={10} className="text-slate-450" /> Destination : {move.toCity}
                        </p>
                        <p className="text-slate-650 font-light mt-2 leading-relaxed text-[8.5px]">
                          Positionner le camion en sécurité. Décharger les pièces selon le plan de disposition du client. Remonter les lits et meubles principaux s'ils ont été démontés. Faire signer obligatoirement la décharge finale de la Lettre de voiture.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team members list */}
                <div className="pt-2">
                  <h4 className="font-black text-[9px] uppercase tracking-wider text-slate-400 mb-2.5">👤 COMPAGNONS DÉMÉNAGEURS ASSIGNÉS</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-slate-200 p-2.5 rounded-xl flex items-center gap-2 bg-slate-50/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-[8px] text-slate-700">Conducteur PL : <strong className="text-slate-900 block text-[8.5px]">{move.teamLeader}</strong></span>
                    </div>
                    {move.assignedMovers && move.assignedMovers.length > 0 ? (
                      move.assignedMovers.map((m, i) => (
                        <div key={i} className="border border-slate-200 p-2.5 rounded-xl flex items-center gap-2 bg-slate-50/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                          <span className="text-[8px] text-slate-700">Aide-déménageur : <strong className="text-slate-900 block text-[8.5px]">{m}</strong></span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="border border-slate-200 p-2.5 rounded-xl flex items-center gap-2 bg-slate-50/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                          <span className="text-[8px] text-slate-700">Aide-déménageur : <strong className="text-slate-900 block text-[8.5px]">Pascal Porteur</strong></span>
                        </div>
                        <div className="border border-slate-200 p-2.5 rounded-xl flex items-center gap-2 bg-slate-50/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                          <span className="text-[8px] text-slate-700">Aide-déménageur : <strong className="text-slate-900 block text-[8.5px]">Érik Solide</strong></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Standard Legal Footer */}
            <div className="border-t pt-4 text-center text-[7.5px] text-slate-400 border-slate-200 mt-6 uppercase tracking-wider font-medium">
              © Marne Transdem Logistique — Ce document officiel fait foi devant la DREAL et le Tribunal de commerce compétents.
            </div>

          </div>
        </div>

        {/* Footer banner informational - Hidden on print */}
        <div className="bg-slate-100 dark:bg-slate-900 p-3 text-center text-[10px] text-slate-400 leading-none shrink-0 print:hidden border-t dark:border-slate-800">
          Utilisez le bouton "Télécharger PDF" ou "Imprimer" pour sauvegarder ce document avec les polices vectorielles de haute qualité.
        </div>
      </div>
    </div>
  );
};
