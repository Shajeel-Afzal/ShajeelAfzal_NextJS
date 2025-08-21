import { LucideIcon } from "lucide-react";

export interface ServiceTier {
  name: string;
  price: number;
  description: string;
  deliverables: string[];
  deliveryTimeInDays: number;
  revisions: number;
  addOnsIncluded: string[];
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTimeInDays: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Review {
  id: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  createdAt: Date;
  verified: boolean;
  projectType?: string;
  sellerResponse?: string;
  sellerResponseDate?: Date;
}

export interface Gig {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'paused' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  
  // Pricing
  pricingModel: 'fixed' | 'hourly' | 'monthly';
  basicTier: ServiceTier;
  standardTier: ServiceTier;
  premiumTier: ServiceTier;
  addOns: AddOnService[];
  freeConsultation: boolean;
  
  // Content
  mediaGallery: MediaItem[];
  faqs: FAQ[];
  requirements: string[];
  
  // Metadata
  seoTitle: string;
  seoDescription: string;
  deliveryTime: number; // in days
  revisionCount: number;
  
  // Statistics
  orderCount: number;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  
  // Display
  icon: LucideIcon;
  featured: boolean;
  startingPrice: number; // Lowest tier price for display
}

export interface GigCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  gigCount: number;
  featured: boolean;
}

export interface Order {
  id: string;
  gigId: string;
  clientId: string;
  selectedTier: 'basic' | 'standard' | 'premium';
  addOns: string[];
  totalAmount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  requirements: string;
  deliverables: string[];
  createdAt: Date;
  completedAt?: Date;
  clientEmail: string;
  clientName: string;
}

export interface GigFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  deliveryTime?: number;
  rating?: number;
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'delivery_time' | 'newest' | 'popular';
  search?: string;
}

export interface CartItem {
  gigId: string;
  selectedTier: 'basic' | 'standard' | 'premium';
  addOns: string[];
  requirements?: string;
}