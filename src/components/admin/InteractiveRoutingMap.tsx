import React, { useEffect, useRef, useState } from 'react';
import { Demenagement } from '../../types';
import { Loader2, Route } from 'lucide-react';

interface Coords {
  lat: number;
  lng: number;
}

interface GeocodedCoords extends Coords {
  label: string;
  query: string;
  precision: 'address' | 'city' | 'fallback';
  score?: number;
}

interface MoveRouteData {
  from: GeocodedCoords;
  to: GeocodedCoords;
}

interface TruckRouteData {
  truck: string;
  color: string;
  points: Coords[];
  isRoadRoute: boolean;
  distanceMeters?: number;
  durationSeconds?: number;
}

interface InteractiveRoutingMapProps {
  moves: Demenagement[];
  selectedMove: Demenagement | null;
  onSelectMove: (move: Demenagement) => void;
}

const UNASSIGNED_TRUCK = 'Non assigné';
const DEPOT_LABEL = 'Marne Transdem - Dépôt';
const DEPOT_ADDRESS = '43 rue des Maraîchers, 75020 Paris';
const DEPOT_COORDS: GeocodedCoords = {
  lat: 48.8560,
  lng: 2.3995,
  label: DEPOT_ADDRESS,
  query: DEPOT_ADDRESS,
  precision: 'address'
};

const GEOCODE_CACHE_KEY = 'marne_crm_geocode_cache_v2';
const MIN_GEOCODE_SCORE = 0.35;

const PARIS_ZIP_COORDS: Record<string, Coords> = {
  '75001': { lat: 48.8640, lng: 2.3317 },
  '75002': { lat: 48.8687, lng: 2.3412 },
  '75003': { lat: 48.8637, lng: 2.3615 },
  '75004': { lat: 48.8543, lng: 2.3570 },
  '75005': { lat: 48.8448, lng: 2.3471 },
  '75006': { lat: 48.8493, lng: 2.3327 },
  '75007': { lat: 48.8565, lng: 2.3126 },
  '75008': { lat: 48.8728, lng: 2.3125 },
  '75009': { lat: 48.8769, lng: 2.3377 },
  '75010': { lat: 48.8760, lng: 2.3609 },
  '75011': { lat: 48.8584, lng: 2.3797 },
  '75012': { lat: 48.8352, lng: 2.4229 },
  '75013': { lat: 48.8322, lng: 2.3561 },
  '75014': { lat: 48.8331, lng: 2.3264 },
  '75015': { lat: 48.8412, lng: 2.3003 },
  '75016': { lat: 48.8637, lng: 2.2769 },
  '75017': { lat: 48.8870, lng: 2.3065 },
  '75018': { lat: 48.8925, lng: 2.3444 },
  '75019': { lat: 48.8817, lng: 2.3822 },
  '75020': { lat: 48.8647, lng: 2.3984 }
};

const CITY_FALLBACK_COORDS: Array<{ pattern: RegExp; coords: Coords }> = [
  { pattern: /paris|750\d{2}/i, coords: { lat: 48.8566, lng: 2.3522 } },
  { pattern: /mantes|78200|78711/i, coords: { lat: 48.9897, lng: 1.7140 } },
  { pattern: /versailles|78000/i, coords: { lat: 48.8049, lng: 2.1204 } },
  { pattern: /saint[-\s]?germain|78100/i, coords: { lat: 48.8989, lng: 2.0943 } },
  { pattern: /boulogne|92100/i, coords: { lat: 48.8397, lng: 2.2399 } },
  { pattern: /nanterre|92000/i, coords: { lat: 48.8924, lng: 2.2153 } },
  { pattern: /creteil|créteil|94000/i, coords: { lat: 48.7904, lng: 2.4556 } },
  { pattern: /saint[-\s]?denis|93200/i, coords: { lat: 48.9362, lng: 2.3574 } },
  { pattern: /evry|évry|91000/i, coords: { lat: 48.6238, lng: 2.4297 } },
  { pattern: /cergy|95000/i, coords: { lat: 49.0365, lng: 2.0761 } },
  { pattern: /melun|77000/i, coords: { lat: 48.5399, lng: 2.6608 } },
  { pattern: /lyon|690\d{2}/i, coords: { lat: 45.7640, lng: 4.8357 } },
  { pattern: /marseille|130\d{2}/i, coords: { lat: 43.2965, lng: 5.3698 } },
  { pattern: /bordeaux|330\d{2}/i, coords: { lat: 44.8378, lng: -0.5792 } }
];

const geocodeMemoryCache = new Map<string, GeocodedCoords>();
let geocodeStorageLoaded = false;

