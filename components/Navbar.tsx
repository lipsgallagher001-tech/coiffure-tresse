
import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: 'home' },
    { name: 'Services', href: 'services' },
    { name: 'Histoire', href: 'about' },
    { name: 'Galerie', href: 'gallery' },
    { name: 'Avis', href: 'testimonials' },
  ];

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
      setIsOpen(false);
    }
  };

  const handleBookingClick = () => {
    setIsOpen(false);
    onOpenBooking();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-terracotta text-white' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
              <Scissors size={20} />
            </div>
            <span className={`text-xl font-serif font-bold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Elegance Ebène
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all hover:text-terracotta ${scrolled ? 'text-gray-600' : 'text-white/80'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={handleBookingClick}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${scrolled ? 'bg-terracotta text-white shadow-lg hover:shadow-xl translate-y-0 active:translate-y-0.5' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
            >
              Réserver
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-lg font-serif text-gray-800 hover:text-terracotta border-b border-gray-50 pb-2"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={handleBookingClick}
                className="w-full bg-terracotta text-white px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
              >
                Prendre rendez-vous
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
