
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  status: 'Publié' | 'Masqué';
  avatar?: string;
}
