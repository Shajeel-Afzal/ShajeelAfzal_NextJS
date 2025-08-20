'use client';

import { useState } from 'react';
import { SkillCard } from '@/components/skill-card';
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";

// First row of skills - Frontend & Web Technologies
const skillsRowOne: { name: string }[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "Vue.js" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Tailwind CSS" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "Svelte" },
  { name: "Angular" }
];

// Second row of skills - Mobile & Cross-Platform
const skillsRowTwo: { name: string }[] = [
  { name: "React Native" },
  { name: "Flutter" },
  { name: "Ionic" },
  { name: "Expo" },
  { name: "Xamarin" },
  { name: "Cordova" },
  { name: "PWA" },
  { name: "Electron" }
];

// Third row of skills - Backend, AI & Cloud
const skillsRowThree: { name: string }[] = [
  { name: "AI Development" },
  { name: "Chatbots" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "Django" },
  { name: "FastAPI" },
  { name: "MongoDB" },
  { name: "PostgreSQL" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "REST APIs" },
  { name: "GraphQL" },
  { name: "Firebase" },
  { name: "TensorFlow" },
  { name: "OpenAI" },
  { name: "Langchain" },
  { name: "Redis" },
  { name: "Kubernetes" }
];

export function SkillsSection() {
  const [isHovered, setIsHovered] = useState(false);

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
          {/* Frontend & Web Technologies */}
          <Marquee className="[--duration:50s]">
            {skillsRowOne.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>

          {/* Mobile & Cross-Platform */}
          <Marquee className="[--duration:55s]" reverse>
            {skillsRowTwo.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>

          {/* Backend, AI & Cloud */}
          <Marquee className="[--duration:60s]">
            {skillsRowThree.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
