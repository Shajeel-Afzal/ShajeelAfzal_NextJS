'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from 'next-themes';
import { Skill } from '@/types/skill';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const { theme, resolvedTheme } = useTheme();
  
  // Determine which icon to use based on the current theme
  const currentTheme = resolvedTheme || theme;
  const iconToUse = currentTheme === 'dark' ? skill.icon.dark : skill.icon.light;

  return (
    <div className="flex flex-col items-center group">
      <MagicCard
        className="w-32 h-32 flex items-center justify-center cursor-pointer rounded-3xl border shadow-sm bg-card hover:bg-card/80 transition-colors"
        gradientSize={200}
        gradientColor="rgba(59, 130, 246, 0.1)"
        gradientOpacity={0.6}
      >
        <Icon 
          icon={iconToUse}
          className="w-16 h-16 theme-adaptive-icon transition-transform group-hover:scale-110" 
          data-icon={iconToUse}
          style={{ 
            ...(skill.brandColor && { color: skill.brandColor }),
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
            display: 'block'
          }} 
        />
      </MagicCard>
      
      {/* Skill name that appears below on hover */}
      <div className="mt-2 px-2 py-1 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
        {skill.name}
      </div>
    </div>
  );
}
