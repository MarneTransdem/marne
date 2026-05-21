import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Search, ArrowRight, User, Phone, Mail, MapPin, 
  Calendar, CheckCircle, RefreshCw, Layers, Sliders, Play, Plus, Clock, Eye 
} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface PublicRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  fromAddress: string;
  fromCity: string;
  fromZip: string;
  fromFloor?: string;
  fromElevator?: string;
  fromDifficulties?: string;
  toAddress: string;
  toCity: string;
  toZip: string;
  toFloor?: string;
  toElevator?: string;
  toDifficulties?: string;
  date: string;
  housingType: string;
  surface: string;
  volume: string | number;
  formula: string;
  needsLift?: string;
  needsPacking?: string;
  needsStorage?: string;
  message?: string;
  createdAt: any;
  status?: 'Nouveau' | 'Étudié_Converti' | 'Archivé';
}

interface PublicRequestsProps {
  onConvertToDevis: (devis: any) => void;
}

export const PublicRequests: React.FC<PublicRequestsProps> = ({ onConvertToDevis }) => {
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<PublicRequest | null>(null);
  
  // Pricing/Chiffrage state
  const [pricingVolume, setPricingVolume] = useState<number>(30);
  const [pricingFormula, setPricingFormula] = useState<'Standard' | 'Économique' | 'Luxe'>('Standard');
  const [pricingPrice, setPricingPrice] = useState<number>(1500);
  const [pricingDate, setPricingDate] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const qSnap = await getDocs(collection(db, 'quotes'));
      const list = qSnap.docs.map(doc => {
        const data = doc.data();
        let status = data.status || 'Nouveau';
        
        // Match with already study-and-converted status from localStorage cache if present
        const cacheStatus = localStorage.getItem(`mt_req_status_${doc.id}`);
        if (cacheStatus) {
          status = cacheStatus;
        }

        return {
          id: doc.id,
          ...data,
          status
        } as PublicRequest;
      });

      // Sort chronological
      list.sort((a, b) => {
        const tA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const tB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return tB - tA;
      });

      setRequests(list);
    } catch (e) {
      console.error("Failed to load quotes from Firestore:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Pre-populate Pricing Calculator when a request is selected
  useEffect(() => {
    if (selectedRequest) {
      const volNum = Number(selectedRequest.volume) || 20;
      setPricingVolume(volNum);
      
      const form = selectedRequest.formula === 'Luxe' || selectedRequest.formula === 'Clé en main' ? 'Luxe' 
                   : selectedRequest.formula === 'Économique' || selectedRequest.formula === 'Chargement' ? 'Économique' 
                   : 'Standard';
      setPricingFormula(form);
      setPricingDate(selectedRequest.date || '');
      
      // Smart estimated price base (e.g. 50€/m3 and formula/lift multipliers)
      let priceBase = volNum * 55;
      if (form === 'Luxe') priceBase *= 1.4;
      if (form === 'Économique') priceBase *= 0.85;
      if (selectedRequest.needsLift === 'oui') priceBase += 300;
      if (selectedRequest.needsStorage === 'oui') priceBase += 200;
      
      setPricingPrice(Math.round(priceBase));
    }
  }, [selectedRequest]);

  // Recalculate price live with parameters modifications
  useEffect(() => {
    if (selectedRequest) {
      let base = pricingVolume * 55;
      if (pricingFormula === 'Luxe') base *= 1.4;
      if (pricingFormula === 'Économique') base *= 0.85;
      if (selectedRequest.needsLift === 'oui') base += 300;
      if (selectedRequest.needsStorage === 'oui') base += 200;
      setPricingPrice(Math.round(base));
    }
  }, [pricingVolume, pricingFormula]);

  const handleStudy = (req: PublicRequest) => {
    setSelectedRequest(req);
  };

  const handleConvert = async () => {
    if (!selectedRequest) return;
    setIsConverting(true);
    
    try {
      const devisId = `DEV-2026-WEB-${Math.floor(100 + Math.random() * 900)}`;
      const newDevis = {
        id: devisId,
        clientName: selectedRequest.fullName,
        phone: selectedRequest.phone,
        email: selectedRequest.email,
        fromCity: `${selectedRequest.fromCity} (${selectedRequest.fromZip})`,
        toCity: `${selectedRequest.toCity} (${selectedRequest.toZip})`,
        fromAddress: selectedRequest.fromAddress,
        toAddress: selectedRequest.toAddress,
        volume: pricingVolume,
        formula: pricingFormula,
        price: pricingPrice,
        date: pricingDate || new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Brouillon'
      };

      // Call parent dashboard hook to populate local active devis registrations
      onConvertToDevis(newDevis);

      // Local persistence states update to reflect Traited/Converti
      localStorage.setItem(`mt_req_status_${selectedRequest.id}`, 'Étudié_Converti');
      
      // Refresh requests list
      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Étudié_Converti' } : r));
      setSelectedRequest(null);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la conversion du devis.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette demande du site public ?")) return;
    try {
      await deleteDoc(doc(db, 'quotes', id));
      setRequests(prev => prev.filter(r => r.id !== id));
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const filtered = requests.filter(r => 
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.fromCity.toLowerCase().includes(search.toLowerCase()) ||
    r.toCity.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-3xl">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wider">MARNE TRANSDEM INTERACTION PUBLIC-CRM</p>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Demandes Entrantes du Site Web</h2>
            <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
              {requests.filter(r => r.status === 'Nouveau').length} Nouvelles
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un client..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/55 dark:border-slate-800 focus:outline-accent w-48"
            />
          </div>
          <button 
            type="button" 
            onClick={fetchRequests} 
            disabled={loading}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition cursor-pointer"
            title="Rafraîchir"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Requests List */}
        <div className={`space-y-4 ${selectedRequest ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {loading && requests.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-400 font-medium">
                <RefreshCw size={24} className="mx-auto animate-spin mb-3 text-accent" />
                Chargement des requêtes clientes...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-500 italic">
                Aucune demande client trouvée ou table vide.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((req) => (
                  <div 
                    key={req.id} 
                    className={`p-5 transition hover:bg-slate-50/60 dark:hover:bg-slate-950/40 cursor-pointer ${selectedRequest?.id === req.id ? 'bg-accent/5 dark:bg-slate-800/40 border-l-4 border-accent' : ''}`}
                    onClick={() => handleStudy(req)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">{req.fullName}</h4>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Clock size={10} /> Recu le {req.createdAt?.seconds ? new Date(req.createdAt.seconds * 1000).toLocaleDateString('fr-FR') : 'Date récente'}
                        </p>
                      </div>
                      <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-lg ${
                        req.status === 'Étudié_Converti' 
                          ? 'bg-emerald-150 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300' 
                          : 'bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}>
                        {req.status === 'Étudié_Converti' ? '✓ Devis Brouillon' : 'A étudier'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{req.fromCity} ➔ {req.toCity}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{req.volume} m³</span>
                        <span className="text-slate-400 mx-1">•</span>
                        <span className="italic">{req.housingType} ({req.surface}m²)</span>
                      </div>
                      <div className="text-right sm:text-left">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-black uppercase text-brand-900 dark:text-accent">
                          {req.formula}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] border-t border-dashed border-slate-150 dark:border-slate-800/60 pt-2.5">
                      <span className="text-slate-400 italic">Formule d'origine: {req.formula}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStudy(req); }}
                          className="px-3 py-1 bg-brand-900 text-white dark:bg-accent dark:text-brand-950 rounded-lg font-black text-[10px] hover:opacity-90 active:scale-95 cursor-pointer"
                        >
                          Etudier & Chiffrer
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteRequest(req.id); }}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition active:scale-95 cursor-pointer"
                          title="Supprimer la demande public"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed analysis and direct pricing tool */}
        {selectedRequest && (
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium space-y-6 animate-fade-in relative">
              <button 
                onClick={() => setSelectedRequest(null)} 
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 text-xs font-bold"
              >
                Fermer [X]
              </button>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  Fiche de Logistique Publique
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-2">
                  Étude Technique de : {selectedRequest.fullName}
                </h3>
              </div>

              {/* Informative details */}
              <div className="space-y-4 text-xs">
                {/* Contact grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-secondary" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedRequest.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-secondary" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{selectedRequest.email}</span>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-3.5">
                  <h4 className="font-black text-[11px] uppercase tracking-wider text-slate-400">⚡ Adresses et Configuration de Terrain</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Departure block */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-850/60">
                      <p className="text-[10px] font-black text-slate-400 uppercase">🚩 Départ (Chargement)</p>
                      <p className="font-extrabold mt-1 text-slate-950 dark:text-white">{selectedRequest.fromCity} ({selectedRequest.fromZip})</p>
                      <p className="text-slate-500 font-light text-[10px] mt-0.5">{selectedRequest.fromAddress}</p>
                      
                      <div className="mt-2.5 space-y-1 text-[10px] text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-205 dark:border-slate-800/40">
                        <p>Étage : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.fromFloor || 'RDC'}</strong></p>
                        <p>Ascenseur : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.fromElevator === 'oui' ? 'Oui ✔' : 'Non ✗'}</strong></p>
                        {selectedRequest.fromDifficulties && (
                          <p className="text-amber-600 dark:text-amber-400 font-medium">Contrainte : {selectedRequest.fromDifficulties}</p>
                        )}
                      </div>
                    </div>

                    {/* Arrival block */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-850/60">
                      <p className="text-[10px] font-black text-slate-400 uppercase">🏁 Arrivée (Livraison)</p>
                      <p className="font-extrabold mt-1 text-slate-950 dark:text-white">{selectedRequest.toCity} ({selectedRequest.toZip})</p>
                      <p className="text-slate-500 font-light text-[10px] mt-0.5">{selectedRequest.toAddress}</p>
                      
                      <div className="mt-2.5 space-y-1 text-[10px] text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-205 dark:border-slate-800/40">
                        <p>Étage : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.toFloor || 'RDC'}</strong></p>
                        <p>Ascenseur : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.toElevator === 'oui' ? 'Oui ✔' : 'Non ✗'}</strong></p>
                        {selectedRequest.toDifficulties && (
                          <p className="text-amber-600 dark:text-amber-400 font-medium">Contrainte : {selectedRequest.toDifficulties}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional services and specs */}
                <div className="p-3.5 bg-brand-900/5 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800/60 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Monte-Meuble</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsLift === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsLift === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Emballage pro</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsPacking === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsPacking === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Garde-Meuble</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsStorage === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsStorage === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                </div>

                {selectedRequest.message && (
                  <div className="p-3 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/20 rounded-xl">
                    <p className="text-[9px] uppercase font-black text-indigo-400 mb-1">✍ Message optionnel inscrit par le client:</p>
                    <p className="text-slate-700 dark:text-slate-300 italic">"{selectedRequest.message}"</p>
                  </div>
                )}
              </div>

              {/* Direct Simulator/Pricing & Conversion */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-4">
                <div className="flex items-center gap-1.5 mb-1 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1.5 rounded-lg border border-yellow-250/20">
                  <Sliders size={13} className="text-amber-500 shrink-0" />
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase">CALCULATEUR PROFESSIONNEL DE TARIFICATION MARNE TRANSDEM</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-extrabold mb-1">Volume technique final (m³)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="range"
                        min="5" 
                        max="100" 
                        value={pricingVolume} 
                        onChange={e => setPricingVolume(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="font-black text-brand-900 dark:text-accent w-10 text-right">{pricingVolume}m³</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Nouveau tarif calculé (€)</label>
                    <input 
                      type="number" 
                      value={pricingPrice} 
                      onChange={e => setPricingPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-accent font-extrabold text-brand-900 dark:text-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Formule Commerciale retenue</label>
                    <select 
                      value={pricingFormula} 
                      onChange={e => setPricingFormula(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                    >
                      <option value="Économique">Économique (Formule Budget)</option>
                      <option value="Standard">Standard (Formule Intermédiaire)</option>
                      <option value="Luxe">Luxe (Formule Clé en main)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Date finale de déménagement</label>
                    <input 
                      type="date" 
                      value={pricingDate} 
                      onChange={e => setPricingDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="w-full bg-accent hover:bg-accent-hover text-brand-900 font-black py-3 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-55"
                  >
                    <Plus size={16} /> Générer le Devis Client Brouillon
                  </button>
                  <p className="text-[10px] text-center text-slate-500 italic mt-1.5">
                    L'estimation sera instantanément transférée au registre central des devis sous forme de Brouillon prêt à tarifer/envoyer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
