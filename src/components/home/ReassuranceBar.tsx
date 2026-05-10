import React from 'react';
import { REASSURANCES } from '../../constants';
import { motion } from 'motion/react';

export const ReassuranceBar: React.FC = () => {
  return (
    <div className="bg-white border-y border-slate-100 py-10 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASSURANCES.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="p-3 bg-brand-900/5 rounded-xl text-brand-900 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <item.icon size={28} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-brand-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-tight">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
