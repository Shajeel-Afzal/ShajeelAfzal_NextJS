import { AnimatedGridPattern } from "@/components/magicui/backgrounds/animated-grid-pattern";
import { AuroraText } from "@/components/magicui/text-animations/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { InteractiveHoverButton } from "@/components/magicui/buttons/interactive-hover-button";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { WordRotate } from "@/components/magicui/text-animations/word-rotate";
import { cn } from "@/lib/utils";

export default function TestHero2() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Rotating Tagline */}
        <div className="mb-6">
          <div className="text-lg sm:text-xl text-muted-foreground font-medium">
            Expert in{" "}
            <WordRotate
              className="text-blue-600 font-bold"
              words={["AI Development", "Mobile Apps", "ChatBot Systems", "Machine Learning", "Neural Networks"]}
            />
          </div>
        </div>

        {/* Main Headline with Aurora Text Effect */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <AuroraText className="text-6xl sm:text-7xl lg:text-9xl font-extrabold">
              AI ENGINEER
            </AuroraText>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-6xl text-muted-foreground">
              Building Tomorrow's Apps
            </span>
          </h1>
        </div>

        {/* Value Proposition */}
        <div className="mb-10 max-w-4xl">
          <TextAnimate
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
            animation="slideUp"
            delay={0.3}
          >
            Transforming business operations through intelligent automation, 
            sophisticated mobile experiences, and AI-powered solutions that scale 
            with your ambition.
          </TextAnimate>
        </div>

        {/* Feature Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[
            "Neural Networks",
            "LLM Integration", 
            "Computer Vision",
            "NLP Systems",
            "Mobile AI",
            "Automation"
          ].map((feature) => (
            <div
              key={feature}
              className="px-4 py-2 bg-muted/50 rounded-full text-sm font-medium border border-border/50 hover:border-blue-500/50 transition-colors cursor-default"
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-8">
          <ShimmerButton className="text-base px-8 py-4 shadow-xl">
            <span className="font-medium">Explore AI Solutions</span>
          </ShimmerButton>
          
          <InteractiveHoverButton 
            text="Book Strategy Call"
            className="px-8 py-4 text-base font-semibold"
          />
        </div>

        {/* Professional Credentials */}
        <div className="border-t border-border/30 pt-8 mt-8 w-full max-w-2xl">
          <TextAnimate
            className="text-sm text-muted-foreground mb-4"
            animation="fadeIn"
            delay={0.5}
          >
            Certified in Advanced AI Systems • 5+ Years Deep Learning Experience
          </TextAnimate>
          
          <div className="flex justify-center items-center gap-8 text-xs text-muted-foreground/70 uppercase tracking-wider">
            <span>TensorFlow Certified</span>
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full"></span>
            <span>AWS ML Specialist</span>
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full"></span>
            <span>Mobile Expert</span>
          </div>
        </div>
      </div>
    </div>
  );
}