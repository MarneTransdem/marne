import { strict as assert } from 'node:assert';
import {
  buildClientDossiers,
  normalizeDossierKey
} from '../src/lib/admin-dossier-engine.ts';
import type { AdminPublicRequest } from '../src/lib/admin-dossiers.ts';
import type { Demenagement, Devis, Facture, Visite } from '../src/types.ts';

const publicRequests: AdminPublicRequest[] = [
  {
    id: 'request-new',
    fullName: 'Alice Martin',
    phone: '0600000001',
    fromCity: 'Charenton-le-Pont',
    fromZip: '94220',
    toCity: 'Saint-Maur-des-Fosses',
    toZip: '94100',
    date: '2026-07-01',
    status: 'Nouveau'
  },
  {
    id: 'request-archived',
    fullName: 'Archive Client',
    status: 'Archivé'
  },
  {
    id: 'request-converted',
    fullName: 'Converted Client',
    status: 'Étudié_Converti'
  }
];

const visites: Visite[] = [
  {
    id: 'visit-planned',
    clientName: 'Bruno Legrand',
    address: '12 rue de Paris',
    phone: '0600000002',
    date: '2026-07-02',
    time: '10:00',
    commercialAssigned: 'Virginie',
    status: 'Planifiée'
  }
];

const devisList: Devis[] = [
  {
    id: 'quote-followup',
    clientName: 'Clara Dubois',
    phone: '0600000003',
    fromCity: 'Paris',
    toCity: 'Creteil',
    volume: 30,
    formula: 'Standard',
    price: 2200,
    date: '2026-07-03',
    createdAt: '2026-06-01',
    status: 'Envoyé'
  },
  {
    id: 'quote-signed',
    clientName: 'David Morel',
    phone: '0600000004',
    fromCity: 'Maisons-Alfort',
    toCity: 'Joinville-le-Pont',
    volume: 45,
    formula: 'Luxe',
    price: 3600,
    date: '2026-07-04',
    createdAt: '2026-06-02',
    status: 'Signé'
  }
];

const factures: Facture[] = [
  {
    id: 'invoice-late',
    devisId: 'quote-signed',
    clientName: 'David Morel',
    amount: 3600,
    date: '2026-06-03',
    dueDate: '2026-06-10',
    status: 'En retard'
  }
];

const demenagements: Demenagement[] = [
  {
    id: 'move-to-plan',
    clientName: 'Emma Petit',
    devisId: 'quote-move',
    volume: 28,
    fromCity: 'Nogent-sur-Marne',
    toCity: 'Le Perreux-sur-Marne',
    date: '2026-07-05',
    teamLeader: 'Karim',
    status: 'À planifier',
    crewSize: 3
  }
];

const dossiers = buildClientDossiers({
  publicRequests,
  visites,
  devisList,
  factures,
  demenagements,
  dossierOwnerOverrides: {
    [normalizeDossierKey('Clara Dubois')]: 'Gestion devis'
  }
});

const byClientName = new Map(dossiers.map((dossier) => [dossier.clientName, dossier]));

function getDossier(clientName: string) {
  const dossier = byClientName.get(clientName);
  assert.ok(dossier, `Dossier introuvable: ${clientName}`);
  return dossier;
}

assert.equal(dossiers.some((dossier) => dossier.clientName === 'Archive Client'), false);
assert.equal(dossiers.some((dossier) => dossier.clientName === 'Converted Client'), false);

const demande = getDossier('Alice Martin');
assert.equal(demande.stage, 'demande');
assert.equal(demande.completion, 10);
assert.equal(demande.nextAction, 'Qualifier la demande');
assert.equal(demande.risk, 'normal');
assert.equal(demande.fromCity, 'Charenton-le-Pont 94220');
assert.equal(demande.request?.id, 'request-new');

const visite = getDossier('Bruno Legrand');
assert.equal(visite.stage, 'visite');
assert.equal(visite.owner, 'Virginie');
assert.equal(visite.nextAction, 'Réaliser la visite');
assert.equal(visite.risk, 'attention');

const devis = getDossier('Clara Dubois');
assert.equal(devis.stage, 'devis');
assert.equal(devis.amount, 2200);
assert.equal(devis.owner, 'Gestion devis');
assert.equal(devis.nextAction, 'Relancer la signature');
assert.equal(devis.risk, 'attention');

const facture = getDossier('David Morel');
assert.equal(facture.stage, 'facturation');
assert.equal(facture.amount, 3600);
assert.equal(facture.nextAction, 'Relancer le paiement');
assert.equal(facture.risk, 'urgent');

const planning = getDossier('Emma Petit');
assert.equal(planning.stage, 'planning');
assert.equal(planning.owner, 'Karim');
assert.equal(planning.nextAction, "Affecter l'équipe");
assert.equal(planning.risk, 'attention');

assert.deepEqual(
  dossiers.map((dossier) => dossier.stage),
  ['demande', 'visite', 'devis', 'facturation', 'planning']
);

console.log(`OK admin dossier engine: ${dossiers.length} dossiers contrôlés.`);
