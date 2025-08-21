import { HeroSection } from "@/components/hero-section";
import { ServicesCardsShowcase } from "@/components/services-cards-showcase";
import { PortfolioSection } from "@/components/portfolio-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASectionV2 } from "@/components/cta-section-v2";

export default function Home() {
  return (
    <main className="font-sans">
      <section id="home">
        <HeroSection />
      </section>      
      <ServicesCardsShowcase />
      <PortfolioSection />
      <SkillsSection />
      <TestimonialsSection />      
      <CTASectionV2 />
    </main>
  );
}