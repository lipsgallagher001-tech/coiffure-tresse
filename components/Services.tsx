
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

const services: Service[] = [
  {
    id: '1',
    title: 'Nattes & Braids',
    description: 'L\'art du tressage ancestral revisité pour la femme moderne. Nos artisanes sculptent des designs uniques, allant des classiques knotless braids aux créations géométriques les plus audacieuses. Nous utilisons des fibres de haute qualité pour garantir légèreté et protection de vos racines.',
    price: '15.000 CFA',
    image: 'https://images.unsplash.com/photo-1622285161427-4a0b22709e9e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Rituel Soin IA',
    description: 'Une révolution technologique au service de vos boucles. Grâce à notre scanner haute définition, nous analysons la porosité, l\'élasticité et l\'état de votre cuir chevelu. S\'ensuit un cocktail de soins botaniques formulés sur mesure pour infuser une hydratation profonde et durable.',
    price: '10.000 CFA',
    image: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: ' Bridal Ebène',
    description: 'La consécration de votre beauté pour le jour J. Une expérience impériale incluant un essai préalable, une coiffure sculpturale ornée d\'accessoires raffinés et un voile posé avec art. Nous travaillons en harmonie avec votre maquillage pour un éclat royal inoubliable.',
    price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop',
  },
];

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (service: Service) => {
    setSelectedService(service);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <section className="section-spacing bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-terracotta font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Notre Expertise</span>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-none">
              Collections <br /><span className="italic text-terracotta">Phares</span>
            </h2>
          </div>
          <p className="text-stone-500 max-w-sm text-sm leading-relaxed">
            Chaque service est une expérience immersive où nous prenons soin de votre identité et de votre bien-être capillaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              onClick={() => handleOpenDetail(service)}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] mb-8 relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-[10px] font-bold text-terracotta uppercase tracking-widest shadow-sm">
                  {service.price}
                </div>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-terracotta transition-colors">{service.title}</h3>
                <p className="text-stone-500 text-sm mb-6 leading-relaxed line-clamp-2 font-light">
                  {service.description}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetail(service);
                  }}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 group-hover:text-terracotta transition-colors"
                >
                  Découvrir l'expérience <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceDetailModal 
        isOpen={isDetailOpen} 
        onClose={handleCloseDetail} 
        service={selectedService}
        onBook={onOpenBooking}
      />
    </section>
  );
};
