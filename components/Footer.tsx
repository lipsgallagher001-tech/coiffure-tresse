
import React from 'react';
import { Instagram, Facebook, Twitter, Phone, MapPin, Mail, Scissors, Lock, MessageCircle } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Scissors className="h-8 w-8 text-terracotta" />
              <span className="text-2xl font-serif font-bold">Elegance Ebène</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Célébrer la beauté africaine à travers l'art de la coiffure. Votre couronne est notre passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-terracotta transition-colors" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-terracotta transition-colors" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-terracotta transition-colors" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 transition-colors" title="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="text-terracotta w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Plateau, Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="text-terracotta w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+225 07 00 00 00 00</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="text-terracotta w-5 h-5 flex-shrink-0" />
                <span className="text-sm">contact@elegance-ebene.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Horaires</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Lun - Ven</span>
                <span>09:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>08:30 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-terracotta font-semibold italic">Sur rendez-vous</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Recevez nos conseils et offres exclusives.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-gray-800 border-none rounded-l-lg px-4 py-3 text-sm focus:ring-1 focus:ring-terracotta w-full outline-none"
              />
              <button type="submit" className="bg-terracotta px-4 py-3 rounded-r-lg hover:bg-opacity-90 transition-all">
                Ok
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Elegance Ebène. Tous droits réservés.</p>
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 hover:text-terracotta transition-colors group"
            title="Espace Administration"
          >
            <Lock size={12} className="opacity-30 group-hover:opacity-100 transition-opacity" />
            <span>Portail Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
