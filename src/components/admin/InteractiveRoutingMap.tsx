import React, { useEffect, useState, useRef } from 'react';
import { Demenagement } from '../../types';
import { Loader2 } from 'lucide-react';

interface Coords {
  lat: number;
  lng: number;
}

interface InteractiveRoutingMapProps {
  moves: Demenagement[];
  selectedMove: Demenagement | null;
  onSelectMove: (move: Demenagement) => void;
}

const DEPOT_COORDS: Coords = { lat: 48.8560, lng: 2.3995 }; // 43 rue des Maraîchers, 75020 Paris

// Base coordinates resolver (same geocoder rules as server)
export const getBaseCoordinates = (address: string, city: string): Coords => {
  const cleanStr = ((address || '') + ' ' + (city || '')).toLowerCase();
  const zipMatch = cleanStr.match(/\b\d{5}\b/);
  if (zipMatch) {
    const zip = zipMatch[0];
    const dept = zip.substring(0, 2);
    if (dept === '75') return { lat: 48.8566, lng: 2.3522 };
    if (dept === '77') return { lat: 48.6000, lng: 2.9000 };
    if (dept === '78') return { lat: 48.8000, lng: 2.0000 };
    if (dept === '91') return { lat: 48.5000, lng: 2.2500 };
    if (dept === '92') return { lat: 48.8300, lng: 2.2000 };
    if (dept === '93') return { lat: 48.9000, lng: 2.4500 };
    if (dept === '94') return { lat: 48.7800, lng: 2.4500 };
    if (dept === '95') return { lat: 49.0300, lng: 2.0600 };
  }
  if (cleanStr.includes('lyon') || cleanStr.includes('6900')) return { lat: 45.7640, lng: 4.8357 };
  if (cleanStr.includes('marseille') || cleanStr.includes('1300')) return { lat: 43.2965, lng: 5.3698 };
  if (cleanStr.includes('bordeaux') || cleanStr.includes('3300')) return { lat: 44.8378, lng: -0.5792 };
  return { lat: 48.8566, lng: 2.3522 };
};

// Jitter coordinates based on string hash to avoid complete marker overlap
export const getJitteredCoords = (address: string, city: string, indexOffset: number): Coords => {
  const base = getBaseCoordinates(address, city);
  
  let hash = 0;
  const str = address + city + indexOffset;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Spread within ~4km radius
  const latJitter = ((hash % 100) / 100) * 0.04 - 0.02;
  const lngJitter = (((hash >> 8) % 100) / 100) * 0.04 - 0.02;
  
  return {
    lat: base.lat + latJitter,
    lng: base.lng + lngJitter
  };
};

export const getMoveCoords = (move: Demenagement): { from: Coords; to: Coords } => {
  const fromBase = getJitteredCoords(move.fromCity || '', '', 0);
  const toBase = getJitteredCoords(move.toCity || '', '', 1);
  
  // Make sure they have some spacing
  if (Math.abs(fromBase.lat - toBase.lat) < 0.005 && Math.abs(fromBase.lng - toBase.lng) < 0.005) {
    toBase.lat += 0.012;
    toBase.lng += 0.012;
  }
  
  return { from: fromBase, to: toBase };
};

