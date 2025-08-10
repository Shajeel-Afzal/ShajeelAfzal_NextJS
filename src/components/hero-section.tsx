import { Star, Users, Trophy, Award } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import Image from "next/image";

const stats = [
  { label: "Projects Completed", value: 100, suffix: "+", icon: Trophy },
  { label: "Happy Clients", value: 50, suffix: "+", icon: Users },
  { label: "Years Experience", value: 5, suffix: "+", icon: Award },
  { label: "Technologies", value: 15, suffix: "+", icon: Star }
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

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                <TextAnimate animation="slideUp" by="word" className="text-primary-foreground">
                  Schedule a Call
                </TextAnimate>
              </button>
              <button className="border border-border hover:bg-accent hover:text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                <TextAnimate animation="slideUp" by="word" delay={0.2} className="text-current">
                  View Portfolio
                </TextAnimate>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center p-4 rounded-lg bg-card">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">
                    <NumberTicker
                      value={stat.value}
                      delay={index * 0.2}
                      className="text-2xl font-bold"
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative h-[700px] w-full max-w-lg mx-auto">
              {/* Profile Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/shajeel_afzal.png"
                  alt="Shajeel Afzal - AI Engineer & Chatbot Specialist"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}