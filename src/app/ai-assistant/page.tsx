'use client';

import { useChat } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: any[];
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[80%] md:max-w-[70%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-primary text-primary-foreground ml-2" 
            : "bg-muted text-muted-foreground mr-2"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        {/* Message Content */}
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-md" 
            : "bg-muted text-foreground rounded-bl-md"
        )}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          
          {/* Tool Results */}
          {message.toolInvocations && message.toolInvocations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/20">
              {message.toolInvocations.map((tool, index) => (
                <div key={index} className="text-xs opacity-75">
                  <div className="font-medium">{tool.toolName}</div>
                  {tool.result && (
                    <div className="mt-1 space-y-1">
                      {Object.entries(tool.result).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%] md:max-w-[70%]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground mr-2">
          <Bot className="w-4 h-4" />
        </div>
        <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-muted">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Track if conversation has started
  useEffect(() => {
    if (messages.length > 0) {
      setHasStarted(true);
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    }
  };

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: `👋 Hi! I'm Shajeel's AI assistant. I'm here to help you learn about mobile app development, AI integration, chatbot solutions, and consultation services.

Feel free to ask me about:
• Mobile app development (Flutter, React Native)
• AI integration and custom AI agents
• Chatbot development for web, WhatsApp, and more
• Automation solutions for your business
• Project estimates and timelines
• How to get started with a consultation

What can I help you with today?`
  };

  // Show welcome message if no conversation has started
  const displayMessages = hasStarted ? messages : [welcomeMessage, ...messages];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">Powered by Shajeel Afzal</p>
              </div>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-4xl mx-auto">
            {/* Error State */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                <p className="text-destructive text-sm">
                  Sorry, I'm having trouble connecting right now. Please try again or contact us directly via WhatsApp.
                </p>
              </div>
            )}

            {/* Messages */}
            {displayMessages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}
            
            {/* Scroll Anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleFormSubmit} className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me about mobile apps, AI solutions, or project consultation..."
                  disabled={isLoading}
                  className="pr-12 min-h-[48px] text-base"
                  autoComplete="off"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                size="lg"
                className="min-h-[48px] px-6"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
            
            {/* Quick Actions */}
            {!hasStarted && (
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "What services do you offer?",
                  "Mobile app development pricing",
                  "AI chatbot solutions",
                  "Schedule a consultation"
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleInputChange({ target: { value: suggestion } } as any);
                      // Auto-submit the suggestion
                      setTimeout(() => {
                        const syntheticEvent = new Event('submit') as any;
                        syntheticEvent.preventDefault = () => {};
                        handleSubmit(syntheticEvent);
                      }, 100);
                    }}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI assistant can help with general questions. For detailed project discussions, 
              <Link href="#consultation" className="underline ml-1">book a consultation</Link> or 
              <a href="https://wa.me/your-number" className="underline ml-1">message on WhatsApp</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}