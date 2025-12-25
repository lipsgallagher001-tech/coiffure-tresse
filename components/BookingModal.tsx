
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Scissors, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Merci ! Votre demande de réservation a été envoyée. Nous vous contacterons sous peu.");
    onClose();
  };

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
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Left Side: Visual/Info */}
              <div className="hidden md:block w-1/3 bg-stone-900 p-8 text-white relative">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <Scissors className="text-terracotta mb-6" size={32} />
                    <h3 className="text-3xl font-serif font-bold leading-tight mb-4">Un Instant <br /><span className="text-terracotta italic">Rien qu'à Vous.</span></h3>
                    <p className="text-stone-400 text-sm font-light">Réservez votre séance et laissez nos mains expertes sublimer votre beauté naturelle.</p>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500">
                    Elegance Ebène • Luxe & Tradition
                  </div>
                </div>
                {/* Background decorative elements */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl -mb-10 -mr-10"></div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-terracotta text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Réservation</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">Prendre RDV</h2>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-2">
                        <User size={12} /> Nom Complet
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="Aïcha Koné"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>
                    {/* Téléphone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-2">
                        <Phone size={12} /> Numéro
                      </label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+225 07 00 00 00"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-2">
                        <Calendar size={12} /> Date
                      </label>
                      <input 
                        required
                        type="date" 
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>
                    {/* Heure */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-2">
                        <Clock size={12} /> Heure
                      </label>
                      <input 
                        required
                        type="time" 
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold flex items-center gap-2">
                      <MessageSquare size={12} /> Notes particulières
                    </label>
                    <textarea 
                      placeholder="Une demande spécifique pour votre coiffure ?"
                      rows={4}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-terracotta text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-stone-900 transition-all hover:-translate-y-1 active:translate-y-0"
                  >
                    Confirmer la Réservation
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
