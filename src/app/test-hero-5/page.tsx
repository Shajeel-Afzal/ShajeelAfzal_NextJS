import { Globe } from "@/components/magicui/components/globe";
import { OrbitingCircles } from "@/components/magicui/components/orbiting-circles";
import { AnimatedShinyText } from "@/components/magicui/text-animations/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/buttons/interactive-hover-button";
import { NumberTicker } from "@/components/magicui/text-animations/number-ticker";
import { WordRotate } from "@/components/magicui/text-animations/word-rotate";

export default function TestHero5() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Global Impact Badge */}
          <div className="mb-8">
            <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 border border-border/40 rounded-full bg-background/50 backdrop-blur">
              <span className="flex items-center gap-2">
                🌍 <strong>Global AI Developer</strong> • Worldwide Impact
              </span>
            </AnimatedShinyText>
          </div>

          {/* Central Globe with Orbiting Elements */}
          <div className="mb-12 relative flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Globe */}
              <Globe />
              
              {/* Orbiting Circles with Icons */}
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={160}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                  <span className="text-2xl">🤖</span>
                </div>
              </OrbitingCircles>
              
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={160}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                  <span className="text-2xl">📱</span>
                </div>
              </OrbitingCircles>
              
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent" 
                radius={160}
                duration={20}
                reverse
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="text-2xl">💬</span>
                </div>
              </OrbitingCircles>
              
              <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={160}
                duration={20}
                delay={5}
                reverse
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
                  <span className="text-2xl">🧠</span>
                </div>
              </OrbitingCircles>
            </div>
          </div>

          {/* Dynamic Headline */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              <span className="text-foreground">Connecting</span>
              <br />
              <WordRotate
                className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
                words={["Businesses", "Industries", "Communities", "Innovators", "Enterprises"]}
              />
              <br />
              <span className="text-2xl sm:text-3xl lg:text-5xl text-muted-foreground">
                Through AI Innovation
              </span>
            </h1>
          </div>

          {/* Mission Statement */}
          <div className="mb-10 max-w-4xl mx-auto">
            <TextAnimate
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              animation="blurInUp"
              delay={0.3}
            >
              As a certified mobile app developer and AI engineer, I create intelligent 
              solutions that transcend borders, helping organizations worldwide harness 
              the power of artificial intelligence and advanced mobile technologies.
            </TextAnimate>
          </div>

          {/* Global Impact Metrics */}
          <div className="mb-12 flex flex-wrap justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                <NumberTicker value={25} />+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Countries Served
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                <NumberTicker value={100} />+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                AI Solutions Deployed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                <NumberTicker value={500} />K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Users Impacted
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <ShimmerButton className="shadow-2xl">
              <span className="text-sm lg:text-lg font-medium px-8 py-3">
                Join the AI Revolution
              </span>
            </ShimmerButton>
            
            <InteractiveHoverButton 
              text="Explore Global Projects"
              className="text-sm lg:text-lg px-8 py-3 font-semibold"
            />
          </div>

          {/* Global Availability */}
          <div className="border-t border-border/30 pt-8">
            <TextAnimate
              className="text-sm text-muted-foreground mb-4"
              animation="fadeIn"
              delay={0.5}
            >
              Available for international projects • All time zones supported
            </TextAnimate>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online Now
              </span>
              <span>Remote Consulting</span>
              <span>Enterprise Solutions</span>
              <span>Startup Partnerships</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}