export const InteractiveRoutingMap: React.FC<InteractiveRoutingMapProps> = ({
  moves,
  selectedMove,
  onSelectMove
}) => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

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

  // Listen to CRM Dark Mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Create map instance
    const map = L.map(mapRef.current).setView([DEPOT_COORDS.lat, DEPOT_COORDS.lng], 11);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Handle Map Tiles (switching between light/dark mode)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const L = (window as any).L;
    if (!L) return;

    // Remove existing tile layers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);
  }, [leafletLoaded, isDark]);

  // Handle Markers & Routes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const L = (window as any).L;
    if (!L) return;

    // Create or clear the layer group
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      layerGroupRef.current.clearLayers();
    }

    const group = layerGroupRef.current;

    // Premium divIcon generator
    const createHtmlIcon = (text: string, color: string, isDepot = false) => {
      const size = isDepot ? 36 : 28;
      const border = isDepot ? 'border-2 border-white' : 'border border-white/60';
      return L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div style="
            background-color: ${color}; 
            width: ${size}px; 
            height: ${size}px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: 800; 
            font-size: ${isDepot ? 14 : 10}px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            transform: translate(-50%, -50%);
          " class="${border}">
            ${text}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    };

    // 1. Draw Depot Marker
    L.marker([DEPOT_COORDS.lat, DEPOT_COORDS.lng], {
      icon: createHtmlIcon('🚚', '#0c1c3d', true)
    })
    .bindPopup(`
      <div class="p-2 font-sans">
        <h4 class="font-black text-brand-900">Marne Transdem - Dépôt</h4>
        <p class="text-[11px] text-slate-500 font-light">43 rue des Maraîchers, 75020 Paris</p>
      </div>
    `)
    .addTo(group);

    // 2. Draw Routes & Markers
    const bounds: any[] = [[DEPOT_COORDS.lat, DEPOT_COORDS.lng]];
    
    // Group active moves by truck
    const trucksList = Array.from(new Set(moves.map(m => m.assignedTruck || 'Non assigné'))) as string[];

    const getTruckColor = (truck: string) => {
      if (truck.includes('20m³')) return '#6366f1'; // Indigo
      if (truck.includes('12m³')) return '#f59e0b'; // Amber
      if (truck.includes('Camion')) return '#10b981'; // Emerald
      if (truck === 'Non assigné' || !truck) return '#94a3b8'; // Slate
      return '#ec4899'; // Pink
    };

    trucksList.forEach(truck => {
      const truckColor = getTruckColor(truck);
      const truckMoves = moves.filter(m => (m.assignedTruck || 'Non assigné') === truck);
      if (truckMoves.length === 0) return;

      const routePoints: Coords[] = [DEPOT_COORDS];

      truckMoves.forEach((move, idx) => {
        const { from, to } = getMoveCoords(move);
        routePoints.push(from);
        routePoints.push(to);

        bounds.push([from.lat, from.lng]);
        bounds.push([to.lat, to.lng]);

        const isSelected = selectedMove && selectedMove.id === move.id;
        const markerColor = isSelected ? '#ef4444' : truckColor;

        // Departure Marker
        L.marker([from.lat, from.lng], {
          icon: createHtmlIcon(`D${idx + 1}`, markerColor)
        })
        .bindPopup(`
          <div class="p-2 font-sans min-w-[180px]">
            <span class="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded">${move.id}</span>
            <h4 class="font-black text-brand-900 mt-1 mb-1 text-sm">${move.clientName}</h4>
            <p class="text-[11px] text-slate-600"><strong>Départ :</strong> ${move.fromCity}</p>
            <p class="text-[11px] text-slate-500 font-light mt-0.5">Volume : <strong>${move.volume} m³</strong> | Camion : <strong>${move.assignedTruck || 'Non assigné'}</strong></p>
            <button onclick="window.dispatchEvent(new CustomEvent('leaflet_select_move', {detail: '${move.id}'}))" class="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] py-1.5 rounded-lg font-black uppercase tracking-wider text-center cursor-pointer">Voir Détails</button>
          </div>
        `)
        .addTo(group);

        // Arrival Marker
        L.marker([to.lat, to.lng], {
          icon: createHtmlIcon(`A${idx + 1}`, markerColor)
        })
        .bindPopup(`
          <div class="p-2 font-sans min-w-[180px]">
            <span class="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded">${move.id}</span>
            <h4 class="font-black text-brand-900 mt-1 mb-1 text-sm">${move.clientName}</h4>
            <p class="text-[11px] text-slate-600"><strong>Arrivée :</strong> ${move.toCity}</p>
            <p class="text-[11px] text-slate-500 font-light mt-0.5">Volume : <strong>${move.volume} m³</strong> | Camion : <strong>${move.assignedTruck || 'Non assigné'}</strong></p>
            <button onclick="window.dispatchEvent(new CustomEvent('leaflet_select_move', {detail: '${move.id}'}))" class="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] py-1.5 rounded-lg font-black uppercase tracking-wider text-center cursor-pointer">Voir Détails</button>
          </div>
        `)
        .addTo(group);
      });

      // Loop back to Depot
      routePoints.push(DEPOT_COORDS);

      // Draw Polyline
      L.polyline(routePoints.map(p => [p.lat, p.lng]), {
        color: truckColor,
        weight: truck === 'Non assigné' ? 2 : 4,
        opacity: truck === 'Non assigné' ? 0.45 : 0.8,
        dashArray: truck === 'Non assigné' ? '5, 8' : undefined
      })
      .bindPopup(`
        <div class="p-2 font-sans">
          <h4 class="font-black text-brand-900" style="color: ${truckColor}">${truck}</h4>
          <p class="text-[11px] text-slate-500 font-bold">${truckMoves.length} chantier(s) programmé(s)</p>
        </div>
      `)
      .addTo(group);
    });

    // Fit map bounds to contain all locations
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [moves, selectedMove, leafletLoaded]);

  // Bind Custom Popups events to React selectedMove trigger
  useEffect(() => {
    const handleSelect = (e: Event) => {
      const moveId = (e as CustomEvent).detail;
      const move = moves.find(m => m.id === moveId);
      if (move) {
        onSelectMove(move);
      }
    };
    window.addEventListener('leaflet_select_move', handleSelect);
    return () => window.removeEventListener('leaflet_select_move', handleSelect);
  }, [moves, onSelectMove]);

  // Center Map on selected move
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMove) return;
    const { from } = getMoveCoords(selectedMove);
    map.setView([from.lat, from.lng], 13, { animate: true });
  }, [selectedMove]);

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[500px]">
      {!leafletLoaded && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Chargement de la carte...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full absolute inset-0 z-10" style={{ opacity: leafletLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
    </div>
  );
};
