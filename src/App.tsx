/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileCTA } from './components/layout/MobileCTA';
import { PageTransition } from './components/layout/PageTransition';
import Home from './pages/Home';
import Services from './pages/Services';
import QuoteRequest from './pages/QuoteRequest';
import About from './pages/About';
import Contact from './pages/Contact';
import FormulasPage from './pages/Formulas';
import Blog from './pages/Blog';
import Legal from './pages/Legal';
import DemenagementParticuliers from './pages/DemenagementParticuliers';
import DemenagementEntreprises from './pages/DemenagementEntreprises';
import GardeMeuble from './pages/GardeMeuble';
import MonteMeuble from './pages/MonteMeuble';
import Emballage from './pages/Emballage';
import Cartons from './pages/Cartons';
import VolumeCalculator from './pages/VolumeCalculator';
import LocalParis20 from './pages/LocalParis20';
import LocalParis11 from './pages/LocalParis11';
import LocalParis12 from './pages/LocalParis12';
import LocalParis13 from './pages/LocalParis13';
import LocalParis14 from './pages/LocalParis14';
import LocalParis15 from './pages/LocalParis15';
import LocalParis16 from './pages/LocalParis16';
import LocalParis17 from './pages/LocalParis17';
import LocalParis18 from './pages/LocalParis18';
import LocalParis19 from './pages/LocalParis19';
import LocalParis10 from './pages/LocalParis10';
import LocalParis9 from './pages/LocalParis9';
import LocalMontreuil from './pages/LocalMontreuil';
import LocalVincennes from './pages/LocalVincennes';
import LocalSaintMande from './pages/LocalSaintMande';
import LocalBagnolet from './pages/LocalBagnolet';
import LocalBoulogneBillancourt from './pages/LocalBoulogneBillancourt';
import LocalNeuillySurSeine from './pages/LocalNeuillySurSeine';
import LocalLevalloisPerret from './pages/LocalLevalloisPerret';
import LocalClichy from './pages/LocalClichy';
import LocalCourbevoie from './pages/LocalCourbevoie';
import LocalPuteaux from './pages/LocalPuteaux';
import LocalNanterre from './pages/LocalNanterre';
import LocalSuresnes from './pages/LocalSuresnes';
import LocalRueilMalmaison from './pages/LocalRueilMalmaison';
import LocalSaintCloud from './pages/LocalSaintCloud';
import LocalMeudon from './pages/LocalMeudon';
import LocalIssyLesMoulineaux from './pages/LocalIssyLesMoulineaux';
import LocalIDF from './pages/LocalIDF';
import LocalHautsDeSeine from './pages/LocalHautsDeSeine';
import LocalSeineSaintDenis from './pages/LocalSeineSaintDenis';
import LocalValDeMarne from './pages/LocalValDeMarne';
import LocalYvelines from './pages/LocalYvelines';
import LocalEssonne from './pages/LocalEssonne';
import LocalValDOise from './pages/LocalValDOise';
import LocalSeineEtMarne from './pages/LocalSeineEtMarne';
import LongueDistance from './pages/LongueDistance';
import LongueDistanceParisLyon from './pages/LongueDistanceParisLyon';
import LongueDistanceParisMarseille from './pages/LongueDistanceParisMarseille';
import LongueDistanceParisBordeaux from './pages/LongueDistanceParisBordeaux';
import LongueDistanceParisToulouse from './pages/LongueDistanceParisToulouse';
import LongueDistanceParisNantes from './pages/LongueDistanceParisNantes';
import LongueDistanceParisLille from './pages/LongueDistanceParisLille';
import LongueDistanceParisStrasbourg from './pages/LongueDistanceParisStrasbourg';
import LongueDistanceParisMontpellier from './pages/LongueDistanceParisMontpellier';
import LongueDistanceParisRennes from './pages/LongueDistanceParisRennes';
import SecteursDesservis from './pages/SecteursDesservis';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Header />
        <main>
          <PageTransition>
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
              <Route path="/demenagement-issy-les-moulineaux" element={<LocalIssyLesMoulineaux />} />
              <Route path="/demenagement-ile-de-france" element={<LocalIDF />} />
              <Route path="/demenagement-hauts-de-seine" element={<LocalHautsDeSeine />} />
              <Route path="/demenagement-seine-saint-denis" element={<LocalSeineSaintDenis />} />
              <Route path="/demenagement-val-de-marne" element={<LocalValDeMarne />} />
              <Route path="/demenagement-yvelines" element={<LocalYvelines />} />
              <Route path="/demenagement-essonne" element={<LocalEssonne />} />
              <Route path="/demenagement-val-d-oise" element={<LocalValDOise />} />
              <Route path="/demenagement-seine-et-marne" element={<LocalSeineEtMarne />} />
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
              
              {/* Legacy / Simple Paths */}
              <Route path="/particuliers" element={<DemenagementParticuliers />} />
              <Route path="/entreprises" element={<DemenagementEntreprises />} />
              <Route path="/garde-meuble" element={<GardeMeuble />} />
              <Route path="/monte-meuble" element={<MonteMeuble />} />
              <Route path="/emballage" element={<Emballage />} />
              <Route path="/formules" element={<FormulasPage />} />

              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/mentions-legales" element={<Legal />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
        <MobileCTA />
      </BrowserRouter>
    </HelmetProvider>
  );
}
