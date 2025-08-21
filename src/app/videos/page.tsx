import type { Metadata } from "next";
import { Suspense } from "react";
import { youtubeService } from "@/lib/services/youtube.service";
import { VideosPaginationManager } from "@/components/videos-pagination-manager";
import { VideosFilterGrid } from "@/components/videos-filter-grid";

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
  // Fetch initial data on the server
  const [videosResponse, playlists] = await Promise.all([
    youtubeService.getChannelVideos({ maxResults: 20 }),
    youtubeService.getChannelPlaylists()
  ]);

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Videos</h1>
        <p className="text-lg text-muted-foreground">
          Explore my latest content, tutorials, and insights from my YouTube channel.
        </p>
      </div>

      <Suspense fallback={<VideosFilterGrid videos={[]} playlists={[]} isLoading={true} />}>
        <VideosPaginationManager
          initialVideos={videosResponse.videos}
          playlists={playlists}
          initialTotalResults={videosResponse.totalResults}
          initialNextPageToken={videosResponse.nextPageToken}
        />
      </Suspense>
    </div>
  );
}