import { AuroraText } from "@/components/magicui/text-animations/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/buttons/interactive-hover-button";
import { NumberTicker } from "@/components/magicui/text-animations/number-ticker";
import { DotPattern } from "@/components/magicui/backgrounds/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
      />
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="mb-8">
          <AuroraText className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            Certified Mobile Apps Developer
          </AuroraText>
        </div>

        {/* Subheading */}
        <div className="mb-8 max-w-3xl">
          <TextAnimate
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground"
            animation="blurInUp"
          >
            ChatBots Developer & AI Engineer
          </TextAnimate>
        </div>

        {/* Value Proposition */}
        <div className="mb-12 max-w-4xl">
          <TextAnimate
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
            animation="blurInUp"
            delay={0.2}
          >
            Transforming ideas into intelligent mobile applications and AI-powered solutions. Specializing in cutting-edge chatbot development and mobile app innovation for tech entrepreneurs and forward-thinking businesses.
          </TextAnimate>
        </div>

        {/* Stats Section */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">
              <NumberTicker value={50} />+
            </div>
            <div className="text-sm text-muted-foreground">Apps Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">
              <NumberTicker value={25} />+
            </div>
            <div className="text-sm text-muted-foreground">AI Solutions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">
              <NumberTicker value={100} />%
            </div>
            <div className="text-sm text-muted-foreground">Client Success</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg px-8">
              Book Consultation
            </span>
          </ShimmerButton>
          
          <InteractiveHoverButton text="View Portfolio" className="px-8 py-3" />
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <TextAnimate
            className="text-sm text-muted-foreground"
            animation="blurInUp"
            delay={0.4}
          >
            Ready to turn your vision into reality?
          </TextAnimate>
        </div>
      </div>
    </div>
  );
}
