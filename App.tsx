
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { HairAssistant } from './components/HairAssistant';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ReviewModal } from './components/ReviewModal';
import { Testimonial } from './types';

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Fatou Diop",
    role: "Cliente Fidèle",
    content: "Une expérience hors du temps. Mes nattes sont non seulement magnifiques mais elles tiennent parfaitement sans abîmer mes racines. Le diagnostic IA d'Aïda est impressionnant !",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: '10 Oct 2024',
    status: 'Publié'
  },
  {
    id: '2',
    name: "Inès Konaté",
    role: "Mariée Elegance",
    content: "Pour mon mariage, je voulais quelque chose de royal. L'équipe a su sculpter ma couronne avec une précision incroyable. Je me suis sentie comme une reine toute la journée.",
    avatar: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: '12 Oct 2024',
    status: 'Publié'
  },
  {
    id: '3',
    name: "Saran Touré",
    role: "Business Woman",
    content: "Le cadre est luxueux et le service impeccable. C'est le seul salon à Abidjan qui comprend vraiment les besoins des cheveux naturels texturés avec autant de soin.",
    avatar: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: '14 Oct 2024',
    status: 'Publié'
  }
];

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  
  const openReview = () => setIsReviewOpen(true);
  const closeReview = () => setIsReviewOpen(false);

  const handleAddReview = (newReview: Omit<Testimonial, 'id' | 'status' | 'date'>) => {
    const review: Testimonial = {
      ...newReview,
      id: Date.now().toString(),
      status: 'Masqué', // Par défaut masqué pour modération admin
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setTestimonials([review, ...testimonials]);
  };

  const handleUpdateTestimonials = (updatedList: Testimonial[]) => {
    setTestimonials(updatedList);
  };

  if (isAdminView) {
    return (
      <AdminDashboard 
        onExit={() => setIsAdminView(false)} 
        initialTestimonials={testimonials}
        onUpdateTestimonials={handleUpdateTestimonials}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-terracotta selection:text-white">
      <Navbar onOpenBooking={openBooking} />
      
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>

        <Features />
        
        <section id="services">
          <Services onOpenBooking={openBooking} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="testimonials">
          <Testimonials testimonials={testimonials.filter(t => t.status === 'Publié')} onAddReview={openReview} />
        </section>

        <HairAssistant />
      </main>

      <Footer onAdminClick={() => setIsAdminView(true)} />

      {/* Popups */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <ReviewModal isOpen={isReviewOpen} onClose={closeReview} onSubmit={handleAddReview} />
    </div>
  );
};

export default App;
