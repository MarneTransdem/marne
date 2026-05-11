import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      slug: "1",
      title: "10 conseils pour un déménagement sans stress à Paris",
      excerpt: "S'organiser à l'avance est la clé. Découvrez nos meilleures astuces pour anticiper le jour J en toute sérénité.",
      date: "12 Avril 2026",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000",
      category: "Conseils"
    },
    {
      id: 2,
      slug: "reims",
      title: "Comment réussir son déménagement à Reims en 2026 ?",
      excerpt: "La cité des Sacres est en pleine mutation. Guide complet pour réussir votre installation ou votre départ de Reims.",
      date: "15 Mai 2026",
      image: "https://images.unsplash.com/photo-1590059239841-a9c049008985?auto=format&fit=crop&q=80&w=1000",
      category: "Expertise"
    },
    {
      id: 3,
      slug: "2",
      title: "Comment estimer le volume de son déménagement ?",
      excerpt: "Calculer son litrage en m3 est essentiel pour choisir le bon camion. Notre guide complet.",
      date: "05 Mai 2026",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000",
      category: "Guide"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Blog & Conseils Déménagement | Marne Transdem" 
        description="Retrouvez nos guides et astuces pour réussir votre déménagement à Paris et dans la Marne. Préparation, emballage, formalités."
      />
      
      <section className="bg-brand-900 text-white pt-48 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Le Mag <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 font-sans italic">Transdem</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light italic leading-relaxed max-w-2xl">
              L'expertise Marne Transdem au service de votre mobilité. Conseils, guides et actualités du déménagement à Paris et dans le Grand Est.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map(post => (
              <article key={post.id} className="group flex flex-col h-full">
                <Link to={`/blog/${post.slug}`} className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-xl hover:shadow-2xl transition-all duration-700 block">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors"></div>
                   <div className="absolute top-8 left-8 bg-accent text-brand-900 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      {post.category}
                   </div>
                </Link>
                
                <div className="px-2 flex flex-col flex-grow">
                   <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-2">Equipe Expert</span>
                   </div>
                   
                   <h2 className="text-2xl md:text-3xl font-black text-brand-900 mb-6 group-hover:text-accent transition-colors leading-tight uppercase italic tracking-tight underline decoration-accent/0 group-hover:decoration-accent/20 underline-offset-4 decoration-2">
                     {post.title}
                   </h2>
                   <p className="text-slate-500 text-sm italic font-light leading-relaxed mb-8">
                     {post.excerpt}
                   </p>
                   
                   <div className="mt-auto pt-6 border-t border-slate-100">
                      <Link to={`/blog/${post.slug}`} className="text-brand-900 font-black flex items-center gap-3 hover:gap-5 transition-all uppercase text-xs tracking-widest group-hover:text-accent">
                        Lire l'article <ArrowRight size={18} className="text-accent" />
                      </Link>
                   </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
             <button className="bg-white text-brand-900 border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:border-accent hover:text-accent transition-all">
                Charger plus d'articles
             </button>
          </div>
        </div>
      </section>

      {/* Newsletter Placeholder */}
      <section className="py-24 bg-white border-y border-slate-100">
         <div className="container mx-auto px-4 md:px-6">
            <div className="bg-slate-50 rounded-[3rem] p-12 text-center max-w-4xl mx-auto border border-white">
               <Tag className="text-accent mx-auto mb-6" size={40} />
               <h3 className="text-3xl font-bold text-brand-900 mb-4">Ne manquez aucun conseil</h3>
               <p className="text-slate-600 mb-8">Recevez par email notre checklist complète pour ne rien oublier le jour de votre déménagement.</p>
               <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input type="email" placeholder="votre@email.com" className="flex-grow bg-white border border-slate-200 rounded-full px-6 py-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" />
                  <button className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all shadow-lg">Incription</button>
               </form>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Blog;
