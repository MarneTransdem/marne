export type Role = 'gérant' | 'secrétaire' | 'commercial' | 'chef_equipe';

export interface Devis {
  id: string;
  clientName: string;
  phone: string;
  email?: string;
  fromCity: string;
  toCity: string;
  fromAddress?: string;
  toAddress?: string;
  volume: number; // m3
  formula: 'Économique' | 'Standard' | 'Luxe' | 'Dynamic';
  price: number;
  date: string;
  createdAt: string;
  status: 'Brouillon' | 'Envoyé' | 'En attente' | 'Signé' | 'Refusé';
  sourceRequestId?: string;
  sourceVisitId?: string;
  sentAt?: string;
  acceptedAt?: string;
  refusedAt?: string;
  expiresAt?: string;
  fromFloor?: string;
  toFloor?: string;
  fromElevator?: 'Oui' | 'Non';
  toElevator?: 'Oui' | 'Non';
  fromLift?: 'Oui' | 'Non';
  toLift?: 'Oui' | 'Non';
  fromPortage?: string;
  toPortage?: string;
  clientCode?: string;
  distance?: string;
  voyageType?: 'Urbain' | 'National';
}

export interface Facture {
  id: string;
  devisId: string;
  clientName: string;
  email?: string;
  amountHT?: number;
  tvaRate?: number;
  tvaAmount?: number;
  amount: number; // Represents TTC
  date: string;
  dueDate: string;
  status: 'Payée' | 'En attente' | 'En retard';
  overdueSince?: string;
}

export interface Visite {
  id: string;
  clientName: string;
  address: string;
  phone: string;
  date: string;
  time: string;
  volumeEstimated?: number;
  commercialAssigned: string;
  visitMode?: 'domicile' | 'visio' | 'a_definir';
  sourceRequestId?: string;
  status: 'Planifiée' | 'Réalisée' | 'Chiffrée' | 'Facturée' | 'Annulée';
  notes?: string;
}

export interface Demenagement {
  id: string;
  clientName: string;
  devisId: string;
  volume: number;
  fromCity: string;
  toCity: string;
  date: string;
  teamLeader: string;
  status: 'À planifier' | 'Programmé' | 'En cours' | 'Terminé';
  crewSize: number;
  assignedMovers?: string[]; // Array of mover names/ids
  assignedTruck?: string;     // Assigned truck details/plate
  trackingToken?: string;
  clientSignature?: string;
  signedAt?: string;
  currentLocation?: { lat: number; lng: number };
  locationUpdatedAt?: string;
}

export interface FieldMover {
  id: string;
  name: string;
  phone: string;
  role: 'Chauffeur PL' | 'Chauffeur VL' | 'Déménageur Porteur' | 'Aide-déménageur';
  status: 'Disponible' | 'En mission' | 'En repos';
}

export interface FieldTruck {
  id: string;
  plateNumber: string;
  type: string; // e.g. "Poids Lourd 44m³", "Fourgon VL 20m³"
  capacity: number; // in m³
  status: 'Disponible' | 'En maintenance' | 'En mission';
  mileage?: number;
  nextMaintenanceDate?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: Role;
  name: string;
  phone?: string;
  status: 'Actif' | 'Inactif';
  createdAt?: string;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  channel: 'Email' | 'SMS' | 'Both';
  subject?: string;
  body: string;
  lastUpdated?: string;
}
