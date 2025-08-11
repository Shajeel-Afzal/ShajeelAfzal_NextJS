"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MagicCard } from "@/components/magicui/magic-card";

const services = {
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

export function ServicesShowcase() {
  const [activeTab, setActiveTab] = useState("ai-agents");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4">
            <AnimatedShinyText className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Services That Drive Innovation
            </AnimatedShinyText>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions designed to transform your business and accelerate growth through cutting-edge development
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs List */}
          <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-12 p-2 bg-muted/20 backdrop-blur-sm rounded-xl border border-border/40">
            {Object.entries(services).map(([key, service]) => {
              const Icon = service.icon;
              const isActive = activeTab === key;
              
              return isActive ? (
                <div key={key} className="relative rounded-lg p-0.5 overflow-hidden">
                  {/* Rotating border gradient */}
                  <div 
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
                      animation: 'spin 6s linear infinite'
                    }}
                  />
                  <button
                    onClick={() => setActiveTab(key)}
                    className="relative flex flex-col items-center gap-2 p-4 h-auto transition-all duration-300 rounded-[6px] shadow-lg hover:shadow-xl hover:scale-102 bg-gradient-to-br from-primary/8 to-accent/8 hover:from-primary/12 hover:to-accent/12 w-full"
                  >
                    <Icon className="w-5 h-5 transition-colors text-primary" />
                    <span className="text-xs font-medium text-center leading-tight text-foreground">
                      {service.title}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 h-auto transition-all duration-300",
                    "bg-background/50 hover:bg-background/80 hover:scale-102 rounded-lg border border-border/20",
                    "hover:shadow-md text-foreground/80 hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tabs Content */}
          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="space-y-12">
                {/* Subcategories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.subcategories.map((subcategory, index) => {
                    const SubIcon = subcategory.icon;
                    return (
                      <MagicCard
                        key={index}
                        className="group cursor-pointer text-center p-6 transition-all duration-300 bg-gradient-to-b from-background/80 to-background/40 border-border/30 hover:shadow-xl"
                        gradientColor="rgba(59, 130, 246, 0.15)"
                        gradientSize={200}
                      >
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 group-hover:shadow-xl group-hover:scale-110">
                            <SubIcon className="w-7 h-7 transition-all duration-300 text-primary group-hover:text-accent" />
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold leading-tight text-foreground group-hover:text-foreground/90">
                              {subcategory.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90">
                              {subcategory.description}
                            </p>
                          </div>
                        </div>
                      </MagicCard>
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