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
  X,
  Camera,
  Video,
  Sparkles,
  UploadCloud,
  Loader2,
  Check
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
  emoji?: string;
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

interface AIDetectedItem {
  name: string;
  itemId: string | null;
  volume: number;
  quantity: number;
  confidence: number;
  selected?: boolean;
}

interface AIAnalysisResult {
  detectedRoomName: string;
  summary: string;
  items: AIDetectedItem[];
}

const ROOM_TYPES = [
  { id: 'salon', name: 'Salon', icon: Coffee, emoji: '🛋️' },
  { id: 'salle-a-manger', name: 'Salle à manger', icon: Utensils, emoji: '🍽️' },
  { id: 'chambre', name: 'Chambre', icon: Bed, emoji: '🛏️' },
  { id: 'cuisine', name: 'Cuisine', icon: Box, emoji: '🍳' },
  { id: 'salle-de-bain', name: 'Salle de bain', icon: Bath, emoji: '🛁' },
  { id: 'bureau', name: 'Bureau', icon: Briefcase, emoji: '💻' },
  { id: 'entree', name: 'Entrée / couloir', icon: DoorOpen, emoji: '🚪' },
  { id: 'cave', name: 'Cave / garage', icon: Warehouse, emoji: '📦' },
  { id: 'entreprise', name: 'Local professionnel', icon: Building2, emoji: '🏢' },
];

const ITEM_CATALOG: Item[] = [
  // Salon
  { id: 'sofa2', name: 'Canapé 2 places', volume: 1.20, category: 'salon', emoji: '🛋️' },
  { id: 'sofa3', name: 'Canapé 3 places', volume: 1.80, category: 'salon', emoji: '🛋️' },
  { id: 'armchair', name: 'Fauteuil', volume: 0.40, category: 'salon', emoji: '🪑' },
  { id: 'coffee-table', name: 'Table basse', volume: 0.30, category: 'salon', emoji: '☕' },
  { id: 'tv-stand', name: 'Meuble TV', volume: 0.60, category: 'salon', emoji: '📺' },
  { id: 'tv', name: 'Télévision', volume: 0.15, category: 'salon', emoji: '📺' },
  { id: 'shelf-small', name: 'Bibliothèque petite', volume: 0.80, category: 'salon', emoji: '📚' },
  { id: 'shelf-large', name: 'Bibliothèque grande', volume: 1.50, category: 'salon', emoji: '📚' },
  { id: 'rug', name: 'Tapis', volume: 0.10, category: 'salon', emoji: '🧹' },
  
  // Salle à manger
  { id: 'table4', name: 'Table 4 personnes', volume: 0.80, category: 'salle-a-manger', emoji: '🍽️' },
  { id: 'table6', name: 'Table 6 personnes', volume: 1.20, category: 'salle-a-manger', emoji: '🍽️' },
  { id: 'chair', name: 'Chaise', volume: 0.15, category: 'salle-a-manger', emoji: '🪑' },
  { id: 'sideboard', name: 'Buffet', volume: 0.80, category: 'salle-a-manger', emoji: '🚪' },
  { id: 'china-cabinet', name: 'Vaisselier', volume: 1.20, category: 'salle-a-manger', emoji: '🍶' },
  
  // Chambre
  { id: 'bed-single', name: 'Lit simple', volume: 0.80, category: 'chambre', emoji: '🛏️' },
  { id: 'bed-double', name: 'Lit double', volume: 1.20, category: 'chambre', emoji: '🛏️' },
  { id: 'mattress-single', name: 'Matelas simple', volume: 0.40, category: 'chambre', emoji: '🛏️' },
  { id: 'mattress-double', name: 'Matelas double', volume: 0.70, category: 'chambre', emoji: '🛏️' },
  { id: 'nightstand', name: 'Table de chevet', volume: 0.15, category: 'chambre', emoji: '🗄️' },
  { id: 'dresser', name: 'Commode', volume: 0.80, category: 'chambre', emoji: '🚪' },
  { id: 'wardrobe2', name: 'Armoire 2 portes', volume: 1.50, category: 'chambre', emoji: '🚪' },
  { id: 'wardrobe3', name: 'Armoire 3 portes', volume: 2.20, category: 'chambre', emoji: '🚪' },
  
  // Cuisine / Électroménager
  { id: 'fridge', name: 'Réfrigérateur', volume: 1.00, category: 'cuisine', emoji: '❄️' },
  { id: 'freezer', name: 'Congélateur', volume: 0.80, category: 'cuisine', emoji: '❄️' },
  { id: 'washing-machine', name: 'Lave-linge', volume: 0.50, category: 'cuisine', emoji: '🧺' },
  { id: 'dishwasher', name: 'Lave-vaisselle', volume: 0.50, category: 'cuisine', emoji: '🧼' },
  { id: 'oven', name: 'Four', volume: 0.20, category: 'cuisine', emoji: '🍳' },
  { id: 'microwave', name: 'Micro-ondes', volume: 0.05, category: 'cuisine', emoji: '🍳' },
  
  // Bureau
  { id: 'desk', name: 'Bureau', volume: 0.80, category: 'bureau', emoji: '💻' },
  { id: 'desk-chair', name: 'Chaise de bureau', volume: 0.25, category: 'bureau', emoji: '🪑' },
  { id: 'filing-cabinet', name: 'Caisson', volume: 0.20, category: 'bureau', emoji: '🗄️' },
  { id: 'monitor', name: 'Écran', volume: 0.05, category: 'bureau', emoji: '🖥️' },
  { id: 'printer', name: 'Imprimante', volume: 0.10, category: 'bureau', emoji: '🖨️' },

  // Cave / Garage
  { id: 'bike', name: 'Vélo', volume: 0.60, category: 'cave', emoji: '🚲' },
  { id: 'metal-shelf', name: 'Étagère métallique', volume: 0.50, category: 'cave', emoji: '📦' },
  { id: 'suitcase', name: 'Valise', volume: 0.10, category: 'cave', emoji: '🧳' },
  
  // Cartons (Common to all categories)
  { id: 'box-std', name: 'Carton standard', volume: 0.05, category: 'carton', emoji: '📦' },
  { id: 'box-books', name: 'Carton livres', volume: 0.03, category: 'carton', emoji: '📦' },
  { id: 'box-wardrobe', name: 'Carton penderie', volume: 0.20, category: 'carton', emoji: '📦' },
  { id: 'box-fragile', name: 'Carton vaisselle', volume: 0.05, category: 'carton', emoji: '📦' },
];

