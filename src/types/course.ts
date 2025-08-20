/**
 * Course type definitions for the courses listing feature
 * 
 * Supports both free and paid courses with comprehensive information
 * for course discovery, comparison, and enrollment.
 */

export interface CourseModule {
  title: string;
  description: string;
  duration: string; // e.g., "2 hours", "45 minutes"
  lessons: number;
}

export interface CourseSpecifications {
  duration: string; // Total course duration
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  students?: number; // Number of enrolled students
  lastUpdated: string; // ISO date string
  certificate: boolean;
}

export interface CourseInstructor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  credentials: string[];
}

export interface Course {
  id: string;
  slug: string; // URL-friendly identifier
  title: string;
  description: string; // Brief description for cards
  fullDescription: string; // Detailed description for course page
  price: number; // 0 for free courses
  originalPrice?: number; // For showing discounts
  currency: string;
  
  // Media
  thumbnail: string;
  heroImage?: string;
  videoPreview?: string;
  
  // Course content
  modules: CourseModule[];
  learningOutcomes: string[];
  prerequisites: string[];
  features: string[]; // Key highlights/features
  
  // Metadata
  specifications: CourseSpecifications;
  instructor: CourseInstructor;
  category: string;
  tags: string[];
  
  // External links
  enrollmentUrl: string; // Link to third-party platform
  previewUrl?: string; // Optional preview/demo link
  
  // SEO and display
  featured: boolean; // For highlighting popular courses
  popular: boolean; // For popularity-based sorting
  dateAdded: string; // ISO date string for sorting
  
  // Social proof
  rating?: number; // 1-5 stars
  reviewCount?: number;
}

export interface CourseFilters {
  search: string;
  category: string;
  priceType: 'all' | 'free' | 'paid';
  level: string;
}

export interface CourseSortOption {
  value: string;
  label: string;
}

// Predefined sort options
export const COURSE_SORT_OPTIONS: CourseSortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Title: A-Z' },
  { value: 'title-desc', label: 'Title: Z-A' },
];

// Course categories
export const COURSE_CATEGORIES = [
  'All Categories',
  'Mobile Development',
  'AI & Machine Learning',
  'Chatbot Development',
  'Web Development',
  'Backend Development',
  'DevOps & Cloud',
  'UI/UX Design',
  'Business & Strategy',
] as const;

export type CourseCategory = typeof COURSE_CATEGORIES[number];