import { Metadata } from "next";
import { About } from "@/components/about";
import { Download, Award, Users, Calendar, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Shajeel Afzal | AI Engineer & Mobile App Developer",
  description: "Learn about Shajeel Afzal's expertise in AI development, mobile apps, and chatbot solutions. Download resume and explore certifications and professional experience.",
  keywords: ["about", "resume", "certifications", "AI engineer", "mobile developer", "experience"],
  openGraph: {
    title: "About Shajeel Afzal | Professional Profile",
    description: "Expert AI Engineer & Mobile App Developer with 5+ years experience building cutting-edge solutions.",
    url: "https://shajeelafzal.com/about",
  },
};

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
  },
  {
    icon: Code,
    value: "100+",
    label: "Projects Completed",
  },
  {
    icon: Calendar,
    value: "5+",
    label: "Years Experience",
  },
  {
    icon: Award,
    value: "15+",
    label: "Certifications",
  },
];

const certifications = [
  {
    title: "AI & Machine Learning Certification",
    issuer: "Google Cloud",
    year: "2024",
    verified: true,
  },
  {
    title: "Mobile App Development Professional",
    issuer: "Meta",
    year: "2023",
    verified: true,
  },
  {
    title: "Cloud Solutions Architect",
    issuer: "AWS",
    year: "2023",
    verified: true,
  },
  {
    title: "Advanced React & Node.js",
    issuer: "Microsoft",
    year: "2024",
    verified: true,
  },
  {
    title: "Blockchain Development",
    issuer: "IBM",
    year: "2023",
    verified: true,
  },
  {
    title: "ChatBot Development Specialist",
    issuer: "Dialogflow",
    year: "2024",
    verified: true,
  },
];

const experience = [
  {
    company: "Freelance Consultant",
    role: "Senior Full-Stack & AI Developer",
    period: "2022 - Present",
    description: "Leading mobile app and AI development projects for startups and enterprises worldwide.",
    achievements: [
      "Delivered 50+ successful mobile applications using React Native and Flutter",
      "Built AI-powered chatbots serving 10K+ users daily",
      "Achieved 99.9% uptime for production applications",
      "Mentored 20+ junior developers in modern tech stacks",
    ],
  },
  {
    company: "TechCorp Solutions",
    role: "Lead Mobile Developer",
    period: "2020 - 2022",
    description: "Led mobile development team building enterprise applications for Fortune 500 companies.",
    achievements: [
      "Architected scalable mobile solutions for 100K+ users",
      "Reduced app loading time by 60% through optimization",
      "Implemented CI/CD pipelines improving deployment efficiency by 80%",
      "Led team of 8 developers across multiple projects",
    ],
  },
  {
    company: "Innovation Labs",
    role: "Software Engineer",
    period: "2019 - 2020",
    description: "Developed cutting-edge web and mobile applications using modern JavaScript frameworks.",
    achievements: [
      "Built responsive web applications with 95+ Lighthouse scores",
      "Developed REST APIs serving 1M+ requests daily",
      "Collaborated with UX/UI teams to improve user engagement by 40%",
      "Implemented security best practices reducing vulnerabilities by 90%",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {" "}Shajeel Afzal
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Passionate AI Engineer & Mobile App Developer with 5+ years of experience creating innovative solutions that drive business growth and enhance user experiences.
            </p>
            <Button size="lg" className="mr-4" asChild>
              <a href="/downloads/Shajeel_Afzal_Resume.txt" download="Shajeel_Afzal_Resume.txt">
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg">
              View Certifications
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">My Journey</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  My journey in technology began over 5 years ago with a simple fascination for how software could solve real-world problems. What started as curiosity has evolved into a passion for creating cutting-edge AI solutions and mobile applications that make a meaningful impact.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  I specialize in building intelligent mobile applications, AI-powered chatbots, and scalable web solutions. My approach combines technical expertise with business acumen, ensuring that every solution I create not only works flawlessly but also drives measurable results for my clients.
                </p>
                <p className="text-lg leading-relaxed">
                  When I&apos;m not coding, you&apos;ll find me exploring the latest AI technologies, mentoring fellow developers, or sharing knowledge through technical blogs and community contributions. I believe in continuous learning and staying at the forefront of technological innovation.
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <div key={index} className="border-l-4 border-primary pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold">{job.role}</h3>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <div className="text-primary font-medium mb-3">{job.company}</div>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Certifications & Credentials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{cert.title}</h3>
                      {cert.verified && (
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="text-primary font-medium mb-1">{cert.issuer}</div>
                    <div className="text-sm text-muted-foreground">{cert.year}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Core Expertise</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>React Native</li>
                    <li>Flutter & Dart</li>
                    <li>iOS (Swift)</li>
                    <li>Android (Kotlin)</li>
                    <li>Progressive Web Apps</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">AI & Machine Learning</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>OpenAI GPT Integration</li>
                    <li>LangChain Framework</li>
                    <li>Natural Language Processing</li>
                    <li>Computer Vision</li>
                    <li>TensorFlow & PyTorch</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Full-Stack Development</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Next.js & React</li>
                    <li>Node.js & Express</li>
                    <li>TypeScript</li>
                    <li>PostgreSQL & MongoDB</li>
                    <li>AWS & Google Cloud</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I&apos;d love to discuss your project and explore how we can create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">Get In Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#consultation">Book Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}