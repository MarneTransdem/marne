import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "10 conseils pour un déménagement sans stress à Paris",
      excerpt: "S'organiser à l'avance est la clé. Découvrez nos meilleures astuces pour anticiper le jour J en toute sérénité.",
      date: "12 Avril 2026",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000",
      category: "Conseils"
    },
    {
      id: 2,
      title: "Comment estimer le volume de son déménagement ?",
      excerpt: "Calculer son litrage en m3 est essentiel pour choisir le bon camion et obtenir un devis précis. Notre guide complet.",
      date: "05 Mai 2026",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000",
      category: "Guide"
    },
    {
      id: 3,
      title: "Déménagement d'entreprise : les étapes clés du transfert",
      excerpt: "Minimisez l'interruption de votre activité avec une logistique de transfert de bureaux rodée et professionnelle.",
      date: "28 Mars 2026",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
      category: "Business"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Blog & Conseils Déménagement" 
        description="Retrouvez nos guides et astuces pour réussir votre déménagement à Paris. Préparation, emballage, formalités administratives."
      />
      
      <section className="bg-brand-900 text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Conseils</h1>
            <p className="text-xl text-slate-400">L'expertise Marne Transdem au service de votre projet. Apprenez à préparer votre transition comme un pro.</p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100">
                <div className="relative aspect-video overflow-hidden">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                   </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                      <span className="flex items-center gap-1"><User size={14} /> Equipe Expert</span>
                   </div>
                   
                   <h2 className="text-2xl font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors leading-tight">
                     {post.title}
                   </h2>
                   <p className="text-slate-600 text-sm leading-relaxed mb-8">
                     {post.excerpt}
                   </p>
                   
                   <div className="mt-auto pt-6 border-t border-slate-50">
                      <Link to={`/blog/${post.id}`} className="text-brand-900 font-bold flex items-center gap-2 hover:text-accent transition-colors">
                        Lire la suite <ArrowRight size={18} />
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
