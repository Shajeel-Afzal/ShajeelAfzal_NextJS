import { LucideIcon } from "lucide-react";
import {
  Brain,
  Bot,
  Smartphone,
  Globe,
  Server,
  Zap,
  ShoppingCart,
  CreditCard,
  Database,
  Cloud,
  Code,
  Palette,
  Settings,
  BarChart,
  MessageSquare,
  Users,
  Lock
} from "lucide-react";

export interface ServiceSubcategory {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Service {
  title: string;
  icon: LucideIcon;
  description: string;
  subcategories: ServiceSubcategory[];
}

export interface Services {
  [key: string]: Service;
}

export const services: Services = {
  "ai-agents": {
    title: "AI Agent Development",
    icon: Brain,
    description: "Intelligent AI agents that understand your business and deliver autonomous results",
    subcategories: [
      {
        title: "Custom GPT Development",
        description: "Build specialized GPT models tailored to your business domain",
        icon: Brain
      },
      {
        title: "AI Workflow Automation",
        description: "Automate complex business processes with intelligent decision-making",
        icon: Settings
      },
      {
        title: "Conversational AI",
        description: "Advanced chatbots with natural language understanding and context awareness",
        icon: MessageSquare
      },
      {
        title: "AI Analytics & Insights",
        description: "Extract actionable insights from your data using AI-powered analytics",
        icon: BarChart
      }
    ]
  },
  "chatbots": {
    title: "ChatBot Development",
    icon: Bot,
    description: "Smart conversational interfaces that engage customers 24/7",
    subcategories: [
      {
        title: "WhatsApp Business Bots",
        description: "Automated customer service and sales through WhatsApp Business API",
        icon: MessageSquare
      },
      {
        title: "Website Chat Integration",
        description: "Seamlessly integrated chatbots for your website with lead capture",
        icon: Globe
      },
      {
        title: "Multi-Platform Bots",
        description: "Deploy across Telegram, Discord, Slack, and other platforms",
        icon: Users
      },
      {
        title: "Voice-Enabled Bots",
        description: "Advanced bots with speech recognition and text-to-speech capabilities",
        icon: Bot
      }
    ]
  },
  "mobile-apps": {
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Cross-platform mobile applications with native performance",
    subcategories: [
      {
        title: "Complete Solution Development",
        description: "Full-stack mobile app development from concept to deployment",
        icon: Smartphone
      },
      {
        title: "In-App Purchase Integration",
        description: "Monetize your app with seamless payment and subscription systems",
        icon: CreditCard
      },
      {
        title: "Cross-Platform Development",
        description: "React Native and Flutter apps that work on both iOS and Android",
        icon: Code
      },
      {
        title: "App Store Optimization",
        description: "Complete app store submission and optimization services",
        icon: BarChart
      }
    ]
  },
  "web-development": {
    title: "Website Development",
    icon: Globe,
    description: "Modern, responsive websites built with cutting-edge technologies",
    subcategories: [
      {
        title: "Full-Stack Web Applications",
        description: "Complete web solutions with modern frontend and robust backend",
        icon: Globe
      },
      {
        title: "E-Commerce Platforms",
        description: "Custom online stores with payment processing and inventory management",
        icon: ShoppingCart
      },
      {
        title: "UI/UX Design & Development",
        description: "Beautiful, user-centered designs that convert visitors to customers",
        icon: Palette
      },
      {
        title: "Progressive Web Apps",
        description: "App-like experiences that work across all devices and platforms",
        icon: Smartphone
      }
    ]
  },
  "backend": {
    title: "Backend Development",
    icon: Server,
    description: "Scalable server infrastructure and APIs that power your applications",
    subcategories: [
      {
        title: "REST & GraphQL APIs",
        description: "High-performance APIs with comprehensive documentation and testing",
        icon: Server
      },
      {
        title: "Database Design & Management",
        description: "Optimized database architectures for performance and scalability",
        icon: Database
      },
      {
        title: "Cloud Infrastructure",
        description: "AWS, Google Cloud, and Azure deployments with auto-scaling",
        icon: Cloud
      },
      {
        title: "Security & Authentication",
        description: "Enterprise-grade security with OAuth, JWT, and encryption",
        icon: Lock
      }
    ]
  },
  "automation": {
    title: "Automation Solutions",
    icon: Zap,
    description: "Streamline operations with intelligent automation workflows",
    subcategories: [
      {
        title: "Business Process Automation",
        description: "Automate repetitive tasks and workflows to save time and reduce errors",
        icon: Settings
      },
      {
        title: "Data Pipeline Automation",
        description: "Automated data collection, processing, and analysis workflows",
        icon: Database
      },
      {
        title: "Social Media Automation",
        description: "Automated posting, engagement, and analytics for social platforms",
        icon: Users
      },
      {
        title: "Integration Automation",
        description: "Connect different tools and platforms with seamless data flow",
        icon: Zap
      }
    ]
  }
};
