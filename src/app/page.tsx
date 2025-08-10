import { Smartphone, Brain, Bot, Star, Users, Trophy, ChevronRight, MessageCircle, Code, Zap, Award } from "lucide-react";
import { OptimizedMarquee } from "@/components/optimized-magicui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSection } from "@/components/hero-section";
import { ClientServicesSection } from "@/components/client-services-section";
import { ClientSkillsSection } from "@/components/client-skills-section";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechStart Inc",
    content: "Shajeel delivered our mobile app ahead of schedule with exceptional quality. His AI integration expertise is unmatched.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, E-Commerce Plus",
    content: "The chatbot solution increased our customer engagement by 300%. Shajeel's technical skills are outstanding.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Product Manager, InnovateNow",
    content: "From concept to deployment, Shajeel made the complex simple. Our AI-powered features work flawlessly.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  }
];

const skills = [
  { name: "React Native", iconName: "smartphone" as const },
  { name: "AI Development", iconName: "brain" as const },
  { name: "Chatbots", iconName: "bot" as const },
  { name: "Node.js", iconName: "code" as const },
  { name: "Flutter", iconName: "smartphone" as const },
  { name: "Python", iconName: "brain" as const }
];

const features = [
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile apps using React Native and Flutter with native performance.",
    iconName: "smartphone" as const,
    className: "col-span-1 row-span-1"
  },
  {
    title: "AI Agent Development",
    description: "Custom AI agents and chatbots that understand your business and deliver results.",
    iconName: "brain" as const,
    className: "col-span-1 row-span-2"
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end development from backend APIs to stunning user interfaces.",
    iconName: "code" as const,
    className: "col-span-1 row-span-1"
  },
  {
    title: "Performance Optimization",
    description: "Lightning-fast applications optimized for scale and user experience.",
    iconName: "zap" as const,
    className: "col-span-1 row-span-1"
  }
];


function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Services That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>

        <ClientServicesSection features={features} />
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by entrepreneurs and enterprises worldwide
          </p>
        </div>

        <OptimizedMarquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="mx-4 max-w-sm rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  loading="lazy"
                  sizes="40px"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </OptimizedMarquee>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technologies I Master
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technologies for modern solutions
          </p>
        </div>

        <ClientSkillsSection skills={skills} />
      </div>
    </section>
  );
}

function ThemeShowcaseSection() {
  return (
    <section id="themes" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dynamic Theme System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience 8 unique color schemes, each optimized for both light and dark modes.
            Use the theme switcher in the top-right corner to explore different styles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                Primary Elements
              </CardTitle>
              <CardDescription>
                Buttons, links, and key interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full">Primary Button</Button>
                <Button variant="secondary" className="w-full">Secondary Button</Button>
                <Button variant="outline" className="w-full">Outline Button</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent" />
                Accent Colors
              </CardTitle>
              <CardDescription>
                Highlights, notifications, and special elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                  Accent background example
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  Muted background example
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-foreground" />
                Typography
              </CardTitle>
              <CardDescription>
                Text hierarchy and readability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Heading Text</h3>
                <p className="text-foreground">Primary text content</p>
                <p className="text-muted-foreground">Muted text content</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3 border-2 border-ring/20">
            <CardHeader>
              <CardTitle className="text-center">Available Themes</CardTitle>
              <CardDescription className="text-center">
                Each theme includes carefully crafted light and dark variants with perfect contrast ratios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { name: "Neural Blue", color: "oklch(0.55 0.2 240)" },
                  { name: "Cyber Green", color: "oklch(0.45 0.25 150)" },
                  { name: "AI Purple", color: "oklch(0.5 0.25 280)" },
                  { name: "Tech Orange", color: "oklch(0.55 0.2 40)" },
                  { name: "Monochrome", color: "oklch(0.15 0 0)" },
                  { name: "Teal Ocean", color: "oklch(0.5 0.22 190)" },
                  { name: "Sunset", color: "oklch(0.55 0.25 340)" },
                  { name: "LWS Academy", color: "oklch(0.42 0.15 185)" },
                ].map((theme) => (
                  <div key={theme.name} className="text-center p-3 rounded-lg bg-card">
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-border"
                      style={{ backgroundColor: theme.color }}
                    />
                    <p className="text-sm font-medium">{theme.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and turn your ideas into reality.
            Book a free consultation and get expert guidance tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#consultation">
              <Button size="lg" className="text-lg px-8 py-6">
                Book Free Consultation
              </Button>
            </Link>

            <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="font-sans">
      <section id="home">
        <HeroSection />
      </section>
      <ServicesSection />
      <TestimonialsSection />
      <SkillsSection />
      <ThemeShowcaseSection />
      <CTASection />
    </main>
  );
}