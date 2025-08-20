"use client";

import Link from "next/link";
import Image from "next/image";
import { ShineBorder } from "@/components/magicui/special-effects/shine-border";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/shajeelafzal",
      icon: {
        light: "simple-icons:linkedin",
        dark: "simple-icons:linkedin"
      },
      brandColor: "#0A66C2",
      shineColor: "#0A66C2"
    },
    {
      name: "GitHub", 
      href: "https://github.com/Shajeel-Afzal",
      icon: {
        light: "simple-icons:github",
        dark: "simple-icons:github"
      },
      brandColor: "#181717",
      shineColor: "#6B7280" // Light gray for better visibility in dark mode
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@shajeelafzal",
      icon: {
        light: "simple-icons:youtube",
        dark: "simple-icons:youtube"
      },
      brandColor: "#FF0000",
      shineColor: "#FF0000"
    },
    {
      name: "Facebook",
      href: "https://facebook.com/shajeelafzal",
      icon: {
        light: "simple-icons:facebook",
        dark: "simple-icons:facebook"
      },
      brandColor: "#1877F2",
      shineColor: "#1877F2"
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@shajeelafzal",
      icon: {
        light: "simple-icons:tiktok",
        dark: "simple-icons:tiktok"
      },
      brandColor: "#000000",
      shineColor: "#8B5CF6" // Purple for better visibility in dark mode
    },
    {
      name: "Email",
      href: "mailto:hello@shajeelafzal.com",
      icon: {
        light: "simple-icons:gmail",
        dark: "simple-icons:gmail"
      },
      brandColor: "#EA4335",
      shineColor: "#EA4335"
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
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
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-center">Connect With Me</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <Card key={social.name} className="relative overflow-hidden aspect-square min-h-[60px] sm:min-h-[auto]">
                    <ShineBorder shineColor={social.shineColor} />
                    <CardContent className="p-2 sm:p-3 h-full">
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary transition-all duration-200 group min-h-[44px]"
                        title={social.name}
                        aria-label={`Connect on ${social.name}`}
                      >
                        <Icon 
                          icon={social.icon.light}
                          className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-[var(--brand-color)] transition-colors mb-0.5 sm:mb-1" 
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
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[44px] flex items-center"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 min-h-[44px]">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link
                  href="mailto:hello@shajeelafzal.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                >
                  hello@shajeelafzal.com
                </Link>
              </div>
              <div className="flex items-center space-x-3 min-h-[44px]">
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
              <div className="flex items-center space-x-3 min-h-[44px]">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3 min-h-[44px]">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Available for projects
                </span>
              </div>
            </div>
            <Button asChild className="w-full mt-4 min-h-[44px]">
              <Link href="/consultation">
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
            <Link href="/privacy" className="hover:text-primary transition-colors min-h-[44px] flex items-center">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors min-h-[44px] flex items-center">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors min-h-[44px] flex items-center">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
