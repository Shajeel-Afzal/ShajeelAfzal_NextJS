"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { YouTubeVideo, YouTubePlaylist } from "@/types/youtube";
import { PlaylistSection } from "./playlist-section";
import { VideosTabsContent } from "./videos-tabs-content";

interface VideosPageClientProps {
  initialVideos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  initialTotalResults: number;
  initialNextPageToken?: string;
}

export function VideosPageClient({
  initialVideos,
  playlists,
  initialTotalResults,
  initialNextPageToken
}: VideosPageClientProps) {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const handleVideoPlay = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  return (
    <>      
      {/* Videos Tabs Section */}
      <VideosTabsContent 
        initialVideos={initialVideos}
        playlists={playlists}
        initialTotalResults={initialTotalResults}
        initialNextPageToken={initialNextPageToken}
        onVideoPlay={handleVideoPlay}
      />

      {/* Global Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                setSelectedVideo(null);
              }
            }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}