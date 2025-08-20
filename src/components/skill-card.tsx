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
      "Shadcn": "#000000",
      "Svelte": "#FF3E00",
      "Angular": "#DD0031",
      "React Native": "#61DAFB",
      "Flutter": "#02569B",
      "Dart": "#0175C2",
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
      "GCP": "#4285F4",
      "Docker": "#2496ED",
      "GraphQL": "#E10098",
      "Firebase": "#FFCA28",
      "Vercel": "#000000",
      "WordPress": "#21759B",
      "TensorFlow": "#FF6F00",
      "OpenAI": "#00A67E",
      "Langchain": "#1C3AA9",
      "Supabase": "#3ECF8E",
      "Vector Database": "#8B5CF6",
      "Pinecone": "#3ABEF9",
      "Google Play": "#01875F",
      "App Store": "#0D7EFF",
      "RevenueCat": "#F97316",
      "Stripe": "#635BFF",
      "Postmark": "#FFDD00",
      "Postman": "#FF6C37",
      "N8N": "#EA4B71",
      "Git": "#F05032",
      "Github": "#181717",
      "Atlassian": "#0052CC",
      "VS Code": "#007ACC",
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
        data-icon={iconName}
        style={{ 
          color: getBrandColor(skill.name),
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
          display: 'block'
        }} 
      />
    </MagicCard>
  );
}
