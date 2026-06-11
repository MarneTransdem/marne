import type { Demenagement, Devis, Facture, Visite } from '../types';
import {
  DOSSIER_PROGRESS,
  type AdminPublicRequest,
  type ClientDossier,
  type DossierStage
} from './admin-dossiers';

interface BuildClientDossiersInput {
  publicRequests: AdminPublicRequest[];
  visites: Visite[];
  devisList: Devis[];
  factures: Facture[];
  demenagements: Demenagement[];
  dossierOwnerOverrides?: Record<string, string>;
}

export const normalizeDossierKey = (value: string) => value.trim().toLowerCase();

export const getDossierStage = (dossier: Partial<ClientDossier>): DossierStage => {
  if (dossier.move?.status === 'Terminé') return 'termine';
  if (dossier.move?.status === 'En cours') return 'intervention';
  if (dossier.move) return 'planning';
  if (dossier.invoice) return 'facturation';
  if (dossier.quote?.status === 'Signé') return 'facturation';
  if (dossier.quote?.status === 'Refusé') return 'termine';
  if (dossier.quote) return 'devis';
  if (dossier.visit) return 'visite';
  if (dossier.request?.plannedVisitId || dossier.request?.status === 'Visite_planifiée') return 'visite';
  return 'demande';
};

export const getDossierNextAction = (dossier: Partial<ClientDossier>, stage: DossierStage) => {
  if (dossier.invoice?.status === 'En retard') return 'Relancer le paiement';
  if (dossier.invoice?.status === 'En attente') return 'Suivre le règlement';
  if (dossier.move?.status === 'À planifier') return "Affecter l'équipe";
  if (dossier.move?.status === 'Programmé') return 'Préparer le départ';
  if (dossier.move?.status === 'En cours') return 'Suivre la livraison';
  if (dossier.move?.status === 'Terminé') return 'Clôturer le dossier';
  if (dossier.quote?.status === 'Brouillon') return 'Finaliser le devis';
  if (dossier.quote?.status === 'Envoyé' || dossier.quote?.status === 'En attente') return 'Relancer la signature';
  if (dossier.quote?.status === 'Signé') return 'Créer ou contrôler la facture';
  if (dossier.quote?.status === 'Refusé') return 'Dossier archivé';
  if (dossier.visit?.status === 'Planifiée') return 'Réaliser la visite';
  if (dossier.visit?.status === 'Réalisée') return 'Transformer en devis';
  if (dossier.visit?.status === 'Chiffrée') return 'Suivre le devis';
  if (dossier.request?.plannedVisitId || dossier.request?.status === 'Visite_planifiée') return 'Contrôler la visite planifiée';
  if (stage === 'demande') return 'Qualifier la demande';
  return 'Mettre à jour';
};

export const getDossierRisk = (dossier: Partial<ClientDossier>): ClientDossier['risk'] => {
  if (dossier.invoice?.status === 'En retard') return 'urgent';
  if (dossier.move?.status === 'À planifier') return 'attention';
  if (dossier.quote?.status === 'Envoyé' || dossier.quote?.status === 'En attente') return 'attention';
  if (dossier.visit?.status === 'Planifiée') return 'attention';
  return 'normal';
};

export function buildClientDossiers({
  publicRequests,
  visites,
  devisList,
  factures,
  demenagements,
  dossierOwnerOverrides = {}
}: BuildClientDossiersInput): ClientDossier[] {
  const dossierMap = new Map<string, Partial<ClientDossier>>();

  const ensureDossier = (clientName: string) => {
    const key = normalizeDossierKey(clientName || 'Client sans nom');
    const current = dossierMap.get(key) || {
      key,
      clientName: clientName || 'Client sans nom',
      amount: 0,
      owner: 'Non assigné'
    };
    dossierMap.set(key, current);
    return current;
  };

  publicRequests
    .filter((request) => request.status !== 'Étudié_Converti' && request.status !== 'Archivé')
    .forEach((request) => {
      const dossier = ensureDossier(request.fullName || 'Client sans nom');
      dossier.request = request;
      dossier.phone = dossier.phone || request.phone;
      dossier.fromCity = dossier.fromCity || [request.fromCity, request.fromZip].filter(Boolean).join(' ');
      dossier.toCity = dossier.toCity || [request.toCity, request.toZip].filter(Boolean).join(' ');
      dossier.date = dossier.date || request.date;
    });

  visites.forEach((visit) => {
    const dossier = ensureDossier(visit.clientName);
    dossier.visit = visit;
    dossier.phone = dossier.phone || visit.phone;
    dossier.date = dossier.date || visit.date;
    dossier.owner = visit.commercialAssigned || dossier.owner;
  });

  devisList.forEach((quote) => {
    const dossier = ensureDossier(quote.clientName);
    dossier.quote = quote;
    dossier.phone = dossier.phone || quote.phone;
    dossier.fromCity = dossier.fromCity || quote.fromCity;
    dossier.toCity = dossier.toCity || quote.toCity;
    dossier.date = quote.date || dossier.date;
    dossier.amount = Math.max(dossier.amount || 0, quote.price || 0);
  });

  factures.forEach((invoice) => {
    const dossier = ensureDossier(invoice.clientName);
    dossier.invoice = invoice;
    dossier.date = dossier.date || invoice.dueDate;
    dossier.amount = Math.max(dossier.amount || 0, invoice.amount || 0);
  });

  demenagements.forEach((move) => {
    const dossier = ensureDossier(move.clientName);
    dossier.move = move;
    dossier.fromCity = dossier.fromCity || move.fromCity;
    dossier.toCity = dossier.toCity || move.toCity;
    dossier.date = move.date || dossier.date;
    dossier.owner = move.teamLeader || dossier.owner;
  });

  return Array.from(dossierMap.values())
    .map((partial) => {
      const stage = getDossierStage(partial);
      const key = partial.key || normalizeDossierKey(partial.clientName || 'Client sans nom');

      return {
        key,
        clientName: partial.clientName || 'Client sans nom',
        phone: partial.phone,
        fromCity: partial.fromCity,
        toCity: partial.toCity,
        date: partial.date,
        amount: partial.amount || 0,
        owner: dossierOwnerOverrides[key] || partial.owner || 'Non assigné',
        quote: partial.quote,
        invoice: partial.invoice,
        visit: partial.visit,
        move: partial.move,
        request: partial.request,
        stage,
        completion: DOSSIER_PROGRESS[stage],
        nextAction: getDossierNextAction(partial, stage),
        risk: getDossierRisk(partial)
      };
    })
    .sort((a, b) => DOSSIER_PROGRESS[a.stage] - DOSSIER_PROGRESS[b.stage] || a.clientName.localeCompare(b.clientName));
}
