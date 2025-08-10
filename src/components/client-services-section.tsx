'use client';

import { Smartphone, Brain, Code, Zap } from "lucide-react";
import { OptimizedBentoGrid, OptimizedBentoCard } from "@/components/optimized-magicui";

// Icon mapping for client components
const iconMap = {
    smartphone: Smartphone,
    brain: Brain,
    code: Code,
    zap: Zap,
} as const;

type IconName = keyof typeof iconMap;

interface Feature {
    title: string;
    description: string;
    iconName: IconName;
    className: string;
}

interface ClientServicesSectionProps {
    features: Feature[];
}

export function ClientServicesSection({ features }: ClientServicesSectionProps) {
    return (
        <OptimizedBentoGrid className="max-w-6xl mx-auto">
            {features.map((feature) => {
                const IconComponent = iconMap[feature.iconName];

                return (
                    <OptimizedBentoCard
                        key={feature.title}
                        name={feature.title}
                        description={feature.description}
                        background={
                            <div className="flex h-60 w-full items-center justify-center bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg">
                                <IconComponent className="w-16 h-16 text-primary" />
                            </div>
                        }
                        Icon={IconComponent}
                        className={feature.className}
                        href="#services"
                        cta="Learn More"
                    />
                );
            })}
        </OptimizedBentoGrid>
    );
}
