
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Zap } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: "Qualité", desc: "Produits premium" },
  { icon: Heart, title: "Passion", desc: "Soin sur mesure" },
  { icon: Sparkles, title: "Luxe", desc: "Expérience unique" },
  { icon: Zap, title: "Expertise", desc: "Main de maître" },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-6 group-hover:bg-terracotta group-hover:text-white transition-all duration-500 shadow-sm">
                <f.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-stone-400 text-xs uppercase tracking-widest">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
