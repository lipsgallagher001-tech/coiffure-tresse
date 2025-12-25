
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, PlusCircle } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onAddReview: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, onAddReview }) => {
  return (
    <section className="section-spacing bg-stone-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-terracotta font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block"
            >
              Témoignages
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-serif font-bold leading-none"
            >
              Paroles <br /><span className="italic text-terracotta">d'Éclat.</span>
            </motion.h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddReview}
            className="flex items-center gap-3 bg-white/10 hover:bg-terracotta border border-white/20 hover:border-terracotta px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl"
          >
            <PlusCircle size={18} />
            Laisser un avis
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group h-full"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[3rem] h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:-translate-y-2">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? "fill-terracotta text-terracotta" : "text-white/10"} />
                  ))}
                </div>
                
                <Quote className="text-terracotta/20 absolute top-10 right-10" size={48} />
                
                <p className="text-stone-300 italic mb-8 leading-relaxed font-light flex-grow">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-terracotta/30 bg-stone-800 flex items-center justify-center text-xs font-serif font-bold">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg">{t.name}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-stone-500">{t.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
