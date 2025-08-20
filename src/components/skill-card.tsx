'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { MagicCard } from "@/components/magicui/magic-card";
import { useThemeAwareIcon } from './theme-aware-icon';

interface SkillCardProps {
  skill: { name: string };
}

export function SkillCard({ skill }: SkillCardProps) {
  // Brand color mapping for authentic technology colors
  const getBrandColor = (skillName: string): string => {
    const brandColors: Record<string, string> = {
      "React": "#61DAFB",
      "Next.js": "#000000", 
      "Vue.js": "#4FC08D",
      "TypeScript": "#3178C6",
      "JavaScript": "#F7DF1E",
      "Tailwind CSS": "#06B6D4",
      "HTML5": "#E34F26",
      "CSS3": "#1572B6",
      "Svelte": "#FF3E00",
      "Angular": "#DD0031",
      "React Native": "#61DAFB",
      "Flutter": "#02569B",
      "Ionic": "#3880FF",
      "Expo": "#000020",
      "Cordova": "#E8E8E8",
      "PWA": "#5A0FC8",
      "Electron": "#47848F",
      "AI Development": "#00A67E",
      "Node.js": "#339933",
      "Python": "#3776AB",
      "Django": "#092E20",
      "FastAPI": "#009688",
      "MongoDB": "#47A248",
      "PostgreSQL": "#336791",
      "AWS": "#FF9900",
      "Docker": "#2496ED",
      "GraphQL": "#E10098",
      "Firebase": "#FFCA28",
      "TensorFlow": "#FF6F00",
      "OpenAI": "#00A67E",
      "Redis": "#DC382D",
      "Kubernetes": "#326CE5",
    };

    return brandColors[skillName] || "hsl(var(--primary))";
  };

  const iconName = useThemeAwareIcon(skill.name);

  return (
    <MagicCard
      className="w-32 h-32 flex items-center justify-center cursor-pointer group rounded-3xl border shadow-sm bg-card hover:bg-card/80 transition-colors"
      gradientSize={200}
      gradientColor="rgba(59, 130, 246, 0.1)"
      gradientOpacity={0.6}
    >
      <Icon 
        icon={iconName}
        className="w-16 h-16 theme-adaptive-icon transition-transform group-hover:scale-110" 
        style={{ 
          color: getBrandColor(skill.name),
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
          display: 'block'
        }} 
      />
    </MagicCard>
  );
}
