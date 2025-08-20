'use client';

import React from 'react';
import { Icon } from '@iconify/react';
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
    <div className="mx-4 flex flex-col items-center p-6 rounded-lg bg-card hover:bg-card/80 transition-colors group cursor-pointer min-w-[160px] border shadow-sm">
      <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
        <Icon 
          icon={iconName}
          className="w-8 h-8 theme-adaptive-icon" 
          style={{ 
            color: getBrandColor(skill.name),
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))"
          }} 
        />
      </div>
      <p className="font-semibold text-center text-sm">{skill.name}</p>
    </div>
  );
}
