import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight, RefreshCw, LogIn, ExternalLink } from 'lucide-react';
import { useGoogleReviews } from '../../services/googleReviewsService';
import { APIProvider } from '@vis.gl/react-google-maps';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { QRCodeSVG } from 'qrcode.react';

// Hardcoded for Marne Transdem Paris
// This is the Place ID for the Paris location at Maraîchers
const PLACE_ID = 'ChIJL2dd80xv5kcR0XnQ9K6yX0'; 
const REVIEW_LINK = 'https://g.page/r/CfMHwv-XtPiPEAE/review';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const ReviewCard: React.FC<{ review: any; index: number }> = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium flex flex-col h-full group hover:border-accent transition-all duration-500"
    >
      <div className="flex items-center gap-4 mb-6">
        {review.authorPhotoUrl ? (
          <img 
            src={review.authorPhotoUrl} 
            alt={review.authorName} 
            className="w-12 h-12 rounded-full border border-slate-100 dark:border-slate-800"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase">
            {review.authorName?.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="font-black text-brand-900 stay-dark uppercase italic text-sm tracking-tight">{review.authorName}</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">{review.relativePublishTimeDescription}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={`${i < review.rating ? 'text-accent fill-accent' : 'text-slate-200'}`} 
          />
        ))}
      </div>

      <div className="relative mb-8 flex-grow">
        <Quote className="absolute -top-2 -left-2 text-accent/10 w-8 h-8 -z-10" />
        <p className="text-slate-600 dark:text-slate-400 italic font-light leading-relaxed text-sm line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
          "{review.text}"
        </p>
      </div>

      <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[10px] font-black text-brand-900 dark:text-white uppercase tracking-widest opacity-30 italic">Avis Google</span>
        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
};

export const GoogleReviews: React.FC = () => {
  const { reviews, isLoading } = useGoogleReviews(PLACE_ID);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300" id="google-reviews">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-accent font-black uppercase text-xs tracking-[0.3em] mb-4 italic">Expérience client</h2>
            <p className="text-4xl md:text-6xl font-black text-brand-900 dark:text-white leading-none tracking-tighter uppercase italic">
              Ils nous font <br/>
              <span className="text-accent underline decoration-brand-900/10 dark:decoration-white/10 underline-offset-8 italic">confiance</span>
            </p>
            <p className="mt-6 text-slate-500 dark:text-slate-400 italic max-w-lg text-sm">
              Découvrez pourquoi nos clients recommandent Marne Transdem pour leur déménagement à Paris. Des avis authentiques, synchronisés en temps réel.
            </p>
          </div>
          {/* Admin Sync button will be added here */}
          <AdminSyncButton />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <RefreshCw size={40} className="text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 5).map((review, idx) => (
              <ReviewCard key={review.id || review.publishTime} review={review} index={idx} />
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-brand-900 rounded-[2rem] p-10 text-white flex flex-col justify-center items-center text-center italic relative overflow-hidden group min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-accent/40 transition-all duration-500"></div>
              
              <div className="bg-white p-4 rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-500">
                <QRCodeSVG 
                  value={REVIEW_LINK} 
                  size={140} 
                  fgColor="#0c112b" 
                  level="H"
                  includeMargin={true}
                />
              </div>

              <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">Et vous ?</h3>
              <p className="text-white/60 text-sm font-light mb-8 italic">Scannez le QR code ou cliquez ci-dessous pour nous laisser une évaluation.</p>
              
              <a 
                href={REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-brand-900 font-black rounded-xl uppercase text-xs tracking-widest hover:bg-white transition-colors"
              >
                Laisser un avis
                <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        )}

        {reviews.length === 0 && !isLoading && (
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 mt-8">
            <p className="text-slate-500 dark:text-slate-400 italic mb-6">Aucun avis synchronisé pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const AdminSyncButton: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === 'contact@marnetransdem.com');
    });
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="flex items-center gap-6">
      <SyncReviews />
    </div>
  );
};

const SyncReviews: React.FC = () => {
    // Only import APIProvider when admin is ready
    return (
        <APIProvider apiKey={API_KEY} version="weekly">
            <SyncContent />
        </APIProvider>
    )
}

const SyncContent: React.FC = () => {
    const { syncWithGoogle } = useGoogleReviews(PLACE_ID);
    const [isSyncing, setIsSyncing] = useState(false);
    
    const handleSync = async () => {
        if (!hasValidKey) {
          alert("La clé API Google Maps n'est pas configurée.");
          return;
        }
        setIsSyncing(true);
        await syncWithGoogle();
        setIsSyncing(false);
    };

    return (
        <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="p-4 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-brand-900 dark:text-white hover:bg-accent hover:text-white transition-all group disabled:opacity-50"
            title="Synchroniser les avis Google Maps"
        >
            <RefreshCw size={24} className={isSyncing ? 'animate-spin text-black' : 'group-hover:rotate-180 transition-transform duration-500 text-black'} />
        </button>
    )
};


export const GoogleReviewsSection: React.FC = () => {
    return <GoogleReviews />;
};
