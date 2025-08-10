import { AnimatedGridPattern } from "@/components/magicui/backgrounds/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/text-animations/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { NumberTicker } from "@/components/magicui/text-animations/number-ticker";
import { cn } from "@/lib/utils";

export default function HeroVariation1() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="mb-8 flex items-center justify-center">
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ AI-Powered Development Expert</span>
          </AnimatedShinyText>
        </div>

        {/* Main Headline */}
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Mobile Apps
            </span>
            <br />
            <span className="text-foreground">Meet AI Innovation</span>
          </h1>
        </div>

        {/* Subheading */}
        <div className="mb-8 max-w-3xl">
          <TextAnimate
            className="text-xl sm:text-2xl text-muted-foreground font-medium leading-relaxed"
            animation="blurInUp"
            delay={0.2}
          >
            Certified developer specializing in intelligent mobile applications, advanced chatbot systems, and cutting-edge AI engineering solutions for modern businesses.
          </TextAnimate>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-3 gap-8 w-full max-w-lg">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">
              <NumberTicker value={150} />+
            </div>
            <div className="text-sm text-muted-foreground font-medium">AI Models Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600">
              <NumberTicker value={75} />+
            </div>
            <div className="text-sm text-muted-foreground font-medium">Smart Apps Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-800">
              <NumberTicker value={99} />%
            </div>
            <div className="text-sm text-muted-foreground font-medium">Client Satisfaction</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg px-8 py-3">
              Start Your AI Journey
            </span>
          </ShimmerButton>
          
          <button className="group relative inline-flex items-center justify-center px-8 py-3 text-sm lg:text-lg font-medium text-foreground transition-colors hover:text-blue-600">
            View AI Solutions
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom Text */}
        <div className="mt-12">
          <TextAnimate
            className="text-sm text-muted-foreground"
            animation="fadeIn"
            delay={0.6}
          >
            Trusted by innovative companies worldwide • Available for consultation
          </TextAnimate>
        </div>
      </div>
    </div>
  );
}