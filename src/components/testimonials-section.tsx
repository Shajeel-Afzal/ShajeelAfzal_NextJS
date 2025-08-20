import { Star } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechStart Inc",
    content: "Shajeel delivered our mobile app ahead of schedule with exceptional quality. His AI integration expertise is unmatched.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, E-Commerce Plus",
    content: "The chatbot solution increased our customer engagement by 300%. Shajeel's technical skills are outstanding.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Product Manager, InnovateNow",
    content: "From concept to deployment, Shajeel made the complex simple. Our AI-powered features work flawlessly.",
    avatar: "/api/placeholder/40/40",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What{" "}
            <AuroraText className="text-4xl md:text-5xl font-bold">
              Clients Say
            </AuroraText>{" "}
            💬 About My Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by entrepreneurs and enterprises worldwide
          </p>
        </div>

        <Marquee pauseOnHover className="[--duration:40s]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="mx-4 max-w-sm rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  loading="lazy"
                  sizes="40px"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
