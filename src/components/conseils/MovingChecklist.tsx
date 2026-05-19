import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Calendar, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  important?: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tasks: Task[];
}

const CHECKLIST_DATA: ChecklistSection[] = [
  {
    id: 'm1',
    title: '1 mois avant',
    subtitle: 'Lancement des démarches',
    icon: Calendar,
    tasks: [
      { id: 'm1-1', text: 'Confirmer la date et réserver Marne Transdem', important: true },
      { id: 'm1-2', text: 'Donner votre préavis (bailleur/agence)' },
      { id: 'm1-3', text: 'Commencer à trier : vendre, donner ou jeter' },
      { id: 'm1-4', text: 'Inscrire les enfants à la nouvelle école' },
      { id: 'm1-5', text: 'Vérifier vos contrats d\'assurance habitation' },
    ]
  },
  {
    id: 'j15',
    title: '15 jours avant',
    subtitle: 'Organisation & Emballage',
    icon: Clock,
    tasks: [
      { id: 'j15-1', text: 'Récupérer les cartons et matériel d\'emballage', important: true },
      { id: 'j15-2', text: 'Emballer les objets peu utilisés (livres, déco)', important: true },
      { id: 'j15-3', text: 'Gérer les contrats : Energie, Eau, Internet' },
      { id: 'j15-4', text: 'Signaler votre changement d\'adresse (Poste, impôts)' },
      { id: 'j15-5', text: 'Prévoir le stationnement pour le camion' },
    ]
  },
  {
    id: 'j1',
    title: 'Jour J',
    subtitle: 'Action & Sérénité',
    icon: Sparkles,
    tasks: [
      { id: 'j1-1', text: 'Préparer un "sac de survie" (papiers, chargeurs, snacks)', important: true },
      { id: 'j1-2', text: 'Relever les compteurs (ancien et nouveau logement)' },
      { id: 'j1-3', text: 'Vérifier qu\'aucun placard n\'est resté plein' },
      { id: 'j1-4', text: 'Faire le tour du logement avec les déménageurs' },
      { id: 'j1-5', text: 'Relâcher la pression : Marne Transdem gère la manutention !' },
    ]
  }
];

export const MovingChecklist: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState(CHECKLIST_DATA[0].id);

  const toggleTask = (id: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedTasks(newCompleted);
  };

  const activeSection = CHECKLIST_DATA.find(s => s.id === activeTab) || CHECKLIST_DATA[0];
  const progress = Math.round((completedTasks.size / CHECKLIST_DATA.reduce((acc, s) => acc + s.tasks.length, 0)) * 100);

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 italic">
      <div className="bg-brand-900 p-8 md:p-12 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Votre Compagnon de Route</h3>
            <p className="text-slate-400 font-light italic">Suivez votre progression étape par étape pour ne rien oublier.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center min-w-[120px]">
             <span className="text-accent text-3xl font-black italic">{progress}%</span>
             <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Terminé</span>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl">
          {CHECKLIST_DATA.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === section.id ? 'bg-accent text-brand-900' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon size={16} />
              <span className="hidden sm:inline">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h4 className="text-brand-900 text-xl font-black uppercase italic mb-1 tracking-tight">{activeSection.title}</h4>
              <p className="text-slate-400 italic text-sm">{activeSection.subtitle}</p>
            </div>

            <div className="space-y-4">
              {activeSection.tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full flex items-start gap-4 p-5 rounded-2xl transition-all border text-left group ${
                    completedTasks.has(task.id)
                      ? 'bg-slate-50 border-slate-100 opacity-60'
                      : 'bg-white border-slate-100 hover:border-accent hover:shadow-lg translate-y-0 hover:-translate-y-1'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {completedTasks.has(task.id) ? (
                      <CheckCircle2 className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-slate-200 group-hover:text-accent" size={24} />
                    )}
                  </div>
                  <div className="flex-grow">
                     <p className={`font-bold italic transition-all ${
                        completedTasks.has(task.id) ? 'text-slate-400 line-through' : 'text-brand-900'
                     }`}>
                        {task.text}
                     </p>
                     {task.important && !completedTasks.has(task.id) && (
                       <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-black uppercase tracking-widest text-accent">
                         <AlertCircle size={10} /> Crucial
                       </span>
                     )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
         <p className="text-slate-400 text-xs italic">
           Astuce : Cette liste est sauvegardée localement sur votre navigateur.
         </p>
      </div>
    </div>
  );
};
