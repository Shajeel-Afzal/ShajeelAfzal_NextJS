'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Send, User, Loader2, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function AIAssistant() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Ask me about Shajeel's services and expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Welcome to AI Assistant</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  I'm here to help you learn about Shajeel's services, expertise, and how he can assist with your projects. Ask me anything!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto p-4"
                    onClick={() => handleInputChange({ target: { value: "What services does Shajeel offer?" } } as any)}
                  >
                    <div>
                      <div className="font-medium">What services does Shajeel offer?</div>
                      <div className="text-sm text-muted-foreground">Learn about available services</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto p-4"
                    onClick={() => handleInputChange({ target: { value: "How much does a mobile app cost?" } } as any)}
                  >
                    <div>
                      <div className="font-medium">How much does a mobile app cost?</div>
                      <div className="text-sm text-muted-foreground">Get pricing information</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto p-4"
                    onClick={() => handleInputChange({ target: { value: "Can you build AI chatbots?" } } as any)}
                  >
                    <div>
                      <div className="font-medium">Can you build AI chatbots?</div>
                      <div className="text-sm text-muted-foreground">Learn about AI capabilities</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto p-4"
                    onClick={() => handleInputChange({ target: { value: "How do I get started with a project?" } } as any)}
                  >
                    <div>
                      <div className="font-medium">How do I get started?</div>
                      <div className="text-sm text-muted-foreground">Learn about the process</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <Card className={`max-w-[80%] p-4 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border'
                }`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </Card>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <Card className="bg-card border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleFormSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me about services, pricing, or anything else..."
              className="flex-1 bg-background"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This AI assistant can help you learn about services and get started with your project.
          </p>
        </div>
      </div>
    </div>
  );
}