import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PersonalWebsiteStructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { WebVitals } from "@/components/web-vitals";
import { SiteHeader } from "@/components/site-header";
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
  metadataBase: new URL("https://shajeelafzal.com"),
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
  publisher: "Shajeel Afzal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Shajeel Afzal | Mobile App & AI Developer",
    description: "Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions that drive growth and innovation.",
    url: "https://shajeelafzal.com",
    siteName: "Shajeel Afzal Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/shajeel_afzal.png",
        width: 1200,
        height: 630,
        alt: "Shajeel Afzal - Mobile App & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shajeel Afzal | Mobile App & AI Developer",
    description: "Expert Mobile Apps Developer, AI Engineer & Chatbot Specialist helping businesses build cutting-edge solutions.",
    creator: "@shajeelafzal",
    images: ["/images/shajeel_afzal.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://shajeelafzal.com",
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
        {/* Meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/images/shajeel_afzal.png" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
          <SiteHeader />
          {children}
          <WebVitals />
        </ThemeProvider>
      </body>
    </html>
  );
}
