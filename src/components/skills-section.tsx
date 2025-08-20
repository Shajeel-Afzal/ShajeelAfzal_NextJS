'use client';

import { SkillCard } from '@/components/skill-card';
import { OptimizedMarquee } from "@/components/optimized-magicui";

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
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertise across modern web, mobile, AI, and cloud technologies. 
            Building scalable solutions with cutting-edge tools and frameworks.
          </p>
        </div>

        <div className="space-y-8">
          {/* Frontend & Web Technologies */}
          <OptimizedMarquee className="[--duration:20s]" pauseOnHover>
            {skillsRowOne.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </OptimizedMarquee>

          {/* Mobile & Cross-Platform */}
          <OptimizedMarquee className="[--duration:25s]" reverse pauseOnHover>
            {skillsRowTwo.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </OptimizedMarquee>

          {/* Backend, AI & Cloud */}
          <OptimizedMarquee className="[--duration:30s]" pauseOnHover>
            {skillsRowThree.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </OptimizedMarquee>
        </div>
      </div>
    </section>
  );
}
