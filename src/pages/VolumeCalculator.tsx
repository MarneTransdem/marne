import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight, 
  ArrowRight, 
  Info, 
  RefreshCw, 
  Home, 
  Coffee, 
  Utensils, 
  Bed, 
  Bath, 
  Briefcase, 
  DoorOpen, 
  Box, 
  Warehouse, 
  Building2, 
  CheckCircle2,
  ChevronLeft,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

// --- Types & Constants ---

interface Item {
  id: string;
  name: string;
  volume: number; // in m3
  category: string;
}

interface RoomItem {
  id: string;
  itemId: string;
  name: string;
  volume: number;
  quantity: number;
}

interface Room {
  id: string;
  name: string;
  type: string;
  items: RoomItem[];
}

interface VolumeEstimate {
  estimatedVolume: number;
  recommendedVolume: number;
  cartonsCount: number;
  itemsCount: number;
  rooms: {
    name: string;
    volume: number;
    items: { name: string; quantity: number; volume: number }[];
  }[];
  safetyMarginEnabled: boolean;
  suggestedFormula: string;
  createdAt: string;
}

const ROOM_TYPES = [
  { id: 'salon', name: 'Salon', icon: Coffee },
  { id: 'salle-a-manger', name: 'Salle à manger', icon: Utensils },
  { id: 'chambre', name: 'Chambre', icon: Bed },
  { id: 'cuisine', name: 'Cuisine', icon: Box },
  { id: 'salle-de-bain', name: 'Salle de bain', icon: Bath },
  { id: 'bureau', name: 'Bureau', icon: Briefcase },
  { id: 'entree', name: 'Entrée / couloir', icon: DoorOpen },
  { id: 'cave', name: 'Cave / garage', icon: Warehouse },
  { id: 'entreprise', name: 'Local professionnel', icon: Building2 },
];

