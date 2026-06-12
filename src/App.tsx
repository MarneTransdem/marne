/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route,  useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PageTransition } from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';

const NotFound = lazy(() => import('./pages/NotFound'));
const Header = lazy(() => import('./components/layout/Header').then(module => ({ default: module.Header })));
const Footer = lazy(() => import('./components/layout/Footer').then(module => ({ default: module.Footer })));
const MobileCTA = lazy(() => import('./components/layout/MobileCTA').then(module => ({ default: module.MobileCTA })));

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const QuoteRequest = lazy(() => import('./pages/QuoteRequest'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FormulasPage = lazy(() => import('./pages/Formulas'));
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout').then(module => ({ default: module.AdminLayout })));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview').then(module => ({ default: module.AdminOverview })));
const AdminDossiers = lazy(() => import('./pages/admin/AdminDossiers').then(module => ({ default: module.AdminDossiers })));
const AdminDemandes = lazy(() => import('./pages/admin/AdminDemandes').then(module => ({ default: module.AdminDemandes })));
const AdminDevis = lazy(() => import('./pages/admin/AdminDevis').then(module => ({ default: module.AdminDevis })));
const AdminFactures = lazy(() => import('./pages/admin/AdminFactures').then(module => ({ default: module.AdminFactures })));
const AdminVisites = lazy(() => import('./pages/admin/AdminVisites').then(module => ({ default: module.AdminVisites })));
const AdminPlanning = lazy(() => import('./pages/admin/AdminPlanning').then(module => ({ default: module.AdminPlanning })));
const AdminCollaborateurs = lazy(() => import('./pages/admin/AdminCollaborateurs').then(module => ({ default: module.AdminCollaborateurs })));
const AdminSimulateur = lazy(() => import('./pages/admin/AdminSimulateur').then(module => ({ default: module.AdminSimulateur })));
const Login = lazy(() => import('./pages/Login'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Legal = lazy(() => import('./pages/Legal'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const DemenagementParticuliers = lazy(() => import('./pages/DemenagementParticuliers'));
const DemenagementEntreprises = lazy(() => import('./pages/DemenagementEntreprises'));
const GardeMeuble = lazy(() => import('./pages/GardeMeuble'));
const MonteMeuble = lazy(() => import('./pages/MonteMeuble'));
const Emballage = lazy(() => import('./pages/Emballage'));
const Cartons = lazy(() => import('./pages/Cartons'));
const VolumeCalculator = lazy(() => import('./pages/VolumeCalculator'));
const LocalParis20 = lazy(() => import('./pages/LocalParis20'));
const LocalParis11 = lazy(() => import('./pages/LocalParis11'));
const LocalParis12 = lazy(() => import('./pages/LocalParis12'));
const LocalParis13 = lazy(() => import('./pages/LocalParis13'));
const LocalParis14 = lazy(() => import('./pages/LocalParis14'));
const LocalParis15 = lazy(() => import('./pages/LocalParis15'));
const LocalParis16 = lazy(() => import('./pages/LocalParis16'));
const LocalParis17 = lazy(() => import('./pages/LocalParis17'));
const LocalParis18 = lazy(() => import('./pages/LocalParis18'));
const LocalParis19 = lazy(() => import('./pages/LocalParis19'));
const LocalParis10 = lazy(() => import('./pages/LocalParis10'));
const LocalParis9 = lazy(() => import('./pages/LocalParis9'));
const LocalMontreuil = lazy(() => import('./pages/LocalMontreuil'));
const LocalRomainville = lazy(() => import('./pages/LocalRomainville'));
const LocalNoisyLeSec = lazy(() => import('./pages/LocalNoisyLeSec'));
const LocalAulnaySousBois = lazy(() => import('./pages/LocalAulnaySousBois'));
const LocalBobigny = lazy(() => import('./pages/LocalBobigny'));
const LocalDrancy = lazy(() => import('./pages/LocalDrancy'));
const LocalSaintOuen = lazy(() => import('./pages/LocalSaintOuen'));
const LocalArgenteuil = lazy(() => import('./pages/LocalArgenteuil'));
const LocalCergy = lazy(() => import('./pages/LocalCergy'));
const LocalPontoise = lazy(() => import('./pages/LocalPontoise'));
const LocalSaintGratien = lazy(() => import('./pages/LocalSaintGratien'));
const LocalEnghienLesBains = lazy(() => import('./pages/LocalEnghienLesBains'));
const LocalMontmorency = lazy(() => import('./pages/LocalMontmorency'));
const LocalFranconville = lazy(() => import('./pages/LocalFranconville'));
const LocalSaintDenis = lazy(() => import('./pages/LocalSaintDenis'));
const LocalBondy = lazy(() => import('./pages/LocalBondy'));
const LocalLesLilas = lazy(() => import('./pages/LocalLesLilas'));
const LocalPantin = lazy(() => import('./pages/LocalPantin'));
const LocalVincennes = lazy(() => import('./pages/LocalVincennes'));
const LocalSaintMande = lazy(() => import('./pages/LocalSaintMande'));
const LocalBagnolet = lazy(() => import('./pages/LocalBagnolet'));
const LocalBoulogneBillancourt = lazy(() => import('./pages/LocalBoulogneBillancourt'));
const LocalNeuillySurSeine = lazy(() => import('./pages/LocalNeuillySurSeine'));
const LocalLevalloisPerret = lazy(() => import('./pages/LocalLevalloisPerret'));
const LocalClichy = lazy(() => import('./pages/LocalClichy'));
const LocalCourbevoie = lazy(() => import('./pages/LocalCourbevoie'));
const LocalPuteaux = lazy(() => import('./pages/LocalPuteaux'));
const LocalNanterre = lazy(() => import('./pages/LocalNanterre'));
const LocalSuresnes = lazy(() => import('./pages/LocalSuresnes'));
const LocalRueilMalmaison = lazy(() => import('./pages/LocalRueilMalmaison'));
const LocalSaintCloud = lazy(() => import('./pages/LocalSaintCloud'));
const LocalMeudon = lazy(() => import('./pages/LocalMeudon'));
const LocalIssyLesMoulineaux = lazy(() => import('./pages/LocalIssyLesMoulineaux'));
const LocalClamart = lazy(() => import('./pages/LocalClamart'));
const LocalSevres = lazy(() => import('./pages/LocalSevres'));
const LocalVanves = lazy(() => import('./pages/LocalVanves'));
const LocalChatillon = lazy(() => import('./pages/LocalChatillon'));
const LocalMalakoff = lazy(() => import('./pages/LocalMalakoff'));
const LocalMontrouge = lazy(() => import('./pages/LocalMontrouge'));
const LocalBagneux = lazy(() => import('./pages/LocalBagneux'));
const LocalFontenayAuxRoses = lazy(() => import('./pages/LocalFontenayAuxRoses'));
const LocalSceaux = lazy(() => import('./pages/LocalSceaux'));
const LocalBourgLaReine = lazy(() => import('./pages/LocalBourgLaReine'));
const LocalAntony = lazy(() => import('./pages/LocalAntony'));
const LocalChatenayMalabry = lazy(() => import('./pages/LocalChatenayMalabry'));
const LocalLePlessisRobinson = lazy(() => import('./pages/LocalLePlessisRobinson'));
const LocalNogentSurMarne = lazy(() => import('./pages/LocalNogentSurMarne'));
const LocalVelizyVillacoublay = lazy(() => import('./pages/LocalVelizyVillacoublay'));
const LocalViroflay = lazy(() => import('./pages/LocalViroflay'));
const LocalChaville = lazy(() => import('./pages/LocalChaville'));
const LocalVilleDAvray = lazy(() => import('./pages/LocalVilleDAvray'));
const LocalVersailles = lazy(() => import('./pages/LocalVersailles'));
const LocalLeChesnayRocquencourt = lazy(() => import('./pages/LocalLeChesnayRocquencourt'));
const LocalLaCelleSaintCloud = lazy(() => import('./pages/LocalLaCelleSaintCloud'));
const LocalVaucresson = lazy(() => import('./pages/LocalVaucresson'));
const LocalGarches = lazy(() => import('./pages/LocalGarches'));
const LocalMarnesLaCoquette = lazy(() => import('./pages/LocalMarnesLaCoquette'));
const LocalBougival = lazy(() => import('./pages/LocalBougival'));
const LocalLouveciennes = lazy(() => import('./pages/LocalLouveciennes'));
const LocalCroissySurSeine = lazy(() => import('./pages/LocalCroissySurSeine'));
const LocalChatou = lazy(() => import('./pages/LocalChatou'));
const LocalLeVesinet = lazy(() => import('./pages/LocalLeVesinet'));
const LocalLePecq = lazy(() => import('./pages/LocalLePecq'));
const LocalMarlyLeRoi = lazy(() => import('./pages/LocalMarlyLeRoi'));
const LocalSaintGermainEnLaye = lazy(() => import('./pages/LocalSaintGermainEnLaye'));
const LocalPoissy = lazy(() => import('./pages/LocalPoissy'));
const LocalSartrouville = lazy(() => import('./pages/LocalSartrouville'));
const LocalRambouillet = lazy(() => import('./pages/LocalRambouillet'));
const LocalMantesLaJolie = lazy(() => import('./pages/LocalMantesLaJolie'));
const LocalMaisonsLaffitte = lazy(() => import('./pages/LocalMaisonsLaffitte'));
const LocalHouilles = lazy(() => import('./pages/LocalHouilles'));
const LocalPlaisir = lazy(() => import('./pages/LocalPlaisir'));
const LocalGuyancourt = lazy(() => import('./pages/LocalGuyancourt'));
const LocalConflansSainteHonorine = lazy(() => import('./pages/LocalConflansSainteHonorine'));
const LocalIDF = lazy(() => import('./pages/LocalIDF'));
const LocalHautsDeSeine = lazy(() => import('./pages/LocalHautsDeSeine'));
const LocalSeineSaintDenis = lazy(() => import('./pages/LocalSeineSaintDenis'));
const LocalValDeMarne = lazy(() => import('./pages/LocalValDeMarne'));
const LocalYvelines = lazy(() => import('./pages/LocalYvelines'));
const LocalEssonne = lazy(() => import('./pages/LocalEssonne'));
const LocalValDOise = lazy(() => import('./pages/LocalValDOise'));
const LocalSeineEtMarne = lazy(() => import('./pages/LocalSeineEtMarne'));
const CharentonLePont = lazy(() => import('./pages/CharentonLePont'));
const LocalSaintMaur = lazy(() => import('./pages/LocalSaintMaur'));
const LocalCreteil = lazy(() => import('./pages/LocalCreteil'));
const LocalMaisonsAlfort = lazy(() => import('./pages/LocalMaisonsAlfort'));
const LocalIvrySurSeine = lazy(() => import('./pages/LocalIvrySurSeine'));
const LocalSaintMaurice = lazy(() => import('./pages/LocalSaintMaurice'));
const LocalFontenaySousBois = lazy(() => import('./pages/LocalFontenaySousBois'));
const LocalVillejuif = lazy(() => import('./pages/LocalVillejuif'));
const LocalVitrySurSeine = lazy(() => import('./pages/LocalVitrySurSeine'));
const LocalAlfortville = lazy(() => import('./pages/LocalAlfortville'));
const LocalKremlinBicetre = lazy(() => import('./pages/LocalKremlinBicetre'));
const LocalJoinvilleLePont = lazy(() => import('./pages/LocalJoinvilleLePont'));
const LocalChampignySurMarne = lazy(() => import('./pages/LocalChampignySurMarne'));
const LocalLePerreuxSurMarne = lazy(() => import('./pages/LocalLePerreuxSurMarne'));
const LongueDistance = lazy(() => import('./pages/LongueDistance'));
const LongueDistanceParisLyon = lazy(() => import('./pages/LongueDistanceParisLyon'));
const LongueDistanceParisMarseille = lazy(() => import('./pages/LongueDistanceParisMarseille'));
const LongueDistanceParisBordeaux = lazy(() => import('./pages/LongueDistanceParisBordeaux'));
const LongueDistanceParisToulouse = lazy(() => import('./pages/LongueDistanceParisToulouse'));
const LongueDistanceParisNantes = lazy(() => import('./pages/LongueDistanceParisNantes'));
const LongueDistanceParisLille = lazy(() => import('./pages/LongueDistanceParisLille'));
const LongueDistanceParisStrasbourg = lazy(() => import('./pages/LongueDistanceParisStrasbourg'));
const LongueDistanceParisMontpellier = lazy(() => import('./pages/LongueDistanceParisMontpellier'));
const LongueDistanceParisRennes = lazy(() => import('./pages/LongueDistanceParisRennes'));
const DemenagementOeuvresArt = lazy(() => import('./pages/DemenagementOeuvresArt'));
const DemenagementEtudiant = lazy(() => import('./pages/DemenagementEtudiant'));
const DemenagementMilitaire = lazy(() => import('./pages/DemenagementMilitaire'));
const DemenagementSenior = lazy(() => import('./pages/DemenagementSenior'));
const DemenagementMutation = lazy(() => import('./pages/DemenagementMutation'));
const DemenagementPetitVolume = lazy(() => import('./pages/DemenagementPetitVolume'));
const DemenagementPiano = lazy(() => import('./pages/DemenagementPiano'));
const TransfertBureaux = lazy(() => import('./pages/TransfertBureaux'));
const TransfertInformatique = lazy(() => import('./pages/TransfertInformatique'));
const TransfertIndustriel = lazy(() => import('./pages/TransfertIndustriel'));
const TransfertLaboratoire = lazy(() => import('./pages/TransfertLaboratoire'));
const GestionArchives = lazy(() => import('./pages/GestionArchives'));
const SecteursDesservis = lazy(() => import('./pages/SecteursDesservis'));


const CookieConsent = lazy(() => import('./components/common/CookieConsent').then(module => ({ default: module.CookieConsent })));
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isAdminOrLogin = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      {!isAdminOrLogin && (
        <Suspense fallback={<div className="h-20 bg-transparent" />}>
          <Header />
        </Suspense>
      )}
      <main>
        <PageTransition>
          <Suspense fallback={<div className="py-24 text-center"><span className="animate-pulse text-sm text-slate-400">Chargement...</span></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
            <Route path="/devis" element={<QuoteRequest />} />
            <Route path="/demande-de-devis" element={<QuoteRequest />} />
            <Route path="/secteurs-desservis" element={<SecteursDesservis />} />
            
            {/* Specialized Services */}
            <Route path="/demenagement-particuliers-paris" element={<DemenagementParticuliers />} />
            <Route path="/demenagement-entreprises-paris" element={<DemenagementEntreprises />} />
            <Route path="/garde-meuble-paris" element={<GardeMeuble />} />
            <Route path="/location-monte-meuble-paris" element={<MonteMeuble />} />
            <Route path="/emballage-protection-demenagement" element={<Emballage />} />
            <Route path="/cartons-demenagement-paris" element={<Cartons />} />
            <Route path="/calculateur-volume" element={<VolumeCalculator />} />
            <Route path="/formules-demenagement" element={<FormulasPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="dossiers" element={<AdminDossiers />} />
              <Route path="demandes" element={<AdminDemandes />} />
              <Route path="devis" element={<AdminDevis />} />
              <Route path="factures" element={<AdminFactures />} />
              <Route path="visites" element={<AdminVisites />} />
              <Route path="planning" element={<AdminPlanning />} />
              <Route path="collaborateurs" element={<AdminCollaborateurs />} />
              <Route path="simulateur" element={<AdminSimulateur />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
             <Route path="/demenagement-paris-20" element={<LocalParis20 />} />
            <Route path="/demenagement-paris-11" element={<LocalParis11 />} />
            <Route path="/demenagement-paris-12" element={<LocalParis12 />} />
            <Route path="/demenagement-paris-13" element={<LocalParis13 />} />
            <Route path="/demenagement-paris-14" element={<LocalParis14 />} />
            <Route path="/demenagement-paris-15" element={<LocalParis15 />} />
            <Route path="/demenagement-paris-16" element={<LocalParis16 />} />
            <Route path="/demenagement-paris-17" element={<LocalParis17 />} />
            <Route path="/demenagement-paris-18" element={<LocalParis18 />} />
            <Route path="/demenagement-paris-19" element={<LocalParis19 />} />
            <Route path="/demenagement-paris-10" element={<LocalParis10 />} />
            <Route path="/demenagement-paris-9" element={<LocalParis9 />} />
            <Route path="/demenagement-montreuil" element={<LocalMontreuil />} />
            <Route path="/demenagement-romainville" element={<LocalRomainville />} />
            <Route path="/demenagement-noisy-le-sec" element={<LocalNoisyLeSec />} />
            <Route path="/demenagement-aulnay-sous-bois" element={<LocalAulnaySousBois />} />
            <Route path="/demenagement-bobigny" element={<LocalBobigny />} />
            <Route path="/demenagement-drancy" element={<LocalDrancy />} />
            <Route path="/demenagement-saint-ouen" element={<LocalSaintOuen />} />
            <Route path="/demenagement-argenteuil" element={<LocalArgenteuil />} />
            <Route path="/demenagement-cergy" element={<LocalCergy />} />
            <Route path="/demenagement-pontoise" element={<LocalPontoise />} />
            <Route path="/demenagement-saint-gratien" element={<LocalSaintGratien />} />
            <Route path="/demenagement-enghien-les-bains" element={<LocalEnghienLesBains />} />
            <Route path="/demenagement-montmorency" element={<LocalMontmorency />} />
            <Route path="/demenagement-franconville" element={<LocalFranconville />} />
            <Route path="/demenagement-saint-denis" element={<LocalSaintDenis />} />
            <Route path="/demenagement-bondy" element={<LocalBondy />} />
            <Route path="/demenagement-les-lilas" element={<LocalLesLilas />} />
            <Route path="/demenagement-pantin" element={<LocalPantin />} />
            <Route path="/demenagement-vincennes" element={<LocalVincennes />} />
            <Route path="/demenagement-saint-mande" element={<LocalSaintMande />} />
            <Route path="/demenagement-bagnolet" element={<LocalBagnolet />} />
            <Route path="/demenagement-boulogne-billancourt" element={<LocalBoulogneBillancourt />} />
            <Route path="/demenagement-neuilly-sur-seine" element={<LocalNeuillySurSeine />} />
            <Route path="/demenagement-levallois-perret" element={<LocalLevalloisPerret />} />
            <Route path="/demenagement-clichy" element={<LocalClichy />} />
            <Route path="/demenagement-courbevoie" element={<LocalCourbevoie />} />
            <Route path="/demenagement-puteaux" element={<LocalPuteaux />} />
            <Route path="/demenagement-nanterre" element={<LocalNanterre />} />
            <Route path="/demenagement-suresnes" element={<LocalSuresnes />} />
            <Route path="/demenagement-rueil-malmaison" element={<LocalRueilMalmaison />} />
            <Route path="/demenagement-saint-cloud" element={<LocalSaintCloud />} />
            <Route path="/demenagement-meudon" element={<LocalMeudon />} />
            <Route path="/demenagement-clamart" element={<LocalClamart />} />
            <Route path="/demenagement-sevres" element={<LocalSevres />} />
            <Route path="/demenagement-vanves" element={<LocalVanves />} />
            <Route path="/demenagement-chatillon" element={<LocalChatillon />} />
            <Route path="/demenagement-malakoff" element={<LocalMalakoff />} />
            <Route path="/demenagement-montrouge" element={<LocalMontrouge />} />
            <Route path="/demenagement-bagneux" element={<LocalBagneux />} />
            <Route path="/demenagement-fontenay-aux-roses" element={<LocalFontenayAuxRoses />} />
            <Route path="/demenagement-sceaux" element={<LocalSceaux />} />
            <Route path="/demenagement-bourg-la-reine" element={<LocalBourgLaReine />} />
            <Route path="/demenagement-antony" element={<LocalAntony />} />
            <Route path="/demenagement-chatenay-malabry" element={<LocalChatenayMalabry />} />
            <Route path="/demenagement-le-plessis-robinson" element={<LocalLePlessisRobinson />} />
            <Route path="/demenagement-velizy-villacoublay" element={<LocalVelizyVillacoublay />} />
            <Route path="/demenagement-viroflay" element={<LocalViroflay />} />
            <Route path="/demenagement-chaville" element={<LocalChaville />} />
            <Route path="/demenagement-ville-d-avray" element={<LocalVilleDAvray />} />
            <Route path="/demenagement-versailles" element={<LocalVersailles />} />
            <Route path="/demenagement-le-chesnay-rocquencourt" element={<LocalLeChesnayRocquencourt />} />
            <Route path="/demenagement-la-celle-saint-cloud" element={<LocalLaCelleSaintCloud />} />
            <Route path="/demenagement-vaucresson" element={<LocalVaucresson />} />
            <Route path="/demenagement-garches" element={<LocalGarches />} />
            <Route path="/demenagement-marnes-la-coquette" element={<LocalMarnesLaCoquette />} />
            <Route path="/demenagement-bougival" element={<LocalBougival />} />
            <Route path="/demenagement-louveciennes" element={<LocalLouveciennes />} />
            <Route path="/demenagement-croissy-sur-seine" element={<LocalCroissySurSeine />} />
            <Route path="/demenagement-chatou" element={<LocalChatou />} />
            <Route path="/demenagement-le-vesinet" element={<LocalLeVesinet />} />
            <Route path="/demenagement-le-pecq" element={<LocalLePecq />} />
            <Route path="/demenagement-marly-le-roi" element={<LocalMarlyLeRoi />} />
            <Route path="/demenagement-saint-germain-en-laye" element={<LocalSaintGermainEnLaye />} />
            <Route path="/demenagement-poissy" element={<LocalPoissy />} />
            <Route path="/demenagement-sartrouville" element={<LocalSartrouville />} />
            <Route path="/demenagement-rambouillet" element={<LocalRambouillet />} />
            <Route path="/demenagement-mantes-la-jolie" element={<LocalMantesLaJolie />} />
            <Route path="/demenagement-maisons-laffitte" element={<LocalMaisonsLaffitte />} />
            <Route path="/demenagement-houilles" element={<LocalHouilles />} />
            <Route path="/demenagement-plaisir" element={<LocalPlaisir />} />
            <Route path="/demenagement-guyancourt" element={<LocalGuyancourt />} />
            <Route path="/demenagement-nogent-sur-marne" element={<LocalNogentSurMarne />} />
            <Route path="/demenagement-conflans-sainte-honorine" element={<LocalConflansSainteHonorine />} />
            <Route path="/demenagement-issy-les-moulineaux" element={<LocalIssyLesMoulineaux />} />
            <Route path="/demenagement-ile-de-france" element={<LocalIDF />} />
            <Route path="/demenagement-hauts-de-seine" element={<LocalHautsDeSeine />} />
            <Route path="/demenagement-seine-saint-denis" element={<LocalSeineSaintDenis />} />
            <Route path="/demenagement-val-de-marne" element={<LocalValDeMarne />} />
            <Route path="/demenagement-yvelines" element={<LocalYvelines />} />
            <Route path="/demenagement-essonne" element={<LocalEssonne />} />
            <Route path="/demenagement-val-d-oise" element={<LocalValDOise />} />
            <Route path="/demenagement-seine-et-marne" element={<LocalSeineEtMarne />} />
            <Route path="/demenagement-charenton-le-pont" element={<CharentonLePont />} />
            <Route path="/demenagement-saint-maur-des-fosses" element={<LocalSaintMaur />} />
            <Route path="/demenagement-creteil" element={<LocalCreteil />} />
            <Route path="/demenagement-maisons-alfort" element={<LocalMaisonsAlfort />} />
            <Route path="/demenagement-ivry-sur-seine" element={<LocalIvrySurSeine />} />
            <Route path="/demenagement-saint-maurice" element={<LocalSaintMaurice />} />
            <Route path="/demenagement-fontenay-sous-bois" element={<LocalFontenaySousBois />} />
            <Route path="/demenagement-villejuif" element={<LocalVillejuif />} />
            <Route path="/demenagement-vitry-sur-seine" element={<LocalVitrySurSeine />} />
            <Route path="/demenagement-alfortville" element={<LocalAlfortville />} />
            <Route path="/demenagement-le-kremlin-bicetre" element={<LocalKremlinBicetre />} />
            <Route path="/demenagement-joinville-le-pont" element={<LocalJoinvilleLePont />} />
            <Route path="/demenagement-champigny-sur-marne" element={<LocalChampignySurMarne />} />
            <Route path="/demenagement-le-perreux-sur-marne" element={<LocalLePerreuxSurMarne />} />
            
            {/* Longue Distance */}
            <Route path="/demenagement-paris-lyon" element={<LongueDistanceParisLyon />} />
            <Route path="/demenagement-paris-marseille" element={<LongueDistanceParisMarseille />} />
            <Route path="/demenagement-paris-bordeaux" element={<LongueDistanceParisBordeaux />} />
            <Route path="/demenagement-paris-toulouse" element={<LongueDistanceParisToulouse />} />
            <Route path="/demenagement-paris-nantes" element={<LongueDistanceParisNantes />} />
            <Route path="/demenagement-paris-lille" element={<LongueDistanceParisLille />} />
            <Route path="/demenagement-paris-strasbourg" element={<LongueDistanceParisStrasbourg />} />
            <Route path="/demenagement-paris-montpellier" element={<LongueDistanceParisMontpellier />} />
            <Route path="/demenagement-paris-rennes" element={<LongueDistanceParisRennes />} />
            <Route path="/demenagement-longue-distance" element={<LongueDistance />} />
            <Route path="/demenagement-oeuvres-art" element={<DemenagementOeuvresArt />} />
            <Route path="/demenagement-etudiant" element={<DemenagementEtudiant />} />
            <Route path="/demenagement-militaire" element={<DemenagementMilitaire />} />
            <Route path="/demenagement-senior" element={<DemenagementSenior />} />
            <Route path="/demenagement-mutation-professionnelle" element={<DemenagementMutation />} />
            <Route path="/demenagement-petit-volume" element={<DemenagementPetitVolume />} />
            <Route path="/demenagement-piano-objets-lourds" element={<DemenagementPiano />} />
            
            {/* Enterprise Specifics */}
            <Route path="/transfert-bureaux-paris" element={<TransfertBureaux />} />
            <Route path="/transfert-informatique-paris" element={<TransfertInformatique />} />
            <Route path="/transfert-industriel-paris" element={<TransfertIndustriel />} />
            <Route path="/transfert-laboratoire-paris" element={<TransfertLaboratoire />} />
            <Route path="/gestion-archives-paris" element={<GestionArchives />} />
            
            {/* Legacy / Simple Paths */}
            <Route path="/particuliers" element={<DemenagementParticuliers />} />
            <Route path="/entreprises" element={<DemenagementEntreprises />} />
            <Route path="/garde-meuble" element={<GardeMeuble />} />
            <Route path="/monte-meuble" element={<MonteMeuble />} />
            <Route path="/emballage" element={<Emballage />} />
            <Route path="/formules" element={<FormulasPage />} />

            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </PageTransition>
      </main>
      {!isAdminOrLogin && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
      {!isAdminOrLogin && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
      {!isAdminOrLogin && (
        <Suspense fallback={null}>
          <MobileCTA />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
