
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { id: 1, url: 'https://images.unsplash.com/photo-1622285161427-4a0b22709e9e?q=80&w=800&auto=format&fit=crop', category: 'Tresses', span: 'col-span-1 row-span-1' },
  { id: 2, url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop', category: 'Mariage', span: 'col-span-1 row-span-2' },
  { id: 3, url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop', category: 'Couleur', span: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=800&auto=format&fit=crop', category: 'Naturel', span: 'col-span-1 row-span-1' },
  { id: 5, url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', category: 'Locks', span: 'col-span-1 row-span-1' },
  { id: 6, url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop', category: 'Mariage', span: 'col-span-1 row-span-1' },
];

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', 'Tresses', 'Mariage', 'Naturel', 'Locks'];

  const filteredImages = filter === 'Tous' ? images : images.filter(img => img.category === filter);

  return (
    <section className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-terracotta font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Portfolio</span>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-none">Exposition de <br /><span className="italic text-stone-300">Styles</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-stone-900 text-white shadow-xl' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative overflow-hidden rounded-[2.5rem] shadow-sm group ${img.span}`}
              >
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-white font-serif italic text-3xl mb-2">{img.category}</span>
                  <div className="w-10 h-1 bg-terracotta"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
