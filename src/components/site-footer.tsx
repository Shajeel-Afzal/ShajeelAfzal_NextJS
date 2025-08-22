"use client";

import Link from "next/link";
import Image from "next/image";
import { ShineBorder } from "@/components/magicui/special-effects/shine-border";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import { 
  Github, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Mail as MailIcon 
} from "lucide-react";

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/shajeelafzal",
      icon: Linkedin,
      brandColor: "#0A66C2",
      shineColor: "#0A66C2"
    },
    {
      name: "GitHub", 
      href: "https://github.com/Shajeel-Afzal",
      icon: Github,
      brandColor: "#181717",
      shineColor: "#6B7280" // Light gray for better visibility in dark mode
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@shajeelafzal",
      icon: Youtube,
      brandColor: "#FF0000",
      shineColor: "#FF0000"
    },
    {
      name: "Facebook",
      href: "https://facebook.com/shajeelafzal",
      icon: Facebook,
      brandColor: "#1877F2",
      shineColor: "#1877F2"
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@shajeelafzal",
      icon: TikTokIcon,
      brandColor: "#000000",
      shineColor: "#8B5CF6" // Purple for better visibility in dark mode
    },
    {
      name: "Email",
      href: "mailto:hello@shajeelafzal.com",
      icon: MailIcon,
      brandColor: "#EA4335",
      shineColor: "#EA4335"
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Skills", href: "#skills" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "AI Agent Development", href: "#ai-agents" },
    { name: "ChatBot Development", href: "#chatbots" },
    { name: "Mobile App Development", href: "#mobile-apps" },
    { name: "Web Development", href: "#web-development" },
    { name: "Backend Development", href: "#backend" },
    { name: "Automation Solutions", href: "#automation" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Image 
                src="/favicon.png" 
                alt="Shajeel Afzal Favicon" 
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold">Shajeel Afzal</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions that drive growth and innovation.
            </p>
            
            {/* Social Icons Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-center md:text-left">Connect With Me</h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {socialLinks.map((social) => (
                  <Card key={social.name} className="relative overflow-hidden aspect-square">
                    <ShineBorder shineColor={social.shineColor} />
                    <CardContent className="p-2 h-full">
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary transition-all duration-200 group"
                        title={social.name}
                        aria-label={`Connect on ${social.name}`}
                      >
                        <social.icon 
                          className="h-5 w-5 group-hover:text-[var(--brand-color)] transition-colors mb-1" 
                          style={{"--brand-color": social.brandColor} as React.CSSProperties}
                        />
                        <span className="text-xs font-medium leading-tight text-center">{social.name}</span>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col space-y-2">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm py-1"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href="mailto:hello@shajeelafzal.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                >
                  hello@shajeelafzal.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  WhatsApp Me
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Available for projects
                </span>
              </div>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="#consultation">
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>       

        {/* Bottom Bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Shajeel Afzal. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
