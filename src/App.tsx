/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route,  useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PageTransition } from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';
import { PageSkeleton } from './components/common/PageSkeleton';

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
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics').then(module => ({ default: module.AdminAnalytics })));
const Login = lazy(() => import('./pages/Login'));
const ClientTracking = lazy(() => import('./pages/ClientTracking'));
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
const SectorPage = lazy(() => import('./pages/SectorPage'));


const CookieConsent = lazy(() => import('./components/common/CookieConsent').then(module => ({ default: module.CookieConsent })));
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isMinimalPage = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname.startsWith('/suivi');

  return (
    <>
      <ScrollToTop />
      {!isMinimalPage && (
        <Suspense fallback={<div className="h-20 bg-transparent" />}>
          <Header />
        </Suspense>
      )}
      <main>
        <PageTransition>
          <Suspense fallback={<PageSkeleton />}>
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
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/suivi/:moveId" element={<ClientTracking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/demenagement-:slug" element={<SectorPage />} />
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
      {!isMinimalPage && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
      {!isMinimalPage && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
      {!isMinimalPage && (
        <Suspense fallback={null}>
          <MobileCTA />
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  const HelmetProviderCast = HelmetProvider as any;
  return (
    <ThemeProvider>
      <AuthProvider>
        <HelmetProviderCast>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </HelmetProviderCast>
      </AuthProvider>
    </ThemeProvider>
  );
}
