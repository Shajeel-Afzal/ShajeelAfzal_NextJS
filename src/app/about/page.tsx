import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, GraduationCap, Briefcase, Users, Trophy, Star } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { MagicCard } from "@/components/magicui/magic-card";
import { AuroraText } from "@/components/magicui/aurora-text";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Shajeel Afzal | Mobile App & AI Developer | Professional Profile",
  description: "Learn about Shajeel Afzal's expertise in mobile app development, AI engineering, and chatbot solutions. Certified developer with 5+ years of experience delivering cutting-edge digital solutions.",
  openGraph: {
    title: "About Shajeel Afzal | Mobile App & AI Developer",
    description: "Certified Mobile Apps Developer, AI Engineer & Chatbot Specialist with 5+ years of experience helping businesses build innovative solutions.",
    images: ["/images/shajeel_afzal.png"],
  },
};

const achievements = [
  { label: "Projects Completed", value: 100, suffix: "+", icon: Trophy },
  { label: "Happy Clients", value: 50, suffix: "+", icon: Users },
  { label: "Years Experience", value: 5, suffix: "+", icon: Award },
  { label: "Technologies", value: 15, suffix: "+", icon: Star }
];

const certifications = [
  {
    title: "Certified Mobile App Developer",
    issuer: "Professional Certification Authority",
    date: "2024",
    badgeUrl: "#"
  },
  {
    title: "AI Engineer Certification",
    issuer: "AI Development Institute",
    date: "2023",
    badgeUrl: "#"
  },
  {
    title: "ChatBot Development Specialist",
    issuer: "Conversational AI Academy",
    date: "2023",
    badgeUrl: "#"
  },
];

const coreSkills = [
  "React Native", "Flutter", "React.js", "Next.js", "Node.js", "Python",
  "OpenAI", "LangChain", "FastAPI", "MongoDB", "PostgreSQL", "Firebase",
  "WhatsApp Business API", "Telegram Bot API", "AWS", "Docker"
];

const timeline = [
  {
    year: "2024",
    title: "AI Engineering Focus",
    description: "Specialized in building AI agents and intelligent chatbots for enterprise clients",
    type: "career"
  },
  {
    year: "2023",
    title: "ChatBot Development Certification",
    description: "Achieved advanced certification in conversational AI and chatbot development",
    type: "education"
  },
  {
    year: "2022",
    title: "Mobile Development Expertise",
    description: "Expanded expertise to include React Native and Flutter development",
    type: "career"
  },
  {
    year: "2021",
    title: "Freelance Success",
    description: "Established successful freelance career with 50+ satisfied clients",
    type: "career"
  },
  {
    year: "2020",
    title: "Started Professional Journey",
    description: "Began career in web and mobile application development",
    type: "career"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                About{" "}
                <AuroraText className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Shajeel Afzal
                </AuroraText>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A passionate and certified Mobile Apps Developer, AI Engineer, and ChatBot Specialist 
                with over 5 years of experience helping businesses transform their digital vision into reality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in building cutting-edge mobile applications, intelligent AI agents, 
                and conversational chatbots that drive growth and innovation. My expertise spans 
                across multiple technologies and platforms, enabling me to deliver comprehensive 
                solutions tailored to each client's unique needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/consultation">
                    Schedule Consultation
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </div>
            <div className="relative">
              <MagicCard 
                className="p-8 rounded-2xl"
                gradientSize={200}
                gradientColor="rgba(99, 102, 241, 0.1)"
                gradientOpacity={0.6}
              >
                <Image
                  src="/images/shajeel_afzal.png"
                  alt="Shajeel Afzal - Professional Profile"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </MagicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <MagicCard 
                key={stat.label} 
                className="text-center p-6 rounded-lg"
                gradientSize={150}
                gradientColor="rgba(99, 102, 241, 0.1)"
                gradientOpacity={0.6}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-2">
                  <NumberTicker
                    value={stat.value}
                    delay={index * 0.2}
                    className="text-3xl font-bold"
                  />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognized expertise in mobile development, AI engineering, and chatbot solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-4">{cert.date}</p>
                  <Button variant="outline" size="sm">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Technologies & Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expertise across modern development stacks and emerging technologies
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm py-2 px-4 hover:scale-105 transition-transform cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of growth, learning, and achievement
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-lg font-bold text-primary">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2 mr-8"></div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    {item.type === "education" ? (
                      <GraduationCap className="w-5 h-5 text-primary mr-2" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-primary mr-2" />
                    )}
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how my expertise can help 
            bring your digital vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/consultation">
                Book Free Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#portfolio">
                View My Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}