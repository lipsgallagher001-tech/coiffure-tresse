
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Loader2, Sparkle } from 'lucide-react';
import { getHairAdvice } from '../geminiService';
import { Message } from '../types';

export const HairAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Je suis Aïda, votre curatrice capillaire personnelle. Quel secret beauté souhaitez-vous percer aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getHairAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section className="section-spacing bg-stone-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-terracotta font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Innovation</span>
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-4">Aïda <span className="italic text-terracotta">Intelligence</span></h2>
          <p className="text-stone-500 max-w-lg mx-auto text-sm">Une expertise haut de gamme à portée de main pour vos soins quotidiens.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row h-[700px]">
          {/* Sidebar / Profile Area */}
          <div className="w-full md:w-80 bg-stone-900 p-10 text-white flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-3xl bg-terracotta flex items-center justify-center mb-8 shadow-lg shadow-terracotta/20">
                <Sparkle size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Aïda Expert</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 font-light">
                Consultation instantanée pour types 3A à 4C. Posez vos questions sur la croissance, l'hydratation ou le style.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-300">Système Optique Actif</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terracotta"></div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-300">Base de données Coiffure</span>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-stone-800">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Expérience Digitale de Luxe</span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-grow flex flex-col bg-white">
            <div 
              ref={scrollRef}
              className="flex-grow p-10 overflow-y-auto space-y-8 bg-stone-50/30"
            >
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] flex items-end gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${m.role === 'user' ? 'bg-terracotta text-white' : 'bg-white text-stone-900 border border-stone-100'}`}>
                        {m.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                      </div>
                      <div className={`p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-stone-900 text-white rounded-br-none' : 'bg-white text-stone-800 rounded-bl-none border border-stone-100'}`}>
                        {m.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-6 py-4 rounded-full shadow-sm border border-stone-100 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-terracotta animate-spin" />
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Analyse en cours...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-8 bg-white border-t border-stone-100">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Écrivez votre question ici..."
                  className="w-full pl-8 pr-20 py-6 bg-stone-50 border-stone-100 rounded-[2.5rem] text-sm focus:ring-0 focus:bg-white focus:border-terracotta transition-all outline-none border"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 p-4 bg-stone-900 text-white rounded-full hover:bg-terracotta transition-all disabled:opacity-30 active:scale-95"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
