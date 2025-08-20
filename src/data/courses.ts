import { Course } from '@/types/course';

// Sample instructor data
const instructors = {
  shajeelAfzal: {
    name: "Shajeel Afzal",
    title: "Mobile & AI Development Expert",
    bio: "Certified Mobile Apps Developer, AI Engineer & Chatbot Specialist with 8+ years of experience building cutting-edge solutions for businesses worldwide.",
    avatar: "https://via.placeholder.com/150x150/6b7280/ffffff?text=SA",
    credentials: [
      "Certified React Native Developer",
      "Google Cloud AI/ML Certified", 
      "AWS Solutions Architect",
      "8+ Years Industry Experience"
    ]
  }
};

export const courses: Course[] = [
  {
    id: "react-native-masterclass-2024",
    slug: "react-native-masterclass-2024",
    title: "React Native Masterclass 2024: Build Professional Mobile Apps",
    description: "Master React Native development from basics to advanced concepts. Build 5 real-world apps and deploy to app stores.",
    fullDescription: "This comprehensive React Native course takes you from beginner to expert, covering everything you need to build professional mobile applications. You'll learn modern React Native patterns, state management, navigation, and how to integrate with native APIs. By the end, you'll have built 5 complete apps and understand how to deploy them to both iOS and Android app stores.",
    price: 199,
    originalPrice: 299,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/3b82f6/ffffff?text=React+Native+Masterclass",
    heroImage: "https://via.placeholder.com/1200x630/3b82f6/ffffff?text=React+Native+Masterclass+2024",
    videoPreview: "https://youtube.com/watch?v=preview123",
    
    modules: [
      {
        title: "React Native Fundamentals",
        description: "Core concepts, components, and setup",
        duration: "4 hours",
        lessons: 12
      },
      {
        title: "Navigation & Routing",
        description: "React Navigation patterns and best practices",
        duration: "3 hours", 
        lessons: 8
      },
      {
        title: "State Management",
        description: "Redux Toolkit, Context API, and Zustand",
        duration: "5 hours",
        lessons: 15
      },
      {
        title: "Native APIs & Integrations",
        description: "Camera, GPS, push notifications, and more",
        duration: "6 hours",
        lessons: 18
      },
      {
        title: "App Store Deployment",
        description: "Build, test, and deploy to iOS and Android",
        duration: "2 hours",
        lessons: 6
      }
    ],
    
    learningOutcomes: [
      "Build production-ready React Native applications",
      "Master modern state management patterns", 
      "Integrate with native device APIs and third-party services",
      "Deploy apps to iOS App Store and Google Play Store",
      "Implement offline functionality and data persistence",
      "Apply advanced performance optimization techniques"
    ],
    
    prerequisites: [
      "Basic JavaScript knowledge",
      "Understanding of React fundamentals",
      "Development environment setup (Node.js, Git)"
    ],
    
    features: [
      "20+ hours of video content",
      "5 complete project builds",
      "Downloadable source code",
      "Lifetime access to updates",
      "Certificate of completion",
      "Direct instructor support"
    ],
    
    specifications: {
      duration: "20 hours",
      level: "Intermediate",
      language: "English",
      students: 1250,
      lastUpdated: "2024-08-15T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Mobile Development",
    tags: ["React Native", "Mobile Development", "JavaScript", "iOS", "Android"],
    
    enrollmentUrl: "https://udemy.com/course/react-native-masterclass-2024",
    previewUrl: "https://youtube.com/watch?v=preview123",
    
    featured: true,
    popular: true,
    dateAdded: "2024-08-01T00:00:00Z",
    
    rating: 4.8,
    reviewCount: 342
  },
  
  {
    id: "ai-chatbot-development-guide",
    slug: "ai-chatbot-development-guide", 
    title: "AI Chatbot Development: WhatsApp to Web Integration",
    description: "Learn to build intelligent chatbots for WhatsApp Business, websites, and multi-platform deployment with AI integration.",
    fullDescription: "Discover how to create sophisticated AI-powered chatbots that can handle customer support, lead generation, and sales automation across multiple platforms. This course covers WhatsApp Business API, web chat widgets, natural language processing, and integration with popular CRM systems.",
    price: 149,
    originalPrice: 199,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/10b981/ffffff?text=AI+Chatbot+Development",
    heroImage: "https://via.placeholder.com/1200x630/10b981/ffffff?text=AI+Chatbot+Development",
    
    modules: [
      {
        title: "Chatbot Architecture & Design",
        description: "Planning conversational flows and user experience",
        duration: "2 hours",
        lessons: 6
      },
      {
        title: "WhatsApp Business API",
        description: "Official API setup, templates, and compliance", 
        duration: "4 hours",
        lessons: 12
      },
      {
        title: "AI & NLP Integration",
        description: "OpenAI, Dialogflow, and custom ML models",
        duration: "5 hours",
        lessons: 14
      },
      {
        title: "Web Chat Implementation",
        description: "React components and real-time messaging",
        duration: "3 hours",
        lessons: 9
      }
    ],
    
    learningOutcomes: [
      "Build WhatsApp Business chatbots with official API",
      "Integrate AI for natural language understanding",
      "Create web chat widgets for websites",
      "Handle multi-platform bot deployment",
      "Implement lead capture and CRM integration"
    ],
    
    prerequisites: [
      "Basic programming knowledge (JavaScript/Python)",
      "Understanding of APIs and webhooks",
      "Familiarity with web development concepts"
    ],
    
    features: [
      "14+ hours of practical tutorials",
      "3 complete chatbot projects",
      "WhatsApp Business API setup guide", 
      "AI integration templates",
      "Production deployment checklist"
    ],
    
    specifications: {
      duration: "14 hours",
      level: "Intermediate", 
      language: "English",
      students: 892,
      lastUpdated: "2024-08-10T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Chatbot Development",
    tags: ["Chatbots", "AI", "WhatsApp", "NLP", "Customer Service"],
    
    enrollmentUrl: "https://udemy.com/course/ai-chatbot-development",
    
    featured: true,
    popular: false,
    dateAdded: "2024-07-15T00:00:00Z",
    
    rating: 4.7,
    reviewCount: 156
  },

  {
    id: "flutter-firebase-app-development",
    slug: "flutter-firebase-app-development",
    title: "Flutter & Firebase: Complete App Development Bootcamp", 
    description: "Build scalable mobile apps with Flutter and Firebase. Real-time databases, authentication, push notifications, and more.",
    fullDescription: "Master Flutter development by building real-world applications with Firebase backend services. Learn to implement authentication, real-time databases, cloud storage, push notifications, and analytics in your Flutter apps. Perfect for developers who want to build production-ready mobile applications.",
    price: 179,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/06b6d4/ffffff?text=Flutter+Firebase+Bootcamp",
    heroImage: "https://via.placeholder.com/1200x630/06b6d4/ffffff?text=Flutter+Firebase+Bootcamp",
    
    modules: [
      {
        title: "Flutter Fundamentals",
        description: "Widgets, state management, and navigation",
        duration: "5 hours",
        lessons: 16
      },
      {
        title: "Firebase Setup & Authentication",
        description: "User registration, login, and security rules",
        duration: "3 hours",
        lessons: 10
      },
      {
        title: "Firestore Database",
        description: "Real-time data, queries, and offline support",
        duration: "4 hours", 
        lessons: 13
      },
      {
        title: "Cloud Storage & Push Notifications",
        description: "File uploads and FCM integration",
        duration: "3 hours",
        lessons: 9
      }
    ],
    
    learningOutcomes: [
      "Build complete Flutter applications from scratch",
      "Implement Firebase authentication and security",
      "Create real-time data synchronization",
      "Add file upload and cloud storage features",
      "Deploy apps to production with Firebase hosting"
    ],
    
    prerequisites: [
      "Basic programming knowledge (any language)",
      "Understanding of mobile app concepts",
      "Development environment setup"
    ],
    
    features: [
      "15+ hours of hands-on coding",
      "3 complete app projects",
      "Firebase backend setup",
      "Production deployment guide",
      "Community access for Q&A"
    ],
    
    specifications: {
      duration: "15 hours",
      level: "Beginner",
      language: "English", 
      students: 756,
      lastUpdated: "2024-08-05T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Mobile Development",
    tags: ["Flutter", "Firebase", "Mobile Apps", "Real-time", "Backend"],
    
    enrollmentUrl: "https://udemy.com/course/flutter-firebase-bootcamp",
    
    featured: false,
    popular: true,
    dateAdded: "2024-07-01T00:00:00Z",
    
    rating: 4.6,
    reviewCount: 203
  },

  {
    id: "nextjs-ai-agent-development",
    slug: "nextjs-ai-agent-development", 
    title: "Next.js AI Agent Development: Build Intelligent Web Applications",
    description: "Create AI-powered web applications with Next.js, OpenAI API, and modern AI frameworks. Build chatbots, assistants, and more.",
    fullDescription: "Learn to build sophisticated AI agents and intelligent web applications using Next.js 14, OpenAI API, LangChain, and other cutting-edge AI tools. This course covers everything from basic AI integration to building complex multi-agent systems that can perform tasks autonomously.",
    price: 249,
    originalPrice: 349,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Next.js+AI+Development",
    heroImage: "https://via.placeholder.com/1200x630/8b5cf6/ffffff?text=Next.js+AI+Development",
    videoPreview: "https://youtube.com/watch?v=ai-preview456",
    
    modules: [
      {
        title: "Next.js 14 & AI Fundamentals",
        description: "Modern React patterns and AI concepts",
        duration: "3 hours",
        lessons: 10
      },
      {
        title: "OpenAI API Integration",
        description: "GPT models, embeddings, and function calling",
        duration: "4 hours",
        lessons: 14
      },
      {
        title: "LangChain & AI Frameworks",
        description: "Chains, agents, and memory systems",
        duration: "6 hours",
        lessons: 20
      },
      {
        title: "Production AI Applications",
        description: "Deployment, monitoring, and scaling",
        duration: "3 hours",
        lessons: 8
      }
    ],
    
    learningOutcomes: [
      "Build AI-powered web applications with Next.js",
      "Integrate OpenAI API and other AI services",
      "Create intelligent chatbots and virtual assistants", 
      "Implement RAG (Retrieval Augmented Generation)",
      "Deploy scalable AI applications to production"
    ],
    
    prerequisites: [
      "Strong JavaScript/TypeScript knowledge",
      "React and Next.js experience",
      "Basic understanding of APIs"
    ],
    
    features: [
      "16+ hours of advanced tutorials",
      "4 complete AI application projects",
      "OpenAI API credits included",
      "Production deployment templates",
      "Advanced AI patterns and best practices"
    ],
    
    specifications: {
      duration: "16 hours",
      level: "Advanced",
      language: "English",
      students: 324,
      lastUpdated: "2024-08-20T00:00:00Z", 
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "AI & Machine Learning", 
    tags: ["Next.js", "AI", "OpenAI", "LangChain", "Web Development"],
    
    enrollmentUrl: "https://udemy.com/course/nextjs-ai-agent-development",
    previewUrl: "https://youtube.com/watch?v=ai-preview456",
    
    featured: true,
    popular: false,
    dateAdded: "2024-08-20T00:00:00Z",
    
    rating: 4.9,
    reviewCount: 89
  },

  {
    id: "mobile-app-monetization-strategies", 
    slug: "mobile-app-monetization-strategies",
    title: "Mobile App Monetization: From Freemium to Subscription Success",
    description: "Learn proven strategies to monetize your mobile apps through in-app purchases, subscriptions, ads, and premium features.",
    fullDescription: "Discover the complete guide to mobile app monetization. This business-focused course teaches you how to implement and optimize various revenue streams including freemium models, subscription tiers, in-app advertising, and premium feature unlocks. Perfect for app developers and entrepreneurs.",
    price: 99,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=App+Monetization+Strategies",
    heroImage: "https://via.placeholder.com/1200x630/f59e0b/ffffff?text=App+Monetization+Strategies",
    
    modules: [
      {
        title: "Monetization Model Selection",
        description: "Choosing the right revenue strategy for your app",
        duration: "2 hours",
        lessons: 7
      },
      {
        title: "In-App Purchases & Subscriptions", 
        description: "Implementation with App Store and Google Play",
        duration: "3 hours",
        lessons: 11
      },
      {
        title: "Ad Monetization Strategies",
        description: "Banner, interstitial, and rewarded video ads",
        duration: "2 hours",
        lessons: 6
      },
      {
        title: "Analytics & Optimization",
        description: "Tracking metrics and improving conversion rates", 
        duration: "1.5 hours",
        lessons: 5
      }
    ],
    
    learningOutcomes: [
      "Choose optimal monetization models for your app type",
      "Implement in-app purchases and subscription systems",
      "Integrate advertising networks effectively",
      "Track and optimize key monetization metrics",
      "Build sustainable recurring revenue streams"
    ],
    
    prerequisites: [
      "Basic understanding of mobile app development",
      "Knowledge of app store ecosystems",
      "Business and marketing fundamentals"
    ],
    
    features: [
      "8.5 hours of business strategy content",
      "Real app monetization case studies",
      "Revenue optimization templates",
      "App store optimization guides",
      "Monetization calculator tools"
    ],
    
    specifications: {
      duration: "8.5 hours",
      level: "Intermediate",
      language: "English",
      students: 445,
      lastUpdated: "2024-07-28T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Business & Strategy",
    tags: ["Monetization", "Business Strategy", "App Store", "Revenue", "Analytics"],
    
    enrollmentUrl: "https://udemy.com/course/mobile-app-monetization",
    
    featured: false,
    popular: false,
    dateAdded: "2024-06-15T00:00:00Z",
    
    rating: 4.5,
    reviewCount: 127
  },

  {
    id: "free-intro-to-mobile-development",
    slug: "free-intro-to-mobile-development",
    title: "Introduction to Mobile App Development - Free Course",
    description: "Get started with mobile app development! Learn the basics of React Native and Flutter in this comprehensive free introduction.",
    fullDescription: "Perfect for beginners who want to explore mobile app development without any upfront cost. This free course introduces you to the world of mobile development, covering both React Native and Flutter basics, development environment setup, and building your first simple apps.",
    price: 0,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/22c55e/ffffff?text=Free+Mobile+Development+Intro",
    heroImage: "https://via.placeholder.com/1200x630/22c55e/ffffff?text=Free+Mobile+Development+Intro",
    videoPreview: "https://youtube.com/watch?v=free-intro789",
    
    modules: [
      {
        title: "Mobile Development Overview",
        description: "Platforms, frameworks, and career opportunities",
        duration: "1 hour",
        lessons: 4
      },
      {
        title: "Development Environment Setup",
        description: "Installing tools for React Native and Flutter",
        duration: "1.5 hours", 
        lessons: 5
      },
      {
        title: "Your First React Native App",
        description: "Building a simple todo app",
        duration: "2 hours",
        lessons: 6
      },
      {
        title: "Your First Flutter App",
        description: "Building a weather app",
        duration: "1.5 hours",
        lessons: 5
      }
    ],
    
    learningOutcomes: [
      "Understand mobile development landscape and opportunities",
      "Set up development environment for mobile apps",
      "Build your first React Native application",
      "Create a basic Flutter application",
      "Decide which framework suits your goals"
    ],
    
    prerequisites: [
      "Basic computer literacy",
      "Interest in mobile app development",
      "No programming experience required"
    ],
    
    features: [
      "6+ hours of beginner-friendly content",
      "Hands-on coding exercises",
      "Environment setup guides",
      "Two complete starter projects",
      "Community forum access"
    ],
    
    specifications: {
      duration: "6 hours",
      level: "Beginner",
      language: "English",
      students: 2156,
      lastUpdated: "2024-08-01T00:00:00Z",
      certificate: false
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Mobile Development",
    tags: ["Beginner", "React Native", "Flutter", "Free", "Introduction"],
    
    enrollmentUrl: "https://youtube.com/playlist?list=PLfree-intro",
    previewUrl: "https://youtube.com/watch?v=free-intro789",
    
    featured: false,
    popular: true,
    dateAdded: "2024-05-01T00:00:00Z",
    
    rating: 4.4,
    reviewCount: 892
  },

  {
    id: "advanced-flutter-state-management",
    slug: "advanced-flutter-state-management",
    title: "Advanced Flutter State Management with BLoC and Riverpod",
    description: "Master complex state management patterns in Flutter using BLoC, Riverpod, and other advanced architectures.",
    fullDescription: "Take your Flutter skills to the next level with advanced state management techniques. This course covers BLoC pattern, Riverpod, Provider, and other sophisticated architectures for building scalable, maintainable Flutter applications that can handle complex business logic.",
    price: 129,
    originalPrice: 179,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/ef4444/ffffff?text=Flutter+State+Management",
    heroImage: "https://via.placeholder.com/1200x630/ef4444/ffffff?text=Flutter+State+Management",
    
    modules: [
      {
        title: "State Management Fundamentals",
        description: "Understanding state, immutability, and reactive programming",
        duration: "2 hours",
        lessons: 8
      },
      {
        title: "BLoC Pattern Deep Dive",
        description: "Events, states, and complex business logic",
        duration: "4 hours",
        lessons: 15
      },
      {
        title: "Riverpod & Provider Patterns",
        description: "Dependency injection and state composition",
        duration: "3 hours",
        lessons: 12
      },
      {
        title: "Testing State Management",
        description: "Unit testing, widget testing, and integration testing",
        duration: "2 hours",
        lessons: 7
      }
    ],
    
    learningOutcomes: [
      "Implement BLoC pattern for complex state management",
      "Use Riverpod for dependency injection and state composition",
      "Build scalable and testable Flutter architectures",
      "Handle async operations and error states effectively",
      "Write comprehensive tests for state management logic"
    ],
    
    prerequisites: [
      "Solid Flutter development experience",
      "Understanding of Dart programming language",
      "Basic knowledge of state management concepts"
    ],
    
    features: [
      "11+ hours of advanced Flutter content",
      "Complex state management examples",
      "Testing strategies and best practices",
      "Architecture decision frameworks",
      "Code review and optimization techniques"
    ],
    
    specifications: {
      duration: "11 hours",
      level: "Advanced",
      language: "English",
      students: 289,
      lastUpdated: "2024-07-20T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Mobile Development",
    tags: ["Flutter", "State Management", "BLoC", "Riverpod", "Architecture"],
    
    enrollmentUrl: "https://udemy.com/course/advanced-flutter-state-management",
    
    featured: false,
    popular: false,
    dateAdded: "2024-06-01T00:00:00Z",
    
    rating: 4.7,
    reviewCount: 67
  },

  {
    id: "ai-automation-for-businesses",
    slug: "ai-automation-for-businesses",
    title: "AI Automation for Small Businesses: Practical Implementation Guide",
    description: "Learn how to implement AI automation in small businesses to improve efficiency, reduce costs, and scale operations.",
    fullDescription: "A practical, business-focused course that teaches small business owners and entrepreneurs how to identify automation opportunities and implement AI solutions without technical expertise. Covers chatbots, workflow automation, content generation, and customer service optimization.",
    price: 79,
    currency: "USD",
    
    thumbnail: "https://via.placeholder.com/600x400/84cc16/ffffff?text=AI+Automation+for+Business",
    heroImage: "https://via.placeholder.com/1200x630/84cc16/ffffff?text=AI+Automation+for+Business",
    
    modules: [
      {
        title: "AI Automation Opportunities Assessment",
        description: "Identifying processes suitable for automation",
        duration: "1.5 hours",
        lessons: 5
      },
      {
        title: "Customer Service Automation",
        description: "Chatbots, FAQ automation, and support workflows",
        duration: "2.5 hours",
        lessons: 9
      },
      {
        title: "Content & Marketing Automation",
        description: "AI writing, social media, and email campaigns",
        duration: "2 hours",
        lessons: 7
      },
      {
        title: "Implementation & ROI Measurement",
        description: "Rolling out solutions and measuring success",
        duration: "1 hour",
        lessons: 4
      }
    ],
    
    learningOutcomes: [
      "Identify automation opportunities in your business",
      "Implement no-code AI solutions for common tasks",
      "Set up automated customer service workflows",
      "Use AI for content creation and marketing",
      "Measure ROI and optimize automation performance"
    ],
    
    prerequisites: [
      "Basic business operations knowledge",
      "Familiarity with common business software",
      "No technical background required"
    ],
    
    features: [
      "7+ hours of practical business content",
      "Ready-to-use automation templates",
      "ROI calculation worksheets",
      "Implementation checklists",
      "Business case study examples"
    ],
    
    specifications: {
      duration: "7 hours",
      level: "Beginner",
      language: "English",
      students: 612,
      lastUpdated: "2024-08-12T00:00:00Z",
      certificate: true
    },
    
    instructor: instructors.shajeelAfzal,
    category: "Business & Strategy",
    tags: ["AI", "Automation", "Business", "Productivity", "No-Code"],
    
    enrollmentUrl: "https://udemy.com/course/ai-automation-small-business",
    
    featured: false,
    popular: true,
    dateAdded: "2024-07-10T00:00:00Z",
    
    rating: 4.6,
    reviewCount: 178
  }
];

// Helper functions for filtering and sorting
export function filterCourses(courses: Course[], filters: { search: string; category: string; priceType: string; level: string }) {
  return courses.filter(course => {
    const matchesSearch = !filters.search || 
      course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      course.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesCategory = filters.category === 'All Categories' || course.category === filters.category;
    
    const matchesPriceType = filters.priceType === 'all' || 
      (filters.priceType === 'free' && course.price === 0) ||
      (filters.priceType === 'paid' && course.price > 0);
    
    const matchesLevel = filters.level === "all" || course.specifications.level === filters.level;
    
    return matchesSearch && matchesCategory && matchesPriceType && matchesLevel;
  });
}

export function sortCourses(courses: Course[], sortBy: string): Course[] {
  const sorted = [...courses];
  
  switch (sortBy) {
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      });
    
    case 'popular':
      return sorted.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
    
    case 'newest':
      return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    
    default:
      return sorted;
  }
}

// Get related courses based on category and tags
export function getRelatedCourses(course: Course, allCourses: Course[], limit: number = 3): Course[] {
  return allCourses
    .filter(c => c.id !== course.id)
    .filter(c => 
      c.category === course.category || 
      c.tags.some(tag => course.tags.includes(tag))
    )
    .sort((a, b) => {
      const aTagMatches = a.tags.filter(tag => course.tags.includes(tag)).length;
      const bTagMatches = b.tags.filter(tag => course.tags.includes(tag)).length;
      return bTagMatches - aTagMatches;
    })
    .slice(0, limit);
}