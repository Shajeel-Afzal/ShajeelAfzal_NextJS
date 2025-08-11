"use client";

import React, { forwardRef, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
// Removed Lucide icons, using Icons from icons.tsx instead
import { Icons } from "@/components/icons";

// Circle component for animated beam nodes
const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

// ChatBot Animated Beam Component
function ChatBotAnimatedBeam({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const openaiRef = useRef<HTMLDivElement>(null);
    // Chat app refs
    const whatsappRef = useRef<HTMLDivElement>(null);
    const messengerRef = useRef<HTMLDivElement>(null);
    const telegramRef = useRef<HTMLDivElement>(null);
    // Service refs
    const googleDriveRef = useRef<HTMLDivElement>(null);
    const googleDocsRef = useRef<HTMLDivElement>(null);
    const notionRef = useRef<HTMLDivElement>(null);
    const googleRef = useRef<HTMLDivElement>(null);
    const githubRef = useRef<HTMLDivElement>(null);

    // List of chat apps for mapping
    // Use size-12 for all, matching services, and consistent icon size
    const chatApps = [
        { ref: whatsappRef, icon: Icons.whatsapp, className: "size-12 bg-green-50 border-green-200", iconClass: "w-8 h-8 text-green-600" },
        { ref: messengerRef, icon: Icons.messenger, className: "size-12 bg-blue-50 border-blue-200", iconClass: "w-8 h-8 text-blue-600" },
        { ref: telegramRef, icon: Icons.telegram, className: "size-12 bg-sky-50 border-sky-200", iconClass: "w-8 h-8 text-sky-600" },
    ];
    // List of services for mapping
    const mailRef = useRef<HTMLDivElement>(null);
    const excelRef = useRef<HTMLDivElement>(null);
    const services = [
        { ref: googleDriveRef, icon: Icons.googleDrive, className: "size-12 bg-yellow-50 border-yellow-200", iconClass: "w-8 h-8 text-yellow-600" },
        { ref: googleDocsRef, icon: Icons.googleDocs, className: "size-12 bg-blue-50 border-blue-200", iconClass: "w-8 h-8 text-blue-600" },
        { ref: notionRef, icon: Icons.notion, className: "size-12 bg-black border-gray-700", iconClass: "w-8 h-8 text-white" },
        { ref: googleRef, icon: Icons.google, className: "size-12 bg-red-50 border-red-200", iconClass: "w-8 h-8 text-red-600" },
        { ref: githubRef, icon: Icons.gitHub, className: "size-12 bg-gray-100 border-gray-300", iconClass: "w-8 h-8 text-gray-800" },
        { ref: mailRef, icon: Icons.mail, className: "size-12 bg-rose-50 border-rose-200", iconClass: "w-8 h-8 text-rose-600" },
        { ref: excelRef, icon: Icons.excel, className: "size-12 bg-green-50 border-green-200", iconClass: "w-8 h-8 text-green-700" },
    ];

    return (
        <div
            className={cn(
                "relative flex h-[420px] w-full items-center justify-center overflow-hidden",
                className,
            )}
            ref={containerRef}
        >
            <div className="flex size-full max-w-4xl flex-row items-stretch justify-between gap-16">
                {/* User */}
                <div className="flex flex-col justify-center">
                    <Circle ref={userRef} className="bg-blue-50 border-blue-200">
                        <Icons.user className="w-6 h-6 text-blue-600" />
                    </Circle>
                </div>

                {/* Chat Apps */}
                <div className="flex flex-col justify-center gap-8">
                    {chatApps.map(({ ref, icon: Icon, className, iconClass }, idx) => (
                        <Circle key={idx} ref={ref} className={className}>
                            <Icon className={iconClass} />
                        </Circle>
                    ))}
                </div>

                {/* OpenAI (Center Hub) inside a vertical card */}
                <div className="flex flex-col justify-center">
                    <div ref={openaiRef} className="bg-card border border-border rounded-xl p-4 w-28 h-44 flex items-center justify-center shadow-sm">
                        <div className="flex flex-col items-center gap-3">
                            <Circle className="size-14 bg-green-50 border-green-200">
                                <Icons.openai className="w-7 h-7 text-green-600" />
                            </Circle>
                            <Circle className="size-14 bg-orange-50 border-orange-200">
                                <Icons.anthropic className="w-7 h-7 text-orange-600" />
                            </Circle>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="flex flex-col justify-center gap-3">
                    {services.map(({ ref, icon: Icon, className, iconClass }, idx) => (
                        <Circle key={idx} ref={ref} className={className}>
                            <Icon className={iconClass} />
                        </Circle>
                    ))}
                </div>
            </div>

            {/* AnimatedBeams - User to each Chat App */}
            {chatApps.map(({ ref }, idx) => (
                <AnimatedBeam
                    key={`user-to-chatapp-${idx}`}
                    containerRef={containerRef}
                    fromRef={userRef}
                    toRef={ref}
                    duration={2.5 + idx * 0.3}
                    delay={idx * 0.2}
                    pathColor="rgb(59 130 246)"
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#2563eb"
                />
            ))}

            {/* AnimatedBeams - Chat Apps to OpenAI */}
            {chatApps.map(({ ref }, idx) => (
                <AnimatedBeam
                    key={`chatapp-to-openai-${idx}`}
                    containerRef={containerRef}
                    fromRef={ref}
                    toRef={openaiRef}
                    duration={2.8 + idx * 0.3}
                    delay={0.5 + idx * 0.2}
                    pathColor="rgb(34 197 94)"
                    gradientStartColor="#22c55e"
                    gradientStopColor="#16a34a"
                    toEdge
                />
            ))}

            {/* AnimatedBeams - OpenAI to each Service */}
            {services.map(({ ref }, idx) => (
                <AnimatedBeam
                    key={`openai-to-service-${idx}`}
                    containerRef={containerRef}
                    fromRef={openaiRef}
                    toRef={ref}
                    duration={3 + idx * 0.3}
                    delay={1 + idx * 0.3}
                    pathColor="rgb(251 191 36)"
                    gradientStartColor="#fde68a"
                    gradientStopColor="#fbbf24"
                    fromEdge
                />
            ))}
        </div>
    );
}

// Minimal services tabs using the same visual style as tabs-06
export default function ServicesTabs() {
    const entries = Object.entries(services);
    if (entries.length === 0) return null;

    // AI tools icons for orbiting animation (using Icons from icons.tsx)
    const aiIcons = [
        { icon: Icons.openai, className: "w-6 h-6 text-green-600 bg-background border border-green-200 rounded-full p-1" },
        { icon: Icons.user, className: "w-6 h-6 text-blue-600 bg-background border border-blue-200 rounded-full p-1" },
        { icon: Icons.googleDrive, className: "w-6 h-6 text-yellow-600 bg-background border border-yellow-200 rounded-full p-1" },
        { icon: Icons.googleDocs, className: "w-6 h-6 text-blue-600 bg-background border border-blue-200 rounded-full p-1" },
        { icon: Icons.whatsapp, className: "w-6 h-6 text-green-600 bg-background border border-green-200 rounded-full p-1" },
    ];

    const aiIconsInner = [
        { icon: Icons.settings, className: "w-5 h-5 text-orange-500 bg-background border border-orange-500/20 rounded-full p-1" },
        { icon: Icons.help, className: "w-5 h-5 text-purple-500 bg-background border border-purple-500/20 rounded-full p-1" },
    ];

    const renderVisualContent = (key: string, svc: any) => {
        if (key === 'ai-agents') {
            return (
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <OrbitingCircles
                        className="size-8"
                        duration={20}
                        delay={0}
                        radius={120}
                        iconSize={32}
                    >
                        {aiIcons.map(({ icon: Icon, className }, index) => (
                            <div key={index} className={className}>
                                <Icon className="w-4 h-4" />
                            </div>
                        ))}
                    </OrbitingCircles>

                    <OrbitingCircles
                        className="size-6"
                        duration={15}
                        delay={5}
                        radius={60}
                        reverse
                        iconSize={24}
                    >
                        {aiIconsInner.map(({ icon: Icon, className }, index) => (
                            <div key={index} className={className}>
                                <Icon className="w-3 h-3" />
                            </div>
                        ))}
                    </OrbitingCircles>

                    {/* Center AI OpenAI icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center">
                            <Icons.openai className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>
            );
        }

        if (key === 'chatbots') {
            return (
                <div className="w-full max-w-4xl flex items-center justify-center">
                    <ChatBotAnimatedBeam />
                </div>
            );
        }

        // Default placeholder for other services
        const MainIcon = svc.icon;
        return (
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <MainIcon className="w-16 h-16 text-primary mx-auto" />
                    <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground">
                            {svc.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Visual representation coming soon
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="mb-16">
                <div className="mb-4">
                    <AnimatedShinyText className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Services That Drive Innovation
                    </AnimatedShinyText>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                    Comprehensive technology solutions designed to transform your business and accelerate growth through cutting-edge development
                </p>
            </div>
            <Tabs defaultValue={entries[0][0]} className="w-full">
                <TabsList className="w-full h-12 md:h-14 p-0 bg-background justify-start border-b border-b-border rounded-none overflow-x-auto overflow-y-visible no-scrollbar">
                    {entries.map(([key, svc]) => {
                        const Icon = svc.icon;
                        return (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:border-b-background -mb-[2px] rounded-t data-[state=active]:text-primary dark:data-[state=active]:text-primary px-3 md:px-4"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Icon className="size-4 text-current" />
                                    <span className="whitespace-nowrap font-sans text-current">{svc.title}</span>
                                </span>
                            </TabsTrigger>
                        )
                    })}
                </TabsList>

                {entries.map(([key, svc]) => {
                    const MainIcon = svc.icon;
                    return (
                        <TabsContent key={key} value={key} className="mt-6">
                            <MagicCard className="rounded-xl hover:shadow-lg transition-all duration-300">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8">
                                    {/* Left side - Content */}
                                    <div className="space-y-6">
                                        {/* Header with icon and title */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                                <MainIcon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground">
                                                {svc.title}
                                            </h3>
                                        </div>

                                        {/* Main description */}
                                        <p className="text-muted-foreground text-base leading-relaxed">
                                            {svc.description}
                                        </p>

                                        {/* Sub-services list */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                                What's Included:
                                            </h4>
                                            <ul className="space-y-2">
                                                {svc.subcategories.map((subcategory, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <div className="flex items-center justify-center w-5 h-5 bg-primary/20 rounded-full mt-0.5 flex-shrink-0">
                                                            <div className="w-2 h-2 bg-primary rounded-full" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-foreground">
                                                                {subcategory.title}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {subcategory.description}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* CTA Button */}
                                        <Button
                                            variant="default"
                                            size="lg"
                                            className="w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base font-semibold"
                                        >
                                            Let's Chat 💬
                                        </Button>
                                    </div>

                                    {/* Right side - Visual/Image placeholder */}
                                    <div className="flex items-center justify-center">
                                        {renderVisualContent(key, svc)}
                                    </div>
                                </div>
                            </MagicCard>
                        </TabsContent>
                    );
                })}
            </Tabs>
        </section>
    );
}
