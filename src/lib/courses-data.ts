export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  isFree: boolean;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  thumbnail: string;
  heroImage: string;
  category: string;
  instructor: {
    name: string;
    bio: string;
    image: string;
  };
  curriculum: {
    id: string;
    title: string;
    lessons: string[];
  }[];
  prerequisites: string[];
  learningOutcomes: string[];
  highlights: string[];
  enrollmentUrl: string;
  featured: boolean;
  dateAdded: string;
  tags: string[];
}

export const coursesData: Course[] = [
  {
    id: "1",
    slug: "react-native-masterclass",
    title: "React Native Masterclass: Build Professional Mobile Apps",
    description: "Master React Native development and build cross-platform mobile apps with professional-grade features and performance optimization.",
    fullDescription: "This comprehensive React Native course takes you from beginner to advanced level, covering everything you need to know to build production-ready mobile applications. You'll learn modern React Native development practices, state management, navigation, animations, and deployment strategies.",
    price: 299,
    isFree: false,
    duration: "40 hours",
    level: "Intermediate",
    language: "English",
    thumbnail: "/images/shajeel_afzal.png",
    heroImage: "/images/shajeel_afzal.png",
    category: "Mobile Development",
    instructor: {
      name: "Shajeel Afzal",
      bio: "Certified Mobile Apps Developer with 5+ years of experience building scalable mobile applications for startups and enterprises.",
      image: "/images/shajeel_afzal.png"
    },
    curriculum: [
      {
        id: "fundamentals",
        title: "React Native Fundamentals",
        lessons: [
          "Setting up development environment",
          "Understanding React Native architecture",
          "Core components and APIs",
          "Styling and layout with Flexbox"
        ]
      },
      {
        id: "navigation",
        title: "Navigation and State Management",
        lessons: [
          "React Navigation setup and configuration",
          "Stack, Tab, and Drawer navigation",
          "State management with Redux Toolkit",
          "Async state and API integration"
        ]
      },
      {
        id: "advanced",
        title: "Advanced Features",
        lessons: [
          "Native module integration",
          "Performance optimization",
          "Push notifications",
          "App deployment and distribution"
        ]
      }
    ],
    prerequisites: [
      "Basic JavaScript knowledge",
      "Understanding of React concepts",
      "Familiarity with mobile app concepts"
    ],
    learningOutcomes: [
      "Build complete mobile apps from scratch",
      "Implement complex navigation patterns",
      "Optimize app performance for production",
      "Deploy apps to App Store and Google Play"
    ],
    highlights: [
      "40+ hours of video content",
      "Real-world project builds",
      "Performance optimization techniques",
      "Deployment to app stores"
    ],
    enrollmentUrl: "https://udemy.com/course/react-native-masterclass",
    featured: true,
    dateAdded: "2024-01-15",
    tags: ["React Native", "Mobile Development", "JavaScript", "Cross-platform"]
  },
  {
    id: "2",
    slug: "ai-chatbot-development",
    title: "AI Chatbot Development with LangChain and OpenAI",
    description: "Learn to build intelligent chatbots using cutting-edge AI technologies, LangChain framework, and OpenAI APIs.",
    fullDescription: "Dive deep into the world of AI-powered chatbot development. This course covers everything from basic chatbot concepts to advanced AI agent implementation using LangChain, OpenAI GPT models, and modern development tools.",
    price: 199,
    isFree: false,
    duration: "25 hours",
    level: "Beginner",
    language: "English",
    thumbnail: "/images/shajeel_afzal.png",
    heroImage: "/images/shajeel_afzal.png",
    category: "AI Development",
    instructor: {
      name: "Shajeel Afzal",
      bio: "AI Engineer and Chatbot Specialist with expertise in building conversational AI solutions for businesses.",
      image: "/images/shajeel_afzal.png"
    },
    curriculum: [
      {
        id: "basics",
        title: "Chatbot Fundamentals",
        lessons: [
          "Introduction to conversational AI",
          "Understanding LangChain framework",
          "OpenAI API integration",
          "Setting up development environment"
        ]
      },
      {
        id: "development",
        title: "Building AI Agents",
        lessons: [
          "Creating intelligent chatbots",
          "Memory and context management",
          "Tool usage and function calling",
          "Vector databases and RAG implementation"
        ]
      },
      {
        id: "deployment",
        title: "Production Deployment",
        lessons: [
          "Chatbot testing and evaluation",
          "Deployment strategies",
          "Monitoring and analytics",
          "Scaling for production"
        ]
      }
    ],
    prerequisites: [
      "Basic Python programming",
      "Understanding of APIs",
      "Interest in AI technologies"
    ],
    learningOutcomes: [
      "Build sophisticated AI chatbots",
      "Implement RAG systems",
      "Deploy production-ready AI agents",
      "Integrate with business systems"
    ],
    highlights: [
      "Hands-on AI projects",
      "LangChain framework mastery",
      "OpenAI integration",
      "Production deployment guide"
    ],
    enrollmentUrl: "https://udemy.com/course/ai-chatbot-development",
    featured: true,
    dateAdded: "2024-02-01",
    tags: ["AI", "Chatbots", "LangChain", "OpenAI", "Python"]
  },
  {
    id: "3",
    slug: "flutter-beginners-guide",
    title: "Flutter for Beginners: Complete Development Guide",
    description: "Start your mobile development journey with Flutter. Learn Dart programming and build beautiful cross-platform apps.",
    fullDescription: "Perfect for beginners who want to learn mobile app development with Flutter. This course covers Dart programming, Flutter widgets, state management, and building complete applications from scratch.",
    price: 0,
    isFree: true,
    duration: "15 hours",
    level: "Beginner",
    language: "English",
    thumbnail: "/images/shajeel_afzal.png",
    heroImage: "/images/shajeel_afzal.png",
    category: "Mobile Development",
    instructor: {
      name: "Shajeel Afzal",
      bio: "Experienced Flutter developer with multiple apps published on both iOS and Android platforms.",
      image: "/images/shajeel_afzal.png"
    },
    curriculum: [
      {
        id: "dart-basics",
        title: "Dart Programming Basics",
        lessons: [
          "Introduction to Dart language",
          "Variables and data types",
          "Functions and classes",
          "Object-oriented programming in Dart"
        ]
      },
      {
        id: "flutter-ui",
        title: "Flutter UI Development",
        lessons: [
          "Understanding Flutter widgets",
          "Layout and styling",
          "Navigation between screens",
          "Working with forms and inputs"
        ]
      },
      {
        id: "app-building",
        title: "Building Complete Apps",
        lessons: [
          "State management with Provider",
          "API integration",
          "Local data storage",
          "Testing and debugging"
        ]
      }
    ],
    prerequisites: [
      "Basic programming knowledge",
      "Interest in mobile development"
    ],
    learningOutcomes: [
      "Understand Dart programming language",
      "Build responsive Flutter UIs",
      "Implement navigation and state management",
      "Create complete mobile applications"
    ],
    highlights: [
      "Free comprehensive course",
      "Beginner-friendly approach",
      "Practical projects",
      "Community support"
    ],
    enrollmentUrl: "https://youtube.com/playlist/flutter-beginners",
    featured: false,
    dateAdded: "2024-01-01",
    tags: ["Flutter", "Dart", "Mobile Development", "Beginner", "Free"]
  },
  {
    id: "4",
    slug: "fullstack-nextjs-development",
    title: "Full-Stack Next.js Development with TypeScript",
    description: "Master modern web development with Next.js, TypeScript, and full-stack best practices for building scalable applications.",
    fullDescription: "Complete guide to building modern web applications with Next.js 14+, TypeScript, and popular full-stack technologies. Learn server-side rendering, API routes, database integration, and deployment strategies.",
    price: 249,
    isFree: false,
    duration: "35 hours",
    level: "Advanced",
    language: "English",
    thumbnail: "/images/shajeel_afzal.png",
    heroImage: "/images/shajeel_afzal.png",
    category: "Web Development",
    instructor: {
      name: "Shajeel Afzal",
      bio: "Full-stack developer specializing in React ecosystem and modern web technologies.",
      image: "/images/shajeel_afzal.png"
    },
    curriculum: [
      {
        id: "nextjs-fundamentals",
        title: "Next.js Fundamentals",
        lessons: [
          "App Router and file-based routing",
          "Server and client components",
          "Data fetching strategies",
          "TypeScript integration"
        ]
      },
      {
        id: "backend-integration",
        title: "Backend Integration",
        lessons: [
          "API routes and middleware",
          "Database integration with Prisma",
          "Authentication and authorization",
          "File uploads and storage"
        ]
      },
      {
        id: "production",
        title: "Production Deployment",
        lessons: [
          "Performance optimization",
          "SEO and metadata",
          "Deployment strategies",
          "Monitoring and analytics"
        ]
      }
    ],
    prerequisites: [
      "Strong JavaScript/TypeScript knowledge",
      "React experience required",
      "Understanding of web development concepts"
    ],
    learningOutcomes: [
      "Build full-stack Next.js applications",
      "Implement advanced TypeScript patterns",
      "Deploy scalable web applications",
      "Optimize for performance and SEO"
    ],
    highlights: [
      "Latest Next.js 14+ features",
      "TypeScript best practices",
      "Full-stack project builds",
      "Production deployment"
    ],
    enrollmentUrl: "https://udemy.com/course/nextjs-typescript-fullstack",
    featured: false,
    dateAdded: "2024-02-15",
    tags: ["Next.js", "TypeScript", "React", "Full-stack", "Web Development"]
  },
  {
    id: "5",
    slug: "javascript-fundamentals-free",
    title: "JavaScript Fundamentals for Complete Beginners",
    description: "Learn JavaScript from scratch with this comprehensive free course covering all the essential concepts and practical exercises.",
    fullDescription: "Start your programming journey with JavaScript. This free course covers everything from basic syntax to advanced concepts like closures, promises, and async programming. Perfect for absolute beginners.",
    price: 0,
    isFree: true,
    duration: "20 hours",
    level: "Beginner",
    language: "English",
    thumbnail: "/images/shajeel_afzal.png",
    heroImage: "/images/shajeel_afzal.png",
    category: "Programming",
    instructor: {
      name: "Shajeel Afzal",
      bio: "Experienced software developer passionate about teaching programming fundamentals to beginners.",
      image: "/images/shajeel_afzal.png"
    },
    curriculum: [
      {
        id: "basics",
        title: "JavaScript Basics",
        lessons: [
          "Variables and data types",
          "Functions and scope",
          "Control flow and loops",
          "Arrays and objects"
        ]
      },
      {
        id: "dom-manipulation",
        title: "DOM Manipulation",
        lessons: [
          "Understanding the DOM",
          "Selecting and modifying elements",
          "Event handling",
          "Building interactive web pages"
        ]
      },
      {
        id: "advanced-concepts",
        title: "Advanced Concepts",
        lessons: [
          "Closures and higher-order functions",
          "Promises and async/await",
          "ES6+ features",
          "Error handling and debugging"
        ]
      }
    ],
    prerequisites: [
      "Basic computer skills",
      "Interest in programming"
    ],
    learningOutcomes: [
      "Understand JavaScript fundamentals",
      "Manipulate web pages with JavaScript",
      "Handle asynchronous operations",
      "Build interactive web applications"
    ],
    highlights: [
      "Completely free course",
      "Beginner-friendly content",
      "Practical coding exercises",
      "Foundation for web development"
    ],
    enrollmentUrl: "https://youtube.com/playlist/javascript-fundamentals",
    featured: false,
    dateAdded: "2023-12-01",
    tags: ["JavaScript", "Programming", "Web Development", "Beginner", "Free"]
  }
];

export const getCoursesData = () => coursesData;

export const getCourseBySlug = (slug: string) => {
  return coursesData.find(course => course.slug === slug);
};

export const getFeaturedCourses = () => {
  return coursesData.filter(course => course.featured);
};

export const getFreeCourses = () => {
  return coursesData.filter(course => course.isFree);
};

export const getPaidCourses = () => {
  return coursesData.filter(course => !course.isFree);
};

export const getCoursesByCategory = (category: string) => {
  return coursesData.filter(course => course.category === category);
};

export const searchCourses = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return coursesData.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    course.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const sortCourses = (courses: Course[], sortBy: 'price-low' | 'price-high' | 'title-asc' | 'title-desc' | 'date-new' | 'date-old' | 'featured') => {
  const sortedCourses = [...courses];
  
  switch (sortBy) {
    case 'price-low':
      return sortedCourses.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedCourses.sort((a, b) => b.price - a.price);
    case 'title-asc':
      return sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sortedCourses.sort((a, b) => b.title.localeCompare(a.title));
    case 'date-new':
      return sortedCourses.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    case 'date-old':
      return sortedCourses.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    case 'featured':
      return sortedCourses.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    default:
      return sortedCourses;
  }
};