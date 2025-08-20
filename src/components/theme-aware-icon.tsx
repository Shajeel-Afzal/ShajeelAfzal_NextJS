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
  "Shadcn": "lucide:component",
  "Svelte": "logos:svelte-icon",
  "Angular": "logos:angular-icon",
  "React Native": "logos:react",
  "Flutter": "logos:flutter",
  "Dart": "logos:dart",
  "Ionic": "logos:ionic-icon",
  "Expo": "logos:expo-icon",
  "Xamarin": "simple-icons:xamarin",
  "Cordova": "logos:cordova",
  "PWA": "simple-icons:pwa",
  "Electron": "logos:electron",
  "AI Development": "simple-icons:openai",
  "Chatbots": "lucide:bot",
  "Claude": "simple-icons:anthropic",
  "Perplexity": "simple-icons:perplexity",
  "Node.js": "logos:nodejs-icon",
  "Python": "logos:python",
  "Django": "logos:django-icon",
  "FastAPI": "logos:fastapi-icon",
  "MongoDB": "logos:mongodb-icon",
  "PostgreSQL": "logos:postgresql",
  "AWS": "logos:aws",
  "GCP": "logos:google-cloud",
  "Docker": "logos:docker-icon",
  "REST APIs": "lucide:zap",
  "GraphQL": "logos:graphql",
  "Firebase": "simple-icons:firebase",
  "Vercel": "logos:vercel-icon",
  "WordPress": "logos:wordpress-icon",
  "TensorFlow": "logos:tensorflow",
  "OpenAI": "simple-icons:openai",
  "Langchain": "lucide:brain",
  "Supabase": "logos:supabase-icon",
  "Vector Database": "lucide:database",
  "Pinecone": "lucide:brain",
  "Google Play": "logos:google-play-icon",
  "App Store": "simple-icons:appstore",
  "RevenueCat": "lucide:receipt",
  "Stripe": "logos:stripe",
  "Postmark": "lucide:mail",
  "Postman": "logos:postman-icon",
  "N8N": "simple-icons:n8n",
  "Git": "logos:git-icon",
  "Github": "logos:github-icon",
  "Atlassian": "logos:atlassian",
  "VS Code": "logos:visual-studio-code",
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
    "Claude": "#CD7F32",
    "Perplexity": "#20B2AA",
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