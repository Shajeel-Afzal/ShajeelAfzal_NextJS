import { 
  Brain, Bot, Smartphone, Globe, Server, Zap
} from "lucide-react";
import { Gig, GigCategory, Review } from "@/types/gigs";

// Sample reviews data for demonstration
const sampleReviews: Review[] = [
  {
    id: "review-1",
    clientName: "Sarah Johnson",
    clientAvatar: "/images/clients/sarah.jpg",
    rating: 5,
    comment: "Outstanding work! The AI agent exceeded our expectations and integrated perfectly with our existing systems. Highly recommended!",
    createdAt: new Date("2024-01-15"),
    verified: true,
    projectType: "AI Agent Development",
  },
  {
    id: "review-2", 
    clientName: "Michael Chen",
    clientAvatar: "/images/clients/michael.jpg",
    rating: 5,
    comment: "Exceptional mobile app development. Clean code, great UI/UX, and delivered on time. Will definitely work with Shajeel again.",
    createdAt: new Date("2024-01-10"),
    verified: true,
    projectType: "React Native App",
  },
  {
    id: "review-3",
    clientName: "Emily Rodriguez",
    rating: 4,
    comment: "Great chatbot implementation for our WhatsApp Business. Professional service and good communication throughout the project.",
    createdAt: new Date("2024-01-05"),
    verified: true,
    projectType: "WhatsApp Business Bot",
  }
];

export const gigCategories: GigCategory[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    slug: "ai-agents",
    description: "Intelligent AI agents that learn workflows and deliver autonomous outcomes",
    icon: Brain,
    gigCount: 4,
    featured: true,
  },
  {
    id: "chatbots",
    name: "ChatBot Development", 
    slug: "chatbots",
    description: "Task-completing chatbots for web, WhatsApp & more",
    icon: Bot,
    gigCount: 3,
    featured: true,
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps",
    slug: "mobile-apps", 
    description: "Cross-platform mobile applications with native performance",
    icon: Smartphone,
    gigCount: 4,
    featured: true,
  },
  {
    id: "web-development", 
    name: "Web Development",
    slug: "web-development",
    description: "Modern web applications with cutting-edge technologies",
    icon: Globe,
    gigCount: 4,
    featured: true,
  },
  {
    id: "backend",
    name: "Backend Development",
    slug: "backend",
    description: "Scalable APIs and cloud backends built for performance",
    icon: Server,
    gigCount: 4,
    featured: true,
  },
  {
    id: "automation",
    name: "Automation Solutions", 
    slug: "automation",
    description: "Streamlined workflows and business process automation",
    icon: Zap,
    gigCount: 4,
    featured: true,
  }
];