const LOCAL_STORAGE_KEY = 'marne_transdem_volume_estimate';

const VOLUME_FAQS = [
  { q: 'Comment calculer le volume d’un déménagement ?', a: 'Ajoutez les meubles et les cartons pièce par pièce. Le calculateur additionne le volume indicatif de chaque objet multiplié par sa quantité. Pour un objet personnalisé, renseignez votre estimation en m³.' },
  { q: 'Comment convertir des dimensions en mètres cubes ?', a: 'Multipliez la longueur, la largeur et la hauteur exprimées en mètres. Un carton de 50 × 40 × 30 cm représente ainsi 0,50 × 0,40 × 0,30 = 0,06 m³. Les valeurs du catalogue restent des repères : vos objets peuvent avoir des dimensions différentes.' },
  { q: 'À quoi sert la marge de 10 % ?', a: 'Cette option augmente de 10 % le total calculé pour prévoir une réserve de volume. Elle ne remplace pas un inventaire complet. Le volume conseillé est ensuite arrondi au mètre cube supérieur ; ce n’est pas une capacité de camion garantie.' },
  { q: 'Le volume estimé est-il définitif ?', a: 'Non. Les dimensions réelles, les protections, le démontage et le rangement dans le camion peuvent modifier le volume occupé. L’équipe pourra affiner votre estimation avant de confirmer la prestation.' },
  { q: 'Puis-je transmettre mon estimation dans le devis ?', a: 'Oui. Après avoir renseigné votre inventaire, utilisez « Continuer vers le devis ». Le volume et le récapitulatif sont repris dans le formulaire sur ce navigateur. Vous pouvez les vérifier avant d’envoyer votre demande.' },
];

const EXAMPLE_ITEMS = ['sofa2', 'coffee-table', 'box-std'].map((id) => {
  const item = ITEM_CATALOG.find((entry) => entry.id === id)!;
  return { ...item, quantity: id === 'box-std' ? 10 : 1 };
});
const EXAMPLE_VOLUME = EXAMPLE_ITEMS.reduce((total, item) => total + item.volume * item.quantity, 0);
const formatVolume = (volume: number) => volume.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// --- Components ---

