"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { OptimizedAuroraText } from "@/components/optimized-magicui";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "Mobile App" | "AI/ML" | "Web App" | "Chatbot";
}

// Technology color mapping for better visual appeal
const getTechColor = (tech: string): string => {
  const colorMap: Record<string, string> = {
    // Frontend
    "React": "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
    "Next.js": "bg-gray-800/20 text-gray-800 dark:text-gray-200 border-gray-600/30",
    "React Native": "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
    "Flutter": "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    "Tailwind CSS": "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30",
    
    // Backend
    "Node.js": "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
    "Express.js": "bg-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30",
    "FastAPI": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    "Python": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    
    // Databases
    "MongoDB": "bg-green-600/20 text-green-700 dark:text-green-300 border-green-600/30",
    "PostgreSQL": "bg-blue-700/20 text-blue-700 dark:text-blue-300 border-blue-700/30",
    "Firebase": "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
    
    // AI/ML
    "OpenAI": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    
    // Languages
    "Dart": "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  };
  
  return colorMap[tech] || "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30";
};

const portfolioProjects: Project[] = [
  {
    id: "ecommerce-mobile",
    title: "E-Commerce Mobile App",
    description: "Developed a fully functional e-commerce platform using React Native with secure authentication, payment integration, and real-time notifications.",
    image: "/api/placeholder/400/300",
    technologies: ["React Native", "Node.js", "MongoDB"],
    liveUrl: "#",
    category: "Mobile App"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Designed and built a sleek personal portfolio showcasing a photographer's skills, projects, and achievements with modern UI/UX design principles.",
    image: "/api/placeholder/400/300",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "#",
    category: "Web App"
  },
  {
    id: "jewelry-website",
    title: "Jewelry E-Commerce",
    description: "Created a dynamic jewelry website using React for the frontend and Node.js for the backend, featuring elegant product catalogs and smooth user experience.",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    category: "Web App"
  },
  {
    id: "restaurant-website",
    title: "Restaurant Management",
    description: "Built a responsive website for a local restaurant, emphasizing user-friendly navigation and enticing visuals to enhance the dining experience online.",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Express.js", "PostgreSQL"],
    liveUrl: "#",
    category: "Web App"
  },
  {
    id: "ai-chatbot",
    title: "AI Customer Support Bot",
    description: "Developed an intelligent chatbot using OpenAI GPT-4 with natural language processing, context awareness, and seamless integration with existing systems.",
    image: "/api/placeholder/400/300",
    technologies: ["Python", "OpenAI", "FastAPI"],
    liveUrl: "#",
    category: "Chatbot"
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracking App",
    description: "Created a comprehensive fitness tracking mobile application with workout plans, progress monitoring, and social features for motivation.",
    image: "/api/placeholder/400/300",
    technologies: ["Flutter", "Firebase", "Dart"],
    liveUrl: "#",
    category: "Mobile App"
  }
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <MagicCard
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-2xl"
      gradientSize={300}
      gradientColor="rgba(59, 130, 246, 0.15)"
      gradientOpacity={0.8}
    >
      <div className="relative h-full p-0">
        {/* Project Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                  cursor-default backdrop-blur-sm border
                  ${getTechColor(tech)}
                `}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-start">
            <Link href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer">
              <InteractiveHoverButton className="text-sm">
                View Project
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Here&apos;s a Glimpse of{" "}
            <OptimizedAuroraText className="text-4xl md:text-5xl font-bold">
              Some Exciting 🚀 Projects
            </OptimizedAuroraText>{" "}
            I&apos;ve Done
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Showcasing innovative solutions across mobile apps, AI integration, and modern web development
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>        
      </div>
    </section>
  );
}