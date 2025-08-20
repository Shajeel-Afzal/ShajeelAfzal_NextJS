# Shajeel Afzal Professional Portfolio

This is a professional portfolio and consultation platform built with Next.js 15.4.6, designed for a Certified Mobile Apps Developer, ChatBots Developer, and AI Engineer.

## ✨ Features

- **AI Assistant**: Intelligent chat interface powered by OpenAI GPT-4 for instant customer support
- **Responsive Design**: Mobile-first approach with excellent performance across all devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Performance Focused**: Optimized for Core Web Vitals and fast loading

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Set up environment variables by creating a `.env.local` file:

```bash
# OpenAI API Key for AI Assistant (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤖 AI Assistant

The AI Assistant feature provides intelligent customer support and lead qualification. For detailed setup and customization instructions, see [docs/AI_ASSISTANT.md](docs/AI_ASSISTANT.md).

**Quick Setup:**
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add it to `.env.local` as shown above
3. The AI Assistant will be available at `/ai-assistant`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── data/                   # Static data and configurations
├── lib/                    # Utility functions
└── styles/                 # Global styles
```

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.6
- **UI Library**: shadcn/ui + Tailwind CSS
- **AI Integration**: Vercel AI SDK v5 + OpenAI
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **3D Graphics**: cobe (globe visualization)

## 📱 Key Pages

- **Homepage** (`/`): Main portfolio showcase
- **AI Assistant** (`/ai-assistant`): Intelligent chat interface
- **API Routes** (`/api/chat`): OpenAI integration for AI responses

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - component library documentation
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration toolkit

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important**: Make sure to add your `OPENAI_API_KEY` environment variable in the Vercel dashboard for the AI Assistant to work in production.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
