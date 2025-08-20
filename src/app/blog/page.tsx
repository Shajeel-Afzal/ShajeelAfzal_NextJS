import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Latest Insights on Mobile Development, AI & Technology | Shajeel Afzal",
  description: "Stay updated with the latest trends, tutorials, and insights on mobile app development, AI engineering, chatbot development, and emerging technologies by Shajeel Afzal.",
  openGraph: {
    title: "Tech Blog by Shajeel Afzal | Mobile Development & AI Insights",
    description: "Expert insights, tutorials, and industry trends on mobile app development, AI engineering, and chatbot solutions.",
    images: ["/images/shajeel_afzal.png"],
  },
};

// Mock blog data - in a real app, this would come from Strapi CMS
const featuredPost = {
  id: "1",
  title: "Building Intelligent Chatbots with OpenAI GPT-4: A Complete Guide",
  excerpt: "Learn how to create sophisticated conversational AI that understands context, maintains memory, and provides value to your users. This comprehensive guide covers everything from setup to deployment.",
  content: "Full blog content would be here...",
  author: "Shajeel Afzal",
  publishedAt: "2024-01-15",
  readTime: "12 min read",
  category: "AI Development",
  tags: ["ChatBot", "OpenAI", "GPT-4", "Conversational AI"],
  featured: true,
  image: "/api/placeholder/800/400",
  slug: "building-intelligent-chatbots-openai-gpt4"
};

const blogPosts = [
  {
    id: "2",
    title: "React Native vs Flutter: Performance Comparison 2024",
    excerpt: "An in-depth analysis of React Native and Flutter performance in real-world applications, including memory usage, startup time, and rendering performance.",
    author: "Shajeel Afzal",
    publishedAt: "2024-01-10",
    readTime: "8 min read",
    category: "Mobile Development",
    tags: ["React Native", "Flutter", "Performance"],
    image: "/api/placeholder/400/250",
    slug: "react-native-vs-flutter-performance-2024"
  },
  {
    id: "3",
    title: "Implementing WhatsApp Business API for Customer Support",
    excerpt: "Step-by-step guide to integrating WhatsApp Business API for automated customer support, including template messages and webhook handling.",
    author: "Shajeel Afzal",
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    category: "Automation",
    tags: ["WhatsApp", "Business API", "Customer Support"],
    image: "/api/placeholder/400/250",
    slug: "whatsapp-business-api-customer-support"
  },
  {
    id: "4",
    title: "Next.js 14 App Router: Best Practices for SEO",
    excerpt: "Optimize your Next.js 14 applications for search engines with the latest App Router features, including metadata API and server components.",
    author: "Shajeel Afzal",
    publishedAt: "2023-12-28",
    readTime: "6 min read",
    category: "Web Development",
    tags: ["Next.js", "SEO", "App Router"],
    image: "/api/placeholder/400/250",
    slug: "nextjs-14-app-router-seo-best-practices"
  },
  {
    id: "5",
    title: "Building Scalable AI Agents with LangChain",
    excerpt: "Create intelligent AI agents that can reason, plan, and execute complex tasks using LangChain framework and modern LLMs.",
    author: "Shajeel Afzal",
    publishedAt: "2023-12-20",
    readTime: "15 min read",
    category: "AI Development",
    tags: ["AI Agents", "LangChain", "LLM"],
    image: "/api/placeholder/400/250",
    slug: "building-scalable-ai-agents-langchain"
  },
  {
    id: "6",
    title: "Mobile App Security: Essential Practices for 2024",
    excerpt: "Protect your mobile applications with these essential security practices, from secure storage to API protection and authentication.",
    author: "Shajeel Afzal",
    publishedAt: "2023-12-15",
    readTime: "9 min read",
    category: "Security",
    tags: ["Mobile Security", "App Security", "Best Practices"],
    image: "/api/placeholder/400/250",
    slug: "mobile-app-security-practices-2024"
  }
];

const categories = [
  "All Posts",
  "AI Development",
  "Mobile Development", 
  "Web Development",
  "Automation",
  "Security"
];

function BlogCard({ post, featured = false }: { post: typeof blogPosts[0], featured?: boolean }) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'lg:col-span-2' : ''}`}>
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={featured ? 800 : 400}
          height={featured ? 400 : 250}
          className="w-full h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary/90 text-white">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
        </div>
        <CardTitle className={`group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" className="group">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tech Insights &{" "}
              <AuroraText className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Development Tips
              </AuroraText>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest trends, tutorials, and insights on mobile development, 
              AI engineering, and emerging technologies. Learn from real-world projects and expert perspectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                />
              </div>
              <Button>
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All Posts" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Article</h2>
            <p className="text-lg text-muted-foreground">
              Don&apos;t miss our latest deep-dive into cutting-edge technology
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <BlogCard post={featuredPost} featured />
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Articles</h2>
            <p className="text-lg text-muted-foreground">
              Latest insights and tutorials from the world of technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Stay Updated</CardTitle>
              <p className="text-muted-foreground">
                Get the latest articles, tutorials, and insights delivered to your inbox
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Enter your email address" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. 2-3 emails per month.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}