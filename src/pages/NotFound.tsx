import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-900 text-white flex items-center justify-center p-6">
      <SEO 
        title="Page non trouvée | Marne Transdem"
        description="La page que vous recherchez n'existe pas."
        robots="noindex, nofollow"
      />
      
      <div className="max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-black text-accent mb-6 tracking-tighter">404</h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Oups ! Page introuvable.</h2>
          <p className="text-lg text-slate-300 mb-12 font-light">
            Il semble que vous ayez emprunté un chemin qui n'existe pas. Revenons sur la bonne voie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 transition-all italic">
              <Home size={22} />
              Retour à l'accueil
            </Link>
            <button onClick={() => window.history.back()} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm italic">
              <ArrowLeft size={22} />
              Page précédente
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
