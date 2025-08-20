import type { Metadata } from "next";
import { youtubeService } from "@/lib/youtube-api";
import { VideoGrid } from "@/components/video-grid";

export const metadata: Metadata = {
  title: "Videos | Shajeel Afzal - Mobile App & AI Developer",
  description: "Watch my latest tutorials on mobile app development, AI integration, and modern web technologies. Learn React Native, Flutter, Next.js, and AI development through practical examples.",
  keywords: [
    "video tutorials",
    "mobile app development videos",
    "React Native tutorials",
    "Flutter tutorials",
    "AI development videos",
    "chatbot tutorials",
    "Next.js tutorials",
    "programming tutorials",
    "Shajeel Afzal videos"
  ],
  openGraph: {
    title: "Video Tutorials | Shajeel Afzal",
    description: "Watch comprehensive tutorials on mobile app development, AI integration, and modern web technologies.",
    url: "https://shajeelafzal.com/videos",
    type: "website",
    images: [
      {
        url: "/images/videos-og.png", // This would be created later
        width: 1200,
        height: 630,
        alt: "Shajeel Afzal Video Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Tutorials | Shajeel Afzal",
    description: "Watch comprehensive tutorials on mobile app development, AI integration, and modern web technologies.",
    images: ["/images/videos-og.png"],
  },
  alternates: {
    canonical: "https://shajeelafzal.com/videos",
  },
};

export default async function VideosPage() {
  // Fetch videos and playlists on the server
  const { videos, playlists } = await youtubeService.getChannelVideos(20);

  return (
    <main className="min-h-screen py-20" id="main-content">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Video Tutorials
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Learn mobile app development, AI integration, and modern web technologies 
            through comprehensive tutorials and practical examples.
          </p>
        </div>

        {/* Videos Grid */}
        <VideoGrid videos={videos} playlists={playlists} />

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-primary/10 to-blue-600/10 p-8">
            <h2 className="mb-4 text-2xl font-bold">
              Want a Custom Tutorial?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Need a specific tutorial for your project or learning goals? 
              I create custom educational content and offer one-on-one mentoring sessions.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="#consultation"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Book Consultation
              </a>
              <a
                href="https://youtube.com/@shajeelafzal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}