import { AnimatedGridPattern } from "@/components/magicui/backgrounds/animated-grid-pattern";
import { AnimatedShinyText } from "@/components/magicui/text-animations/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { NumberTicker } from "@/components/magicui/text-animations/number-ticker";
import { cn } from "@/lib/utils";

export default function TestHero1V2() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Full Screen Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.15}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "fixed inset-0 h-full w-full",
        )}
      />
      
      {/* Main Grid Container */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center">
        
        {/* Left Side - Content */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0">
          
          {/* Badge */}
          <div className="mb-8">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>⚡ Full-Stack Software Engineer</span>
            </AnimatedShinyText>
          </div>

          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Software Solutions
              </span>
              <br />
              <span className="text-foreground">Meet Innovation</span>
            </h1>
          </div>

          {/* Subheading */}
          <div className="mb-10 max-w-xl">
            <TextAnimate
              className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed"
              animation="blurInUp"
              delay={0.2}
            >
              Expert developer creating mobile apps, web applications, Chrome extensions, intelligent chatbots, and automation solutions for modern businesses.
            </TextAnimate>
          </div>

          {/* Stats Grid */}
          <div className="mb-12 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                <NumberTicker value={200} />+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                <NumberTicker value={50} />+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-800">
                <NumberTicker value={5} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                <NumberTicker value={99} />%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Satisfaction Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-base px-8 py-3">
                Start Your Project
              </span>
            </ShimmerButton>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-3 text-sm lg:text-base font-medium text-foreground transition-colors hover:text-blue-600">
              View Portfolio
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Services List */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <TextAnimate animation="fadeIn" delay={0.4}>
              • Mobile Apps (iOS & Android)
            </TextAnimate>
            <TextAnimate animation="fadeIn" delay={0.5}>
              • Web Applications & Websites
            </TextAnimate>
            <TextAnimate animation="fadeIn" delay={0.6}>
              • Chrome Extensions & Browser Tools
            </TextAnimate>
            <TextAnimate animation="fadeIn" delay={0.7}>
              • AI Chatbots & Automation Systems
            </TextAnimate>
          </div>
        </div>

        {/* Right Side - Person Image */}
        <div className="relative flex items-center justify-center px-6 lg:px-0 py-16 lg:py-0">
          <div className="relative">
            {/* Placeholder for person image - will be replaced with actual image */}
            <div className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center border-4 border-blue-200 dark:border-blue-800">
              <div className="text-6xl lg:text-7xl xl:text-8xl">👨‍💻</div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
              📱
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl animate-pulse">
              ⚡
            </div>
            <div className="absolute top-1/2 -left-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg animate-ping">
              🚀
            </div>
          </div>
        </div>

      </div>

      {/* Bottom trusted text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <TextAnimate
          className="text-sm text-muted-foreground text-center"
          animation="fadeIn"
          delay={0.8}
        >
          Trusted by startups and enterprises worldwide • Available for consultation
        </TextAnimate>
      </div>
    </div>
  );
}