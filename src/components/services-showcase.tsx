"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MagicCard } from "@/components/magicui/magic-card";
import { services } from "@/data/services";

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
          {/* Tabs List - shadcn tabs-06 style */}
          <TabsList
            className={cn(
              "mb-12 h-12 w-full max-w-full overflow-x-auto rounded-xl border border-border/40 bg-muted/20 p-2 backdrop-blur-sm",
              "flex gap-2 md:justify-center"
            )}
          >
            {Object.entries(services).map(([key, service]) => {
              const Icon = service.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={cn(
                    "group min-w-max gap-2 rounded-lg px-3 py-2 text-sm font-medium flex-none",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground",
                    "text-foreground/80 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 transition-colors group-data-[state=active]:text-primary" />
                  <span className="whitespace-nowrap">{service.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

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