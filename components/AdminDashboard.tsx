
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Scissors, 
  Image as ImageIcon, 
  CalendarCheck, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Users,
  Clock,
  X,
  Eye,
  Save,
  ChevronRight,
  Upload,
  Camera,
  Filter,
  Check,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MessageSquare,
  Star,
  EyeOff,
  Quote,
  Settings as SettingsIcon,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin,
  AtSign,
  Smartphone
} from 'lucide-react';
import { Service, GalleryImage, Testimonial } from '../types';

interface AdminDashboardProps {
  onExit: () => void;
  initialTestimonials: Testimonial[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
}

interface Booking {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: 'En attente' | 'Confirmé' | 'Terminé' | 'Annulé';
  notes: string;
  phone: string;
}

interface SalonSettings {
  salonName: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Nattes & Braids',
    description: 'L\'art du tressage ancestral revisité pour la femme moderne.',
    price: '15.000 CFA',
    image: 'https://images.unsplash.com/photo-1622285161427-4a0b22709e9e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Rituel Soin IA',
    description: 'Une révolution technologique au service de vos boucles.',
    price: '10.000 CFA',
    image: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Bridal Ebène',
    description: 'La consécration de votre beauté pour le jour J.',
    price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop',
  },
];

const INITIAL_GALLERY: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1622285161427-4a0b22709e9e?q=80&w=800&auto=format&fit=crop', category: 'Tresses' },
  { id: '2', url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop', category: 'Mariage' },
  { id: '3', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop', category: 'Couleur' },
  { id: '4', url: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=800&auto=format&fit=crop', category: 'Naturel' },
  { id: '5', url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', category: 'Locks' },
];

const INITIAL_BOOKINGS: Booking[] = [
  { id: '1', customerName: 'Fatou Diop', service: 'Nattes & Braids', date: '2024-10-12', time: '14:00', status: 'Confirmé', phone: '+225 07 01 02 03', notes: 'Préfère les tresses knotless moyennes.' },
  { id: '2', customerName: 'Moussa Traoré', service: 'Rituel Soin IA', date: '2024-10-13', time: '10:30', status: 'En attente', phone: '+225 01 44 55 66', notes: 'Cuir chevelu sensible.' },
  { id: '3', customerName: 'Inès Konaté', service: 'Bridal Ebène', date: '2024-10-15', time: '09:00', status: 'Confirmé', phone: '+225 05 09 88 77', notes: 'Mariage civil.' },
];

const INITIAL_SETTINGS: SalonSettings = {
  salonName: 'Elegance Ebène',
  description: 'Célébrer la beauté africaine à travers l\'art de la coiffure. Votre couronne est notre passion.',
  phone: '+225 07 00 00 00 00',
  whatsapp: '+225 07 00 00 00 00',
  email: 'contact@elegance-ebene.com',
  address: 'Plateau, Abidjan, Côte d\'Ivoire',
  instagram: '@elegance_ebene',
  facebook: 'Elegance Ebène Officiel',
  tiktok: '@elegance.ebene',
  openingHours: {
    weekdays: '09:00 - 19:00',
    saturday: '08:30 - 20:00',
    sunday: 'Sur rendez-vous'
  }
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit, initialTestimonials, onUpdateTestimonials }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'gallery' | 'bookings' | 'testimonials' | 'settings'>('overview');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [gallery, setGallery] = useState<GalleryImage[]>(INITIAL_GALLERY);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [settings, setSettings] = useState<SalonSettings>(INITIAL_SETTINGS);
  
  const [bookingFilter, setBookingFilter] = useState<string>('Tous');
  const [testimonialFilter, setTestimonialFilter] = useState<string>('Tous');
  
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('Tresses');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const stats = [
    { label: 'Réservations', value: bookings.length.toString(), icon: CalendarCheck, color: 'bg-blue-50 text-blue-600' },
    { label: 'Services Actifs', value: services.length.toString(), icon: Scissors, color: 'bg-terracotta/10 text-terracotta' },
    { label: 'Photos Galerie', value: gallery.length.toString(), icon: ImageIcon, color: 'bg-stone-100 text-stone-600' },
    { label: 'Avis Moyenne', value: '4.8', icon: MessageSquare, color: 'bg-amber-50 text-amber-600' },
  ];

  // --- TESTIMONIAL ACTIONS (Synced with App) ---
  const handleToggleTestimonialStatus = (id: string) => {
    const updated = initialTestimonials.map(t => t.id === id ? { ...t, status: t.status === 'Publié' ? 'Masqué' : 'Publié' } : t);
    onUpdateTestimonials(updated);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Supprimer définitivement cet avis ?')) {
      const updated = initialTestimonials.filter(t => t.id !== id);
      onUpdateTestimonials(updated);
    }
  };

  const filteredTestimonials = testimonialFilter === 'Tous' 
    ? initialTestimonials 
    : initialTestimonials.filter(t => t.status === testimonialFilter);

  // --- SETTINGS ACTIONS ---
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('hours.')) {
      const day = name.split('.')[1];
      setSettings({
        ...settings,
        openingHours: { ...settings.openingHours, [day]: value }
      });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  const handleSaveSettings = () => {
    alert("Paramètres enregistrés avec succès !");
  };

  // --- OTHER ACTIONS ---
  const handleUpdateStatus = (id: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Supprimer cette réservation ?')) setBookings(bookings.filter(b => b.id !== id));
  };

  const filteredBookings = bookingFilter === 'Tous' ? bookings : bookings.filter(b => b.status === bookingFilter);

  const handleAddService = () => {
    setEditingService(null);
    setPreviewImage(null);
    setIsServiceModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setPreviewImage(service.image);
    setIsServiceModalOpen(true);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Supprimer ce service ?')) setServices(services.filter(s => s.id !== id));
  };

  const handleServiceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      id: editingService?.id || Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      image: previewImage || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800',
    };
    if (editingService) setServices(services.map(s => s.id === editingService.id ? serviceData : s));
    else setServices([...services, serviceData]);
    setIsServiceModalOpen(false);
  };

  const handleAddGalleryImage = () => {
    setPreviewImage(null);
    setIsGalleryModalOpen(true);
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryImage = () => {
    if (!previewImage) return;
    const newImage: GalleryImage = { id: Date.now().toString(), url: previewImage, category: selectedGalleryCategory };
    setGallery([newImage, ...gallery]);
    setIsGalleryModalOpen(false);
    setPreviewImage(null);
  };

  const handleDeleteGalleryImage = (id: string) => {
    if (window.confirm('Supprimer cette photo de la galerie ?')) setGallery(gallery.filter(img => img.id !== id));
  };

  const getStatusStyles = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmé': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'En attente': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Terminé': return 'bg-green-50 text-green-600 border-green-100';
      case 'Annulé': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-stone-50 text-stone-500 border-stone-100';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans text-stone-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-stone-200 flex flex-col h-screen sticky top-0 z-20">
        <div className="p-8 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center text-white shadow-lg shadow-terracotta/20">
              <Scissors size={20} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl leading-none">Elegance</h1>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Administration</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
            { id: 'services', icon: Scissors, label: 'Gérer Services' },
            { id: 'gallery', icon: ImageIcon, label: 'Portfolio' },
            { id: 'bookings', icon: CalendarCheck, label: 'Réservations' },
            { id: 'testimonials', icon: MessageSquare, label: 'Avis Clients' },
            { id: 'settings', icon: SettingsIcon, label: 'Paramètres' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-stone-900 text-white shadow-lg' : 'hover:bg-stone-100 text-stone-500'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-stone-100">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} /> Quitter l'Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto relative">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              {activeTab === 'overview' && 'Tableau de Bord'}
              {activeTab === 'services' && 'Gestion des Services'}
              {activeTab === 'gallery' && 'Curateur de Galerie'}
              {activeTab === 'bookings' && 'Gestion des Rendez-vous'}
              {activeTab === 'testimonials' && 'Gestion des Avis'}
              {activeTab === 'settings' && 'Réglages Salon'}
            </h2>
            <p className="text-stone-400 text-sm">Gestion globale de votre univers de beauté.</p>
          </div>
          {activeTab !== 'settings' && (
            <div className="flex gap-4">
              <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:border-terracotta w-64 shadow-sm"
                  />
              </div>
              {activeTab === 'services' && (
                <button onClick={handleAddService} className="bg-terracotta text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-md">
                  <Plus size={18} /> Nouveau Service
                </button>
              )}
            </div>
          )}
          {activeTab === 'settings' && (
            <button 
              onClick={handleSaveSettings}
              className="bg-stone-900 text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-terracotta transition-all shadow-xl"
            >
              <Save size={18} /> Enregistrer les modifications
            </button>
          )}
        </header>

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-stone-50 pb-6">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                    <AtSign size={20} />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Identité & Contact</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom du Salon</label>
                    <input name="salonName" value={settings.salonName} onChange={handleSettingsChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Description courte</label>
                    <textarea name="description" value={settings.description} onChange={handleSettingsChange} rows={3} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2"><Phone size={12} /> Téléphone</label>
                      <input name="phone" value={settings.phone} onChange={handleSettingsChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2"><Mail size={12} /> Email</label>
                      <input name="email" value={settings.email} onChange={handleSettingsChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-stone-50 pb-6">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Horaires d'Ouverture</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold w-32">Lundi - Vendredi</label>
                    <input name="hours.weekdays" value={settings.openingHours.weekdays} onChange={handleSettingsChange} className="flex-grow bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-stone-50 pb-6">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400">
                    <Globe size={20} />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Réseaux Sociaux</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2"><Instagram size={12} /> Instagram</label>
                    <input name="instagram" value={settings.instagram} onChange={handleSettingsChange} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2 text-green-600"><Smartphone size={12} /> WhatsApp Business</label>
                    <input name="whatsapp" value={settings.whatsapp} onChange={handleSettingsChange} className="w-full bg-green-50/30 border border-green-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-green-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={stat.label} className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100">
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}><stat.icon size={24} /></div>
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  <div className="text-3xl font-serif font-bold mt-1">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
               <div className="flex gap-2">
                  {['Tous', 'Publié', 'Masqué'].map(status => (
                    <button key={status} onClick={() => setTestimonialFilter(status)} className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${testimonialFilter === status ? 'bg-stone-900 text-white shadow-lg' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}>{status}</button>
                  ))}
               </div>
               <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-stone-300">Avis reçus</span>
                    <span className="block text-xl font-serif font-bold text-stone-900 leading-none">{filteredTestimonials.length}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTestimonials.map((t) => (
                  <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={t.id} className="bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm relative group hover:shadow-xl transition-all duration-500">
                    <Quote className="absolute top-8 right-8 text-stone-50" size={48} />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center font-serif font-bold text-stone-300">{t.name.charAt(0)}</div>
                      <div>
                        <h4 className="font-serif font-bold text-lg leading-tight">{t.name}</h4>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400">{t.role} • {t.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"} />))}
                    </div>
                    <p className="text-stone-600 text-sm italic leading-relaxed mb-8 flex-grow">"{t.content}"</p>
                    <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${t.status === 'Publié' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>{t.status}</span>
                       <div className="flex gap-2">
                         <button onClick={() => handleToggleTestimonialStatus(t.id)} className={`p-2 rounded-xl transition-all ${t.status === 'Publié' ? 'bg-stone-50 text-stone-400 hover:bg-stone-900 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                           {t.status === 'Publié' ? <EyeOff size={18} /> : <Eye size={18} />}
                         </button>
                         <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredBookings.map((booking) => (
                  <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={booking.id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col md:flex-row items-center justify-between group hover:shadow-xl hover:border-terracotta/20 transition-all duration-500">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 font-serif text-2xl font-bold">{booking.customerName.charAt(0)}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-serif font-bold text-stone-900">{booking.customerName}</h4>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>{booking.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-auto mt-6 md:mt-0">
                      {booking.status === 'En attente' && (
                        <>
                          <button onClick={() => handleUpdateStatus(booking.id, 'Confirmé')} className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><CheckCircle size={20} /></button>
                          <button onClick={() => handleUpdateStatus(booking.id, 'Annulé')} className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"><XCircle size={20} /></button>
                        </>
                      )}
                      <button onClick={() => handleDeleteBooking(booking.id)} className="p-3 bg-stone-50 text-stone-400 rounded-2xl hover:bg-stone-900 hover:text-white transition-all shadow-sm"><Trash2 size={20} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- MODALS --- */}
        <AnimatePresence>
          {isServiceModalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsServiceModalOpen(false)} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]" />
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">
                  <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-bold text-stone-900">{editingService ? 'Modifier Service' : 'Nouveau Service'}</h3>
                    <button onClick={() => setIsServiceModalOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleSaveService} className="p-8 space-y-6 overflow-y-auto">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom du Service</label>
                      <input name="title" required defaultValue={editingService?.title} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="flex-grow bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-all flex items-center justify-center gap-2"><Save size={16} /> Enregistrer</button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
