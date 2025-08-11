"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils";

const services = {
  "ai-agents": {
    title: "AI Agent Development",
    icon: Brain,
    description: "Intelligent AI agents that understand your business and deliver autonomous results",
    color: "from-purple-500 to-pink-500",
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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-green-500 to-emerald-500",
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
    color: "from-orange-500 to-red-500",
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
    color: "from-slate-500 to-gray-600",
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
    color: "from-yellow-500 to-amber-500",
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

export function ServicesShowcase() {
  const [activeTab, setActiveTab] = useState("ai-agents");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Services That Drive Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions designed to transform your business and accelerate growth through cutting-edge development
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12 h-auto p-1 bg-muted/30 backdrop-blur-sm">
            {Object.entries(services).map(([key, service]) => {
              const Icon = service.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 h-auto transition-all duration-300",
                    "data-[state=active]:bg-background data-[state=active]:shadow-lg",
                    "data-[state=active]:scale-105 hover:scale-102"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {service.title}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tabs Content */}
          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="space-y-12">
                {/* Subcategories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {service.subcategories.map((subcategory, index) => {
                    const SubIcon = subcategory.icon;
                    return (
                      <div
                        key={index}
                        className="group text-center space-y-4 transition-all duration-300 hover:scale-105"
                      >
                        <div className={cn(
                          "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                          "bg-muted/50 group-hover:bg-gradient-to-br group-hover:shadow-lg",
                          "group-hover:" + service.color.replace("from-", "from-") + "/20 group-hover:to-transparent"
                        )}>
                          <SubIcon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold leading-tight">
                            {subcategory.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {subcategory.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}