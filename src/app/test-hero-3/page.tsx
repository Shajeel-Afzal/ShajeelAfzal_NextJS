import { Particles } from "@/components/magicui/special-effects/particles";
import { WordRotate } from "@/components/magicui/text-animations/word-rotate";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/buttons/interactive-hover-button";
import { NumberTicker } from "@/components/magicui/text-animations/number-ticker";

export default function TestHero3() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#3b82f6"
        refresh
      />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Minimal Header */}
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 text-sm text-muted-foreground border border-border/40 rounded-full bg-background/50 backdrop-blur">
              Shajeel Afzal • Certified AI Developer
            </div>
          </div>

          {/* Dynamic Headline */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light leading-tight mb-4">
              Creating{" "}
              <WordRotate
                words={[
                  "Intelligent Apps",
                  "Smart Chatbots", 
                  "AI Solutions",
                  "Neural Networks",
                  "ML Systems"
                ]}
                className="font-bold text-blue-600"
              />
              <br />
              <span className="text-2xl sm:text-3xl lg:text-5xl text-muted-foreground">
                for the Future of Business
              </span>
            </h1>
          </div>

          {/* Clean Description */}
          <div className="mb-12 max-w-3xl mx-auto">
            <TextAnimate
              className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed"
              animation="blurInUp"
              delay={0.2}
            >
              Specialized in mobile application development with deep AI integration, 
              conversational AI systems, and machine learning solutions that drive 
              real business value.
            </TextAnimate>
          </div>

          {/* Metrics Row */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-12 px-8 py-4 bg-muted/30 rounded-full backdrop-blur border border-border/40">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  <NumberTicker value={200} />+
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  AI Projects
                </div>
              </div>
              <div className="w-px h-8 bg-border/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  <NumberTicker value={50} />+
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Clients Served
                </div>
              </div>
              <div className="w-px h-8 bg-border/50"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  <NumberTicker value={95} />%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Success Rate
                </div>
              </div>
            </div>
          </div>

          {/* Minimal CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <ShimmerButton className="shadow-lg">
              <span className="text-sm lg:text-base font-medium px-6 py-2">
                Start AI Transformation
              </span>
            </ShimmerButton>
            
            <InteractiveHoverButton 
              text="View Case Studies"
              className="text-sm lg:text-base px-6 py-2"
            />
          </div>

          {/* Minimal Footer */}
          <div className="text-center">
            <TextAnimate
              className="text-sm text-muted-foreground/80"
              animation="fadeIn"
              delay={0.6}
            >
              Available for consulting • Remote & On-site
            </TextAnimate>
          </div>
        </div>
      </div>
    </div>
  );
}