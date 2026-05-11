import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, Send, CheckCircle2, Info, Building2, Home, Box, Zap, Truck, Loader2 } from 'lucide-react';
import { CONTACT, SERVICES, NAVIGATION } from '../constants';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { getBreadcrumbSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/schema';

const Contact: React.FC = () => {
  const path = "/contact";
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const formElement = e.currentTarget as HTMLFormElement;
      const formData = new FormData(formElement);
      
      const payload = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'messages'), payload);

      // Send Email Notification
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: payload })
      });

      if (!emailResponse.ok) {
        const errData = await emailResponse.json();
        console.error("Email API Error:", errData);
      }

      setFormState('success');
    } catch (error) {
      setFormState('idle');
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  const faqs = [
    {
      q: "Comment contacter Marne Transdem ?",
      a: "Vous pouvez nous contacter par téléphone au 01 44 93 54 86, par email à contact@marnetransdem.com ou via notre formulaire de contact ci-dessus."
    },
    {
      q: "Puis-je demander un devis en ligne ?",
      a: "Oui, nous disposons d'un formulaire de demande de devis complet qui vous permet d'obtenir une estimation personnalisée selon votre volume et vos accès."
    },
    {
      q: "Intervenez-vous en Île-de-France ?",
      a: "Marne Transdem intervient à Paris et en Île-de-France pour les projets de déménagement de particuliers et d’entreprises, selon les besoins du projet."
    },
    {
      q: "Puis-je appeler pour expliquer mon projet ?",
      a: "Oui, vous pouvez nous appeler pour expliquer votre projet et être orienté vers la solution la plus adaptée."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Contact Marne Transdem | Déménagement à Paris" 
        description="Contactez Marne Transdem pour votre déménagement à Paris, en Île-de-France ou longue distance. Téléphone, email et demande de devis." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Contact", item: path }
          ]),
          getLocalBusinessSchema(),
          getFAQSchema(faqs)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
            <ArrowRight size={10} />
            <span className="text-white">Contact</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
          >
            <Mail size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Contact & devis</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
            Contact <br/>
            <span className="text-accent underline decoration-white/10 underline-offset-8">Marne Transdem</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Une question, un projet de déménagement ou une demande d’information ? Contactez notre équipe pour préparer votre déménagement à Paris, en Île-de-France ou longue distance selon votre projet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
              Demander un devis gratuit
              <ArrowRight size={20} />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Bloc coordonnées principales */}
      <section className="py-24 relative -mt-16 z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: MapPin, 
                title: "Adresse", 
                value: CONTACT.fullAddress,
                sub: "Paris 20e"
              },
              { 
                icon: Phone, 
                title: "Téléphone", 
                value: CONTACT.phone,
                sub: "Appel non surtaxé"
              },
              { 
                icon: Mail, 
                title: "Email", 
                value: CONTACT.email,
                sub: "Contact par email"
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium group hover:border-accent transition-all"
              >
                <div className="w-14 h-14 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <card.icon size={28} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">{card.title}</div>
                <div className="text-xl font-bold text-brand-900 mb-2">{card.value}</div>
                <div className="text-xs text-slate-400 font-medium">{card.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section principale (Formulaire + Aide) */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Colonne Gauche: Formulaire */}
            <div className="lg:col-span-12 xl:col-span-8">
              <div className="mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-6">Envoyer un message</h2>
                <p className="text-slate-500 font-light leading-relaxed">
                  Pour une question générale ou une première prise de contact, remplissez ce formulaire. Pour une demande de déménagement détaillée, utilisez plutôt notre formulaire de devis.
                </p>
              </div>

              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-12 rounded-[3rem] text-center"
                >
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-4">Message envoyé !</h3>
                  <p className="text-slate-600 font-light leading-relaxed mb-8">
                    Votre message a bien été envoyé. L’équipe Marne Transdem vous recontactera dans les meilleurs délais.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-accent font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 ml-4">Nom et prénom <span className="text-accent">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-medium text-brand-900" 
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 ml-4">Téléphone <span className="text-accent">*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-medium text-brand-900" 
                        placeholder="01 02 03 04 05"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 ml-4">Email <span className="text-accent">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-medium text-brand-900" 
                        placeholder="contact@exemple.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 ml-4">Objet de la demande <span className="text-accent">*</span></label>
                      <select 
                        id="subject"
                        name="subject"
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-medium text-brand-900 appearance-none"
                      >
                        <option value="">Sélectionnez un objet</option>
                        <option value="information">Demande d'information</option>
                        <option value="recrutement">Recrutement</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 ml-4">Message <span className="text-accent">*</span></label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={6} 
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:border-accent focus:bg-white transition-all font-medium text-brand-900 resize-none" 
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>

                  <div className="flex items-start gap-4 ml-2">
                    <input type="checkbox" id="consent" required className="mt-1 accent-accent" />
                    <label htmlFor="consent" className="text-sm text-slate-500 font-light">
                      J’accepte que Marne Transdem me contacte au sujet de ma demande.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/20 disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <>
                        Envoi en cours...
                        <Loader2 size={20} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Colonne Droite: Bloc d'aide */}
            <div className="lg:col-span-12 xl:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="bg-brand-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-2xl font-bold mb-6 relative z-10 text-white">Besoin d’un devis de déménagement ?</h3>
                  <p className="text-slate-300 font-light text-sm leading-relaxed mb-10 relative z-10">
                    Pour obtenir une estimation plus précise, utilisez notre formulaire de demande de devis. Vous pourrez indiquer vos adresses, votre volume, les accès, la formule souhaitée et vos besoins spécifiques.
                  </p>
                  
                  <Link to="/demande-de-devis" className="block w-full bg-accent text-brand-900 py-4 rounded-2xl font-bold text-center hover:bg-accent-hover transition-all mb-10 shadow-lg shadow-accent/20">
                    Accéder au formulaire de devis
                  </Link>

                  <div className="space-y-6 pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Téléphone</div>
                        <div className="font-bold text-white">{CONTACT.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">Email</div>
                        <div className="font-bold text-white">{CONTACT.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                  <h4 className="font-bold text-brand-900 mb-4">Informations utiles</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">
                    Pour toute question relative à votre devis en cours, n'oubliez pas de mentionner votre numéro de dossier si vous en avez un.
                  </p>
                  <ul className="space-y-3">
                    {["Déménagement particuliers", "Transfert de bureaux", "Garde-meuble"].map((info, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-brand-900">
                        <CheckCircle2 size={14} className="text-accent" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section zone d’intervention */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-6">Nous intervenons à Paris et en Île-de-France</h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
                Basée à Paris 20e, Marne Transdem accompagne les particuliers et les entreprises pour leurs projets de déménagement à Paris, en Île-de-France et longue distance selon les besoins.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black text-brand-900 uppercase tracking-[0.4em] mb-8 text-center opacity-40">Zones desservies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Paris", "Paris 20e", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne",
                  "Val-d’Oise", "Yvelines", "Essonne", "Seine-et-Marne", "Longue distance*"
                ].map((zone, idx) => (
                  <div key={idx} className="bg-slate-50 py-3 px-4 rounded-xl text-center text-sm font-bold text-brand-900 border border-slate-100">
                    {zone}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-slate-400 text-center italic">* Selon étude et volume du projet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pourquoi nous contacter ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-12 text-center tracking-tight">Pourquoi nous contacter ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Home, 
                title: "Déménagement particulier", 
                path: "/demenagement-particulier-paris",
                desc: "Préparer votre changement de résidence." 
              },
              { 
                icon: Building2, 
                title: "Déménagement entreprise", 
                path: "/transfert-bureau-paris",
                desc: "Organiser un transfert de bureaux." 
              },
              { 
                icon: Zap, 
                title: "Nos formules", 
                path: "/formules-demenagement",
                desc: "Choisir la prestation adaptée." 
              },
              { 
                icon: Box, 
                title: "Services complémentaires", 
                path: "/emballage-protection-demenagement",
                desc: "Stockage, monte-meuble ou emballage." 
              }
            ].map((card, idx) => (
              <Link key={idx} to={card.path} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent transition-all hover:shadow-xl group">
                <div className="w-14 h-14 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <card.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4">{card.title}</h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest">
                  Découvrir
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent/5 blur-[120px]"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex gap-6 items-start">
                <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center text-accent shrink-0">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-3">{faq.q}</h4>
                  <p className="text-slate-300 font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA final */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-8 tracking-tight">Un projet de déménagement à préparer ?</h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Contactez Marne Transdem ou remplissez notre formulaire de devis pour décrire votre projet plus précisément.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis gratuit
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
