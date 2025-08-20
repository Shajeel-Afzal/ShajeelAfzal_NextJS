import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactInfo } from "@/components/contact-info";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Shajeel Afzal | AI Developer & Mobile App Specialist",
  description: "Get in touch with Shajeel Afzal for your AI development, mobile app, and chatbot projects. Book a free consultation and turn your ideas into reality.",
  keywords: ["contact", "consultation", "AI developer", "mobile app developer", "chatbot specialist"],
  openGraph: {
    title: "Contact Shajeel Afzal | AI Developer",
    description: "Get in touch for AI development, mobile app, and chatbot projects. Free consultation available.",
    url: "https://shajeelafzal.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Build Something
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}Amazing Together
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Get in touch and let&apos;s discuss how we can build cutting-edge solutions for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
              <p className="text-muted-foreground mb-8">
                Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Prefer a direct approach? Choose your preferred method of communication.
              </p>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation call to discuss your project requirements and get expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#consultation"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                <Phone className="mr-2 w-5 h-5" />
                Book Free Consultation
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}