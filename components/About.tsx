
import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" 
                alt="Founder" 
                className="rounded-[3rem] shadow-2xl w-full"
              />
              <div className="absolute -bottom-10 -right-10 bg-terracotta p-10 rounded-[2rem] text-white shadow-xl hidden lg:block max-w-[240px]">
                <p className="font-serif text-2xl italic leading-tight">"La beauté est un langage que nous parlons à travers chaque tresse."</p>
              </div>
            </motion.div>
            {/* Decorative background shape */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-stone-100 rounded-full -z-0 opacity-50 blur-3xl"></div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-terracotta font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Notre Héritage</h4>
              <h2 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 leading-none">
                Sculpter votre <br /><span className="text-deep-gold italic">Couronne.</span>
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed font-light text-lg">
                <p>
                  Elegance Ebène est née d'une vision : fusionner les techniques de tressage ancestrales africaines avec les standards du luxe international.
                </p>
                <p>
                  Chaque cliente qui franchit notre porte est une muse. Nous ne coiffons pas simplement des cheveux ; nous révélons l'essence et la puissance qui sommeillent en vous.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 pt-12 mt-12 border-t border-stone-100">
                <div>
                  <span className="block text-5xl font-serif font-bold text-terracotta mb-2">15+</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Années d'Artisanat</span>
                </div>
                <div>
                  <span className="block text-5xl font-serif font-bold text-terracotta mb-2">5k+</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Clientes Heureuses</span>
                </div>
              </div>

              <button className="mt-12 text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 border border-stone-200 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300">
                En Savoir Plus
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
