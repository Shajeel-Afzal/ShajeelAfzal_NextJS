import { Smartphone, Brain, Bot, Star, Users, Trophy, Award, ChevronRight } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Globe as ThreeGlobe } from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import Link from "next/link";

const stats = [
  { label: "Projects Completed", value: "100+", icon: Trophy },
  { label: "Happy Clients", value: "50+", icon: Users },
  { label: "Years Experience", value: "5+", icon: Award },
  { label: "Technologies", value: "15+", icon: Star }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted">
      {/* Theme Switcher - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "absolute inset-0",
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />

      <div className="container mx-auto px-4 py-16 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <AnimatedShinyText className="text-primary">
                  Certified Developer
                </AnimatedShinyText>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Transform Your
                <span className="block">
                  <AuroraText className="text-4xl md:text-6xl lg:text-7xl font-bold">
                    AI Vision
                  </AuroraText>
                </span>
                Into Reality
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Expert AI Engineer & Chatbot Specialist helping businesses
                build cutting-edge solutions that drive growth and innovation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="#consultation">
                <ShimmerButton className="text-lg px-8 py-6">
                  Book Free Consultation
                </ShimmerButton>
              </Link>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="#portfolio">
                  View Portfolio
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-lg bg-card">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative h-[600px] w-full max-w-lg mx-auto">
              {/* 3D Globe */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ThreeGlobe />
              </div>

              {/* Orbiting Icons */}
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={250}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Smartphone className="h-6 w-6" />
                </div>
              </OrbitingCircles>

              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={200}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white">
                  <Brain className="h-6 w-6" />
                </div>
              </OrbitingCircles>

              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={0}
                radius={150}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500 text-white">
                  <Bot className="h-6 w-6" />
                </div>
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}