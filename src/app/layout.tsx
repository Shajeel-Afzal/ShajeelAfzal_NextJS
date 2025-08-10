import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PersonalWebsiteStructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { WebVitals } from "@/components/web-vitals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
  preload: true,
});

export const metadata: Metadata = {
  title: "Shajeel Afzal | Mobile App & AI Developer | Expert Chatbot Solutions",
  description: "Certified Mobile Apps Developer, AI Engineer & Chatbot Specialist. Transform your digital vision into reality with cutting-edge mobile apps, AI agents, and custom solutions.",
  keywords: [
    "mobile app developer",
    "AI developer",
    "chatbot developer",
    "React Native developer",
    "Flutter developer",
    "AI agent development",
    "custom software solutions",
    "Shajeel Afzal"
  ],
  authors: [{ name: "Shajeel Afzal" }],
  creator: "Shajeel Afzal",
  openGraph: {
    title: "Shajeel Afzal | Mobile App & AI Developer",
    description: "Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions that drive growth and innovation.",
    url: "https://shajeelafzal.com",
    siteName: "Shajeel Afzal Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shajeel Afzal | Mobile App & AI Developer",
    description: "Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions.",
    creator: "@shajeelafzal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonalWebsiteStructuredData />
        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical image */}
        <link rel="preload" as="image" href="/images/shajeel_afzal.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WebVitals />
        </ThemeProvider>
      </body>
    </html>
  );
}