const normalizeWhitespace = (value: unknown) => String(value ?? '').replace(/\s+/g, ' ').trim();

const normalizeCacheKey = (value: string) => normalizeWhitespace(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const extractZip = (...values: Array<unknown>) => {
  const joined = values.map(normalizeWhitespace).join(' ');
  return joined.match(/\b\d{5}\b/)?.[0] || '';
};

const hasStreetPrecision = (value: string) => /\d+\s+|\b(rue|avenue|av\.?|boulevard|bd\.?|impasse|chemin|route|place|quai|allee|allée|passage|square|cours)\b/i.test(value);

const escapeHtml = (value: unknown) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const formatDistance = (meters?: number) => {
  if (!meters || !Number.isFinite(meters)) return '';
  if (meters >= 1000) return `${(meters / 1000).toFixed(meters >= 10000 ? 0 : 1)} km`;
  return `${Math.round(meters)} m`;
};

const formatDuration = (seconds?: number) => {
  if (!seconds || !Number.isFinite(seconds)) return '';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};

const getTruckName = (move: Demenagement) => normalizeWhitespace(move.assignedTruck) || UNASSIGNED_TRUCK;

const getTruckColor = (truck: string) => {
  const normalized = normalizeWhitespace(truck).toLowerCase();
  if (!normalized || normalized === UNASSIGNED_TRUCK.toLowerCase()) return '#94a3b8';
  if (normalized.includes('20')) return '#6366f1';
  if (normalized.includes('12')) return '#f59e0b';
  if (normalized.includes('44') || normalized.includes('poids')) return '#10b981';
  if (normalized.includes('camion') || normalized.includes('fourgon')) return '#10b981';
  return '#ec4899';
};

const readGeocodeStorage = () => {
  if (geocodeStorageLoaded || typeof window === 'undefined') return;
  geocodeStorageLoaded = true;

  try {
    const raw = window.localStorage.getItem(GEOCODE_CACHE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, GeocodedCoords>;
    Object.entries(parsed).forEach(([key, value]) => {
      if (Number.isFinite(value?.lat) && Number.isFinite(value?.lng)) {
        geocodeMemoryCache.set(key, value);
      }
    });
  } catch (error) {
    console.warn('Geocode cache read failed', error);
  }
};

const persistGeocodeStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const entries = Array.from(geocodeMemoryCache.entries()).slice(-250);
    window.localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch (error) {
    console.warn('Geocode cache write failed', error);
  }
};

const buildLocationQuery = (move: Demenagement, side: 'from' | 'to') => {
  const address = normalizeWhitespace(side === 'from' ? move.fromAddress : move.toAddress);
  const city = normalizeWhitespace(side === 'from' ? move.fromCity : move.toCity);
  const zip = normalizeWhitespace(side === 'from' ? move.fromZip : move.toZip) || extractZip(address, city);
  const parts = [address, zip, city]
    .map((part) => part.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const uniqueParts = parts.filter((part, index) => parts.findIndex((other) => normalizeCacheKey(other) === normalizeCacheKey(part)) === index);
  const query = [...uniqueParts, 'France'].join(', ');
  return query || 'Paris, France';
};

// Synchronous fallback used by the CRM map and the public tracking screen.
export const getBaseCoordinates = (address: string, city = ''): Coords => {
  const cleanStr = `${address || ''} ${city || ''}`.toLowerCase();
  const zip = extractZip(cleanStr);

  if (zip && PARIS_ZIP_COORDS[zip]) return PARIS_ZIP_COORDS[zip];

  const knownCity = CITY_FALLBACK_COORDS.find((item) => item.pattern.test(cleanStr));
  if (knownCity) return knownCity.coords;

  if (zip) {
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

  return { lat: 48.8566, lng: 2.3522 };
};

export const getJitteredCoords = (address: string, city: string): Coords => getBaseCoordinates(address, city);

export const getMoveCoords = (move: Demenagement): { from: Coords; to: Coords } => {
  const fromQuery = buildLocationQuery(move, 'from');
  const toQuery = buildLocationQuery(move, 'to');
  const from = getBaseCoordinates(fromQuery, move.fromCity);
  const to = getBaseCoordinates(toQuery, move.toCity);

  if (Math.abs(from.lat - to.lat) < 0.0005 && Math.abs(from.lng - to.lng) < 0.0005) {
    return {
      from,
      to: { lat: to.lat + 0.0015, lng: to.lng + 0.0015 }
    };
  }

  return { from, to };
};

const fallbackGeocode = (query: string, move: Demenagement, side: 'from' | 'to'): GeocodedCoords => {
  const coords = getBaseCoordinates(query, side === 'from' ? move.fromCity : move.toCity);
  return {
    ...coords,
    label: query.replace(/, France$/i, ''),
    query,
    precision: 'fallback'
  };
};

const geocodeAddress = async (query: string, fallback: GeocodedCoords): Promise<GeocodedCoords> => {
  readGeocodeStorage();
  const cacheKey = normalizeCacheKey(query);
  const cached = geocodeMemoryCache.get(cacheKey);
  if (cached) return cached;

  if (typeof fetch !== 'function' || query.length < 3) return fallback;

  try {
    const url = new URL('https://api-adresse.data.gouv.fr/search/');
    url.searchParams.set('q', query);
    url.searchParams.set('limit', '1');
    url.searchParams.set('autocomplete', '0');

    const response = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Geocoder HTTP ${response.status}`);

    const data = await response.json();
    const feature = data?.features?.[0];
    const coordinates = feature?.geometry?.coordinates;
    const score = Number(feature?.properties?.score ?? 0);

    if (!Array.isArray(coordinates) || coordinates.length < 2 || score < MIN_GEOCODE_SCORE) {
      return fallback;
    }

    const resolved: GeocodedCoords = {
      lat: Number(coordinates[1]),
      lng: Number(coordinates[0]),
      label: normalizeWhitespace(feature?.properties?.label) || fallback.label,
      query,
      precision: hasStreetPrecision(query) ? 'address' : 'city',
      score
    };

    if (Number.isFinite(resolved.lat) && Number.isFinite(resolved.lng)) {
      geocodeMemoryCache.set(cacheKey, resolved);
      persistGeocodeStorage();
      return resolved;
    }
  } catch (error) {
    console.warn('Geocoding failed, fallback used:', query, error);
  }

  return fallback;
};

const resolveMoveCoords = async (move: Demenagement): Promise<MoveRouteData> => {
  const fromQuery = buildLocationQuery(move, 'from');
  const toQuery = buildLocationQuery(move, 'to');
  const fromFallback = fallbackGeocode(fromQuery, move, 'from');
  const toFallback = fallbackGeocode(toQuery, move, 'to');

  const [from, to] = await Promise.all([
    geocodeAddress(fromQuery, fromFallback),
    geocodeAddress(toQuery, toFallback)
  ]);

  if (Math.abs(from.lat - to.lat) < 0.0005 && Math.abs(from.lng - to.lng) < 0.0005) {
    return {
      from,
      to: { ...to, lat: to.lat + 0.0015, lng: to.lng + 0.0015 }
    };
  }

  return { from, to };
};

const fetchRoadRoute = async (points: Coords[]): Promise<Omit<TruckRouteData, 'truck' | 'color' | 'isRoadRoute'> | null> => {
  if (points.length < 2 || typeof fetch !== 'function') return null;

  try {
    const coordinates = points.map((point) => `${point.lng.toFixed(6)},${point.lat.toFixed(6)}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false&alternatives=false`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`OSRM HTTP ${response.status}`);

    const data = await response.json();
    const route = data?.routes?.[0];
    const roadCoordinates = route?.geometry?.coordinates;
    if (!Array.isArray(roadCoordinates) || roadCoordinates.length < 2) return null;

    return {
      points: roadCoordinates
        .map((coordinate: [number, number]) => ({ lng: Number(coordinate[0]), lat: Number(coordinate[1]) }))
        .filter((point: Coords) => Number.isFinite(point.lat) && Number.isFinite(point.lng)),
      distanceMeters: Number(route.distance),
      durationSeconds: Number(route.duration)
    };
  } catch (error) {
    console.warn('Road routing failed, direct route fallback used:', error);
    return null;
  }
};

export const InteractiveRoutingMap: React.FC<InteractiveRoutingMapProps> = ({
  moves,
  selectedMove,
  onSelectMove
}) => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [isResolvingRoutes, setIsResolvingRoutes] = useState(false);
  const [routingWarning, setRoutingWarning] = useState<string | null>(null);
  const [coordsByMoveId, setCoordsByMoveId] = useState<Record<string, MoveRouteData>>({});
  const [truckRoutes, setTruckRoutes] = useState<TruckRouteData[]>([]);
  const [isDark, setIsDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

  const moveRoutingKey = moves
    .map((move) => [
      move.id,
      move.assignedTruck || '',
      move.fromAddress || '',
      move.fromZip || '',
      move.fromCity || '',
      move.toAddress || '',
      move.toZip || '',
      move.toCity || ''
    ].join('|'))
    .join('||');

  useEffect(() => {
    if (typeof document === 'undefined') return;

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

    const existingScript = document.getElementById('leaflet-js') as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => setLeafletLoaded(true), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setLeafletLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([DEPOT_COORDS.lat, DEPOT_COORDS.lng], 11);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const L = (window as any).L;
    if (!L) return;

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

  useEffect(() => {
    if (!leafletLoaded) return;
    let cancelled = false;

    const resolveRoutes = async () => {
      setIsResolvingRoutes(true);
      setRoutingWarning(null);

      if (moves.length === 0) {
        setCoordsByMoveId({});
        setTruckRoutes([]);
        setIsResolvingRoutes(false);
        return;
      }

      const nextCoords: Record<string, MoveRouteData> = {};
      for (const move of moves) {
        if (cancelled) return;
        nextCoords[move.id] = await resolveMoveCoords(move);
      }

      const truckNames = Array.from(new Set<string>(moves.map(getTruckName)));
      const nextRoutes: TruckRouteData[] = [];
      let fallbackRoutes = 0;

      for (const truck of truckNames) {
        if (cancelled) return;
        const truckMoves = moves.filter((move) => getTruckName(move) === truck);
        const stops: Coords[] = [DEPOT_COORDS];

        truckMoves.forEach((move) => {
          const coords = nextCoords[move.id];
          if (!coords) return;
          stops.push(coords.from, coords.to);
        });

        stops.push(DEPOT_COORDS);
        const roadRoute = await fetchRoadRoute(stops);
        const color = getTruckColor(truck);

        if (roadRoute?.points?.length) {
          nextRoutes.push({
            truck,
            color,
            points: roadRoute.points,
            isRoadRoute: true,
            distanceMeters: roadRoute.distanceMeters,
            durationSeconds: roadRoute.durationSeconds
          });
        } else {
          fallbackRoutes += 1;
          nextRoutes.push({ truck, color, points: stops, isRoadRoute: false });
        }
      }

      if (cancelled) return;
      setCoordsByMoveId(nextCoords);
      setTruckRoutes(nextRoutes);
      setRoutingWarning(fallbackRoutes > 0 ? `${fallbackRoutes} trajet(s) affichés en ligne directe faute de routage disponible.` : null);
      setIsResolvingRoutes(false);
    };

    resolveRoutes().catch((error) => {
      if (cancelled) return;
      console.error('Route resolution failed', error);
      setRoutingWarning('Calcul routier indisponible. Affichage de secours activé.');
      setIsResolvingRoutes(false);
    });

    return () => {
      cancelled = true;
    };
  }, [leafletLoaded, moveRoutingKey]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const L = (window as any).L;
    if (!L) return;

    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      layerGroupRef.current.clearLayers();
    }

    const group = layerGroupRef.current;

    const createHtmlIcon = (text: string, color: string, isDepot = false) => {
      const size = isDepot ? 36 : 28;
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
            font-size: ${isDepot ? 12 : 10}px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            transform: translate(-50%, -50%);
            border: ${isDepot ? '2px solid #fff' : '1px solid rgba(255,255,255,0.7)'};
          ">
            ${escapeHtml(text)}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    };

    L.marker([DEPOT_COORDS.lat, DEPOT_COORDS.lng], {
      icon: createHtmlIcon('MT', '#0c1c3d', true)
    })
      .bindPopup(`
        <div class="p-2 font-sans">
          <h4 class="font-black text-brand-900">${DEPOT_LABEL}</h4>
          <p class="text-[11px] text-slate-500 font-light">${DEPOT_ADDRESS}</p>
        </div>
      `)
      .addTo(group);

    const bounds: Array<[number, number]> = [[DEPOT_COORDS.lat, DEPOT_COORDS.lng]];
    const truckNames = Array.from(new Set<string>(moves.map(getTruckName)));

    truckRoutes.forEach((route) => {
      if (route.points.length < 2) return;
      route.points.forEach((point) => bounds.push([point.lat, point.lng]));
      const distance = formatDistance(route.distanceMeters);
      const duration = formatDuration(route.durationSeconds);

      L.polyline(route.points.map((point) => [point.lat, point.lng]), {
        color: route.color,
        weight: route.truck === UNASSIGNED_TRUCK ? 2 : 4,
        opacity: route.truck === UNASSIGNED_TRUCK ? 0.45 : 0.85,
        dashArray: route.isRoadRoute ? undefined : '5, 8'
      })
        .bindPopup(`
          <div class="p-2 font-sans">
            <h4 class="font-black text-brand-900" style="color: ${route.color}">${escapeHtml(route.truck)}</h4>
            <p class="text-[11px] text-slate-500 font-bold">${route.isRoadRoute ? 'Itinéraire routier' : 'Trajet direct de secours'}</p>
            ${distance || duration ? `<p class="text-[11px] text-slate-500">${escapeHtml([distance, duration].filter(Boolean).join(' · '))}</p>` : ''}
          </div>
        `)
        .addTo(group);
    });

    truckNames.forEach((truck) => {
      const truckColor = getTruckColor(truck);
      const truckMoves = moves.filter((move) => getTruckName(move) === truck);

      truckMoves.forEach((move, index) => {
        const coords = coordsByMoveId[move.id] || resolveFallbackMoveCoords(move);
        const isSelected = selectedMove?.id === move.id;
        const markerColor = isSelected ? '#ef4444' : truckColor;

        bounds.push([coords.from.lat, coords.from.lng]);
        bounds.push([coords.to.lat, coords.to.lng]);

        const departureMarker = L.marker([coords.from.lat, coords.from.lng], {
          icon: createHtmlIcon(`D${index + 1}`, markerColor)
        })
          .bindPopup(`
            <div class="p-2 font-sans min-w-[190px]">
              <span class="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">${escapeHtml(move.id)}</span>
              <h4 class="font-black text-brand-900 mt-1 mb-1 text-sm">${escapeHtml(move.clientName)}</h4>
              <p class="text-[11px] text-slate-600"><strong>Depart :</strong> ${escapeHtml(coords.from.label)}</p>
              <p class="text-[11px] text-slate-500 font-light mt-0.5">Volume : <strong>${escapeHtml(move.volume)} m3</strong> | Camion : <strong>${escapeHtml(truck)}</strong></p>
            </div>
          `)
          .addTo(group);
        departureMarker.on('click', () => onSelectMove(move));

        const arrivalMarker = L.marker([coords.to.lat, coords.to.lng], {
          icon: createHtmlIcon(`A${index + 1}`, markerColor)
        })
          .bindPopup(`
            <div class="p-2 font-sans min-w-[190px]">
              <span class="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">${escapeHtml(move.id)}</span>
              <h4 class="font-black text-brand-900 mt-1 mb-1 text-sm">${escapeHtml(move.clientName)}</h4>
              <p class="text-[11px] text-slate-600"><strong>Arrivee :</strong> ${escapeHtml(coords.to.label)}</p>
              <p class="text-[11px] text-slate-500 font-light mt-0.5">Volume : <strong>${escapeHtml(move.volume)} m3</strong> | Camion : <strong>${escapeHtml(truck)}</strong></p>
            </div>
          `)
          .addTo(group);
        arrivalMarker.on('click', () => onSelectMove(move));
      });
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [42, 42] });
    }
  }, [moves, selectedMove, leafletLoaded, coordsByMoveId, truckRoutes, onSelectMove]);


  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMove) return;
    const coords = coordsByMoveId[selectedMove.id] || resolveFallbackMoveCoords(selectedMove);
    map.setView([coords.from.lat, coords.from.lng], 14, { animate: true });
  }, [selectedMove, coordsByMoveId]);

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[500px]">
      {!leafletLoaded && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Chargement de la carte...</p>
        </div>
      )}

      {leafletLoaded && isResolvingRoutes && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 px-3 py-2 text-[11px] font-black text-slate-600 dark:text-slate-200 shadow-sm">
          <Loader2 size={14} className="animate-spin text-accent" />
          Calcul des itinéraires routiers
        </div>
      )}

      {leafletLoaded && routingWarning && !isResolvingRoutes && (
        <div className="absolute top-4 left-4 z-20 max-w-xs rounded-xl bg-amber-50/95 dark:bg-amber-950/90 border border-amber-200 dark:border-amber-900 px-3 py-2 text-[11px] font-bold text-amber-900 dark:text-amber-200 shadow-sm">
          <Route size={13} className="inline mr-1" />
          {routingWarning}
        </div>
      )}

      <div ref={mapRef} className="w-full h-full absolute inset-0 z-10" style={{ opacity: leafletLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} />
    </div>
  );
};

const resolveFallbackMoveCoords = (move: Demenagement): MoveRouteData => {
  const fromQuery = buildLocationQuery(move, 'from');
  const toQuery = buildLocationQuery(move, 'to');
  return {
    from: fallbackGeocode(fromQuery, move, 'from'),
    to: fallbackGeocode(toQuery, move, 'to')
  };
};