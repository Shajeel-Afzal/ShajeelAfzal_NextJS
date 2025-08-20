'use client';

import { useState } from 'react';
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TestimonialCard } from "@/components/testimonial-card";
import { Testimonial } from "@/types/testimonial";

const testimonials: Testimonial[] = [
  {
    title: "Next.js E-commerce Platform Development",
    name: "Sarah Chen",
    role: "CTO, TechStart Inc",
    content: "Shajeel delivered our mobile app ahead of schedule with exceptional quality. His AI integration expertise is unmatched.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Jan 15, 2024 - Feb 28, 2024",
    platform: "Upwork"
  },
  {
    title: "AI Chatbot Integration for Customer Service",
    name: "Marcus Rodriguez", 
    role: "Founder, E-Commerce Plus",
    content: "The chatbot solution increased our customer engagement by 300%. Shajeel's technical skills are outstanding.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Mar 5, 2024 - Mar 20, 2024",
    platform: "Upwork"
  },
  {
    title: "React Dashboard with AI Analytics",
    name: "Emma Thompson",
    role: "Product Manager, InnovateNow", 
    content: "From concept to deployment, Shajeel made the complex simple. Our AI-powered features work flawlessly.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Apr 1, 2024 - May 15, 2024",
    platform: "Upwork"
  },
  {
    title: "WordPress Custom Plugin Development",
    name: "David Kim",
    role: "Digital Marketing Agency Owner",
    content: "The custom WordPress plugin exceeded all expectations. Shajeel's attention to detail and problem-solving skills are exceptional.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Feb 10, 2024 - Mar 5, 2024",
    platform: "Upwork"
  },
  {
    title: "Mobile App Backend API Development",
    name: "Lisa Johnson",
    role: "Startup Founder",
    content: "Professional, reliable, and delivers high-quality code. The API architecture is robust and scalable. Highly recommended!",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "May 20, 2024 - Jun 15, 2024",
    platform: "Upwork"
  },
  {
    title: "Vue.js SPA with Real-time Features",
    name: "Ahmed Hassan",
    role: "Tech Lead, FinTech Startup",
    content: "Shajeel implemented complex real-time features seamlessly. His expertise in modern web technologies is impressive.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Jun 1, 2024 - Jul 10, 2024",
    platform: "Upwork"
  },
  {
    title: "Full-Stack Web Application with AI Features",
    name: "Jennifer Park",
    role: "CEO, AI Solutions Inc",
    content: "Outstanding work on our AI-powered platform. Shajeel's full-stack expertise and attention to detail are remarkable.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Jul 15, 2024 - Aug 30, 2024",
    platform: "Upwork"
  },
  {
    title: "E-commerce Platform Migration & Optimization",
    name: "Robert Miller",
    role: "E-commerce Director",
    content: "The platform migration was seamless and performance improvements were beyond expectations. Highly professional work.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Sep 1, 2024 - Oct 15, 2024",
    platform: "Upwork"
  },
  {
    title: "Custom CRM Development with Integration",
    name: "Maria González",
    role: "Operations Manager",
    content: "The custom CRM solution perfectly fits our workflow. Shajeel's ability to understand complex requirements is impressive.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Nov 1, 2024 - Dec 20, 2024",
    platform: "Upwork"
  },
  {
    title: "Machine Learning Model Implementation",
    name: "Dr. James Wilson",
    role: "Data Science Lead",
    content: "Exceptional work on our ML pipeline. Shajeel's understanding of both backend systems and AI is remarkable.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Jan 5, 2025 - Feb 15, 2025",
    platform: "Upwork"
  },
  {
    title: "Progressive Web App Development",
    name: "Sophie Laurent",
    role: "Digital Product Manager",
    content: "The PWA exceeded all performance benchmarks. Outstanding technical skills and professional communication.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "Mar 1, 2025 - Apr 10, 2025",
    platform: "Upwork"
  },
  {
    title: "Blockchain Integration & Smart Contracts",
    name: "Alex Chen",
    role: "Blockchain Startup Founder",
    content: "Complex blockchain integration made simple. Shajeel's expertise in emerging technologies is unparalleled.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    dateRange: "May 1, 2025 - Jun 20, 2025",
    platform: "Upwork"
  }
];

// Dynamic function to split testimonials into rows - handles any number of testimonials
const splitTestimonialsIntoRows = (testimonials: Testimonial[], numberOfRows: number = 3) => {
  // Handle edge cases
  if (!testimonials || testimonials.length === 0) {
    return [];
  }
  
  if (numberOfRows <= 0) {
    numberOfRows = 1;
  }
  
  // If we have fewer testimonials than desired rows, adjust rows to match testimonials
  const actualRows = Math.min(numberOfRows, testimonials.length);
  
  const rows: Testimonial[][] = [];
  const itemsPerRow = Math.ceil(testimonials.length / actualRows);
  
  for (let i = 0; i < actualRows; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = Math.min(startIndex + itemsPerRow, testimonials.length);
    const rowTestimonials = testimonials.slice(startIndex, endIndex);
    
    // Only add row if it has testimonials (extra safety check)
    if (rowTestimonials.length > 0) {
      rows.push(rowTestimonials);
    }
  }
  
  return rows;
};

export function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically split testimonials into rows (default: 3 rows)
  const testimonialRows = splitTestimonialsIntoRows(testimonials, 3);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What{" "}
            <AuroraText className="text-4xl md:text-5xl font-bold">
              Clients Say
            </AuroraText>{" "}
            💬 About My Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by entrepreneurs and enterprises worldwide
          </p>
        </div>

        <div 
          className={`space-y-6 ${isHovered ? 'pause-all-marquees' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* First Row - Left to Right */}
          {testimonialRows[0] && (
            <Marquee className="[--duration:50s] [--gap:1.5rem] py-3">
              {testimonialRows[0].map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
          )}

          {/* Second Row - Right to Left */}
          {testimonialRows[1] && (
            <Marquee reverse className="[--duration:55s] [--gap:1.5rem] py-3">
              {testimonialRows[1].map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
          )}

          {/* Third Row - Left to Right */}
          {testimonialRows[2] && (
            <Marquee className="[--duration:60s] [--gap:1.5rem] py-3">
              {testimonialRows[2].map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </section>
  );
}
