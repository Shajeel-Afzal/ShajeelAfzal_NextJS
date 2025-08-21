import { ArrowRight, Star, Users, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Highlighter } from "@/components/magicui/special-effects/highlighter";
import Link from "next/link";

export function CTASectionV2() {
  const stats = [
    { icon: Users, label: "Repeat Clients", value: 85, suffix: "%", decimalPlaces: 0 },
    { icon: Star, label: "Success Rate", value: 98, suffix: "%", decimalPlaces: 0 },
    { icon: CheckCircle, label: "On-Time Delivery", value: 100, suffix: "%", decimalPlaces: 0 },
    { icon: Zap, label: "Client Satisfaction", value: 4.9, suffix: "/5", decimalPlaces: 1 }
  ];

  const benefits = [
    "Custom solutions tailored to your business",
    "Fast turnaround with agile development",
    "Enterprise-grade security & scalability",
    "Cross-platform compatibility (Web, Mobile, AI)",
    "Ongoing support & maintenance included",
    "Transparent pricing with no hidden costs",
    "Modern tech stack with latest frameworks",
    "Comprehensive testing & quality assurance"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--blue-600)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your{" "}
            <AuroraText className="text-4xl md:text-6xl font-bold">
              Vision
            </AuroraText>{" "}
            Into Reality
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join{" "}
            <Highlighter 
              action="highlight" 
              color="#87CEFA"
            >
              successful businesses
            </Highlighter>{" "}
            who trusted me to build their digital presence.{" "}
            Experience the difference of working with a{" "}
            <Highlighter 
              action="underline" 
              color="#FF9800"
            >
              dedicated professional
            </Highlighter>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  <NumberTicker 
                    value={stat.value} 
                    decimalPlaces={stat.decimalPlaces}
                    delay={index * 0.2}
                    className="text-2xl font-bold text-foreground"
                  />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative bg-background/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20">
            <BorderBeam size={250} duration={12} delay={9} />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Benefits */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Why Choose Me?
                </h3>
                <div className="grid gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Form */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-background via-background/90 to-primary/5 rounded-3xl p-8 border border-primary/10 shadow-lg backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold mb-2">
                      Start Your Project Today
                    </h4>
                    <p className="text-muted-foreground">
                      Get a personalized quote in 24 hours
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <Link href="#consultation">
                      <ShinyButton className="w-full text-lg px-8 py-6 h-16 group bg-primary hover:bg-primary/90 text-primary-foreground border-0 normal-case tracking-normal font-medium">
                        <span className="flex items-center justify-center text-primary-foreground">
                          Get Free Project Quote
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </ShinyButton>
                    </Link>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gradient-to-r from-transparent via-border to-transparent"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-background px-4 py-1 text-sm text-muted-foreground rounded-full border border-border/50">
                          OR
                        </span>
                      </div>
                    </div>

                    <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg" className="w-full text-lg px-8 py-6 h-16 group border-2 hover:border-primary/50 transition-all duration-200">
                        <span className="flex items-center justify-center">
                          Chat on WhatsApp
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    </Link>

                    <div className="text-center space-y-3 pt-4 border-t border-border/30">
                      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Free consultation
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          No obligation
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Quick response
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Quality guaranteed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
