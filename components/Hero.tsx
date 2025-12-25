
import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-stone-100">
      {/* Background with split design feel */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-100/40 to-transparent lg:block hidden"></div>
        <div className="absolute inset-0 bg-black/40 lg:hidden"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 mb-6 border-l-4 border-terracotta text-terracotta lg:text-gray-900 font-semibold tracking-widest uppercase text-xs">
              L'Excellence de la Coiffure en Afrique
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl text-white lg:text-gray-900 font-serif font-bold mb-8 leading-[0.9] tracking-tight"
          >
            Vivez la <br /> <span className="italic text-terracotta">Perfection.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-stone-200 lg:text-stone-600 mb-12 font-light max-w-lg leading-relaxed"
          >
            Des tresses sculpturales aux soins profonds, nous redéfinissons l'élégance capillaire africaine avec une touche de modernité absolue.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <button 
              onClick={() => scrollToSection('services')}
              className="bg-terracotta text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Nos Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-white/10 backdrop-blur-md lg:bg-white lg:shadow-md text-white lg:text-gray-900 border border-white/20 lg:border-none px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-50 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Notre Histoire
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator inspired by modern minimalist design */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white lg:text-gray-400 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Défiler</span>
        <div className="w-px h-12 bg-current opacity-30"></div>
      </motion.div>
    </div>
  );
};
