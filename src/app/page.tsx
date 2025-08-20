import { 
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { ServicesCardsShowcase } from "@/components/services-cards-showcase";
import { PortfolioSection } from "@/components/portfolio-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PageTracker } from "@/components/page-tracker";
import { analytics } from "@/components/analytics";
import Link from "next/link";

function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and turn your ideas into reality.
            Book a free consultation and get expert guidance tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#consultation">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => analytics.navigation.ctaClick("Book Free Consultation", "homepage")}
              >
                Book Free Consultation
              </Button>
            </Link>

            <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => analytics.whatsapp.clicked("homepage")}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="font-sans">
      <PageTracker pageName="Home" properties={{ page_type: "homepage" }} />
      <section id="home">
        <HeroSection />
      </section>      
      <ServicesCardsShowcase />
      <PortfolioSection />
      <SkillsSection />
      <TestimonialsSection />      
      <CTASection />
    </main>
  );
}