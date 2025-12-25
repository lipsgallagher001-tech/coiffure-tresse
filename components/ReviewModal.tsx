
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare, User, Briefcase, Check } from 'lucide-react';
import { Testimonial } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Testimonial, 'id' | 'status' | 'date'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      role: formData.get('role') as string || 'Cliente',
      content: formData.get('content') as string,
      rating: rating,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[110]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[111] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden pointer-events-auto"
            >
              {isSubmitted ? (
                <div className="p-16 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold">Merci infiniment !</h3>
                  <p className="text-stone-500 text-sm">Votre avis a été envoyé. Il apparaîtra sur le site après validation par notre équipe.</p>
                </div>
              ) : (
                <>
                  <div className="p-10 border-b border-stone-50 flex justify-between items-center bg-stone-50/50">
                    <div>
                      <span className="text-terracotta text-[10px] font-bold uppercase tracking-[0.3em] block mb-1">Votre Expérience</span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">Partager un Avis</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-stone-400"><X size={20} /></button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <div className="flex flex-col items-center space-y-3 pb-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Quelle note donneriez-vous ?</span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform active:scale-90"
                          >
                            <Star 
                              size={32} 
                              className={`transition-colors ${
                                star <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                          <User size={12} /> Nom
                        </label>
                        <input name="name" required placeholder="Ex: Fatou" className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                          <Briefcase size={12} /> Label (Optionnel)
                        </label>
                        <input name="role" placeholder="Ex: Cliente fidèle" className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <MessageSquare size={12} /> Votre témoignage
                      </label>
                      <textarea name="content" required rows={4} placeholder="Racontez-nous votre moment chez Elegance Ebène..." className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all resize-none" />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-stone-900 text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-terracotta transition-all flex items-center justify-center gap-2"
                    >
                      Publier mon avis
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
