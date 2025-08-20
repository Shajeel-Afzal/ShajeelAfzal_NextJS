import { LucideIcon } from "lucide-react";
import {
    Brain,
    Bot,
    Smartphone,
    Globe,
    Server,
    Zap,
    ShoppingCart,
    CreditCard,
    Database,
    Cloud,
    Code,
    Palette,
    Settings,
    BarChart,
    MessageSquare,
    Users,
    Lock
} from "lucide-react";

export interface ServiceSubcategory {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface Service {
    title: string;
    icon: LucideIcon;
    description: string;
    subcategories: ServiceSubcategory[];
}

export interface Services {
    [key: string]: Service;
}

export const services: Services = {
    "ai-agents": {
        title: "AI Agent",
        icon: Brain,
        description: "Intelligent AI agents that learn your workflows and deliver autonomous outcomes—safely, reliably, and fast.",
        subcategories: [
            {
                title: "AI Agents Development",
                description: "From architecture to MVP: custom, tool-using agents with memory, RAG, Web Search and evals—built for your stack and business goals.",
                icon: Brain
            },
            {
                title: "AI Workflow Automation",
                description: "Automate complex, multi-step processes with agentic decisioning, approvals, and deep integrations—so work runs itself.",
                icon: Settings
            },
            {
                title: "Conversational AI",
                description: "Context-aware chatbots that stream answers, call your APIs, and actually complete tasks across web, WhatsApp, and Slack.",
                icon: MessageSquare
            },
            {
                title: "AI Analytics & Insights",
                description: "Turn documents and data into live insights—summaries, dashboards, and alerts with traceable reasoning and citations.",
                icon: BarChart
            }
        ]
    },
    "chatbots": {
        title: "ChatBot Development",
        icon: Bot,
        description: "Task-completing chatbots for web, WhatsApp & more—built to capture leads, resolve issues, and drive revenue 24/7.",
        subcategories: [
            {
                title: "WhatsApp Business Bots",
                description: "Official WhatsApp Business Platform bots for support, sales, and proactive notifications—Cloud API setup, templates, and compliance handled.",
                icon: MessageSquare
            },
            {
                title: "Website Chat Integration",
                description: "Lightning-fast chat on your site with streaming replies, lead capture, and CRM/analytics integration—pixel-perfect in Next.js.",
                icon: Globe
            },
            {
                title: "Multi-Platform Bots",
                description: "One codebase, many channels—Telegram, Slack, Discord—with rich commands, secure permissions, and enterprise-grade workflows.",
                icon: Users
            },
            {
                title: "Voice-Enabled Bots",
                description: "Natural, real-time voice agents—speech in, speech out—with live transcription and high-quality text-to-speech.",
                icon: Bot
            }
        ]
    },
    "mobile-apps": {
        title: "Mobile App Development",
        icon: Smartphone,
        description: "High-performance Flutter & React Native apps—production-ready, secure, and built to scale.",
        subcategories: [
            {
                title: "End-to-End Product Build",
                description: "From concept to launch: UX, API integration, offline-first, testing, and app store submission.",
                icon: Smartphone
            },
            {
                title: "Subscriptions & Payments",
                description: "Seamless in-app purchases and subscriptions with native billing and cross-platform entitlements.",
                icon: CreditCard
            },
            {
                title: "Cross-Platform Development",
                description: "One codebase, native feel—Flutter & React Native with fast startup and smooth animations.",
                icon: Code
            },
            {
                title: "App Store Launch & ASO",
                description: "Polished listings, screenshots, compliance, and rollouts to maximize installs and reviews.",
                icon: BarChart
            }
        ]
    },
    "web-development": {
        title: "Website Development",
        icon: Globe,
        description: "High-performance Next.js websites & apps—Core Web Vitals-friendly, SEO-ready, and built to scale.",
        subcategories: [
            {
                title: "Full-Stack Web Applications",
                description: "Next.js App Router, secure APIs, and real-time features—deployed on serverless/edge for speed and reliability.",
                icon: Globe
            },
            {
                title: "E-Commerce Platforms",
                description: "Custom storefronts with headless commerce and secure checkout—inventory, subscriptions, and analytics baked in.",
                icon: ShoppingCart
            },
            {
                title: "UI/UX Design & Development",
                description: "Conversion-first design systems—accessible (WCAG), responsive, and beautifully executed.",
                icon: Palette
            },
            {
                title: "Progressive Web Apps",
                description: "Installable, offline-capable experiences with push and background sync—app feel, web reach.",
                icon: Smartphone
            }
        ]
    },
    "backend": {
        title: "Backend Development",
        icon: Server,
        description: "Battle-tested APIs and cloud backends—secure, observable, and built to scale.",
        subcategories: [
            {
                title: "REST & GraphQL APIs",
                description: "Spec-driven REST (OpenAPI) and typed GraphQL schemas with versioning, docs, and contract tests.",
                icon: Server
            },
            {
                title: "Database Design & Management",
                description: "Postgres-first data models, indexes, migrations, and tuning (EXPLAIN, caching, and connection pooling).",
                icon: Database
            },
            {
                title: "Cloud Infrastructure",
                description: "AWS/GCP/Azure setups with autoscaling, queues, and CI/CD—provisioned via Terraform.",
                icon: Cloud
            },
            {
                title: "Security & Authentication",
                description: "OWASP-aligned security with OAuth2/OIDC, JWT, RBAC, secrets management, and encryption in transit/at rest.",
                icon: Lock
            }
        ]
    },
    "automation": {
        title: "Automation Solutions",
        icon: Zap,
        description: "Turn repetitive ops into reliable, compliant workflows—designed, monitored, and built to scale.",
        subcategories: [
            {
                title: "Business Process Automation",
                description: "Multi-step flows with approvals, SLAs, error handling, and audit trails—powered by no/low-code + custom integrations.",
                icon: Settings
            },
            {
                title: "Data Pipeline Automation",
                description: "ELT/ETL pipelines with orchestration, tests, lineage, and alerts—Airbyte → dbt → Airflow/Prefect/Dagster.",
                icon: Database
            },
            {
                title: "Social Media Automation",
                description: "Policy-safe scheduling, inbox triage, and reporting via official APIs (IG/FB/X)—no mass-follow, no scraping.",
                icon: Users
            },
            {
                title: "Integration Automation",
                description: "Event-driven integrations using webhooks, queues, and event buses (Stripe, EventBridge, Kafka) for real-time reliability.",
                icon: Zap
            }
        ]
    }
};
