import React, { useState, useMemo } from 'react';
import { useSyncedCollection } from '../../hooks/useData';
import type { Devis } from '../../types';
import { buildDossierIdFromReference } from '../../lib/dossier-id';
import { 
  Plus, Minus, Sparkles, RefreshCw, X, Box, CheckCircle2, 
  FileText, ArrowRight, User, Phone, MapPin, Calculator, HelpCircle, Calendar
} from 'lucide-react';

interface FurnitureItem {
  id: string;
  name: string;
  volume: number; // m3
}

interface FurnitureCategory {
  categoryName: string;
  items: FurnitureItem[];
}

const FURNITURE_CATALOG: FurnitureCategory[] = [
  {
    categoryName: 'Salon & Séjour',
    items: [
      { id: 'sofa3', name: 'Canapé 3 places', volume: 3.0 },
      { id: 'sofa2', name: 'Canapé 2 places', volume: 2.0 },
      { id: 'armchair', name: 'Fauteuil', volume: 0.8 },
      { id: 'dining_table', name: 'Table à manger', volume: 1.5 },
      { id: 'chair', name: 'Chaise', volume: 0.2 },
      { id: 'tv_cabinet', name: 'Meuble TV & étagère', volume: 1.0 },
      { id: 'coffee_table', name: 'Table basse', volume: 0.5 }
    ]
  },
  {
    categoryName: 'Chambre & Bureau',
    items: [
      { id: 'bed_double', name: 'Lit double (+ matelas)', volume: 2.2 },
      { id: 'bed_single', name: 'Lit simple (+ matelas)', volume: 1.2 },
      { id: 'wardrobe', name: 'Armoire (par porte)', volume: 1.5 },
      { id: 'chest_drawers', name: 'Commode', volume: 1.0 },
      { id: 'desk', name: 'Bureau de travail', volume: 1.2 },
      { id: 'nightstand', name: 'Table de chevet', volume: 0.2 }
    ]
  },
  {
    categoryName: 'Cuisine, Électroménager & Divers',
    items: [
      { id: 'fridge', name: 'Réfrigérateur / Congélateur', volume: 1.2 },
      { id: 'washer', name: 'Lave-linge / Sèche-linge', volume: 0.8 },
      { id: 'dishwasher', name: 'Lave-vaisselle', volume: 0.8 },
      { id: 'box_standard', name: 'Carton de déménagement standard', volume: 0.1 },
      { id: 'bicycle', name: 'Vélo / Trottinette', volume: 0.5 },
      { id: 'plant_large', name: 'Grande plante en pot', volume: 0.4 }
    ]
  }
];

