import { MessageCircle, Rocket, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build{" "}
            <AuroraText className="text-4xl md:text-5xl font-bold">
              Something Amazing
            </AuroraText>{" "}
            Together? 🚀
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Let&apos;s transform your ideas into powerful digital solutions. 
            Book a free consultation and get expert guidance tailored to your unique needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-16 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold">Free Strategy Session</h3>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span>30-minute consultation call</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span>Project roadmap & tech recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-purple-500" />
                    <span>Custom solution strategy</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link href="#consultation">
                  <Button size="lg" className="w-full text-lg px-8 py-6 h-14">
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Free Consultation
                  </Button>
                </Link>

                <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="w-full text-lg px-8 py-6 h-14">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Quick WhatsApp Chat
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground text-center">
                  No commitment required • Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
