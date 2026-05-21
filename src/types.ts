export type Role = 'gérant' | 'secrétaire' | 'commercial' | 'chef_equipe';

export interface Devis {
  id: string;
  clientName: string;
  phone: string;
  fromCity: string;
  toCity: string;
  volume: number; // m3
  formula: 'Économique' | 'Standard' | 'Luxe' | 'Dynamic';
  price: number;
  date: string;
  createdAt: string;
  status: 'Brouillon' | 'Envoyé' | 'Signé' | 'Refusé';
}

export interface Facture {
  id: string;
  devisId: string;
  clientName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Payée' | 'En attente' | 'En retard';
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
  status: 'Planifiée' | 'Réalisée' | 'Facturée' | 'Annulée';
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
