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
  }
];

// Split testimonials into two rows
const firstRowTestimonials = testimonials.slice(0, 3);
const secondRowTestimonials = testimonials.slice(3, 6);

export function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false);

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
          className={`space-y-8 ${isHovered ? 'pause-all-marquees' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* First Row - Left to Right */}
          <Marquee className="[--duration:40s]">
            {firstRowTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </Marquee>

          {/* Second Row - Right to Left */}
          <Marquee reverse className="[--duration:40s]">
            {secondRowTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}                
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
