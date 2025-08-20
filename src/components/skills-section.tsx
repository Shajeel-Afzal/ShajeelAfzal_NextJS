'use client';

import { useState } from 'react';
import { SkillCard } from '@/components/skill-card';
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";

// Single array of all skills
// 
// ⚠️  IMPORTANT: When adding/removing/modifying skills, also update:
// 1. src/components/theme-aware-icon.tsx - Add icon mapping in skillIconMap
// 2. src/components/theme-aware-icon.tsx - Add brand color in getBrandColor function
// 3. src/components/skill-card.tsx - Add brand color in getBrandColor function
// 
// This ensures all skill cards display with proper branded icons and colors.
// 
const skills: { name: string }[] = [
    // Frontend & Web Technologies
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Tailwind CSS" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "Shadcn" },
  { name: "Supabase" },
    { name: "Vector Database" },
    { name: "Pinecone" },
  
  // Mobile & Cross-Platform
    { name: "Flutter" },
    { name: "Dart" },
    { name: "Expo" },
    { name: "PWA" },
    { name: "Google Play" },
    { name: "App Store" },
    { name: "RevenueCat" },
  
  // Backend, AI & Cloud
    { name: "AI Development" },
    { name: "Chatbots" },
    { name: "Node.js" },
    { name: "Python" },
    { name: "FastAPI" },
    { name: "MongoDB" },
    { name: "PostgreSQL" },
    { name: "AWS" },
    { name: "GCP" },
    { name: "Docker" },
    { name: "REST APIs" },
    { name: "GraphQL" },
    { name: "Firebase" },
    { name: "Vercel" },
    { name: "WordPress" },
  { name: "OpenAI" },
  { name: "Langchain" },
  { name: "Stripe" },
    { name: "Postmark" },
    { name: "Postman" },
    { name: "N8N" },
    { name: "Git" },
    { name: "Github" },
    { name: "VS Code" }
];

// Dynamic function to split skills into rows - handles any number of skills
const splitSkillsIntoRows = (skills: { name: string }[], numberOfRows: number = 3) => {
  // Handle edge cases
  if (!skills || skills.length === 0) {
    return [];
  }
  
  if (numberOfRows <= 0) {
    numberOfRows = 1;
  }
  
  // If we have fewer skills than desired rows, adjust rows to match skills
  const actualRows = Math.min(numberOfRows, skills.length);
  
  const rows: { name: string }[][] = [];
  const itemsPerRow = Math.ceil(skills.length / actualRows);
  
  for (let i = 0; i < actualRows; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = Math.min(startIndex + itemsPerRow, skills.length);
    const rowSkills = skills.slice(startIndex, endIndex);
    
    // Only add row if it has skills (extra safety check)
    if (rowSkills.length > 0) {
      rows.push(rowSkills);
    }
  }
  
  return rows;
};

export function SkillsSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically split skills into rows (default: 3 rows)
  const skillRows = splitSkillsIntoRows(skills, 3);

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Expertise Across{" "}
            <AuroraText className="text-4xl md:text-5xl font-bold">
              Modern Technologies
            </AuroraText>{" "}
            💻 & Frameworks
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Building scalable solutions with cutting-edge tools across web, mobile, AI, and cloud technologies
          </p>
        </div>

        <div 
          className={`space-y-2 ${isHovered ? 'pause-all-marquees' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* First Row - Left to Right */}
          {skillRows[0] && (
            <Marquee className="[--duration:50s]">
              {skillRows[0].map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </Marquee>
          )}

          {/* Second Row - Right to Left */}
          {skillRows[1] && (
            <Marquee className="[--duration:55s]" reverse>
              {skillRows[1].map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </Marquee>
          )}

          {/* Third Row - Left to Right */}
          {skillRows[2] && (
            <Marquee className="[--duration:60s]">
              {skillRows[2].map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </section>
  );
}
