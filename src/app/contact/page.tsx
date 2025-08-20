import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, MessageCircle, Clock } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Shajeel Afzal | Get In Touch | Mobile App & AI Developer",
  description: "Contact Shajeel Afzal for mobile app development, AI engineering, and chatbot solutions. Get expert consultation and turn your digital vision into reality.",
  openGraph: {
    title: "Contact Shajeel Afzal | Mobile App & AI Developer",
    description: "Ready to transform your digital vision? Contact expert Mobile App Developer, AI Engineer & Chatbot Specialist Shajeel Afzal for consultation.",
    images: ["/images/shajeel_afzal.png"],
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Send me a detailed message",
    value: "hello@shajeelafzal.com",
    href: "mailto:hello@shajeelafzal.com",
    note: "Response within 24 hours"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick chat for urgent queries",
    value: "WhatsApp Me",
    href: "https://wa.me/your-number",
    note: "Available 9 AM - 9 PM PST"
  },
  {
    icon: Calendar,
    title: "Schedule Call",
    description: "Book a consultation",
    value: "Free 30-min consultation",
    href: "#consultation",
    note: "Available Mon-Fri"
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Working remotely",
    value: "Pakistan",
    href: "#",
    note: "Serving clients globally"
  }
];

const faqs = [
  {
    question: "What types of projects do you work on?",
    answer: "I specialize in mobile app development (React Native, Flutter), AI agent development, chatbot solutions, and web applications. I work with startups, SMBs, and enterprise clients across various industries."
  },
  {
    question: "How do you handle project communication?",
    answer: "I believe in transparent communication. I provide regular updates via your preferred channel (email, WhatsApp, Slack), weekly progress reports, and scheduled check-in calls to ensure we're always aligned."
  },
  {
    question: "What's your typical project timeline?",
    answer: "Timelines vary based on project complexity. Simple mobile apps: 4-8 weeks, Complex applications: 3-6 months, AI/Chatbot solutions: 2-6 weeks. I provide detailed timelines during consultation."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! I offer post-launch support including bug fixes, updates, performance monitoring, and feature enhancements. Support packages are tailored to your specific needs."
  },
  {
    question: "What's included in the free consultation?",
    answer: "During our 30-minute consultation, we'll discuss your project requirements, technical feasibility, timeline estimates, technology recommendations, and next steps. No commitment required!"
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s Build Something{" "}
              <AuroraText className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Amazing Together
              </AuroraText>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your digital vision into reality? I&apos;m here to help you build 
              cutting-edge mobile apps, AI solutions, and chatbots that drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#contact-form">
                  Send Message
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#consultation">
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred way to reach out. I&apos;m always excited to discuss new projects and opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-3 text-sm">{method.description}</p>
                  <Link 
                    href={method.href}
                    className="text-primary hover:underline font-medium block mb-2"
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {method.value}
                  </Link>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {method.note}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Send Me a Message
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell me about your project and I&apos;ll get back to you within 24 hours
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about working together
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free 30-minute consultation to discuss your requirements, 
            get technical insights, and explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Schedule Free Consultation
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}