export function AdminSimulateur() {
  const [devisList, setDevisList] = useSyncedCollection<Devis>('devis');

  // Inventory quantities state
  const [inventory, setInventory] = useState<Record<string, number>>({});
  
  // Complexity multiplier (0.8: light, 1.0: standard, 1.3: heavy/overloaded)
  const [multiplier, setMultiplier] = useState<number>(1.0);

  // Conversion panel state
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [successQuoteId, setSuccessQuoteId] = useState<string | null>(null);
  
  const [clientInfo, setClientInfo] = useState({
    clientName: '',
    phone: '',
    email: '',
    fromCity: '',
    toCity: '',
    date: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0], // default +14 days
    formula: 'Standard' as Devis['formula']
  });

  const handleQtyChange = (itemId: string, direction: number) => {
    setInventory(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + direction);
      return { ...prev, [itemId]: next };
    });
  };

  const resetInventory = () => {
    setInventory({});
    setMultiplier(1.0);
    setSuccessQuoteId(null);
  };

  // Compute volumes
  const totalVolume = useMemo(() => {
    let rawSum = 0;
    FURNITURE_CATALOG.forEach(cat => {
      cat.items.forEach(item => {
        const qty = inventory[item.id] || 0;
        rawSum += qty * item.volume;
      });
    });
    return Math.round(rawSum * multiplier * 10) / 10; // 1 decimal place precision
  }, [inventory, multiplier]);

  // Convert to quote handler
  const handleConvertToQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalVolume <= 0) {
      alert("Veuillez d'abord estimer un volume supérieur à 0 m³.");
      return;
    }

    const quoteId = `DEV-2026-00${devisList.length + 1}`;
    
    // Simple mock calculation logic for price
    // Base € per m3: 45€. Luxe multiplier: 1.5, Eco: 0.8
    let calculatedPrice = totalVolume * 45;
    if (clientInfo.formula === 'Luxe') calculatedPrice *= 1.4;
    if (clientInfo.formula === 'Économique') calculatedPrice *= 0.8;
    calculatedPrice = Math.round(calculatedPrice);

    const createdAt = new Date().toISOString().split('T')[0];
    const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const draftQuote: Devis = {
      id: quoteId,
      dossierId: buildDossierIdFromReference('SIM', quoteId),
      clientName: clientInfo.clientName,
      phone: clientInfo.phone,
      email: clientInfo.email || undefined,
      fromCity: clientInfo.fromCity,
      toCity: clientInfo.toCity,
      volume: totalVolume,
      formula: clientInfo.formula,
      price: calculatedPrice,
      date: clientInfo.date,
      createdAt,
      expiresAt,
      status: 'Brouillon'
    };

    setDevisList([draftQuote, ...devisList]);
    setSuccessQuoteId(quoteId);
    setShowConvertModal(false);
    
    // Clear client form
    setClientInfo({
      clientName: '',
      phone: '',
      email: '',
      fromCity: '',
      toCity: '',
      date: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
      formula: 'Standard'
    });
  };

  const getMultiplierLabel = (val: number) => {
    if (val === 0.8) return 'Léger / Minimaliste (x0.8)';
    if (val === 1.0) return 'Standard (x1.0)';
    return 'Encombré / Densité forte (x1.3)';
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-5 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wider">OUTIL D'ÉVALUATION DE TERRAIN</p>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Estimateur Volumétrique Instantané</h2>
        </div>
        
        <button
          onClick={resetInventory}
          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-transparent font-black py-2.5 px-4 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 self-start"
        >
          <RefreshCw size={14} /> Réinitialiser
        </button>
      </div>

      {successQuoteId && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-850 dark:text-emerald-400 animate-fade-in shadow-sm">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Estimation convertie avec succès ! Le devis brouillon <span className="font-mono text-brand-900 dark:text-accent font-black">{successQuoteId}</span> a été ajouté au pipeline.</span>
          </div>
          <button onClick={() => setSuccessQuoteId(null)} className="text-emerald-600 hover:text-emerald-800"><X size={14} /></button>
        </div>
      )}

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left item grid - catalog */}
        <div className="lg:col-span-2 space-y-6">
          {FURNITURE_CATALOG.map((cat, catIdx) => (
            <div key={catIdx} className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-sm backdrop-blur-md space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-2">
                <Box size={14} className="text-accent" />
                {cat.categoryName}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map(item => {
                  const qty = inventory[item.id] || 0;
                  return (
                    <div 
                      key={item.id} 
                      className={`p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 text-xs ${
                        qty > 0 
                          ? 'bg-brand-50/40 border-brand-200/60 dark:bg-brand-900/10 dark:border-brand-900/40' 
                          : 'bg-white dark:bg-slate-950 border-slate-200/40 dark:border-slate-805 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 block">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold block">{item.volume} m³</span>
                      </div>
                      
                      {/* +/- controls */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-extrabold text-xs text-brand-950 dark:text-white w-5 text-center">
                          {qty}
                        </span>
                        <button 
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - summary calculation and action */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-premium flex flex-col justify-between min-h-[360px]">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-black text-accent tracking-[0.2em] block">Volume Estimé</span>
              <h3 className="text-lg font-black tracking-tight leading-tight text-white flex items-center gap-2">
                <Calculator size={18} className="text-accent" />
                Synthèse Cubique
              </h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Le calcul prend en compte l'ensemble des mobiliers sélectionnés, ajustés par le coefficient d'encombrement choisi.
              </p>
            </div>

            {/* Display volume result */}
            <div className="py-6 text-center bg-slate-800/40 rounded-2xl border border-slate-800 my-4">
              <span className="text-5xl font-black text-accent tracking-tighter">{totalVolume.toFixed(1)}</span>
              <span className="text-2xl font-black text-white ml-1">m³</span>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                {totalVolume > 40 ? 'Requiert : Poids lourd 44m³' : totalVolume > 20 ? 'Requiert : Fourgon 20m³' : 'Requiert : Camionnette 12m³'}
              </p>
            </div>

            {/* Multiplier control */}
            <div className="space-y-2 pb-4">
              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-black">Coefficient d'encombrement</label>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 justify-between">
                <button 
                  onClick={() => setMultiplier(0.8)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${multiplier === 0.8 ? 'bg-accent text-brand-900' : 'text-slate-400'}`}
                >
                  Épuré (0.8)
                </button>
                <button 
                  onClick={() => setMultiplier(1.0)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${multiplier === 1.0 ? 'bg-accent text-brand-900' : 'text-slate-400'}`}
                >
                  Standard (1.0)
                </button>
                <button 
                  onClick={() => setMultiplier(1.3)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${multiplier === 1.3 ? 'bg-accent text-brand-900' : 'text-slate-400'}`}
                >
                  Chargé (1.3)
                </button>
              </div>
            </div>

            {/* Convert action button */}
            <button
              onClick={() => {
                if (totalVolume <= 0) {
                  alert("Veuillez d'abord sélectionner des meubles dans le catalogue.");
                  return;
                }
                setShowConvertModal(true);
              }}
              className="w-full bg-accent hover:bg-accent-hover text-brand-900 font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles size={14} /> Convertir en Devis Brouillon
            </button>
          </div>
        </div>

      </div>

      {/* Convert Estimate to Devis Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-scale-up text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-accent" />
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider">Créer le Devis Brouillon</h3>
              </div>
              <button onClick={() => setShowConvertModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Le devis contiendra un volume de <span className="font-extrabold text-slate-800 dark:text-white">{totalVolume.toFixed(1)} m³</span>. Son prix estimatif sera calculé automatiquement d'après la formule choisie.
            </div>

            <form onSubmit={handleConvertToQuote} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1"><User size={10} /> Nom du client</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Gérard Lhermitte" value={clientInfo.clientName} onChange={e=>setClientInfo({...clientInfo, clientName: e.target.value})} />
              </div>
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1"><Phone size={10} /> Téléphone mobile</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: 06 12 34 56 78" value={clientInfo.phone} onChange={e=>setClientInfo({...clientInfo, phone: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1 flex items-center gap-1">Adresse e-mail (facultative)</label>
                <input type="email" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: client@mail.com" value={clientInfo.email} onChange={e=>setClientInfo({...clientInfo, email: e.target.value})} />
              </div>
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1"><MapPin size={10} /> Ville de départ</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Paris (75)" value={clientInfo.fromCity} onChange={e=>setClientInfo({...clientInfo, fromCity: e.target.value})} />
              </div>
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1"><MapPin size={10} /> Ville de destination</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Lyon (69)" value={clientInfo.toCity} onChange={e=>setClientInfo({...clientInfo, toCity: e.target.value})} />
              </div>
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1"><Calendar size={10} /> Date prévisionnelle</label>
                <input required type="date" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={clientInfo.date} onChange={e=>setClientInfo({...clientInfo, date: e.target.value})} />
              </div>
              <div>
                <label className="block font-bold mb-1 flex items-center gap-1">Formule choisie</label>
                <select className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={clientInfo.formula} onChange={e=>setClientInfo({...clientInfo, formula: e.target.value as Devis['formula']})}>
                  <option value="Standard">Standard</option>
                  <option value="Économique">Économique</option>
                  <option value="Luxe">Luxe</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white py-3 rounded-xl font-bold transition-all shadow-md">
                  Enregistrer et Générer le Devis Brouillon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
