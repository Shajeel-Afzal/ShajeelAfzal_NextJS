import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

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

PRICING GUIDE:
- AI Integration: Starting from $2,000 for basic AI integrations, $5,000+ for custom agents
- ChatBot Development: Starting from $1,500 for basic bots, $3,000+ for advanced features
- Mobile App Development: Starting from $5,000 for simple apps, $15,000+ for complex solutions
- Automation Solutions: Starting from $1,000 for simple automations, $4,000+ for complex workflows

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

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Check if we're in demo mode or don't have API keys
  const isDemoMode = process.env.DEMO_MODE === 'true';
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
  
  if (isDemoMode || (!hasOpenAI && !hasAnthropic)) {
    // Return a demo response for development
    const lastMessage = messages[messages.length - 1];
    const demoResponse = getDemoResponse(lastMessage.content);
    
    // Create a ReadableStream that simulates streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Simulate streaming by sending chunks with delays
        const words = demoResponse.split(' ');
        let index = 0;
        
        const sendNextWord = () => {
          if (index < words.length) {
            const word = words[index] + (index < words.length - 1 ? ' ' : '');
            controller.enqueue(encoder.encode(word));
            index++;
            setTimeout(sendNextWord, 50 + Math.random() * 100); // Random delay for realistic effect
          } else {
            controller.close();
          }
        };
        
        setTimeout(sendNextWord, 200); // Initial delay
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }

  // Choose AI provider based on environment variable
  const provider = process.env.AI_MODEL_PROVIDER || 'openai';
  const modelName = process.env.AI_MODEL_NAME || 'gpt-4o-mini';
  
  let model;
  if (provider === 'anthropic') {
    model = anthropic(modelName);
  } else {
    model = openai(modelName);
  }

  try {
    const result = await streamText({
      model,
      system: SHAJEEL_CONTEXT,
      messages,
      maxOutputTokens: 1000,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI API Error:', error);
    
    // Fallback to demo response if API fails
    const lastMessage = messages[messages.length - 1];
    const fallbackResponse = `I apologize, but I'm currently experiencing technical difficulties connecting to the AI service. However, I can still help you! 

${getDemoResponse(lastMessage.content)}

For immediate assistance, please contact Shajeel directly via WhatsApp or email.`;
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallbackResponse));
        controller.close();
      }
    });
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

function getDemoResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('service') || message.includes('what') && message.includes('offer')) {
    return `Great question! Shajeel offers several key services:

🤖 **AI Integration & Development**
- Custom AI Agents & Assistants (Starting from $2,000)
- Process Automation with AI decisioning
- Conversational AI for web, WhatsApp, and Slack
- AI Analytics & Insights with live data

💬 **ChatBot Development** 
- WhatsApp Business Bots with Cloud API (Starting from $1,500)
- Website Chat Integration with streaming responses
- Multi-Platform Bots (Telegram, Slack, Discord)
- Voice-Enabled Bots with real-time speech

📱 **Mobile App Development**
- End-to-End Product Development (Starting from $5,000)
- Flutter & React Native cross-platform apps
- Backend integration and API development
- App Store deployment and maintenance

⚙️ **Automation Solutions**
- Workflow Automation with approvals (Starting from $1,000)
- Data Pipeline Automation (ETL/ELT)
- Social Media Automation (policy-safe)
- Integration Automation with webhooks

Would you like more details about any specific service?`;
  }
  
  if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
    return `Here's a pricing overview for Shajeel's services:

💰 **AI Integration & Development**
- Basic AI integrations: Starting from $2,000
- Custom AI agents: Starting from $5,000
- Timeline: 2-8 weeks depending on complexity

💰 **ChatBot Development**
- Basic bots: Starting from $1,500  
- Advanced features: Starting from $3,000
- Timeline: 1-4 weeks for most projects

💰 **Mobile App Development** 
- Simple apps: Starting from $5,000
- Complex solutions: Starting from $15,000
- Timeline: 6-16 weeks depending on features

💰 **Automation Solutions**
- Simple automations: Starting from $1,000
- Complex workflows: Starting from $4,000  
- Timeline: 1-6 weeks depending on integrations

All projects include free consultation to discuss your specific needs. Would you like to schedule a consultation?`;
  }
  
  if (message.includes('consultation') || message.includes('schedule') || message.includes('book')) {
    return `Excellent! Shajeel offers free 30-minute consultations to discuss your project needs.

📅 **How to Schedule:**
- Click the consultation booking link on the main website
- Contact directly via WhatsApp for immediate scheduling  
- Send an email with your project details

🤝 **What's Included:**
- Project requirements discussion
- Technical feasibility assessment  
- Rough timeline and cost estimation
- Technology recommendations
- Next steps planning

📞 **Contact Options:**
- WhatsApp: Preferred for quick scheduling
- Email: hello@shajeelafzal.com
- Website booking form

Would you like me to guide you to the booking options?`;
  }
  
  if (message.includes('chatbot') || message.includes('bot')) {
    return `Shajeel specializes in building intelligent chatbots that actually complete tasks! Here's what's available:

🟢 **WhatsApp Business Bots**
- Official WhatsApp Business Platform integration
- Cloud API setup with templates and compliance
- Support, sales, and proactive notifications
- Starting from $1,500

🌐 **Website Chat Integration**
- Lightning-fast streaming responses (like this chat!)
- Lead capture and CRM integration
- Analytics integration for insights
- Pixel-perfect Next.js implementation

📱 **Multi-Platform Bots**
- One codebase for Telegram, Slack, Discord
- Rich commands and secure permissions
- Enterprise-grade workflows
- Cross-platform consistency

🎤 **Voice-Enabled Bots**
- Natural real-time voice interactions
- Speech-to-text and text-to-speech
- Live transcription capabilities
- High-quality audio processing

Which type of chatbot interests you most?`;
  }
  
  if (message.includes('mobile') || message.includes('app')) {
    return `Shajeel builds high-performance mobile apps using modern technologies:

📱 **End-to-End Development**
- Complete product development from concept to store
- User research and UI/UX design
- Backend API development
- App Store optimization and deployment

🔧 **Technology Stack**
- **Flutter**: Google's UI toolkit for native performance
- **React Native**: Cross-platform with shared codebase  
- **Native iOS/Android**: When platform-specific features needed
- **Backend**: Node.js, Python, PostgreSQL, MongoDB

✨ **Key Features**
- Production-ready and secure architecture
- Scalable solutions that grow with your business
- Integration with third-party services
- Real-time features and offline capabilities

💰 **Investment Range**
- Simple apps: $5,000 - $10,000
- Medium complexity: $10,000 - $25,000  
- Complex enterprise: $25,000+

What type of mobile app are you considering?`;
  }
  
  // Default response
  return `Hi! I'm Shajeel's AI assistant. I can help you learn about:

• **Mobile App Development** - Flutter, React Native, and native solutions
• **AI Integration** - Custom agents, automation, and intelligent systems  
• **ChatBot Development** - WhatsApp, web, and multi-platform bots
• **Automation Solutions** - Workflow automation and system integrations
• **Project Consultation** - Free consultations and project planning

Feel free to ask specific questions about services, pricing, timelines, or how to get started with your project!

What would you like to know more about?`;
}