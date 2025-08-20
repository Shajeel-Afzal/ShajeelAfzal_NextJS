"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { services, Service } from "@/data/services";
import { CheckCircle } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <MagicCard
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-2xl h-full"
      gradientSize={300}
      gradientColor="rgba(59, 130, 246, 0.15)"
      gradientOpacity={0.8}
    >
      <div className="relative h-full p-6 flex flex-col">
        {/* Service Icon and Title */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-primary group-hover:text-blue-600 transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {service.description}
          </p>
        </div>

        {/* Subcategories as bullet points */}
        <div className="flex-grow">
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-primary">●</span>
            Key Services:
          </h4>
          <ul className="space-y-3">
            {service.subcategories.map((subcategory, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-medium text-foreground">{subcategory.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <InteractiveHoverButton className="text-sm w-full">
            Learn More
          </InteractiveHoverButton>
        </div>
      </div>
    </MagicCard>
  );
}

export function ServicesCardsShowcase() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Technology Solutions 🚀
            </span>{" "}
            for Your Business
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From AI automation to mobile apps, we deliver cutting-edge solutions that drive innovation and accelerate growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(services).map(([key, service]) => (
            <ServiceCard 
              key={key} 
              service={service}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to transform your business with cutting-edge technology?
          </p>
          <InteractiveHoverButton className="text-lg px-8 py-3">
            Get Started Today
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
