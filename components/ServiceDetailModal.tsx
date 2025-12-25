
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onBook: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, service, onBook }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/80 backdrop-blur-md z-[110]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[111] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:hidden"></div>
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full md:hidden"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 md:p-14 overflow-y-auto relative flex flex-col">
                <button 
                  onClick={onClose}
                  className="absolute top-10 right-10 p-2 text-stone-300 hover:text-stone-900 transition-colors hidden md:block"
                >
                  <X size={28} />
                </button>

                <div className="mb-8">
                  <span className="text-terracotta font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Détails de la Prestation</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-4">
                    {service.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-serif italic text-terracotta font-bold">{service.price}</span>
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest">
                      <Clock size={14} className="text-terracotta" /> 
                      Environ 2h - 4h
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-stone-600 leading-relaxed font-light mb-10">
                  <p>{service.description}</p>
                  
                  <div className="space-y-4 pt-6 border-t border-stone-100">
                    <h4 className="text-stone-900 font-bold text-[10px] uppercase tracking-widest">Inclus dans la séance :</h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {[
                        "Consultation personnalisée & Diagnostic IA",
                        "Lavage avec soins botaniques premium",
                        "Application de sérums protecteurs",
                        "Conseils d'entretien post-coiffure"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 size={16} className="text-terracotta flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      onClose();
                      onBook();
                    }}
                    className="flex-[2] bg-terracotta text-white px-8 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:bg-stone-900 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-4 group"
                  >
                    <Sparkles size={20} className="text-white/80 group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] leading-tight text-center">
                      Réserver ce service
                    </span>
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 px-8 py-5 border border-stone-200 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-all text-center"
                  >
                    Retour
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