const VolumeCalculator: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [safetyMargin, setSafetyMargin] = useState(false);
  const [step, setStep] = useState<'rooms' | 'items' | 'summary' | 'ai-analyse'>('rooms');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomItem, setShowCustomItem] = useState(false);
  const [customItem, setCustomItem] = useState({ name: '', volume: 0, quantity: 1 });

  // AI-powered visual analysis states
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; type: string; dataUrl: string }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<AIAnalysisResult | null>(null);
  const [aiTargetRoomOption, setAiTargetRoomOption] = useState<'new' | string>('new');
  const [isDragging, setIsDragging] = useState(false);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality JPEG is highly clear but 15x lighter
          resolve(dataUrl);
        };
        img.onerror = () => {
          resolve(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = () => {
        resolve("");
      };
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (filesArray: File[]) => {
    for (const file of filesArray) {
      const fileId = Math.random().toString(36).substring(2, 9);
      try {
        let finalDataUrl = "";
        if (file.type.startsWith('image/')) {
          finalDataUrl = await resizeImage(file);
        } else {
          finalDataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string || "");
            reader.onerror = () => resolve("");
            reader.readAsDataURL(file);
          });
        }
        
        if (finalDataUrl) {
          setUploadedFiles(prev => [
            ...prev, 
            { 
              id: fileId,
              name: file.name, 
              type: file.type, 
              dataUrl: finalDataUrl 
            }
          ]);
        }
      } catch (err) {
        console.error("Erreur de lecture du fichier :", err);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await processFiles(Array.from(e.target.files));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeUploadedFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const triggerAiAnalysis = async () => {
    if (uploadedFiles.length === 0) return;
    setIsAnalyzing(true);
    setAiError(null);
    setAiResults(null);
    
    try {
      const response = await fetch("/api/gemini/analyze-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: uploadedFiles.map(f => ({
            data: f.dataUrl,
            mimeType: f.type
          }))
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.details || errData.error || "Une erreur est survenue lors de l'analyse.");
      }

      const data: AIAnalysisResult = await response.json();
      
      // Initialize selected attribute to true by default for import convenience
      if (data.items) {
        data.items = data.items.map(item => ({ ...item, selected: true }));
      }
      
      setAiResults(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Impossible d'analyser vos médias pour le moment. Veuillez réessayer avec une image claire.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const importAiItems = () => {
    if (!aiResults) return;
    const selectedItems = aiResults.items.filter(item => item.selected);
    if (selectedItems.length === 0) return;

    let targetRoomId = "";

    if (aiTargetRoomOption === 'new') {
      const newRoomId = Math.random().toString(36).substr(2, 9);
      const newRoom: Room = {
        id: newRoomId,
        name: aiResults.detectedRoomName || "Pièce Analysée par IA",
        type: 'salon',
        items: selectedItems.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          itemId: item.itemId || `custom-${Math.random().toString(36).substr(2, 5)}`,
          name: item.name,
          volume: item.volume,
          quantity: item.quantity
        }))
      };
      setRooms([...rooms, newRoom]);
      targetRoomId = newRoomId;
    } else {
      setRooms(rooms.map(room => {
        if (room.id !== aiTargetRoomOption) return room;
        const mergedItems = [...room.items];
        selectedItems.forEach(item => {
          const resolvedId = item.itemId || `custom-${Math.random().toString(36).substr(2, 5)}`;
          const existingIndex = mergedItems.findIndex(i => i.itemId === resolvedId);
          if (existingIndex > -1) {
            mergedItems[existingIndex].quantity += item.quantity;
          } else {
            mergedItems.push({
              id: Math.random().toString(36).substr(2, 9),
              itemId: resolvedId,
              name: item.name,
              volume: item.volume,
              quantity: item.quantity
            });
          }
        });
        return { ...room, items: mergedItems };
      }));
      targetRoomId = aiTargetRoomOption;
    }

    // Reset AI state and focus new/modded room
    setUploadedFiles([]);
    setAiResults(null);
    setActiveRoomId(targetRoomId);
    setStep('items');
  };

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

    const existingCount = rooms.filter(r => r.type === typeId).length;
    const name = existingCount > 0 ? `${type.name} ${existingCount + 1}` : type.name;

    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type: typeId,
      items: []
    };
    setRooms([...rooms, newRoom]);
    if (!activeRoomId) {
      setActiveRoomId(newRoom.id);
    }
  };

  const removeLastRoomOfType = (typeId: string) => {
    const roomsOfType = rooms.filter(r => r.type === typeId);
    if (roomsOfType.length === 0) return;
    const lastRoom = roomsOfType[roomsOfType.length - 1];
    setRooms(rooms.filter(r => r.id !== lastRoom.id));
    if (activeRoomId === lastRoom.id) {
      const remaining = rooms.filter(r => r.id !== lastRoom.id);
      setActiveRoomId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
    if (activeRoomId === id) {
      const remaining = rooms.filter(r => r.id !== id);
      setActiveRoomId(remaining.length > 0 ? remaining[0].id : null);
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
    if (totalVolume <= 0) return;
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
          getFAQSchema(VOLUME_FAQS)
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
            Calculez un volume indicatif en m³ en ajoutant vos meubles et cartons pièce par pièce. Vérifiez les quantités, puis transmettez votre inventaire dans la demande de devis.
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

      {/* Stepper Header */}
      <div className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full">
              <div 
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ 
                  width: step === 'rooms' ? '0%' : step === 'items' ? '50%' : '100%' 
                }}
              />
            </div>

            {[
              { s: 'rooms', label: '1. Mon Logement', desc: 'Choix des pièces', icon: '🏠' },
              { s: 'items', label: '2. Mes Objets', desc: 'Inventaire par pièce', icon: '🛋️' },
              { s: 'summary', label: '3. Synthèse', desc: 'Volume & Formules', icon: '📋' }
            ].map((stepItem, idx) => {
              const isActive = step === stepItem.s;
              const isCompleted = 
                (stepItem.s === 'rooms' && (step === 'items' || step === 'summary' || step === 'ai-analyse')) ||
                (stepItem.s === 'items' && step === 'summary');
              
              return (
                <button
                  key={stepItem.s}
                  disabled={stepItem.s === 'items' && rooms.length === 0}
                  onClick={() => {
                    setStep(stepItem.s as any);
                    if (stepItem.s === 'items' && !activeRoomId && rooms.length > 0) {
                      setActiveRoomId(rooms[0].id);
                    }
                  }}
                  className="flex flex-col items-center focus:outline-none group cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    isActive 
                      ? 'bg-accent text-brand-900 ring-4 ring-accent/20 scale-110 shadow-lg' 
                      : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
                  }`}>
                    {isCompleted ? '✓' : stepItem.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase mt-3 tracking-wider ${isActive ? 'text-brand-900 dark:text-white' : 'text-slate-400'}`}>
                    {stepItem.label}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5 hidden sm:inline font-light">
                    {stepItem.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Calculator UI */}
      <section id="calculator-main" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
            
            {/* Left Column: Rooms & Navigation */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-32">
              {/* Rooms list with quick details */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-premium">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-900/40">Logement actuel</h3>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-full">{rooms.length} pièce(s)</span>
                </div>
                
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {rooms.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic text-center py-4">Configurez vos pièces à l'étape 1.</p>
                  ) : (
                    rooms.map((room) => {
                      const roomVol = room.items.reduce((a, b) => a + (b.volume * b.quantity), 0);
                      const roomEmoji = ROOM_TYPES.find(t => t.id === room.type)?.emoji || '🏠';
                      return (
                        <div 
                          key={room.id} 
                          onClick={() => {
                            if (step !== 'summary') {
                              setActiveRoomId(room.id);
                              setStep('items');
                            }
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            activeRoomId === room.id && step === 'items'
                              ? 'bg-accent/5 border-accent/40'
                              : 'bg-slate-50/60 border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{roomEmoji}</span>
                            <span className="font-bold text-[11px] text-brand-900 truncate leading-tight">{room.name}</span>
                          </div>
                          <span className="text-[10px] font-black text-brand-900 shrink-0">{roomVol.toFixed(1)} m³</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* AI Visual Calculator Integration */}
              <div className="bg-brand-900 text-white p-6 rounded-[2rem] relative overflow-hidden shadow-xl border border-white/5">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-2xl rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-accent animate-pulse" size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">Estimation Assistée</span>
                  </div>
                  <h4 className="text-xs font-black mb-2 leading-tight text-white">Capture d'objets par IA</h4>
                  <p className="text-slate-350 text-[10px] font-light leading-relaxed mb-4">
                    Importez des photos de vos meubles ou pièces entières pour que notre IA calcule automatiquement leur volume.
                  </p>
                  <button
                    onClick={() => {
                      setStep('ai-analyse');
                      setActiveRoomId(null);
                    }}
                    className={`w-full font-black py-3 px-4 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      step === 'ai-analyse'
                        ? 'bg-accent text-white shadow-accent/20'
                        : 'bg-white text-brand-900 hover:bg-slate-100'
                    }`}
                  >
                    <Camera size={12} />
                    Scanner Photo / Vidéo
                  </button>
                </div>
              </div>

              {rooms.length > 0 && (
                <button 
                  onClick={resetCalculator}
                  className="w-full flex items-center justify-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-red-500 transition-colors py-2 cursor-pointer"
                >
                  <RefreshCw size={10} />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Middle Column: Active Step Panel */}
            <div className="lg:col-span-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-premium min-h-[550px] flex flex-col overflow-hidden relative">
              
              {step === 'ai-analyse' && (
                <div className="p-6 md:p-8 flex flex-col h-full bg-slate-50/50">
                  {/* AI Scanner Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <button 
                      onClick={() => {
                        if (rooms.length > 0) {
                          setStep('items');
                          setActiveRoomId(rooms[0].id);
                        } else {
                          setStep('rooms');
                        }
                      }} 
                      className="p-2.5 bg-white rounded-xl text-slate-400 hover:text-brand-900 shadow-sm border border-slate-100 transition-all cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div>
                      <h2 className="text-lg font-black text-brand-900 tracking-tight flex items-center gap-2">
                        <Sparkles className="text-accent" size={18} />
                        Estimation d'objets par IA
                      </h2>
                      <p className="text-[10px] text-slate-500 font-light mt-0.5">
                        Glissez des photos de vos meubles ou pièces pour les inventorier automatiquement.
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  {!aiResults ? (
                    <div className="space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        {/* Drag and drop upload area */}
                        <div 
                          className="relative overflow-hidden rounded-2xl transition-all"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <input 
                            type="file" 
                            id="ai-media-upload" 
                            multiple 
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                          />
                          <motion.div 
                            animate={{ 
                              borderColor: isDragging ? '#F5A400' : '#E2E8F0',
                              scale: isDragging ? 1.01 : 1,
                              backgroundColor: isDragging ? 'rgba(245, 164, 0, 0.03)' : '#FFFFFF'
                            }}
                            className="border-2 border-dashed p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-3 relative shadow-sm"
                          >
                            <UploadCloud className="text-slate-300 group-hover:text-accent transition-colors" size={32} />
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-brand-900">
                                {isDragging ? "Déposez ici !" : "Glissez vos photos / vidéos ici"}
                              </p>
                              <p className="text-[10px] text-slate-400 font-light">ou cliquez pour parcourir vos fichiers</p>
                            </div>
                          </motion.div>
                        </div>

                        {uploadedFiles.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-brand-900/40">{uploadedFiles.length} fichier(s) prêt(s)</span>
                              <button onClick={() => setUploadedFiles([])} className="text-[9px] text-red-500 hover:underline uppercase font-bold">Tout effacer</button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {uploadedFiles.map(file => (
                                <motion.div layout key={file.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group shadow-sm">
                                  {file.type.startsWith('video') ? (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                      <Video className="text-white" size={16} />
                                    </div>
                                  ) : (
                                    <img src={file.dataUrl} alt={file.name} className="w-full h-full object-cover" />
                                  )}
                                  <button 
                                    onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                                    className="absolute top-1 right-1 p-1 bg-brand-900/80 hover:bg-brand-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={10} />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {aiError && (
                          <div className="bg-red-50 text-red-600 text-[10px] p-3.5 rounded-xl border border-red-100 flex items-center gap-2">
                            <Info size={12} className="shrink-0" />
                            <p className="font-medium">{aiError}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={triggerAiAnalysis}
                          disabled={uploadedFiles.length === 0 || isAnalyzing}
                          className="w-full bg-accent text-brand-900 hover:bg-accent/90 disabled:opacity-40 font-black uppercase py-4 rounded-xl tracking-widest text-[10px] shadow-lg shadow-accent/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="animate-spin" size={14} />
                              Analyse IA en cours...
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} />
                              Lancer l'analyse IA
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 flex flex-col h-full justify-between">
                      <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
                        {/* Summary metrics */}
                        <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-155">
                          <h4 className="font-black text-brand-900 text-xs mb-1">Résultats de l'Analyse</h4>
                          <p className="text-[10px] text-slate-500 font-light leading-relaxed">{aiResults.summary}</p>
                        </div>

                        {/* Room assignment selector */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Importer dans la pièce</label>
                          <div className="grid grid-cols-1 gap-2">
                            <select 
                              value={aiTargetRoomOption} 
                              onChange={(e) => setAiTargetRoomOption(e.target.value)}
                              className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 outline-none text-xs font-bold text-brand-900"
                            >
                              <option value="new">Créer une nouvelle pièce : "{aiResults.detectedRoomName || 'Pièce IA'}"</option>
                              {rooms.map(r => (
                                <option key={r.id} value={r.id}>Ajouter à : {r.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* List of items detected */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-brand-900/40">Meubles détectés ({aiResults.items.length})</span>
                          <div className="space-y-2">
                            {aiResults.items.map((item, index) => (
                              <div 
                                key={index} 
                                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                                  item.selected ? 'bg-white border-accent/40 shadow-sm' : 'bg-slate-50/50 border-slate-100 opacity-60'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => {
                                      const updated = [...aiResults.items];
                                      updated[index].selected = !updated[index].selected;
                                      setAiResults({ ...aiResults, items: updated });
                                    }}
                                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                      item.selected ? 'bg-accent border-accent text-brand-900' : 'bg-white border-slate-200'
                                    }`}
                                  >
                                    {item.selected && <CheckCircle2 size={12} />}
                                  </button>
                                  <div>
                                    <div className="font-bold text-brand-900 text-xs">{item.name}</div>
                                    <div className="text-[9px] text-slate-400 font-light">
                                      Volume unitaire : {item.volume.toFixed(2)} m³
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {item.selected && (
                                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                                      <button 
                                        onClick={() => {
                                          const updated = [...aiResults.items];
                                          updated[index].quantity = Math.max(1, updated[index].quantity - 1);
                                          setAiResults({ ...aiResults, items: updated });
                                        }}
                                        className="w-5 h-5 rounded bg-white hover:bg-slate-100 shadow-sm flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                                      >
                                        <Minus size={10} />
                                      </button>
                                      <span className="font-black text-brand-900 text-[10px] w-5 text-center">x{item.quantity}</span>
                                      <button 
                                        onClick={() => {
                                          const updated = [...aiResults.items];
                                          updated[index].quantity += 1;
                                          setAiResults({ ...aiResults, items: updated });
                                        }}
                                        className="w-5 h-5 rounded bg-accent text-brand-900 shadow-sm flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                                      >
                                        <Plus size={10} />
                                      </button>
                                    </div>
                                  )}
                                  <div className="text-right w-14 text-xs font-black text-brand-900">
                                    {(item.volume * item.quantity).toFixed(2)} m³
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Sticky action bottom bar */}
                      <div className="pt-3 border-t border-slate-150 bg-white flex gap-3">
                        <button
                          onClick={() => {
                            setAiResults(null);
                            setUploadedFiles([]);
                          }}
                          className="w-1/3 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold uppercase py-3 rounded-xl tracking-widest text-[9px] transition-all cursor-pointer text-center"
                        >
                          Retour
                        </button>
                        <button
                          onClick={importAiItems}
                          disabled={aiResults.items.filter(i => i.selected).length === 0}
                          className="flex-1 bg-accent text-brand-900 hover:bg-accent/90 disabled:opacity-40 font-black uppercase py-3 rounded-xl tracking-widest text-[10px] shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <CheckCircle2 size={13} />
                          Importer ({aiResults.items.filter(i => i.selected).reduce((acc, i) => acc + (i.volume * i.quantity), 0).toFixed(1)} m³)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'rooms' && (
                <div className="p-6 md:p-8">
                  <div className="mb-6 text-center">
                    <h2 className="text-xl font-black text-brand-900 mb-1">Étape 1 : Votre Logement</h2>
                    <p className="text-xs text-slate-500 font-light">Sélectionnez et ajoutez le nombre de pièces de votre maison/appartement.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {ROOM_TYPES.map((type) => {
                      const count = rooms.filter(r => r.type === type.id).length;
                      return (
                        <div
                          key={type.id}
                          className={`p-4 bg-slate-50 rounded-2xl border transition-all flex flex-col items-center gap-3 relative group ${
                            count > 0 ? 'border-accent/40 bg-accent/5' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-3xl select-none">{type.emoji}</span>
                          <span className="font-extrabold text-[10px] text-brand-900 uppercase tracking-tight text-center truncate w-full">{type.name}</span>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => removeLastRoomOfType(type.id)}
                              aria-label={`Retirer une pièce ${type.name}`}
                              disabled={count === 0}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold border ${
                                count > 0 
                                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer shadow-sm' 
                                  : 'opacity-10 text-slate-300 border-slate-100 cursor-default'
                              }`}
                            >
                              <Minus size={10} />
                            </button>
                            <span className={`text-xs font-black w-4 text-center ${count > 0 ? 'text-brand-900' : 'text-slate-300'}`}>
                              {count}
                            </span>
                            <button
                              onClick={() => addRoom(type.id)}
                              aria-label={`Ajouter une pièce ${type.name}`}
                              className="w-6 h-6 rounded-lg bg-accent text-brand-900 flex items-center justify-center hover:bg-accent/90 shadow-sm text-xs font-bold cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        if (rooms.length > 0) {
                          setStep('items');
                          if (!activeRoomId) setActiveRoomId(rooms[0].id);
                        } else {
                          alert('Veuillez ajouter au moins une pièce pour commencer à lister vos objets.');
                        }
                      }}
                      disabled={rooms.length === 0}
                      className="bg-brand-900 text-white hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed font-black py-4 px-8 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      Étape Suivante : Ajouter mes meubles
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 'items' && activeRoom && (
                <div className="flex flex-col h-full">
                  {/* Room Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3 flex-1">
                      <button 
                        onClick={() => setStep('rooms')} 
                        className="p-1.5 text-slate-400 hover:text-brand-900 hover:bg-white rounded-lg transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <input 
                        type="text" 
                        value={activeRoom.name}
                        onChange={(e) => renameRoom(activeRoom.id, e.target.value)}
                        className="bg-transparent font-black text-sm text-brand-900 outline-none border-b-2 border-transparent focus:border-accent w-full"
                      />
                    </div>
                    <button 
                      onClick={() => removeRoom(activeRoom.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                      title="Supprimer la pièce"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="p-4 border-b border-slate-100 bg-white sticky top-[60px] z-20">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Rechercher un meuble, un carton..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-6 py-2.5 rounded-xl bg-slate-55 border border-slate-200 focus:border-accent outline-none text-xs font-medium"
                      />
                      <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-350" size={16} />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 hover:text-brand-900">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Catalog Container */}
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-accent/40 transition-all shadow-sm">
                              <div className="flex-1">
                                <div className="font-extrabold text-brand-900 text-xs leading-tight flex items-center gap-1.5">
                                  <span>{item.emoji || '📦'}</span>
                                  <span>{item.name}</span>
                                </div>
                                <div className="text-[9px] text-slate-400 font-light mt-0.5">
                                  Volume : {item.volume.toFixed(2)} m³
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                                  <button 
                                    onClick={() => updateQuantity(activeRoom.id, roomItem!.id, -1)}
                                    aria-label={`Retirer ${item.name}`}
                                    disabled={quantity === 0}
                                    className={`w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center transition-all ${quantity > 0 ? 'hover:bg-slate-100' : 'opacity-20 cursor-default'}`}
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className={`font-black text-[10px] w-6 text-center ${quantity > 0 ? 'text-brand-900' : 'text-slate-350'}`}>{quantity}</span>
                                  <button 
                                    onClick={() => addItemToRoom(activeRoom.id, item)}
                                    aria-label={`Ajouter ${item.name}`}
                                    className="w-6 h-6 rounded bg-accent text-brand-900 flex items-center justify-center hover:bg-accent/90 shadow-sm"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                                {quantity > 0 && (
                                  <button 
                                    onClick={() => updateQuantity(activeRoom.id, roomItem!.id, -quantity)}
                                    className="w-6 h-6 rounded text-slate-300 hover:text-red-500 flex items-center justify-center"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      }

                      {/* Custom Item Button */}
                      {!searchQuery && (
                        <div className="col-span-full pt-6 border-t border-slate-100/60 mt-4">
                          {showCustomItem ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-slate-50 p-5 rounded-2xl border-2 border-accent/20 border-dashed"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h5 className="font-black text-brand-900 text-[10px] uppercase tracking-widest">Ajouter un objet personnalisé</h5>
                                <button onClick={() => setShowCustomItem(false)} className="text-slate-450 hover:text-brand-900"><X size={14}/></button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-black uppercase text-slate-400">Nom</label>
                                  <input 
                                    type="text" 
                                    placeholder="Ex: Armoire ancienne" 
                                    value={customItem.name}
                                    onChange={(e) => setCustomItem({...customItem, name: e.target.value})}
                                    className="w-full bg-white p-2.5 rounded-lg border border-slate-200 outline-none focus:border-accent text-xs font-semibold"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-black uppercase text-slate-400">Volume (m³)</label>
                                  <input 
                                    type="number" 
                                    step="0.1" 
                                    value={customItem.volume || ''}
                                    onChange={(e) => setCustomItem({...customItem, volume: parseFloat(e.target.value) || 0})}
                                    className="w-full bg-white p-2.5 rounded-lg border border-slate-200 outline-none focus:border-accent text-xs font-semibold"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-black uppercase text-slate-400">Quantité</label>
                                  <input 
                                    type="number" 
                                    value={customItem.quantity}
                                    onChange={(e) => setCustomItem({...customItem, quantity: parseInt(e.target.value) || 1})}
                                    className="w-full bg-white p-2.5 rounded-lg border border-slate-200 outline-none focus:border-accent text-xs font-semibold"
                                  />
                                </div>
                              </div>
                              <button 
                                onClick={() => addCustomItem(activeRoom.id)}
                                disabled={!customItem.name || customItem.volume <= 0}
                                className="w-full bg-brand-900 hover:bg-brand-800 text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all disabled:opacity-50 cursor-pointer"
                              >
                                Ajouter cet objet
                              </button>
                            </motion.div>
                          ) : (
                            <button 
                              onClick={() => setShowCustomItem(true)}
                              className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                            >
                              <Plus size={16} />
                              Ajouter un objet personnalisé
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 'summary' && (
                <div className="p-6 md:p-8 overflow-y-auto h-full flex flex-col justify-between flex-1">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <button onClick={() => setStep('items')} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-900 border border-slate-100">
                        <ChevronLeft size={16} />
                      </button>
                      <h2 className="text-lg font-black text-brand-900">Synthèse détaillée</h2>
                    </div>

                    <div className="space-y-6">
                      {rooms.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          <p className="text-xs text-slate-400 font-light">Votre estimation est vide. Veuillez configurer vos pièces.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {rooms.map(room => {
                            const roomVol = room.items.reduce((a, b) => a + (b.volume * b.quantity), 0);
                            if (roomVol === 0) return null;
                            return (
                              <div key={room.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-3 pb-3 border-b border-brand-900/5">
                                  <h3 className="font-extrabold text-brand-900 uppercase tracking-widest text-[10px]">{room.name}</h3>
                                  <span className="font-black text-accent text-xs">{roomVol.toFixed(2)} m³</span>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                  {room.items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-xs bg-white/60 p-2.5 rounded-xl border border-slate-100/50">
                                      <span className="text-slate-650 font-medium">{item.name}</span>
                                      <div className="flex items-center gap-3">
                                        <span className="text-brand-900 font-black">x{item.quantity}</span>
                                        <span className="text-slate-400 text-[10px] w-12 text-right">{(item.volume * item.quantity).toFixed(2)} m³</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          
                          <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Volume Total Net</span>
                              <span className="text-lg font-black text-brand-900">{(totalVolume / (safetyMargin ? 1.1 : 1)).toFixed(2)} m³</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-accent font-bold uppercase tracking-widest text-[9px]">Volume Conseillé (arrondi)</span>
                              <span className="text-lg font-black text-accent">{Math.ceil(totalVolume)} m³</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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

                  {step === 'rooms' ? (
                    <button 
                      onClick={() => {
                        if (rooms.length > 0) {
                          setStep('items');
                          if (!activeRoomId) setActiveRoomId(rooms[0].id);
                        } else {
                          alert('Veuillez ajouter au moins une pièce.');
                        }
                      }}
                      className="w-full bg-accent text-brand-900 py-5 rounded-2xl font-black text-center shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 cursor-pointer group animate-pulse"
                    >
                      Choisir les objets
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : step === 'items' ? (
                    <button 
                      onClick={() => setStep('summary')}
                      className="w-full bg-accent text-brand-900 py-5 rounded-2xl font-black text-center shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      Voir la synthèse
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleFinish}
                      disabled={totalVolume === 0}
                      className="w-full bg-accent text-brand-900 py-5 rounded-2xl font-black text-center shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                    >
                      Continuer vers le devis
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                  
                  {step !== 'summary' && (
                    <button 
                      onClick={() => setStep('summary')}
                      className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Voir la synthèse
                    </button>
                  )}

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
                    Le volume seul ne détermine pas la formule. Choisissez selon le temps dont vous disposez et les tâches à confier à l’équipe : emballage, protection, démontage et remontage selon le devis.
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
      <section className="py-16 bg-slate-50" aria-labelledby="comprendre-volume">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="comprendre-volume" className="text-3xl font-black text-brand-900 mb-6">Comprendre votre estimation en m³</h2>
          <p className="text-slate-600 leading-relaxed mb-6">L’outil utilise un volume indicatif pour chaque référence du catalogue. Il multiplie ce volume par la quantité sélectionnée, puis additionne toutes les pièces. Pour un meuble atypique, utilisez l’ajout d’un objet personnalisé avec votre propre estimation.</p>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-brand-900 mb-4">Exemple : un canapé, une table basse et dix cartons</h3>
            <ul className="space-y-3 text-slate-600">
              {EXAMPLE_ITEMS.map(item => <li key={item.id}>{item.name} : {item.quantity} × {formatVolume(item.volume)} = <strong>{formatVolume(item.quantity * item.volume)} m³</strong>.</li>)}
            </ul>
            <p className="mt-5 text-slate-600">Total de cet inventaire : <strong>{formatVolume(EXAMPLE_VOLUME)} m³</strong>. Avec la marge de 10 % : <strong>{formatVolume(EXAMPLE_VOLUME * 1.1)} m³</strong>, puis <strong>{Math.ceil(EXAMPLE_VOLUME * 1.1)} m³</strong> après arrondi supérieur. Vous pouvez reproduire cet exemple dans une pièce « Salon » ; il ne représente pas le contenu complet d’un logement.</p>
          </div>
          <h3 className="text-xl font-bold text-brand-900 mb-4">Avant de transmettre votre inventaire</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-600">
            <li>Ajoutez les affaires de la cave, du garage, du balcon et des placards.</li>
            <li>Comptez les cartons contenant les affaires rangées dans les meubles ; évitez de compter deux fois le même objet.</li>
            <li>Vérifiez les dimensions des meubles atypiques et signalez les objets lourds ou fragiles dans votre demande.</li>
            <li>Si vous utilisez l’analyse de photos, contrôlez les objets détectés et ajoutez ceux qui ne sont pas visibles.</li>
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">La surface en m² ne suffit pas à déterminer le volume à transporter. Notre <Link to="/blog/comment-estimer-volume-demenagement" className="underline font-medium text-brand-900">guide pour estimer le volume d’un déménagement</Link> explique les limites des approximations et la préparation de l’inventaire.</p>
          <p className="mt-4 text-slate-600 leading-relaxed">Un résultat en m³ n’est pas un prix. La distance, les accès et les <Link to="/formules-demenagement" className="underline font-medium text-brand-900">prestations choisies</Link> interviennent aussi. Consultez le <Link to="/blog/combien-coute-demenagement-paris" className="underline font-medium text-brand-900">guide des critères de prix</Link> avant de comparer les devis.</p>
        </div>
      </section>

      <section className="py-24 bg-white stay-white-bg">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-brand-900 stay-dark mb-12 text-center">Questions fréquentes sur le volume</h2>
          <div className="space-y-6">
            {VOLUME_FAQS.map((faq, i) => (
              <div key={i} className="p-8 bg-slate-50 stay-light-section rounded-[2.5rem] border border-slate-100">
                <h4 className="font-black text-brand-900 stay-dark text-lg mb-4">{faq.q}</h4>
                <p className="text-slate-500 stay-dark font-light leading-relaxed opacity-80">{faq.a}</p>
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
            <button onClick={handleFinish} disabled={totalVolume <= 0} className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed">
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
