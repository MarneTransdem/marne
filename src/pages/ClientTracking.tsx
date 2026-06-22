import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, Firestore } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Demenagement } from '../types';
import { 
  Truck, MapPin, Calendar, User, CheckCircle2, 
  ShieldCheck, AlertCircle, FileText, Download, RotateCcw,
  Loader2
} from 'lucide-react';
import { getMoveCoords } from '../components/admin/InteractiveRoutingMap';

interface ClientLiveMapProps {
  move: Demenagement;
}

function ClientLiveMap({ move }: ClientLiveMapProps) {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const truckMarkerRef = useRef<any>(null);

  // Load Leaflet dynamically
  useEffect(() => {
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const { from, to } = getMoveCoords(move);

    // Create map instance
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    });
    mapInstanceRef.current = map;

    // Load Dark Matter tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    // Fit map bounds to contain start and end coordinates
    map.fitBounds([[from.lat, from.lng], [to.lat, to.lng]], { padding: [50, 50] });

    // 1. Departure Marker
    const departureIcon = L.divIcon({
      className: 'custom-leaflet-icon',
      html: `
        <div style="
          background-color: #10b981; 
          width: 24px; 
          height: 24px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-weight: 800; 
          font-size: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
          border: 2px solid white;
        ">
          D
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    L.marker([from.lat, from.lng], { icon: departureIcon })
      .bindPopup(`<strong class="text-slate-900">Départ :</strong> ${move.fromCity}`)
      .addTo(map);

    // 2. Arrival Marker
    const arrivalIcon = L.divIcon({
      className: 'custom-leaflet-icon',
      html: `
        <div style="
          background-color: #ef4444; 
          width: 24px; 
          height: 24px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-weight: 800; 
          font-size: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
          border: 2px solid white;
        ">
          A
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    L.marker([to.lat, to.lng], { icon: arrivalIcon })
      .bindPopup(`<strong class="text-slate-900">Arrivée :</strong> ${move.toCity}`)
      .addTo(map);

    // 3. Dashed Path between start and end
    L.polyline([[from.lat, from.lng], [to.lat, to.lng]], {
      color: '#f59e0b',
      weight: 3,
      opacity: 0.6,
      dashArray: '8, 8'
    }).addTo(map);

    // 4. Truck Marker
    const currentLoc = move.currentLocation || from;
    const pulsingTruckIcon = L.divIcon({
      className: 'custom-leaflet-icon pulsing-truck',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: rgba(245, 158, 11, 0.4);
            animation: ping-truck 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: relative;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: #f59e0b;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
            font-size: 14px;
          ">
            🚚
          </div>
        </div>
        <style>
          @keyframes ping-truck {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        </style>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const truckMarker = L.marker([currentLoc.lat, currentLoc.lng], { icon: pulsingTruckIcon })
      .bindPopup(`<strong class="text-slate-900">Position du camion</strong><br/>Mis à jour en direct`)
      .addTo(map);
    truckMarkerRef.current = truckMarker;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      truckMarkerRef.current = null;
    };
  }, [leafletLoaded]);

  // Update Truck marker position dynamically when currentLocation changes
  useEffect(() => {
    const L = (window as any).L;
    if (!leafletLoaded || !mapInstanceRef.current || !truckMarkerRef.current || !L) return;

    if (move.currentLocation) {
      const { lat, lng } = move.currentLocation;
      truckMarkerRef.current.setLatLng([lat, lng]);
      
      if (!mapInstanceRef.current.getBounds().contains([lat, lng])) {
        mapInstanceRef.current.panTo([lat, lng]);
      }
    }
  }, [move.currentLocation, leafletLoaded]);

  return (
    <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Truck size={14} className="text-accent animate-pulse" />
          Géolocalisation du camion en temps réel
        </h3>
        {move.currentLocation && (
          <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Signal Actif
          </span>
        )}
      </div>

      <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-800/80 shadow-sm bg-slate-950 flex items-center justify-center">
        {!leafletLoaded && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connexion satellite...</p>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full absolute inset-0 z-10" style={{ opacity: leafletLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
      </div>
    </div>
  );
}

export default function ClientTracking() {
  const { moveId } = useParams<{ moveId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [move, setMove] = useState<Demenagement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 1. S'abonner aux données de Firestore en temps réel
  useEffect(() => {
    if (!moveId) {
      setError('Identifiant de suivi manquant.');
      setLoading(false);
      return;
    }

    const docRef = doc(db as Firestore, 'demenagements', moveId);
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setError('Chantier introuvable ou lien expiré.');
          setLoading(false);
          return;
        }

        const data = snapshot.data() as Demenagement;
        
        // Vérifier la validité du token
        if (!token || data.trackingToken !== token) {
          setError('Token de suivi invalide ou accès refusé.');
          setLoading(false);
          return;
        }

        setMove({ id: snapshot.id, ...data });
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching move data:', err);
        setError('Impossible de charger les informations de suivi.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [moveId, token]);

  // 2. Initialiser le Canvas de signature avec gestion DPR (Retina)
  useEffect(() => {
    if (loading || error || !move || move.status === 'Terminé') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
      setIsCanvasEmpty(true);
    };

    // Laisser un court délai pour que le DOM se stabilise
    const timer = setTimeout(resizeCanvas, 300);

    window.addEventListener('resize', resizeCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loading, error, move?.status]);

  // 3. Dessiner sur le Canvas
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling on mobile touch
    if (e.cancelable) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a'; // dark slate

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setIsCanvasEmpty(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setIsCanvasEmpty(true);
  };

  // 4. Enregistrer la signature et fermer le chantier
  const handleSaveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !moveId || isCanvasEmpty || !move) return;

    setSigning(true);
    try {
      const signatureBase64 = canvas.toDataURL('image/png');
      const docRef = doc(db as Firestore, 'demenagements', moveId);
      
      const signedAtIso = new Date().toISOString();
      await updateDoc(docRef, {
        clientSignature: signatureBase64,
        signedAt: signedAtIso,
        status: 'Terminé'
      });

      // Trigger the automated signed PDF email sending in the background
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'signed-lettre-voiture',
          data: {
            id: moveId,
            moveData: {
              ...move,
              clientSignature: signatureBase64,
              signedAt: signedAtIso,
              status: 'Terminé'
            }
          }
        })
      }).catch(mailErr => {
        console.error("Background automated signed PDF email sending failed:", mailErr);
      });

    } catch (err) {
      console.error('Error saving signature:', err);
      alert('Une erreur est survenue lors de la validation de la signature.');
    } finally {
      setSigning(false);
    }
  };

  // 5. Télécharger le PDF de la Lettre de voiture finale
  const handleDownloadPdf = async () => {
    if (!move) return;
    setPdfGenerating(true);
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lettre_voiture',
          data: move
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur serveur.");
      }

      // Déclencher le téléchargement du fichier
      const link = document.createElement('a');
      link.href = result.url;
      link.target = '_blank';
      link.download = `Lettre_de_Voiture_${move.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error('Failed to download PDF:', err);
      alert('Impossible de générer le document PDF final en local. ' + (err.message || ''));
    } finally {
      setPdfGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm animate-pulse">Chargement de votre suivi en temps réel...</p>
        </div>
      </div>
    );
  }

  if (error || !move) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-red-950/40 border border-red-900/60 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertCircle size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-black text-white">Accès refusé</h1>
            <p className="text-slate-400 text-sm leading-relaxed">{error || 'Erreur inconnue.'}</p>
          </div>
          <div className="pt-2">
            <p className="text-slate-500 text-xs">
              Veuillez contacter le support Marne Transdem au 01 43 76 10 10 ou par email pour obtenir un lien valide.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculer l'index de progression pour le Stepper
  const statusSteps = ['À planifier', 'Programmé', 'En cours', 'Terminé'];
  const currentStepIndex = statusSteps.indexOf(move.status);

  // Traduction des statuts pour l'affichage utilisateur
  const statusTranslations: Record<string, string> = {
    'À planifier': 'Dossier validé',
    'Programmé': 'Préparation du départ',
    'En cours': 'Déménagement en cours',
    'Terminé': 'Livraison terminée'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-12">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[radial-gradient(circle_at_center,#fbbf24_0%,#d97706_100%)] rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="text-slate-950" size={20} />
            </div>
            <div>
              <span className="text-xs font-black tracking-widest text-slate-500 uppercase">MARNE TRANSDEM</span>
              <h1 className="text-sm font-bold text-white tracking-tight leading-none">Suivi Déménagement</h1>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-800 border border-slate-700/80 px-3 py-1 rounded-full text-slate-300">
            Chantier : {move.id}
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto px-4 mt-8 space-y-6">
        
        {/* Real-time Status Card */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-accent">État en temps réel</span>
              <h2 className="text-2xl font-black tracking-tight text-white mt-1">
                {statusTranslations[move.status] || move.status}
              </h2>
            </div>
            {move.status === 'Terminé' ? (
              <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
            ) : (
              <div className="w-12 h-12 bg-amber-950/40 border border-amber-900/60 text-amber-400 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                <Truck size={24} />
              </div>
            )}
          </div>

          {/* Premium Stepper */}
          <div className="relative pt-2">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800 pointer-events-none">
              <div 
                className="h-full bg-gradient-to-r from-accent to-emerald-500 transition-all duration-700 ease-out"
                style={{ width: `${(Math.max(0, currentStepIndex) / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
            
            <div className="relative flex justify-between">
              {statusSteps.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isActive = idx === currentStepIndex;
                const isTerminated = move.status === 'Terminé';

                let dotColor = 'bg-slate-800 border-slate-700 text-slate-500';
                if (isActive) {
                  dotColor = isTerminated 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 ring-4 ring-emerald-500/20' 
                    : 'bg-accent border-amber-400 text-slate-950 ring-4 ring-accent/20';
                } else if (isCompleted) {
                  dotColor = 'bg-accent border-amber-500 text-slate-950';
                }

                return (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-500 ${dotColor}`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider text-center ${isActive ? 'text-white' : 'text-slate-500'}`}>
                      {idx === 0 ? 'Dossier' : idx === 1 ? 'Planning' : idx === 2 ? 'Route' : 'Livraison'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stepper dynamic description */}
          <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/40 text-xs leading-relaxed text-slate-400">
            {move.status === 'À planifier' && "Votre dossier a été validé par Marne Transdem. Nous préparons la logistique et l'attribution des équipes terrain pour votre date de déménagement."}
            {move.status === 'Programmé' && `Votre planning est validé. Votre chef d'équipe sera ${move.teamLeader} avec une équipe de ${move.crewSize} déménageurs. Véhicule assigné : ${move.assignedTruck || 'À préciser'}.`}
            {move.status === 'En cours' && "Vos déménageurs sont en cours de livraison ou de manutention. Une fois le mobilier livré et positionné selon vos souhaits, le chef d'équipe vous invitera à signer ci-dessous pour confirmer la bonne réception."}
            {move.status === 'Terminé' && "Déménagement livré et finalisé. La signature électronique de décharge de la Lettre de voiture a été validée. Vous pouvez télécharger le document officiel signé ci-dessous."}
          </div>
        </div>

        {/* GPS Live Tracking Map (Only when En cours) */}
        {move.status === 'En cours' && (
          <ClientLiveMap move={move} />
        )}

        {/* Move details card */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <FileText size={14} className="text-accent" />
            Détails de la prestation
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Départ</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <MapPin size={12} className="text-slate-400" />
                {move.fromCity}
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Destination</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <MapPin size={12} className="text-accent" />
                {move.toCity}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Date prévue</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Calendar size={12} className="text-slate-400" />
                {move.date}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Volume estimé</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Truck size={12} className="text-slate-400" />
                {move.volume} m³
              </div>
            </div>

            {(move.status === 'Programmé' || move.status === 'En cours' || move.status === 'Terminé') && (
              <>
                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Chef d'équipe</span>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <User size={12} className="text-slate-400" />
                    {move.teamLeader}
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Véhicule</span>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Truck size={12} className="text-slate-400" />
                    {move.assignedTruck || 'Non spécifié'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Signature & Closing section */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6">
          {move.status !== 'Terminé' ? (
            <>
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-accent" />
                  Émargement Électronique (Décharge finale)
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Au déchargement de votre mobilier, veuillez apposer votre signature sur l'écran ci-dessous pour certifier de la livraison conforme.
                </p>
              </div>

              {/* Signature Pad Canvas Container */}
              <div className="space-y-3">
                <div className="relative bg-white border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-44 bg-white cursor-crosshair touch-none"
                  />
                  {isCanvasEmpty && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-xs font-bold font-mono">
                      Signez ici avec votre doigt ou stylet
                    </div>
                  )}
                </div>

                {/* Canvas Controls */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw size={14} />
                    Effacer
                  </button>
                  <button
                    type="button"
                    disabled={isCanvasEmpty || signing || move.status === 'À planifier'}
                    onClick={handleSaveSignature}
                    className="flex-1 bg-accent hover:bg-accent-hover disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-800 border border-accent text-slate-950 rounded-xl px-4 py-2.5 text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    {signing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Signature en cours...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        Valider la livraison & Signer
                      </>
                    )}
                  </button>
                </div>
                {move.status === 'À planifier' && (
                  <p className="text-[10px] text-center font-bold text-red-500/80">
                    La signature n'est disponible que lorsque le planning est préparé ou le déménagement en cours.
                  </p>
                )}
              </div>
            </>
          ) : (
            // If already signed
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">Livraison validée</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Votre signature électronique a bien été enregistrée le {new Date(move.signedAt || '').toLocaleDateString('fr-FR')} à {new Date(move.signedAt || '').toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}.
                </p>
              </div>
              
              {/* Signature display */}
              <div className="bg-white rounded-2xl p-3 max-w-[240px] mx-auto border border-slate-800 flex items-center justify-center shadow-inner">
                <img src={move.clientSignature} alt="Votre signature" className="h-16 w-48 object-contain" />
              </div>

              {/* PDF Download Section */}
              <div className="pt-4 border-t border-slate-800/60 max-w-sm mx-auto space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Document Officiel Signé
                </span>
                <button
                  type="button"
                  disabled={pdfGenerating}
                  onClick={handleDownloadPdf}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-4 py-3 text-xs font-black flex items-center justify-center gap-2 border border-slate-700/80 transition-colors shadow-md disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Génération du PDF...
                    </>
                  ) : (
                    <>
                      <Download size={14} className="text-accent" />
                      Télécharger la Lettre de voiture signée
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer credits */}
      <footer className="mt-auto pt-12 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        © 2026 MarneTransdem CRM · Tous droits réservés
      </footer>
    </div>
  );
}
