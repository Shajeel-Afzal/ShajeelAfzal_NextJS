'use client';

import React from 'react';
import { Icon } from '@iconify/react';

// Skill icon mapping
const skillIconMap: Record<string, string> = {
  "React": "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Vue.js": "logos:vue",
  "TypeScript": "logos:typescript-icon",
  "JavaScript": "logos:javascript",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "HTML5": "logos:html-5",
  "CSS3": "logos:css-3",
  "Svelte": "logos:svelte-icon",
  "Angular": "logos:angular-icon",
  "React Native": "logos:react",
  "Flutter": "logos:flutter",
  "Ionic": "logos:ionic-icon",
  "Expo": "logos:expo-icon",
  "Xamarin": "simple-icons:xamarin",
  "Cordova": "logos:cordova",
  "PWA": "simple-icons:pwa",
  "Electron": "logos:electron",
  "AI Development": "simple-icons:openai",
  "Chatbots": "lucide:bot",
  "Node.js": "logos:nodejs-icon",
  "Python": "logos:python",
  "Django": "logos:django-icon",
  "FastAPI": "logos:fastapi-icon",
  "MongoDB": "logos:mongodb-icon",
  "PostgreSQL": "logos:postgresql",
  "AWS": "logos:aws",
  "Docker": "logos:docker-icon",
  "REST APIs": "lucide:zap",
  "GraphQL": "logos:graphql",
  "Firebase": "logos:firebase",
  "TensorFlow": "logos:tensorflow",
  "OpenAI": "simple-icons:openai",
  "Langchain": "lucide:brain",
  "Redis": "logos:redis",
  "Kubernetes": "logos:kubernetes",
};

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

// Hook to get theme-aware icon name
export function useThemeAwareIcon(skillName: string): string {
  return skillIconMap[skillName] || "lucide:code";
}

// Component for theme-aware icons
interface ThemeAwareIconProps {
  skill: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeAwareIcon({ skill, size = 32, className = '', style = {} }: ThemeAwareIconProps) {
  const iconName = useThemeAwareIcon(skill);
  const brandColor = getBrandColor(skill);

  return (
    <Icon 
      icon={iconName}
      width={size}
      height={size}
      className={className}
      style={{ 
        color: brandColor,
        ...style
      }} 
    />
  );
}