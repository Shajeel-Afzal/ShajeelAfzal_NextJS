import { Mail, Phone, MessageCircle, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "hello@shajeelafzal.com",
    action: "Send Email",
    href: "mailto:hello@shajeelafzal.com",
    color: "bg-blue-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses, instant communication",
    action: "Chat on WhatsApp",
    href: "https://wa.me/your-number", // Replace with actual number
    color: "bg-green-500",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a free 30-min consultation",
    action: "Book Consultation",
    href: "#consultation",
    color: "bg-purple-500",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Available during business hours",
    action: "Call Now",
    href: "tel:+your-number", // Replace with actual number
    color: "bg-orange-500",
  },
];

const businessInfo = [
  {
    icon: MapPin,
    title: "Location",
    description: "Pakistan (Remote Worldwide)",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday - Friday: 9:00 AM - 6:00 PM (PKT)",
  },
  {
    icon: MessageCircle,
    title: "Response Time",
    description: "Within 24 hours (usually much faster)",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="grid gap-4">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow bg-card"
            >
              <div className={`p-3 rounded-lg ${method.color} text-white mr-4`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{method.title}</h3>
                <p className="text-muted-foreground text-sm">{method.description}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {method.action}
                </a>
              </Button>
            </div>
          );
        })}
      </div>

      {/* Business Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Business Information</h3>
        <div className="space-y-3">
          {businessInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className="flex items-start">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3 mt-1">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">{info.title}</h4>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Quick Answers</h3>
        <div className="space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">What&apos;s the typical project timeline?</h4>
            <p className="text-sm text-muted-foreground">
              Most projects take 2-6 months depending on complexity. I&apos;ll provide a detailed timeline during our consultation.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Do you work with startups?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely! I love working with startups and offer flexible payment terms and MVP-focused development approaches.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">What&apos;s included in the consultation?</h4>
            <p className="text-sm text-muted-foreground">
              Free 30-minute call to discuss your project, provide technical guidance, and create a detailed proposal with timeline and pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}