export const gigs: Gig[] = [
  // AI Agents Category
  {
    id: "ai-agent-development",
    title: "Custom AI Agent Development",
    slug: "custom-ai-agent-development",
    description: "Professional AI agent development from architecture to MVP. Custom tool-using agents with memory, RAG, web search capabilities, and comprehensive evaluation systems built for your specific business goals.",
    category: "ai-agents",
    tags: ["AI", "Agents", "RAG", "Memory", "Tools", "MVP"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic Agent",
      price: 1500,
      description: "Simple AI agent with basic tools and memory",
      deliverables: [
        "AI agent architecture design",
        "Basic tool integration (3 tools max)",
        "Simple memory system",
        "Basic evaluation framework",
        "Documentation and deployment guide"
      ],
      deliveryTimeInDays: 14,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Advanced Agent",
      price: 3500,
      description: "Comprehensive AI agent with RAG and advanced capabilities",
      deliverables: [
        "Advanced AI agent architecture",
        "RAG implementation with vector database",
        "Advanced tool integration (10+ tools)",
        "Persistent memory system",
        "Web search capabilities",
        "Comprehensive evaluation system",
        "API integration",
        "Documentation and deployment"
      ],
      deliveryTimeInDays: 21,
      revisions: 3,
      addOnsIncluded: ["basic-monitoring"]
    },
    premiumTier: {
      name: "Enterprise Agent",
      price: 7500,
      description: "Full-scale enterprise AI agent with custom integrations",
      deliverables: [
        "Enterprise-grade architecture",
        "Custom RAG with multiple data sources",
        "Unlimited tool integrations",
        "Advanced memory and context management",
        "Multi-modal capabilities",
        "Custom evaluation metrics",
        "Security and compliance features",
        "24/7 monitoring and alerts",
        "Training and support",
        "Source code and documentation"
      ],
      deliveryTimeInDays: 35,
      revisions: 5,
      addOnsIncluded: ["monitoring", "support", "training"]
    },
    addOns: [
      {
        id: "extra-tools",
        name: "Additional Tool Integration",
        description: "Add 5 more custom tool integrations",
        price: 500,
        deliveryTimeInDays: 3
      },
      {
        id: "monitoring",
        name: "Advanced Monitoring Setup",
        description: "Comprehensive monitoring and alerting system",
        price: 750,
        deliveryTimeInDays: 5
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image",
        url: "/images/gigs/ai-agent-architecture.jpg",
        title: "AI Agent Architecture Diagram",
        description: "Sample architecture for enterprise AI agent",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What programming languages do you use for AI agents?",
        answer: "I primarily use Python with frameworks like LangChain, CrewAI, and custom implementations. For enterprise solutions, I also integrate with Node.js/TypeScript backends.",
        order: 1
      },
      {
        id: "faq-2", 
        question: "Can the AI agent integrate with our existing systems?",
        answer: "Yes! I design agents to work with your existing APIs, databases, and workflows. The agent can connect to virtually any system through APIs or custom integrations.",
        order: 2
      },
      {
        id: "faq-3",
        question: "What kind of evaluation and testing do you provide?",
        answer: "I implement comprehensive evaluation frameworks including accuracy metrics, response time testing, tool usage analytics, and custom business KPIs relevant to your use case.",
        order: 3
      }
    ],
    requirements: [
      "Clear description of the agent's intended purpose and scope",
      "List of systems/APIs the agent needs to integrate with",
      "Sample data or documentation for training/testing",
      "Preferred deployment environment (cloud, on-premise, etc.)",
      "Success criteria and evaluation metrics"
    ],
    seoTitle: "Custom AI Agent Development Services | Professional AI Solutions",
    seoDescription: "Get custom AI agents built with RAG, memory, and tool integration. From MVP to enterprise-grade solutions with comprehensive evaluation systems.",
    deliveryTime: 21,
    revisionCount: 3,
    orderCount: 15,
    averageRating: 4.9,
    reviewCount: 12,
    reviews: sampleReviews,
    icon: Brain,
    featured: true,
    startingPrice: 1500
  },

  // ChatBot Development  
  {
    id: "whatsapp-business-bot",
    title: "WhatsApp Business Bot Development",
    slug: "whatsapp-business-bot-development", 
    description: "Professional WhatsApp Business Platform bots for customer support, sales automation, and proactive notifications. Built with official Cloud API, templates, and full compliance handling.",
    category: "chatbots",
    tags: ["WhatsApp", "Business", "Bot", "Cloud API", "Support", "Sales"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic Bot",
      price: 800,
      description: "Simple WhatsApp bot with basic automation",
      deliverables: [
        "WhatsApp Business account setup",
        "Basic conversation flows (up to 5)",
        "Template messages setup",
        "Basic webhook integration",
        "Testing and deployment"
      ],
      deliveryTimeInDays: 7,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Advanced Bot",
      price: 1800,
      description: "Feature-rich WhatsApp bot with AI capabilities",
      deliverables: [
        "Advanced conversation flows (up to 15)",
        "AI-powered responses with context",
        "CRM integration",
        "Analytics dashboard",
        "Multi-language support",
        "Interactive buttons and lists",
        "Media message handling",
        "Training and documentation"
      ],
      deliveryTimeInDays: 14,
      revisions: 3,
      addOnsIncluded: ["basic-analytics"]
    },
    premiumTier: {
      name: "Enterprise Bot",
      price: 3500,
      description: "Full-featured enterprise WhatsApp solution",
      deliverables: [
        "Unlimited conversation flows",
        "Advanced AI with RAG capabilities",
        "Full CRM/ERP integration",
        "Advanced analytics and reporting",
        "Multi-agent support",
        "Custom business logic",
        "Payment integration",
        "24/7 monitoring",
        "Team training and support"
      ],
      deliveryTimeInDays: 21,
      revisions: 5,
      addOnsIncluded: ["analytics", "monitoring", "training"]
    },
    addOns: [
      {
        id: "payment-integration",
        name: "Payment Integration",
        description: "Stripe/PayPal payment processing within WhatsApp",
        price: 600,
        deliveryTimeInDays: 5
      },
      {
        id: "voice-messages",
        name: "Voice Message Support",
        description: "Voice message processing and responses",
        price: 400,
        deliveryTimeInDays: 3
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image", 
        url: "/images/gigs/whatsapp-bot-demo.jpg",
        title: "WhatsApp Bot Interface",
        description: "Sample conversation flow with interactive elements",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Is this compliant with WhatsApp Business policies?",
        answer: "Yes, all bots are built using the official WhatsApp Business Cloud API and follow Meta's guidelines and policies for business messaging.",
        order: 1
      },
      {
        id: "faq-2",
        question: "Can the bot handle customer support tickets?",
        answer: "Absolutely! The bot can create, track, and manage support tickets, escalate to human agents when needed, and integrate with your existing support systems.",
        order: 2
      }
    ],
    requirements: [
      "WhatsApp Business account (I can help set this up)",
      "Business verification documents",
      "List of common customer queries and desired responses",
      "Integration requirements (CRM, support system, etc.)",
      "Brand guidelines and messaging tone"
    ],
    seoTitle: "WhatsApp Business Bot Development | Official Cloud API Integration",
    seoDescription: "Professional WhatsApp Business bots for customer support and sales automation. Built with official Cloud API, compliant, and feature-rich.",
    deliveryTime: 14,
    revisionCount: 3,
    orderCount: 25,
    averageRating: 4.8,
    reviewCount: 18,
    reviews: sampleReviews.slice(0, 2),
    icon: Bot,
    featured: true,
    startingPrice: 800
  },

  // Mobile Apps
  {
    id: "react-native-app",
    title: "Cross-Platform Mobile App Development", 
    slug: "cross-platform-mobile-app-development",
    description: "Professional React Native mobile applications with native performance, offline capabilities, and seamless user experience across iOS and Android platforms.",
    category: "mobile-apps",
    tags: ["React Native", "iOS", "Android", "Cross-platform", "Mobile", "Native"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic App",
      price: 2500,
      description: "Simple mobile app with core functionality",
      deliverables: [
        "Cross-platform React Native app",
        "Up to 5 screens/features",
        "Basic navigation",
        "Local data storage",
        "Basic UI/UX design",
        "App store submission guidance"
      ],
      deliveryTimeInDays: 21,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Professional App",
      price: 5500,
      description: "Feature-rich mobile app with backend integration",
      deliverables: [
        "Advanced React Native app",
        "Up to 15 screens/features",
        "Backend API integration",
        "User authentication",
        "Push notifications",
        "Offline functionality",
        "Professional UI/UX design",
        "Testing and QA",
        "App store submission"
      ],
      deliveryTimeInDays: 35,
      revisions: 3,
      addOnsIncluded: ["basic-testing"]
    },
    premiumTier: {
      name: "Enterprise App",
      price: 12000,
      description: "Enterprise-grade mobile application with advanced features",
      deliverables: [
        "Full-featured React Native app",
        "Unlimited screens and features",
        "Custom backend development",
        "Advanced authentication & security",
        "Real-time features",
        "Analytics integration",
        "Payment processing",
        "Admin dashboard",
        "Comprehensive testing",
        "App store optimization",
        "Post-launch support (3 months)"
      ],
      deliveryTimeInDays: 60,
      revisions: 5,
      addOnsIncluded: ["testing", "analytics", "support"]
    },
    addOns: [
      {
        id: "app-store-submission",
        name: "App Store Submission Service",
        description: "Complete app store submission and approval process",
        price: 500,
        deliveryTimeInDays: 7
      },
      {
        id: "backend-api",
        name: "Custom Backend API",
        description: "Custom REST API with database and authentication",
        price: 1500,
        deliveryTimeInDays: 14
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image",
        url: "/images/gigs/mobile-app-screens.jpg", 
        title: "Mobile App Screenshots",
        description: "Sample screens from previous mobile app projects",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Will my app work on both iOS and Android?",
        answer: "Yes! React Native allows me to build one codebase that works natively on both iOS and Android platforms, saving time and cost while maintaining performance.",
        order: 1
      },
      {
        id: "faq-2",
        question: "Do you handle app store submissions?", 
        answer: "I provide guidance for app store submissions with all packages, and offer full submission service as an add-on. This includes creating store listings, screenshots, and handling the approval process.",
        order: 2
      }
    ],
    requirements: [
      "Detailed app concept and feature requirements",
      "UI/UX design preferences or mockups (if available)",
      "Target platforms (iOS, Android, or both)",
      "Backend/API requirements",
      "App store account details (for submission)"
    ],
    seoTitle: "React Native Mobile App Development | Cross-Platform iOS & Android",
    seoDescription: "Professional React Native mobile app development for iOS and Android. Native performance, modern UI, and full app store submission support.",
    deliveryTime: 35,
    revisionCount: 3,
    orderCount: 20,
    averageRating: 4.9,
    reviewCount: 15,
    reviews: sampleReviews,
    icon: Smartphone,
    featured: true,
    startingPrice: 2500
  },

  // Web Development
  {
    id: "nextjs-web-app",
    title: "Modern Web Application Development",
    slug: "modern-web-application-development",
    description: "Professional Next.js web applications with server-side rendering, secure APIs, real-time features, and deployment on serverless/edge infrastructure for maximum speed and reliability.",
    category: "web-development", 
    tags: ["Next.js", "React", "TypeScript", "API", "SSR", "Serverless"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic Web App",
      price: 1800,
      description: "Modern web application with essential features",
      deliverables: [
        "Next.js application with TypeScript",
        "Up to 8 pages/routes",
        "Responsive design",
        "Basic API routes",
        "Database integration",
        "SEO optimization",
        "Deployment setup"
      ],
      deliveryTimeInDays: 18,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Professional Web App",
      price: 4200,
      description: "Feature-rich web application with advanced capabilities",
      deliverables: [
        "Advanced Next.js architecture",
        "Unlimited pages and routes",
        "User authentication system",
        "Advanced API with middleware",
        "Database design and optimization",
        "Payment integration",
        "Admin dashboard",
        "Performance optimization",
        "SEO and analytics",
        "Testing and deployment"
      ],
      deliveryTimeInDays: 28,
      revisions: 3,
      addOnsIncluded: ["seo-optimization"]
    },
    premiumTier: {
      name: "Enterprise Web App",
      price: 8500,
      description: "Enterprise-grade web application with full features",
      deliverables: [
        "Enterprise Next.js architecture",
        "Microservices backend",
        "Advanced authentication & authorization",
        "Real-time features (WebSocket/SSE)",
        "Multi-tenant architecture",
        "Advanced security implementation",
        "Performance monitoring",
        "CI/CD pipeline setup",
        "Documentation and training",
        "3 months post-launch support"
      ],
      deliveryTimeInDays: 45,
      revisions: 5,
      addOnsIncluded: ["monitoring", "cicd", "support"]
    },
    addOns: [
      {
        id: "cms-integration",
        name: "CMS Integration",
        description: "Headless CMS integration with Strapi or Sanity",
        price: 800,
        deliveryTimeInDays: 7
      },
      {
        id: "ecommerce-features",
        name: "E-commerce Features",
        description: "Shopping cart, checkout, and inventory management",
        price: 1200,
        deliveryTimeInDays: 10
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image",
        url: "/images/gigs/web-app-dashboard.jpg",
        title: "Web Application Dashboard",
        description: "Sample dashboard interface with modern design",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What technologies do you use for web development?",
        answer: "I primarily use Next.js with TypeScript, React, Tailwind CSS, and modern database solutions like PostgreSQL or MongoDB. All applications are built with performance and scalability in mind.",
        order: 1
      },
      {
        id: "faq-2",
        question: "Is the website mobile-responsive?",
        answer: "Absolutely! All web applications are built with a mobile-first approach and are fully responsive across all devices and screen sizes.",
        order: 2
      }
    ],
    requirements: [
      "Detailed project requirements and feature list",
      "Design preferences or brand guidelines",
      "Target audience and user personas",
      "Integration requirements (APIs, payment systems, etc.)",
      "Hosting and domain preferences"
    ],
    seoTitle: "Next.js Web Application Development | Modern React Solutions",
    seoDescription: "Professional Next.js web application development with TypeScript, API integration, and serverless deployment. Fast, secure, and scalable.",
    deliveryTime: 28,
    revisionCount: 3,
    orderCount: 30,
    averageRating: 4.8,
    reviewCount: 22,
    reviews: sampleReviews.slice(0, 3),
    icon: Globe,
    featured: true,
    startingPrice: 1800
  },

  // Backend Development
  {
    id: "api-development",
    title: "RESTful API Development with Node.js",
    slug: "restful-api-development-nodejs",
    description: "Professional REST API development with Node.js, Express, and MongoDB. Includes authentication, validation, documentation, and deployment setup.",
    category: "backend",
    tags: ["Node.js", "Express", "MongoDB", "REST API", "Authentication", "JWT"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic API",
      price: 1200,
      description: "Simple REST API with basic endpoints",
      deliverables: [
        "REST API with up to 10 endpoints",
        "MongoDB database integration",
        "Basic authentication",
        "Input validation",
        "API documentation",
        "Testing setup"
      ],
      deliveryTimeInDays: 10,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Advanced API",
      price: 2800,
      description: "Feature-rich API with advanced capabilities",
      deliverables: [
        "REST API with unlimited endpoints",
        "Advanced authentication & authorization",
        "Database optimization",
        "Rate limiting & security",
        "Comprehensive documentation",
        "Unit and integration tests",
        "Deployment setup",
        "Performance monitoring"
      ],
      deliveryTimeInDays: 18,
      revisions: 3,
      addOnsIncluded: ["basic-monitoring"]
    },
    premiumTier: {
      name: "Enterprise API",
      price: 5500,
      description: "Production-ready enterprise API solution",
      deliverables: [
        "Microservices architecture",
        "Advanced security features",
        "Database scaling strategy",
        "CI/CD pipeline setup",
        "Advanced monitoring & logging",
        "Load balancing configuration",
        "Documentation portal",
        "Performance optimization",
        "3 months support"
      ],
      deliveryTimeInDays: 28,
      revisions: 5,
      addOnsIncluded: ["monitoring", "support", "cicd"]
    },
    addOns: [
      {
        id: "websocket",
        name: "WebSocket Integration",
        description: "Real-time features with WebSocket support",
        price: 400,
        deliveryTimeInDays: 3
      },
      {
        id: "graphql",
        name: "GraphQL API",
        description: "Alternative GraphQL API alongside REST",
        price: 600,
        deliveryTimeInDays: 5
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image",
        url: "/images/gigs/api-architecture.jpg",
        title: "API Architecture Diagram",
        description: "Sample API architecture and endpoint structure",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What technologies do you use for API development?",
        answer: "I primarily use Node.js with Express.js framework, MongoDB or PostgreSQL for databases, and industry-standard tools for authentication, validation, and testing.",
        order: 1
      },
      {
        id: "faq-2",
        question: "Do you provide API documentation?",
        answer: "Yes! All packages include comprehensive API documentation using tools like Swagger/OpenAPI, making it easy for frontend developers to integrate.",
        order: 2
      }
    ],
    requirements: [
      "Detailed API requirements and endpoint specifications",
      "Database schema or data model requirements",
      "Authentication and authorization requirements",
      "Third-party integrations needed",
      "Performance and scalability requirements"
    ],
    seoTitle: "Node.js REST API Development | Professional Backend Services",
    seoDescription: "Professional REST API development with Node.js, Express, and MongoDB. Secure, scalable, and well-documented APIs for your applications.",
    deliveryTime: 18,
    revisionCount: 3,
    orderCount: 18,
    averageRating: 4.7,
    reviewCount: 14,
    reviews: sampleReviews.slice(0, 2),
    icon: Server,
    featured: false,
    startingPrice: 1200
  },

  // Automation Solutions
  {
    id: "business-automation",
    title: "Business Process Automation",
    slug: "business-process-automation",
    description: "Streamline your business operations with custom automation solutions. From data processing to workflow automation, reduce manual work and increase efficiency.",
    category: "automation",
    tags: ["Automation", "Python", "Workflow", "Integration", "Efficiency", "Process"],
    status: "published",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    pricingModel: "fixed",
    basicTier: {
      name: "Basic Automation",
      price: 800,
      description: "Simple automation for repetitive tasks",
      deliverables: [
        "Automation of 1-2 business processes",
        "Basic data processing scripts",
        "Simple integration setup",
        "Documentation and training",
        "30 days support"
      ],
      deliveryTimeInDays: 12,
      revisions: 2,
      addOnsIncluded: []
    },
    standardTier: {
      name: "Advanced Automation",
      price: 2200,
      description: "Comprehensive automation solution",
      deliverables: [
        "Multiple process automation",
        "Advanced data processing",
        "API integrations",
        "Error handling and logging",
        "Scheduling and monitoring",
        "Comprehensive documentation",
        "Training sessions",
        "60 days support"
      ],
      deliveryTimeInDays: 20,
      revisions: 3,
      addOnsIncluded: ["basic-monitoring"]
    },
    premiumTier: {
      name: "Enterprise Automation",
      price: 4500,
      description: "Complete automation ecosystem",
      deliverables: [
        "End-to-end process automation",
        "Advanced workflow management",
        "Multiple system integrations",
        "Real-time monitoring and alerts",
        "Performance optimization",
        "Scalable architecture",
        "Team training program",
        "3 months support and maintenance"
      ],
      deliveryTimeInDays: 30,
      revisions: 5,
      addOnsIncluded: ["monitoring", "support", "training"]
    },
    addOns: [
      {
        id: "additional-integration",
        name: "Additional System Integration",
        description: "Connect one more external system or API",
        price: 300,
        deliveryTimeInDays: 3
      },
      {
        id: "dashboard",
        name: "Monitoring Dashboard",
        description: "Custom dashboard for monitoring automation performance",
        price: 500,
        deliveryTimeInDays: 5
      }
    ],
    mediaGallery: [
      {
        id: "img-1",
        type: "image",
        url: "/images/gigs/automation-workflow.jpg",
        title: "Automation Workflow Example",
        description: "Sample automation workflow and process diagram",
        order: 1
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "What types of business processes can you automate?",
        answer: "I can automate various processes including data entry, report generation, email workflows, inventory management, customer onboarding, and many others. If it's repetitive, it can likely be automated!",
        order: 1
      },
      {
        id: "faq-2",
        question: "What tools and technologies do you use?",
        answer: "I use Python for scripting, tools like Zapier/Make.com for no-code automation, APIs for integrations, and custom solutions when needed. The choice depends on your specific requirements and existing systems.",
        order: 2
      }
    ],
    requirements: [
      "Detailed description of current manual processes",
      "List of systems and tools currently used",
      "Access credentials for integrations (when ready)",
      "Business rules and decision logic",
      "Expected volume and frequency of operations"
    ],
    seoTitle: "Business Process Automation Services | Workflow Optimization",
    seoDescription: "Streamline your business operations with custom automation solutions. Reduce manual work, increase efficiency, and save time with professional automation services.",
    deliveryTime: 20,
    revisionCount: 3,
    orderCount: 12,
    averageRating: 4.6,
    reviewCount: 9,
    reviews: sampleReviews.slice(0, 1),
    icon: Zap,
    featured: false,
    startingPrice: 800
  }
];

export const featuredGigs = gigs.filter(gig => gig.featured);

export const getGigsByCategory = (category: string) => {
  return gigs.filter(gig => gig.category === category);
};

export const getGigBySlug = (slug: string) => {
  return gigs.find(gig => gig.slug === slug);
};

export const searchGigs = (query: string) => {
  const searchTerm = query.toLowerCase();
  return gigs.filter(gig => 
    gig.title.toLowerCase().includes(searchTerm) ||
    gig.description.toLowerCase().includes(searchTerm) ||
    gig.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};