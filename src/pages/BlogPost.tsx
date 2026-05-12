import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you'd fetch this from Firebase or a file
  const posts: Record<string, any> = {
    "1": {
      title: "10 conseils pour un déménagement sans stress à Paris",
      date: "12 Avril 2026",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1200",
      content: `
        <p>Déménager à Paris peut rapidement devenir un défi logistique. Entre les rues étroites, les places de stationnement rares et les escaliers exigus, une préparation minutieuse est indispensable.</p>
        <h2>1. Anticipez les autorisations de stationnement</h2>
        <p>À Paris, il est impératif de réserver son emplacement au moins 15 jours à l'avance auprès de la mairie d'arrondissement. Marne Transdem gère généralement cette étape pour ses clients.</p>
        <h2>2. Triez avant d'emballer</h2>
        <p>Moins vous avez de volume, moins le déménagement coûte cher. C'est le moment idéal pour donner ou vendre ce dont vous n'avez plus besoin.</p>
        <h2>3. Prévoyez un monte-meuble</h2>
        <p>Beaucoup d'immeubles parisiens interdisent l'usage de l'ascenseur pour le déménagement. Un monte-meuble extérieur est souvent plus rapide et sécurisé.</p>
      `
    }
  };

  const post = posts[id || "1"] || posts["1"];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={`${post.title} | Blog Marne Transdem`}
        description={post.title}
      />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent font-bold uppercase text-[10px] tracking-widest mb-12 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour aux articles
            </Link>

            <header className="mb-12">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex items-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest mb-8"
               >
                 <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                   <Calendar size={14} className="text-accent" /> {post.date}
                 </span>
                 <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                   <Clock size={14} className="text-accent" /> {post.readTime} de lecture
                 </span>
               </motion.div>

               <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-12 leading-[1.1] tracking-tight">
                 {post.title}
               </h1>
            </header>

            <div className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl relative">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-brand-900/10 pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               <aside className="lg:col-span-1 border-r border-slate-100 hidden lg:flex flex-col gap-8 sticky top-32 h-fit pr-8">
                  <span className="text-[10px] font-black uppercase text-slate-300 transform -rotate-90 origin-left mt-8 tracking-[0.3em] whitespace-nowrap">Partager</span>
                  <div className="flex flex-col gap-6">
                     <button className="text-slate-400 hover:text-brand-900 transition-colors"><Facebook size={20} /></button>
                     <button className="text-slate-400 hover:text-brand-900 transition-colors"><Twitter size={20} /></button>
                     <button className="text-slate-400 hover:text-brand-900 transition-colors"><Linkedin size={20} /></button>
                  </div>
               </aside>

               <div className="lg:col-span-11 prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:text-brand-900 prose-headings:font-black prose-headings:italic prose-a:text-accent prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 font-light leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
               </div>
            </div>

            <div className="mt-20 p-10 md:p-16 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col md:flex-row items-center gap-12">
               <div className="w-24 h-24 bg-brand-900 rounded-[2rem] flex items-center justify-center shrink-0">
                  <User size={48} className="text-accent" />
               </div>
               <div>
                  <h4 className="text-2xl font-black text-brand-900 mb-4 uppercase italic">L'avis de notre expert</h4>
                  <p className="text-slate-500 font-light italic leading-relaxed">
                    Chez Marne Transdem, nous croyons qu'un déménagement réussi passe par une information transparente. Nos conseillers sont à votre disposition à Paris pour répondre à toutes vos questions techniques.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                     <Link to="/demande-de-devis" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-xl transition-all">
                        Demander un conseil
                     </Link>
                     <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-sm hover:border-accent transition-all flex items-center justify-center gap-2">
                        {CONTACT.phone}
                     </a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </article>

      {/* Recommended Posts */}
       <section className="py-24 bg-slate-50 border-t border-slate-100">
         <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-2xl md:text-4xl font-black text-brand-900 mb-12 uppercase italic underline decoration-accent/20 underline-offset-8">Articles recommandés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Simplified recommendation cards */}
               <Link to="/blog/2" className="group bg-white p-8 rounded-[3rem] border border-slate-100 hover:border-accent transition-all flex items-center gap-8 shadow-sm hover:shadow-xl">
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=200" alt="Calcul volume" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-black text-brand-900 group-hover:text-accent transition-colors mb-2 uppercase italic leading-tight">Estimer son volume</h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lire l'article</span>
                  </div>
               </Link>
               <Link to="/blog/1" className="group bg-white p-8 rounded-[3rem] border border-slate-100 hover:border-accent transition-all flex items-center gap-8 shadow-sm hover:shadow-xl">
                  <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=200" alt="Paris" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-black text-brand-900 group-hover:text-accent transition-colors mb-2 uppercase italic leading-tight">10 conseils zéro stress</h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lire l'article</span>
                  </div>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BlogPost;
