import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Knowledge base about Shajeel Afzal
const SHAJEEL_CONTEXT = `
You are an AI assistant for Shajeel Afzal's professional website. Shajeel is a Certified Mobile Apps Developer, AI Engineer, and ChatBot Specialist.

SERVICES OFFERED:
1. AI Integration & Development:
   - Custom AI Agents & Assistants
   - Process Automation 
   - Conversational AI (chatbots for web, WhatsApp, Slack)
   - AI Analytics & Insights

2. ChatBot Development:
   - WhatsApp Business Bots
   - Website Chat Integration  
   - Multi-Platform Bots (Telegram, Slack, Discord)
   - Voice-Enabled Bots

3. Mobile App Development:
   - End-to-End Product Build
   - Flutter & React Native apps
   - Production-ready, secure, scalable solutions

4. Automation Solutions:
   - Workflow Automation
   - Data Pipeline Automation
   - Social Media Automation
   - Integration Automation

EXPERTISE:
- Mobile Apps (Flutter, React Native)
- AI/ML Technologies (OpenAI, Anthropic, LangChain)
- Web Development (Next.js, React, TypeScript)
- Backend Development (Node.js, Python)
- Database Technologies (PostgreSQL, MongoDB)
- Cloud Platforms (AWS, Vercel, Supabase)

CONTACT METHODS:
- WhatsApp: Preferred for quick consultations
- Email: For detailed project discussions
- Consultation Booking: Available for free initial consultations

Your role is to:
1. Answer questions about Shajeel's services and expertise
2. Help visitors understand which services match their needs
3. Provide rough project estimates when appropriate
4. Guide users to appropriate contact methods
5. Showcase relevant portfolio examples when discussing services

Be professional, helpful, and knowledgeable. Always encourage engagement through consultations for detailed discussions.
`;

const getServiceInfo = tool({
  description: 'Get detailed information about specific services offered',
  parameters: z.object({
    serviceType: z.enum(['ai', 'chatbots', 'mobile-apps', 'automation']).describe('Type of service to get information about'),
  }),
  execute: async ({ serviceType }) => {
    const services = {
      'ai': {
        title: 'AI Integration & Development',
        description: 'Custom AI solutions including agents, process automation, and analytics',
        subcategories: [
          'Custom AI Agents & Assistants',
          'Process Automation with AI decisioning',
          'Conversational AI for multiple platforms',
          'AI Analytics & Insights with live data'
        ],
        pricing: 'Starting from $2,000 for basic AI integrations, $5,000+ for custom agents',
        timeline: '2-8 weeks depending on complexity'
      },
      'chatbots': {
        title: 'ChatBot Development',
        description: 'Task-completing chatbots for web, WhatsApp & more platforms',
        subcategories: [
          'WhatsApp Business Bots with Cloud API',
          'Website Chat Integration with streaming',
          'Multi-Platform Bots (Telegram, Slack, Discord)',
          'Voice-Enabled Bots with real-time speech'
        ],
        pricing: 'Starting from $1,500 for basic bots, $3,000+ for advanced features',
        timeline: '1-4 weeks for most chatbot projects'
      },
      'mobile-apps': {
        title: 'Mobile App Development',
        description: 'High-performance Flutter & React Native apps',
        subcategories: [
          'End-to-End Product Development',
          'Cross-platform apps (iOS & Android)',
          'Backend integration and APIs',
          'App Store deployment and maintenance'
        ],
        pricing: 'Starting from $5,000 for simple apps, $15,000+ for complex solutions',
        timeline: '6-16 weeks depending on features and complexity'
      },
      'automation': {
        title: 'Automation Solutions',
        description: 'Streamline workflows and integrate systems',
        subcategories: [
          'Workflow Automation with approvals',
          'Data Pipeline Automation (ETL/ELT)',
          'Social Media Automation (policy-safe)',
          'Integration Automation with webhooks'
        ],
        pricing: 'Starting from $1,000 for simple automations, $4,000+ for complex workflows',
        timeline: '1-6 weeks depending on integrations needed'
      }
    };
    
    return services[serviceType];
  },
});

const getContactInfo = tool({
  description: 'Get contact information and next steps for potential clients',
  parameters: z.object({
    enquiryType: z.enum(['consultation', 'whatsapp', 'email', 'portfolio']).describe('Type of contact or information requested'),
  }),
  execute: async ({ enquiryType }) => {
    const contacts = {
      'consultation': {
        title: 'Free Consultation Booking',
        description: 'Schedule a free 30-minute consultation to discuss your project',
        action: 'Book a consultation call to discuss your specific requirements',
        nextSteps: 'Click the consultation booking link or contact via WhatsApp'
      },
      'whatsapp': {
        title: 'WhatsApp Contact',
        description: 'Quick responses for urgent questions and consultations',
        action: 'Message on WhatsApp for immediate assistance',
        nextSteps: 'Click the WhatsApp link to start a conversation'
      },
      'email': {
        title: 'Email Contact',
        description: 'Detailed project discussions and formal communications',
        action: 'Send an email with your project details',
        nextSteps: 'Use the contact form or send direct email'
      },
      'portfolio': {
        title: 'Portfolio & Case Studies',
        description: 'View previous work and detailed case studies',
        action: 'Browse the portfolio section to see relevant projects',
        nextSteps: 'Check the portfolio section on the main website'
      }
    };
    
    return contacts[enquiryType];
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Choose AI provider based on environment variable
  const provider = process.env.AI_MODEL_PROVIDER || 'openai';
  const modelName = process.env.AI_MODEL_NAME || 'gpt-4o-mini';
  
  let model;
  if (provider === 'anthropic') {
    model = anthropic(modelName);
  } else {
    model = openai(modelName);
  }

  const result = await streamText({
    model,
    system: SHAJEEL_CONTEXT,
    messages,
    tools: {
      getServiceInfo,
      getContactInfo,
    },
    maxTokens: 1000,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}