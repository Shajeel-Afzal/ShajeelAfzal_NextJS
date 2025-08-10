import { Ripple } from "@/components/magicui/backgrounds/ripple";
import { AuroraText } from "@/components/magicui/text-animations/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animations/text-animate";
import { ShimmerButton } from "@/components/magicui/buttons/shimmer-button";
import { InteractiveHoverButton } from "@/components/magicui/buttons/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/text-animations/typing-animation";

export default function TestHero4() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Ripple Background */}
      <Ripple />
      
      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Certified AI & Mobile Developer
            </div>

            {/* Main Headline */}
            <div>
              <AuroraText className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Shajeel Afzal
              </AuroraText>
              <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
                <TypingAnimation
                  text="Building intelligent mobile apps with cutting-edge AI"
                  duration={100}
                />
              </div>
            </div>

            {/* Value Proposition */}
            <div className="space-y-4">
              <TextAnimate
                className="text-lg text-muted-foreground leading-relaxed"
                animation="slideUp"
                delay={0.2}
              >
                Specializing in creating sophisticated mobile applications powered by 
                artificial intelligence, advanced chatbot systems, and machine learning 
                solutions for enterprise and startup clients.
              </TextAnimate>
              
              {/* Key Expertise */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-blue-600">
                    AI Expertise
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Neural Networks</li>
                    <li>• Computer Vision</li>
                    <li>• NLP & LLMs</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-purple-600">
                    Mobile Development
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• React Native</li>
                    <li>• Flutter</li>
                    <li>• iOS & Android</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ShimmerButton className="shadow-xl">
                <span className="text-sm lg:text-base font-medium px-6 py-3">
                  Schedule Consultation
                </span>
              </ShimmerButton>
              
              <InteractiveHoverButton 
                text="Download Portfolio"
                className="text-sm lg:text-base px-6 py-3"
              />
            </div>

            {/* Contact Info */}
            <div className="pt-4 border-t border-border/40">
              <TextAnimate
                className="text-sm text-muted-foreground"
                animation="fadeIn"
                delay={0.5}
              >
                📧 Available for projects • 🌍 Remote & Global
              </TextAnimate>
            </div>
          </div>

          {/* Right Column - Tech Skills Placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Tech Skills Grid - Simplified since IconCloud isn't available */}
              <div className="grid grid-cols-4 gap-6 p-8">
                {[
                  "🤖", "📱", "🧠", "⚡",
                  "🔥", "💡", "🚀", "✨",
                  "🎯", "🔧", "📊", "🌟",
                  "💻", "🔮", "⭐", "🎨"
                ].map((emoji, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 flex items-center justify-center text-2xl bg-background/50 backdrop-blur rounded-full border border-border/40 hover:border-blue-500/50 transition-colors"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "bounce 2s infinite"
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-background/90 backdrop-blur-sm rounded-2xl p-6 border border-border/40">
                  <div className="text-2xl font-bold text-blue-600 mb-2">16+</div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Technologies<br />Mastered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}