const ITEM_CATALOG: Item[] = [
  // Salon
  { id: 'sofa2', name: 'Canapé 2 places', volume: 1.20, category: 'salon' },
  { id: 'sofa3', name: 'Canapé 3 places', volume: 1.80, category: 'salon' },
  { id: 'armchair', name: 'Fauteuil', volume: 0.40, category: 'salon' },
  { id: 'coffee-table', name: 'Table basse', volume: 0.30, category: 'salon' },
  { id: 'tv-stand', name: 'Meuble TV', volume: 0.60, category: 'salon' },
  { id: 'tv', name: 'Télévision', volume: 0.15, category: 'salon' },
  { id: 'shelf-small', name: 'Bibliothèque petite', volume: 0.80, category: 'salon' },
  { id: 'shelf-large', name: 'Bibliothèque grande', volume: 1.50, category: 'salon' },
  { id: 'rug', name: 'Tapis', volume: 0.10, category: 'salon' },
  
  // Salle à manger
  { id: 'table4', name: 'Table 4 personnes', volume: 0.80, category: 'salle-a-manger' },
  { id: 'table6', name: 'Table 6 personnes', volume: 1.20, category: 'salle-a-manger' },
  { id: 'chair', name: 'Chaise', volume: 0.15, category: 'salle-a-manger' },
  { id: 'sideboard', name: 'Buffet', volume: 0.80, category: 'salle-a-manger' },
  { id: 'china-cabinet', name: 'Vaisselier', volume: 1.20, category: 'salle-a-manger' },
  
  // Chambre
  { id: 'bed-single', name: 'Lit simple', volume: 0.80, category: 'chambre' },
  { id: 'bed-double', name: 'Lit double', volume: 1.20, category: 'chambre' },
  { id: 'mattress-single', name: 'Matelas simple', volume: 0.40, category: 'chambre' },
  { id: 'mattress-double', name: 'Matelas double', volume: 0.70, category: 'chambre' },
  { id: 'nightstand', name: 'Table de chevet', volume: 0.15, category: 'chambre' },
  { id: 'dresser', name: 'Commode', volume: 0.80, category: 'chambre' },
  { id: 'wardrobe2', name: 'Armoire 2 portes', volume: 1.50, category: 'chambre' },
  { id: 'wardrobe3', name: 'Armoire 3 portes', volume: 2.20, category: 'chambre' },
  
  // Cuisine / Électroménager
  { id: 'fridge', name: 'Réfrigérateur', volume: 1.00, category: 'cuisine' },
  { id: 'freezer', name: 'Congélateur', volume: 0.80, category: 'cuisine' },
  { id: 'washing-machine', name: 'Lave-linge', volume: 0.50, category: 'cuisine' },
  { id: 'dishwasher', name: 'Lave-vaisselle', volume: 0.50, category: 'cuisine' },
  { id: 'oven', name: 'Four', volume: 0.20, category: 'cuisine' },
  { id: 'microwave', name: 'Micro-ondes', volume: 0.05, category: 'cuisine' },
  
  // Bureau
  { id: 'desk', name: 'Bureau', volume: 0.80, category: 'bureau' },
  { id: 'desk-chair', name: 'Chaise de bureau', volume: 0.25, category: 'bureau' },
  { id: 'filing-cabinet', name: 'Caisson', volume: 0.20, category: 'bureau' },
  { id: 'monitor', name: 'Écran', volume: 0.05, category: 'bureau' },
  { id: 'printer', name: 'Imprimante', volume: 0.10, category: 'bureau' },

  // Cave / Garage
  { id: 'bike', name: 'Vélo', volume: 0.60, category: 'cave' },
  { id: 'metal-shelf', name: 'Étagère métallique', volume: 0.50, category: 'cave' },
  { id: 'suitcase', name: 'Valise', volume: 0.10, category: 'cave' },
  
  // Cartons (Common to all categories)
  { id: 'box-std', name: 'Carton standard', volume: 0.05, category: 'carton' },
  { id: 'box-books', name: 'Carton livres', volume: 0.03, category: 'carton' },
  { id: 'box-wardrobe', name: 'Carton penderie', volume: 0.20, category: 'carton' },
  { id: 'box-fragile', name: 'Carton vaisselle', volume: 0.05, category: 'carton' },
];

const LOCAL_STORAGE_KEY = 'marne_transdem_volume_estimate';

// --- Components ---

const VolumeCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [safetyMargin, setSafetyMargin] = useState(false);
  const [step, setStep] = useState<'rooms' | 'items' | 'summary'>('rooms');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomItem, setShowCustomItem] = useState(false);
  const [customItem, setCustomItem] = useState({ name: '', volume: 0, quantity: 1 });

  // Load from local storage on mount (optional)
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved) as VolumeEstimate;
        // Map back to our internal state if we wanted persistence, 
        // but user request didn't explicitly say "save progress", just "transmit result".
      } catch (e) {
        console.error("Failed to parse saved estimate", e);
      }
    }
  }, []);

  const totalVolume = useMemo(() => {
    const vol = rooms.reduce((acc, room) => 
      acc + room.items.reduce((roomAcc, item) => roomAcc + (item.volume * item.quantity), 0), 0
    );
    return safetyMargin ? vol * 1.1 : vol;
  }, [rooms, safetyMargin]);

  const totalItems = useMemo(() => {
    return rooms.reduce((acc, room) => 
      acc + room.items.reduce((roomAcc, item) => roomAcc + item.quantity, 0), 0
    );
  }, [rooms]);

  const totalCartons = useMemo(() => {
    return rooms.reduce((acc, room) => 
      acc + room.items.filter(i => i.itemId.includes('box')).reduce((roomAcc, item) => roomAcc + item.quantity, 0), 0
    );
  }, [rooms]);

  const largestRoom = useMemo(() => {
    if (rooms.length === 0) return null;
    return rooms.reduce((prev, current) => {
      const prevVol = prev.items.reduce((acc, i) => acc + (i.volume * i.quantity), 0);
      const currVol = current.items.reduce((acc, i) => acc + (i.volume * i.quantity), 0);
      return (prevVol > currVol) ? prev : current;
    });
  }, [rooms]);

  const addRoom = (typeId: string) => {
    const type = ROOM_TYPES.find(t => t.id === typeId);
    if (!type) return;

    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name: type.name,
      type: typeId,
      items: []
    };
    setRooms([...rooms, newRoom]);
    setActiveRoomId(newRoom.id);
    setStep('items');
  };

  const removeRoom = (id: string) => {
    if (confirm('Supprimer cette pièce et tous son contenu ?')) {
      setRooms(rooms.filter(r => r.id !== id));
      if (activeRoomId === id) setActiveRoomId(null);
    }
  };

  const renameRoom = (id: string, newName: string) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, name: newName } : r));
  };

  const addItemToRoom = (roomId: string, item: Item) => {
    setRooms(rooms.map(room => {
      if (room.id !== roomId) return room;
      const existing = room.items.find(i => i.itemId === item.id);
      if (existing) {
        return {
          ...room,
          items: room.items.map(i => i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        };
      }
      return {
        ...room,
        items: [...room.items, {
          id: Math.random().toString(36).substr(2, 9),
          itemId: item.id,
          name: item.name,
          volume: item.volume,
          quantity: 1
        }]
      };
    }));
  };

  const updateQuantity = (roomId: string, itemId: string, delta: number) => {
    setRooms(rooms.map(room => {
      if (room.id !== roomId) return room;
      return {
        ...room,
        items: room.items.map(item => {
          if (item.id !== itemId) return item;
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }).filter(item => item.quantity > 0)
      };
    }));
  };

  const resetCalculator = () => {
    if (confirm('Voulez-vous vraiment réinitialiser tout le calculateur ?')) {
      setRooms([]);
      setActiveRoomId(null);
      setStep('rooms');
      setSafetyMargin(false);
    }
  };

  const addCustomItem = (roomId: string) => {
    if (!customItem.name || customItem.volume <= 0) return;

    setRooms(rooms.map(room => {
      if (room.id !== roomId) return room;
      return {
        ...room,
        items: [...room.items, {
          id: Math.random().toString(36).substr(2, 9),
          itemId: `custom-${Math.random().toString(36).substr(2, 5)}`,
          name: customItem.name,
          volume: customItem.volume,
          quantity: customItem.quantity
        }]
      };
    }));
    setShowCustomItem(false);
    setCustomItem({ name: '', volume: 0, quantity: 1 });
  };

  const handleFinish = () => {
    const estimate = {
      estimatedVolume: Number(totalVolume.toFixed(2)),
      recommendedVolume: Math.ceil(totalVolume),
      cartonsCount: totalCartons,
      itemsCount: totalItems,
      roomsCount: rooms.length,
      largestRoom: largestRoom ? largestRoom.name : null,
      rooms: rooms.map(r => ({
        name: r.name,
        volume: Number(r.items.reduce((a, b) => a + (b.volume * b.quantity), 0).toFixed(2)),
        items: r.items.map(i => ({ name: i.name, quantity: i.quantity, volume: i.volume }))
      })),
      safetyMarginEnabled: safetyMargin,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(estimate));
    navigate('/demande-de-devis');
  };

  const activeRoom = rooms.find(r => r.id === activeRoomId);

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Calculateur de volume déménagement | Marne Transdem" 
        description="Estimez le volume de votre déménagement avec le calculateur Marne Transdem. Ajoutez vos meubles, cartons et objets puis demandez un devis personnalisé."
        canonical="/calculateur-volume"
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Calculateur de volume", item: "/calculateur-volume" }
          ]),
          getFAQSchema([
            { q: "Comment calculer le volume d’un déménagement ?", a: "Notre calculateur vous permet d’ajouter vos meubles et cartons pièce par pièce pour obtenir une estimation indicative en mètres cubes." },
            { q: "Le volume estimé est-il définitif ?", a: "L’équipe Marne Transdem peut affiner cette estimation selon votre inventaire, vos accès et les caractéristiques de votre projet." },
            { q: "Pourquoi le volume peut-il varier ?", a: "Le volume dépend de l’agencement dans le camion, du démontage des meubles et du type de cartons utilisés." },
            { q: "Puis-je transmettre l’estimation à Marne Transdem ?", a: "Oui, en cliquant sur 'Continuer vers le devis', vos données seront automatiquement intégrées à votre demande." }
          ])
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
          >
            <Calculator size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Estimation volume</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
            Calculateur de volume <br/>
            <span className="text-accent underline decoration-white/10 underline-offset-8">de déménagement</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Estimez le volume approximatif de vos meubles, cartons et objets afin de préparer votre demande de devis plus facilement.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button 
              onClick={() => {
                const el = document.getElementById('calculator-main');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3"
            >
              Commencer l'estimation
              <ChevronRight size={20} />
            </button>
            <Link to="/demande-de-devis" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Demander un devis directement
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-400 italic">
            Cette estimation est indicative et sera affinée selon les accès, les meubles et les spécificités de votre projet.
          </p>
        </div>
      </section>

      {/* Main Calculator UI */}
      <section id="calculator-main" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
            
            {/* Left Column: Rooms & Navigation */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-32">
              {/* Added Rooms Section */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-900/40">Pièces ajoutées</h3>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full">{rooms.length}</span>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {rooms.length === 0 ? (
                    <div className="text-center py-8">
                       <p className="text-[11px] text-slate-400 italic">Aucune pièce ajoutée pour le moment.</p>
                    </div>
                  ) : (
                    rooms.map((room) => (
                      <div key={room.id} className="relative bg-slate-50 border border-slate-100 rounded-2xl p-4 transition-all hover:border-accent group">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${activeRoomId === room.id ? 'bg-accent text-white' : 'bg-white text-brand-900 shadow-sm'}`}>
                                 {(() => {
                                   const TypeIcon = ROOM_TYPES.find(t => t.id === room.type)?.icon || Home;
                                   return <TypeIcon size={14} />;
                                 })()}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-[11px] text-brand-900 leading-tight">{room.name}</span>
                                <span className="text-[10px] font-medium text-slate-400 leading-tight">{room.items.reduce((a, b) => a + (b.volume * b.quantity), 0).toFixed(2)} m³</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setActiveRoomId(room.id);
                              setStep('items');
                            }}
                            className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                              activeRoomId === room.id 
                              ? 'bg-brand-900 text-white shadow-lg' 
                              : 'bg-white text-brand-900 shadow-sm hover:bg-slate-50 border border-slate-100'
                            }`}
                          >
                            Sélectionner
                          </button>
                          <button 
                            onClick={() => {
                              const newName = prompt('Nouveau nom pour cette pièce :', room.name);
                              if (newName) renameRoom(room.id, newName);
                            }}
                            className="p-2 bg-white text-slate-400 hover:text-brand-900 rounded-xl shadow-sm transition-all border border-slate-100"
                            title="Renommer"
                          >
                            <RefreshCw size={12} />
                          </button>
                          <button 
                            onClick={() => removeRoom(room.id)}
                            className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-sm transition-all border border-slate-100"
                            title="Supprimer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Room Catalog Section */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium">
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-900/40 mb-6">Ajouter une pièce</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ROOM_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => addRoom(type.id)}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-accent transition-all flex flex-col items-center gap-2 group"
                    >
                      <div className="w-8 h-8 bg-white rounded-xl shadow-sm text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                        <type.icon size={16} />
                      </div>
                      <span className="font-bold text-[9px] text-brand-900 uppercase tracking-tighter">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {rooms.length > 0 && (
                <button 
                  onClick={resetCalculator}
                  className="w-full flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors py-2"
                >
                  <RefreshCw size={12} />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Middle Column: Item Catalog or Room Selection */}
            <div className="lg:col-span-6 bg-white rounded-[3rem] border border-slate-100 shadow-premium min-h-[600px] flex flex-col overflow-hidden relative">
              
              {step === 'rooms' && (
                <div className="p-8 md:p-12">
                  <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-brand-900 mb-2">Choisir une pièce</h2>
                    <p className="text-slate-500 font-light">Sélectionnez la catégorie de pièce pour commencer à ajouter vos objets.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {ROOM_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => addRoom(type.id)}
                        className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-accent transition-all flex flex-col items-center gap-4 group"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                          <type.icon size={24} />
                        </div>
                        <span className="font-bold text-xs text-brand-900">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'items' && activeRoom && (
                <div className="flex flex-col h-full">
                  {/* Room Header */}
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50 shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-4 flex-1">
                      <button onClick={() => setStep('rooms')} className="p-2 text-slate-400 hover:text-brand-900">
                        <ChevronLeft size={20} />
                      </button>
                      <input 
                        type="text" 
                        value={activeRoom.name}
                        onChange={(e) => renameRoom(activeRoom.id, e.target.value)}
                        className="bg-transparent font-black text-xl text-brand-900 outline-none border-b-2 border-transparent focus:border-accent w-full"
                      />
                    </div>
                    <button 
                      onClick={() => removeRoom(activeRoom.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors ml-4"
                      title="Supprimer la pièce"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="p-6 border-b border-slate-50 bg-white sticky top-[80px] z-20">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Rechercher un meuble, un carton..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-accent outline-none text-sm font-medium"
                      />
                      <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-900">
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Catalog Container */}
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Search Results / Room Items */}
                      {ITEM_CATALOG
                        .filter(item => {
                          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
                          const matchesCategory = item.category === activeRoom.type || item.category === 'carton' || activeRoom.type === 'cave';
                          return searchQuery ? matchesSearch : matchesCategory;
                        })
                        .map((item) => {
                          const roomItem = activeRoom.items.find(i => i.itemId === item.id);
                          const quantity = roomItem?.quantity || 0;
                          return (
                            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-accent/40 transition-all shadow-sm">
                              <div className="flex-1">
                                <div className="font-bold text-brand-900 text-sm leading-tight flex items-center gap-2">
                                  {item.name}
                                  <span className="text-[9px] text-slate-400 font-normal">— {item.volume.toFixed(2)} m³</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                                  <button 
                                    onClick={() => updateQuantity(activeRoom.id, roomItem!.id, -1)}
                                    disabled={quantity === 0}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${quantity > 0 ? 'bg-white shadow-sm hover:bg-slate-100' : 'opacity-20 cursor-default'}`}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className={`font-black text-[11px] w-8 text-center ${quantity > 0 ? 'text-brand-900' : 'text-slate-300'}`}>{quantity}</span>
                                  <button 
                                    onClick={() => addItemToRoom(activeRoom.id, item)}
                                    className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-accent/90 shadow-sm"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                {quantity > 0 && (
                                  <button 
                                    onClick={() => updateQuantity(activeRoom.id, roomItem!.id, -quantity)}
                                    className="w-8 h-8 rounded-lg text-slate-300 hover:text-red-500 flex items-center justify-center"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      }

                      {/* Custom Item Button */}
                      {!searchQuery && (
                        <div className="col-span-full pt-8">
                          {showCustomItem ? (
                             <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-slate-50 p-6 rounded-3xl border-2 border-accent/20 border-dashed"
                            >
                              <div className="flex justify-between items-center mb-6">
                                <h5 className="font-black text-brand-900 text-xs uppercase tracking-widest">Objet personnalisé</h5>
                                <button onClick={() => setShowCustomItem(false)} className="text-slate-400 hover:text-brand-900"><X size={16}/></button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase text-slate-400">Nom</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Piano" 
                                    value={customItem.name}
                                    onChange={(e) => setCustomItem({...customItem, name: e.target.value})}
                                    className="w-full bg-white p-3 rounded-xl border border-slate-200 outline-none focus:border-accent text-sm"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase text-slate-400">Volume (m³)</label>
                                  <input 
                                    type="number" 
                                    step="0.1" 
                                    value={customItem.volume}
                                    onChange={(e) => setCustomItem({...customItem, volume: parseFloat(e.target.value)})}
                                    className="w-full bg-white p-3 rounded-xl border border-slate-200 outline-none focus:border-accent text-sm"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase text-slate-400">Quantité</label>
                                  <input 
                                    type="number" 
                                    value={customItem.quantity}
                                    onChange={(e) => setCustomItem({...customItem, quantity: parseInt(e.target.value)})}
                                    className="w-full bg-white p-3 rounded-xl border border-slate-200 outline-none focus:border-accent text-sm"
                                  />
                                </div>
                              </div>
                              <button 
                                onClick={() => addCustomItem(activeRoom.id)}
                                disabled={!customItem.name || customItem.volume <= 0}
                                className="w-full bg-brand-900 text-white font-bold py-3 rounded-xl hover:bg-brand-800 transition-all disabled:opacity-50"
                              >
                                Ajouter à la pièce
                              </button>
                            </motion.div>
                          ) : (
                            <button 
                              onClick={() => setShowCustomItem(true)}
                              className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-accent hover:text-accent transition-all flex flex-col items-center gap-3"
                            >
                              <Plus className="bg-slate-50 p-2 rounded-full" size={40} />
                              <span>Ajouter un objet personnalisé</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 'summary' && (
                 <div className="p-8 md:p-12 overflow-y-auto h-full">
                    <div className="mb-10 flex items-center gap-4">
                       <button onClick={() => setStep('items')} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-900">
                          <ChevronLeft size={20} />
                       </button>
                       <h2 className="text-2xl font-bold text-brand-900">Récapitulatif détaillé</h2>
                    </div>

                    <div className="space-y-8">
                        {rooms.length === 0 ? (
                          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                             <p className="text-slate-400">Votre évaluation est vide.</p>
                          </div>
                        ) : (
                           <div className="space-y-6">
                              {rooms.map(room => {
                                const roomVol = room.items.reduce((a, b) => a + (b.volume * b.quantity), 0);
                                if (roomVol === 0) return null;
                                return (
                                   <div key={room.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-brand-900/10">
                                         <h3 className="font-black text-brand-900 uppercase tracking-widest text-xs">{room.name}</h3>
                                         <span className="font-black text-accent text-sm">{roomVol.toFixed(2)} m³</span>
                                      </div>
                                      <div className="grid grid-cols-1 gap-3">
                                         {room.items.map(item => (
                                           <div key={item.id} className="flex justify-between items-center text-sm bg-white/50 p-3 rounded-xl border border-white">
                                              <span className="text-slate-600 font-medium">{item.name}</span>
                                              <div className="flex items-center gap-4">
                                                 <span className="text-brand-900 font-black">x{item.quantity}</span>
                                                 <span className="text-slate-400 text-xs w-16 text-right">{(item.volume * item.quantity).toFixed(2)} m³</span>
                                              </div>
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                );
                              })}
                              
                              <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200">
                                 <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Volume Total Calculé</span>
                                    <span className="text-2xl font-black text-brand-900">{(totalVolume / (safetyMargin ? 1.1 : 1)).toFixed(2)} m³</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Volume Conseillé (arrondi)</span>
                                    <span className="text-2xl font-black text-accent">{Math.ceil(totalVolume)} m³</span>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                 </div>
              )}
            </div>

            {/* Right Column: Calculations & Summary */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-32">
              <div className="bg-brand-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Volume total estimé</h3>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                       <span className="text-6xl font-black text-accent">{totalVolume.toFixed(2)}</span>
                       <span className="text-xl font-bold text-white">m³</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-10">
                       <Info size={14} />
                       <span>Conseillé : environ {Math.ceil(totalVolume)} m³</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Objets</div>
                          <div className="text-lg font-black text-white">{totalItems}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Cartons</div>
                          <div className="text-lg font-black text-white">{totalCartons}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Pièces</div>
                          <div className="text-lg font-black text-white">{rooms.length}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Plus grande</div>
                          <div className="text-[10px] font-black text-white truncate">{largestRoom ? largestRoom.name : '-'}</div>
                       </div>
                    </div>

                    <div className="space-y-4 mb-10 pt-8 border-t border-white/10">
                       <button 
                        onClick={() => setSafetyMargin(!safetyMargin)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          safetyMargin 
                          ? 'bg-accent/10 border-accent text-accent' 
                          : 'bg-white/5 border-white/10 text-white'
                        }`}
                       >
                          <span className="text-[10px] font-black uppercase tracking-widest">Marge sécurité 10%</span>
                          <div className={`w-8 h-4 rounded-full relative transition-colors ${safetyMargin ? 'bg-accent' : 'bg-slate-700'}`}>
                             <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${safetyMargin ? 'left-4.5' : 'left-0.5'}`} />
                          </div>
                       </button>
                    </div>

                    <button 
                      onClick={handleFinish}
                      disabled={totalVolume === 0}
                      className="w-full bg-accent text-white py-5 rounded-2xl font-black text-center shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      Continuer vers le devis
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setStep('summary')}
                      className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    >
                      Voir le récapitulatif détaillé
                    </button>

                    <p className="mt-8 text-[10px] text-slate-500 italic text-center leading-relaxed">
                      Volume estimé à titre indicatif.
                    </p>
                 </div>
              </div>

              {/* Recommendation Block */}
              {totalVolume > 0 && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-accent/10 text-accent rounded-lg">
                         <Box size={16} />
                      </div>
                      <h4 className="font-bold text-brand-900">Suggestion indicative</h4>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed mb-6 font-light">
                     {totalItems > 40 
                       ? "Votre volume semble important, nous suggérons la formule Luxe pour un accompagnement complet." 
                       : totalItems > 20 
                       ? "La formule Standard est souvent la plus équilibrée pour ce type de volume." 
                       : "Pour ce volume, la formule Économique peut être une option intéressante."
                     }
                   </p>
                   <Link to="/formules-demenagement" className="text-accent font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                      Comparer les formules
                      <ArrowRight size={10} />
                   </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-brand-900 mb-12 text-center">Questions fréquentes sur le volume</h2>
          <div className="space-y-6">
            {[
              { q: "Comment calculer le volume d’un déménagement ?", a: "Le volume se calcule en multipliant la longueur par la largeur par la hauteur de chaque meuble et carton. Notre outil automatise ce calcul pour vous." },
              { q: "Le volume estimé est-il définitif ?", a: "L’équipe Marne Transdem peut affiner cette estimation selon votre inventaire, vos accès et les caractéristiques de votre projet." },
              { q: "Pourquoi le volume peut-il varier ?", a: "Le 'vide' entre les meubles dans le camion, le type de cartons et le démontage ou non du mobilier influencent le volume total occupé." },
              { q: "Puis-je modifier mon estimation après avoir commencé ?", a: "Oui, vous pouvez ajouter ou retirer des objets et des pièces à tout moment avant de soumettre vos données." }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h4 className="font-black text-brand-900 text-lg mb-4">{faq.q}</h4>
                <p className="text-slate-500 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-8 tracking-tight">Prêt à déménager ?</h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Obtenez une estimation personnalisée en transmettant votre volume indicatif à notre équipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={handleFinish} className="bg-accent text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
              Demander mon devis personnalisé
            </button>
            <Link to="/contact" className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all">
              Contacter l'équipe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolumeCalculator;
