'use client';

import { useState } from 'react';
import { SkillCard } from '@/components/skill-card';
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Skill } from '@/types/skill';

// Skills data with light/dark theme icon support and brand color properties
// All skills now contain their icon names for both themes and brand colors directly
// 
// To add a new skill:
// 1. Add an object with name, icon (light & dark variants), and brandColor
// 2. Use the same icon for both light/dark if no theme-specific variant exists
// 3. Use different icons for light/dark when better visibility is needed
//    Example: GitHub uses logos:github-icon (light) vs simple-icons:github (dark)
//

const skills: Skill[] = [
  // Frontend & Web Technologies
  { name: "React", icon: { light: "logos:react", dark: "logos:react" }, brandColor: "#61DAFB" },
  { name: "Next.js", icon: { light: "logos:nextjs-icon", dark: "simple-icons:nextdotjs" }},
  { name: "TypeScript", icon: { light: "logos:typescript-icon", dark: "logos:typescript-icon" }, brandColor: "#3178C6" },
  { name: "JavaScript", icon: { light: "logos:javascript", dark: "logos:javascript" }, brandColor: "#F7DF1E" },
  { name: "Tailwind CSS", icon: { light: "logos:tailwindcss-icon", dark: "logos:tailwindcss-icon" }, brandColor: "#06B6D4" },
  { name: "HTML5", icon: { light: "logos:html-5", dark: "simple-icons:html5" }, brandColor: "#E34F26" },
  { name: "CSS3", icon: { light: "logos:css-3", dark: "simple-icons:css3" }, brandColor: "#1572B6" },
  { name: "Supabase", icon: { light: "logos:supabase-icon", dark: "logos:supabase-icon" }, brandColor: "#3ECF8E" },
  { name: "Vector Database", icon: { light: "lucide:database", dark: "lucide:database" }, brandColor: "#8B5CF6" },
  
  // Mobile & Cross-Platform
  { name: "Flutter", icon: { light: "logos:flutter", dark: "logos:flutter" }, brandColor: "#02569B" },
  { name: "Dart", icon: { light: "logos:dart", dark: "logos:dart" }, brandColor: "#0175C2" },
  { name: "PWA", icon: { light: "simple-icons:pwa", dark: "simple-icons:pwa" }, brandColor: "#5A0FC8" },
  { name: "Google Play", icon: { light: "logos:google-play-icon", dark: "logos:google-play-icon" }, brandColor: "#01875F" },
  { name: "App Store", icon: { light: "simple-icons:appstore", dark: "simple-icons:appstore" }, brandColor: "#0D7EFF" },
  { name: "RevenueCat", icon: { light: "lucide:receipt", dark: "lucide:receipt" }, brandColor: "#F97316" },
  
  // Backend, AI & Cloud
  { name: "AI Development", icon: { light: "simple-icons:openai", dark: "simple-icons:openai" }, brandColor: "#00A67E" },
  { name: "Chatbots", icon: { light: "lucide:bot", dark: "lucide:bot" }, brandColor: "hsl(var(--primary))" },
  { name: "Claude", icon: { light: "simple-icons:anthropic", dark: "simple-icons:anthropic" }, brandColor: "#CD7F32" },
  { name: "Perplexity", icon: { light: "simple-icons:perplexity", dark: "simple-icons:perplexity" }, brandColor: "#20B2AA" },
  { name: "Node.js", icon: { light: "logos:nodejs-icon", dark: "logos:nodejs-icon" }, brandColor: "#339933" },
  { name: "Python", icon: { light: "logos:python", dark: "logos:python" }, brandColor: "#3776AB" },
  { name: "FastAPI", icon: { light: "logos:fastapi-icon", dark: "logos:fastapi-icon" }, brandColor: "#009688" },
  { name: "MongoDB", icon: { light: "logos:mongodb-icon", dark: "logos:mongodb-icon" }, brandColor: "#47A248" },
  { name: "PostgreSQL", icon: { light: "logos:postgresql", dark: "logos:postgresql" }, brandColor: "#336791" },
  { name: "AWS", icon: { light: "logos:aws", dark: "simple-icons:amazonaws" } },
  { name: "GCP", icon: { light: "logos:google-cloud", dark: "logos:google-cloud" }, brandColor: "#4285F4" },
  { name: "Docker", icon: { light: "logos:docker-icon", dark: "logos:docker-icon" }, brandColor: "#2496ED" },
  { name: "REST APIs", icon: { light: "lucide:zap", dark: "lucide:zap" }, brandColor: "hsl(var(--primary))" },
  { name: "GraphQL", icon: { light: "logos:graphql", dark: "logos:graphql" }, brandColor: "#E10098" },
  { name: "Firebase", icon: { light: "simple-icons:firebase", dark: "simple-icons:firebase" }, brandColor: "#FFCA28" },
  { name: "Vercel", icon: { light: "logos:vercel-icon", dark: "simple-icons:vercel" } },
  { name: "WordPress", icon: { light: "logos:wordpress-icon", dark: "simple-icons:wordpress" }, },
  { name: "OpenAI", icon: { light: "simple-icons:openai", dark: "simple-icons:openai" }, brandColor: "#00A67E" },
  { name: "Langchain", icon: { light: "lucide:brain", dark: "lucide:brain" }, brandColor: "#1C3AA9" },
  { name: "Stripe", icon: { light: "logos:stripe", dark: "logos:stripe" }, brandColor: "#635BFF" },
  { name: "Postmark", icon: { light: "lucide:mail", dark: "lucide:mail" }, brandColor: "#FFDD00" },
  { name: "Postman", icon: { light: "logos:postman-icon", dark: "logos:postman-icon" }, brandColor: "#FF6C37" },
  { name: "N8N", icon: { light: "simple-icons:n8n", dark: "simple-icons:n8n" }, brandColor: "#EA4B71" },
  { name: "Git", icon: { light: "logos:git-icon", dark: "logos:git-icon" }, brandColor: "#F05032" },
  { name: "Github", icon: { light: "logos:github-icon", dark: "simple-icons:github" } },
  { name: "Atlassian", icon: { light: "logos:atlassian", dark: "logos:atlassian" }, brandColor: "#0052CC" },
  { name: "VS Code", icon: { light: "logos:visual-studio-code", dark: "logos:visual-studio-code" }, brandColor: "#007ACC" }
];

// Dynamic function to split skills into rows - handles any number of skills
const splitSkillsIntoRows = (skills: Skill[], numberOfRows: number = 3) => {
  // Handle edge cases
  if (!skills || skills.length === 0) {
    return [];
  }
  
  if (numberOfRows <= 0) {
    numberOfRows = 1;
  }
  
  // If we have fewer skills than desired rows, adjust rows to match skills
  const actualRows = Math.min(numberOfRows, skills.length);
  
  const rows: Skill[][] = [];
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
