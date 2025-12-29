import React, { useState, useRef } from 'react';
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
  X,
  Eye,
  Save,
  Upload,
  Camera,
  Check,
  Calendar,
  MessageSquare,
  Star,
  EyeOff,
  Quote,
  Settings as SettingsIcon,
  Globe,
  Instagram,
  Facebook,
  Phone,
  Mail,
  AtSign,
  Smartphone,
  TrendingUp,
  ImagePlus,
  Clock,
  MapPin,
  Music2,
  ChevronDown,
  Info,
  CheckCircle2,
  XCircle,
  Timer,
  ExternalLink,
  Filter,
  Layers,
  ArrowUpRight,
  Activity,
  Zap,
  ChevronRight,
  MessageCircle
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
  logo: string;
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
    description: 'L\'art du tressage ancestral revisité pour la femme moderne. Knotless, Goddess ou classiques.',
    price: '15.000 CFA',
    image: 'https://images.unsplash.com/photo-1646245139745-0d2938e07978?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Rituel Soin IA',
    description: 'Analyse capillaire approfondie et soins botaniques sur mesure pour cheveux naturels.',
    price: '10.000 CFA',
    image: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=800&auto=format&fit=crop',
  },
];

const INITIAL_GALLERY: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1646245139745-0d2938e07978?q=80&w=800&auto=format&fit=crop', category: 'Tresses' },
  { id: '2', url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop', category: 'Mariage' },
  { id: '3', url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=800&auto=format&fit=crop', category: 'Locks' },
  { id: '4', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop', category: 'Couleur' },
];

const INITIAL_BOOKINGS: Booking[] = [
  { id: '1', customerName: 'Fatou Diop', service: 'Nattes & Braids', date: '2024-10-25', time: '14:00', status: 'Confirmé', phone: '+225 07 01 02 03', notes: 'Knotless braids moyennes. Cheveux naturels.' },
  { id: '2', customerName: 'Awa Sanogo', service: 'Rituel Soin IA', date: '2024-10-26', time: '10:30', status: 'En attente', phone: '+225 01 44 55 66', notes: 'Cuir chevelu sensible.' },
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
  logo: '',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | Booking['status']>('Tous');
  const [galleryFilter, setGalleryFilter] = useState('Tous');
  
  // Modals states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [galleryCategory, setGalleryCategory] = useState('Tresses');
  
  const serviceFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Helper for Base64 conversion
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Portfolio Handlers
  const galleryCategories = ['Tous', 'Tresses', 'Mariage', 'Naturel', 'Locks', 'Couleur'];
  const filteredGallery = galleryFilter === 'Tous' ? gallery : gallery.filter(img => img.category === galleryFilter);

  const handleDeleteGalleryImage = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette photo du portfolio ?')) {
      setGallery(prev => prev.filter(img => img.id !== id));
    }
  };

  const handleSaveGalleryImage = () => {
    if (previewImage) {
      setGallery([{
        id: Date.now().toString(),
        url: previewImage,
        category: galleryCategory
      }, ...gallery]);
      setIsGalleryModalOpen(false);
      setPreviewImage(null);
    }
  };

  // Booking Handlers
  const updateBookingStatus = (id: string, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const deleteBooking = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Settings Handlers
  const updateSetting = (field: keyof SalonSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateHours = (day: keyof SalonSettings['openingHours'], value: string) => {
    setSettings(prev => ({
      ...prev,
      openingHours: { ...prev.openingHours, [day]: value }
    }));
  };

  const handleSaveSettings = () => {
    alert("Tous les réglages du salon ont été mis à jour avec succès !");
  };

  const filteredServices = services.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handlers for Services
  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newService: Service = {
      id: editingService?.id || Date.now().toString(),
      title: fd.get('title') as string,
      description: fd.get('description') as string,
      price: fd.get('price') as string,
      image: previewImage || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800',
    };
    if (editingService) setServices(services.map(s => s.id === editingService.id ? newService : s));
    else setServices([...services, newService]);
    setIsServiceModalOpen(false);
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
    <div className="min-h-screen bg-[#FDFCFB] flex font-sans text-stone-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-stone-100 flex flex-col h-screen sticky top-0 z-30 shadow-sm">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center shadow-sm">
              <Scissors size={20} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl leading-none">Elegance</h1>
              <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">Administration</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-1">
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
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-stone-900 text-white shadow-xl shadow-stone-200' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-stone-50">
          <button onClick={onExit} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={18} /> Quitter l'Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">
              {activeTab === 'overview' && 'Tableau de Bord'}
              {activeTab === 'services' && 'Gestion des Services'}
              {activeTab === 'gallery' && 'Portfolio Galerie'}
              {activeTab === 'bookings' && 'Réservations Clients'}
              {activeTab === 'testimonials' && 'Avis & Témoignages'}
              {activeTab === 'settings' && 'Réglages Salon'}
            </h2>
            <p className="text-stone-400 text-sm">
              {activeTab === 'settings' ? 'Configurez vos informations de contact et vos horaires.' : 'Contrôle complet de votre identité et activités.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === 'settings' && (
              <button 
                onClick={handleSaveSettings}
                className="bg-stone-900 text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-terracotta transition-all shadow-2xl shadow-stone-200"
              >
                <Save size={18} /> Enregistrer les réglages
              </button>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* TAB: SETTINGS (EXHAUSTIVE & FINAL) */}
          {activeTab === 'settings' && (
            <motion.div key="st" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20">
              
              {/* Colonne de Gauche : Identité & Contact */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* Section 1 : Identité Visuelle */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-50 space-y-10">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-3 text-stone-900">
                    <AtSign size={22} className="text-terracotta" /> Identité du Salon
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="space-y-3 shrink-0">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Logo Officiel</label>
                      <div 
                        onClick={() => logoFileInputRef.current?.click()}
                        className="w-40 h-40 rounded-3xl bg-stone-50 border-2 border-dashed border-stone-100 flex flex-col items-center justify-center cursor-pointer hover:bg-terracotta/5 hover:border-terracotta transition-all overflow-hidden group"
                      >
                        {settings.logo ? (
                          <img src={settings.logo} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Camera size={28} className="text-stone-300 group-hover:scale-110 transition-transform" />
                            <span className="text-[8px] text-stone-400 font-bold mt-2 uppercase tracking-widest">Choisir Logo</span>
                          </>
                        )}
                        <input type="file" ref={logoFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, (b) => updateSetting('logo', b))} />
                      </div>
                    </div>

                    <div className="flex-grow space-y-6 w-full">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Nom de l'Etablissement</label>
                        <input 
                          value={settings.salonName} 
                          onChange={(e) => updateSetting('salonName', e.target.value)} 
                          className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-terracotta/10 focus:border-terracotta outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Slogan ou Description</label>
                        <textarea 
                          value={settings.description} 
                          onChange={(e) => updateSetting('description', e.target.value)} 
                          rows={3} 
                          className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-terracotta/10 focus:border-terracotta outline-none transition-all resize-none" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 : Contact & Localisation */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-50 space-y-10">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-3 text-stone-900">
                    <MapPin size={22} className="text-terracotta" /> Coordonnées & Adresse
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <Phone size={14} className="text-stone-300" /> Téléphone Principal
                      </label>
                      <input 
                        value={settings.phone} 
                        onChange={(e) => updateSetting('phone', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <MessageCircle size={14} className="text-green-500" /> WhatsApp Business
                      </label>
                      <input 
                        value={settings.whatsapp} 
                        onChange={(e) => updateSetting('whatsapp', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-green-100 focus:border-green-500 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                      <Mail size={14} className="text-blue-500" /> Email de Contact
                    </label>
                    <input 
                      value={settings.email} 
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                      <MapPin size={14} className="text-terracotta" /> Adresse Physique (Abidjan)
                    </label>
                    <input 
                      value={settings.address} 
                      onChange={(e) => updateSetting('address', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" 
                    />
                  </div>
                </div>

                {/* Section 3 : Horaires */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-50 space-y-10">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-3 text-stone-900">
                    <Clock size={22} className="text-terracotta" /> Horaires d'Ouverture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Lundi - Vendredi</label>
                      <input 
                        value={settings.openingHours.weekdays} 
                        onChange={(e) => updateHours('weekdays', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Samedi</label>
                      <input 
                        value={settings.openingHours.saturday} 
                        onChange={(e) => updateHours('saturday', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Dimanche</label>
                      <input 
                        value={settings.openingHours.sunday} 
                        onChange={(e) => updateHours('sunday', e.target.value)}
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-terracotta outline-none transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne de Droite : Réseaux Sociaux & Statistiques */}
              <div className="lg:col-span-4 space-y-10">
                
                {/* Réseaux Sociaux */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-50 space-y-8">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-3 text-stone-900">
                    <Globe size={22} className="text-terracotta" /> Réseaux Sociaux
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-3">
                        <Instagram size={16} className="text-pink-500" /> Instagram
                      </label>
                      <input 
                        value={settings.instagram} 
                        onChange={(e) => updateSetting('instagram', e.target.value)} 
                        placeholder="@votresalon"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-pink-500 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-3">
                        <Facebook size={16} className="text-blue-600" /> Facebook
                      </label>
                      <input 
                        value={settings.facebook} 
                        onChange={(e) => updateSetting('facebook', e.target.value)} 
                        placeholder="Page Facebook"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-3">
                        <Music2 size={16} className="text-stone-900" /> TikTok
                      </label>
                      <input 
                        value={settings.tiktok} 
                        onChange={(e) => updateSetting('tiktok', e.target.value)} 
                        placeholder="@votrecompte"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-stone-900 outline-none transition-all" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section Info Sécurité */}
                <div className="bg-stone-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-terracotta/40 transition-colors"></div>
                  <div className="relative z-10 text-white">
                    <Info size={32} className="text-terracotta mb-6" />
                    <h3 className="text-xl font-serif font-bold mb-4">Mise à jour Live</h3>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Toutes les modifications enregistrées ici sont appliquées instantanément sur votre site vitrine. Assurez-vous que vos coordonnées WhatsApp sont correctes pour recevoir les réservations.
                    </p>
                  </div>
                </div>

                {/* Bouton Enregistrer Mobile-Friendly */}
                <button 
                  onClick={handleSaveSettings}
                  className="w-full bg-terracotta text-white py-6 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl shadow-terracotta/20 flex items-center justify-center gap-3"
                >
                  <Save size={20} /> Appliquer les Changements
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Revenus (Mois)', value: '450k CFA', icon: TrendingUp, color: 'text-green-600 bg-green-50', trend: '+12%' },
                  { label: 'Nouveaux RDV', value: bookings.length.toString(), icon: Calendar, color: 'text-blue-600 bg-blue-50', trend: '+5' },
                  { label: 'Total Services', value: services.length.toString(), icon: Scissors, color: 'text-terracotta bg-terracotta/10', trend: 'Stable' },
                  { label: 'Note Moyenne', value: '4.9', icon: Star, color: 'text-amber-600 bg-amber-50', trend: 'Excellent' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-50 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}><stat.icon size={24} /></div>
                      <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-stone-50 text-stone-400'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">{stat.label}</span>
                    <div className="text-3xl font-serif font-bold mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-stone-50">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-serif font-bold flex items-center gap-3">
                      <Activity size={20} className="text-terracotta" /> Activité Récente
                    </h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-[10px] uppercase tracking-widest text-stone-400 font-bold hover:text-terracotta transition-colors flex items-center gap-1">
                      Tout voir <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {bookings.map((b, i) => (
                      <div key={b.id} className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50/50 hover:bg-stone-50 transition-colors">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 flex items-center justify-center font-serif font-bold text-stone-300">
                            {b.customerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{b.customerName} a réservé : <span className="text-terracotta">{b.service}</span></div>
                            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                              <Clock size={12} /> {b.time} • {b.date}
                            </div>
                          </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyles(b.status)}`}>
                          {b.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-stone-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <Zap size={20} className="text-terracotta mb-6" />
                      <h3 className="text-white font-serif text-xl font-bold mb-3">Conseil IA</h3>
                      <p className="text-stone-400 text-xs leading-relaxed mb-6">"Les demandes pour les Locks sont en hausse. Pensez à mettre à jour votre portfolio."</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <motion.div key="ser" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => { setEditingService(null); setPreviewImage(null); setIsServiceModalOpen(true); }}
                className="bg-white border-2 border-dashed border-stone-200 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-stone-300 hover:border-terracotta hover:text-terracotta transition-all cursor-pointer group aspect-[4/5] shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-stone-50 group-hover:bg-terracotta/10 flex items-center justify-center mb-4 transition-colors"><Plus size={32} /></div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Ajouter un service</span>
              </motion.div>

              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-50 group flex flex-col h-full">
                  <div className="h-56 relative overflow-hidden">
                    <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                      <span className="text-terracotta font-bold text-[10px] uppercase tracking-widest">{service.price}</span>
                    </div>
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button onClick={() => { setEditingService(service); setPreviewImage(service.image); setIsServiceModalOpen(true); }} className="p-3 bg-white rounded-full text-stone-900 hover:bg-terracotta hover:text-white transition-all shadow-xl"><Edit2 size={18} /></button>
                      <button onClick={() => setServices(services.filter(s => s.id !== service.id))} className="p-3 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{service.title}</h3>
                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-3 mb-6 flex-grow">{service.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <motion.div key="gal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex items-center gap-2 text-stone-400 mr-2 border-r border-stone-100 pr-4">
                  <Filter size={16} /> <span className="text-[10px] uppercase font-bold tracking-widest">Filtrer</span>
                </div>
                {galleryCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${galleryFilter === cat ? 'bg-terracotta text-white border-terracotta shadow-lg' : 'bg-white text-stone-400 border-stone-100 hover:bg-stone-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => { setPreviewImage(null); setIsGalleryModalOpen(true); }}
                  className="bg-white border-2 border-dashed border-stone-200 rounded-[2.5rem] aspect-square flex flex-col items-center justify-center text-stone-300 hover:border-terracotta hover:text-terracotta transition-all cursor-pointer shadow-sm group"
                >
                  <Upload size={32} className="group-hover:scale-110 transition-transform mb-3" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Ajouter Photo</span>
                </motion.div>

                {filteredGallery.map(img => (
                  <div key={img.id} className="relative group aspect-square rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-50 bg-stone-100">
                    <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                      <div className="flex justify-end">
                        <button onClick={() => handleDeleteGalleryImage(img.id)} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={18} /></button>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Layers size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{img.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB: BOOKINGS */}
          {activeTab === 'bookings' && (
            <motion.div key="bk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex gap-2 pb-4 overflow-x-auto">
                {['Tous', 'En attente', 'Confirmé', 'Terminé', 'Annulé'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st as any)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${statusFilter === st ? 'bg-stone-900 text-white border-stone-900 shadow-lg' : 'bg-white text-stone-400 border-stone-100 hover:bg-stone-50'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-50 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50/50 text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <tr>
                      <th className="px-8 py-6">Client</th>
                      <th className="px-8 py-6">Service</th>
                      <th className="px-8 py-6">Date & Heure</th>
                      <th className="px-8 py-6">Statut</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {filteredBookings.length > 0 ? filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-stone-900">{b.customerName}</div>
                          <div className="text-xs text-stone-400">{b.phone}</div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-stone-600">{b.service}</td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-semibold">{new Date(b.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                          <div className="text-xs text-stone-400 flex items-center gap-1"><Clock size={10}/> {b.time}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyles(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setSelectedBooking(b)} className="p-2.5 bg-stone-50 text-stone-400 rounded-xl hover:bg-stone-900 hover:text-white shadow-sm"><Info size={16} /></button>
                            {b.status === 'En attente' && (
                              <button onClick={() => updateBookingStatus(b.id, 'Confirmé')} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-sm"><Check size={16} /></button>
                            )}
                            <button onClick={() => deleteBooking(b.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white shadow-sm"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-stone-300 italic text-sm">
                          Aucune réservation correspondante.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <motion.div key="tst" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {initialTestimonials.map(t => (
                <div key={t.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-50 relative group">
                  <div className="absolute top-8 right-8 text-stone-100"><Quote size={40} /></div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center font-bold text-stone-300 shadow-sm">{t.name.charAt(0)}</div>
                    <div>
                      <h4 className="font-serif font-bold text-lg leading-tight">{t.name}</h4>
                      <div className="text-[10px] uppercase tracking-widest text-stone-400">{t.role} • {t.date}</div>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm italic mb-8 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${t.status === 'Publié' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>
                      {t.status}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => onUpdateTestimonials(initialTestimonials.map(x => x.id === t.id ? {...x, status: x.status === 'Publié' ? 'Masqué' : 'Publié'} : x))} className="p-2 bg-stone-50 text-stone-400 rounded-xl hover:bg-stone-900 hover:text-white transition-all">
                        {t.status === 'Publié' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- SERVICE MODAL --- */}
        <AnimatePresence>
          {isServiceModalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsServiceModalOpen(false)} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]" />
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-auto flex-col">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">
                  <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-bold">{editingService ? 'Modifier' : 'Nouveau'} Service</h3>
                    <button onClick={() => setIsServiceModalOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleSaveService} className="p-8 space-y-6 overflow-y-auto">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Titre</label>
                      <input name="title" required defaultValue={editingService?.title} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Prix (CFA)</label>
                        <input name="price" required defaultValue={editingService?.price} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Image</label>
                        <div onClick={() => serviceFileInputRef.current?.click()} className="flex items-center gap-2 w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-xs text-stone-500 cursor-pointer hover:bg-stone-100">
                          <Camera size={14} /> Choisir
                          <input ref={serviceFileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, setPreviewImage)} />
                        </div>
                      </div>
                    </div>
                    {previewImage && <img src={previewImage} className="aspect-video w-full rounded-2xl object-cover" />}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Description</label>
                      <textarea name="description" required defaultValue={editingService?.description} rows={4} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta transition-all"><Save size={16} className="inline mr-2" />Enregistrer</button>
                  </form>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* --- GALLERY MODAL --- */}
        <AnimatePresence>
          {isGalleryModalOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGalleryModalOpen(false)} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]" />
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden pointer-events-auto">
                  <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-bold">Nouvelle Photo</h3>
                    <button onClick={() => setIsGalleryModalOpen(false)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Catégorie</label>
                      <select value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-terracotta outline-none">
                        {galleryCategories.filter(c => c !== 'Tous').map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Fichier Photo</label>
                      <div onClick={() => galleryFileInputRef.current?.click()} className="flex flex-col items-center justify-center w-full aspect-square bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2.5rem] cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-all overflow-hidden">
                        {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <><ImagePlus size={48} className="text-stone-300 mb-4" /><span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Parcourir</span></>}
                        <input ref={galleryFileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, setPreviewImage)} />
                      </div>
                    </div>
                    <button onClick={handleSaveGalleryImage} disabled={!previewImage} className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-terracotta disabled:opacity-30 flex items-center justify-center gap-2"><Check size={16} /> Publier dans Portfolio</button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* --- BOOKING DETAIL MODAL --- */}
        <AnimatePresence>
          {selectedBooking && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBooking(null)} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]" />
              <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden pointer-events-auto">
                  <div className="p-8 border-b border-stone-50 flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-bold">Détails RDV</h3>
                    <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400"><X size={20} /></button>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="font-bold text-xl">{selectedBooking.customerName}</div>
                    <div className="text-stone-500 italic">"{selectedBooking.notes || "Aucune note."}"</div>
                    <button onClick={() => setSelectedBooking(null)} className="w-full bg-stone-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest">Fermer</button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};