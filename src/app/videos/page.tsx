import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { youtubeService } from "@/lib/services/youtube.service";
import { VideosTabsContent } from "@/components/videos-tabs-content";

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
    <PageContainer className="py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-6">
          Explore My Latest{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold">
            Video Tutorials
          </span>{" "}
          📺 & Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Watch practical videos on mobile apps, AI integrations, and modern web development.
        </p>
      </div>

      <VideosTabsContent 
        initialVideos={videosResponse.videos}
        playlists={playlists}
        initialTotalResults={videosResponse.totalResults}
        initialNextPageToken={videosResponse.nextPageToken}
      />
    </PageContainer>
  );
}