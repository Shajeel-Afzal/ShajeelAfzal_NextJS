"use client";

import { useState, useEffect } from "react";
import { Play, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { YouTubePlaylist, YouTubeVideo } from "@/types/youtube";
import { VideoCard } from "./video-card";
import { Marquee } from "./magicui/marquee";
import { youtubeAPI } from "@/lib/services/youtube-client.service";

interface PlaylistSectionProps {
  playlists: YouTubePlaylist[];
  onVideoPlay: (video: YouTubeVideo) => void;
  className?: string;
}

interface PlaylistWithVideos extends YouTubePlaylist {
  videos: YouTubeVideo[];
  isLoading: boolean;
}

export function PlaylistSection({ playlists, onVideoPlay, className }: PlaylistSectionProps) {
  const [playlistsWithVideos, setPlaylistsWithVideos] = useState<PlaylistWithVideos[]>(
    // Sort initially by video count (stable sort available immediately)
    playlists
      .sort((a, b) => b.videoCount - a.videoCount)
      .map(playlist => ({
        ...playlist,
        videos: [],
        isLoading: true
      }))
  );

  // Fetch videos for each playlist
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      // Fetch all playlists in parallel for better performance
      const playlistPromises = playlists.map(async (playlist) => {
        try {
          const response = await youtubeAPI.getPlaylistVideos(playlist.id, 10);
          return {
            ...playlist,
            videos: response?.videos || [],
            isLoading: false
          };
        } catch (error) {
          console.error(`Error fetching videos for playlist ${playlist.id}:`, error);
          return {
            ...playlist,
            videos: [],
            isLoading: false
          };
        }
      });

      // Wait for all playlists to load, then sort by video count (stable and efficient)
      const loadedPlaylists = await Promise.all(playlistPromises);
      const sortedPlaylists = loadedPlaylists.sort((a, b) => b.videoCount - a.videoCount);
      
      setPlaylistsWithVideos(sortedPlaylists);
    };

    fetchPlaylistVideos();
  }, [playlists]);


  const handleViewAllPlaylist = (playlistId: string) => {
    // Navigate to playlist page or show all videos
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  };

  // Calculate marquee duration based on number of videos (slower animation)
  const getMarqueeDuration = (videoCount: number) => {
    // Base duration of 40s, increased by 8s for each additional video beyond 3
    return Math.max(40, 40 + (videoCount - 3) * 8);
  };

  if (playlistsWithVideos.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-12", className)}>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Playlists
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Curated collections of videos organized by topic and technology
        </p>
      </div>

      <div className="space-y-10">
        {playlistsWithVideos.map((playlist) => (
          <div key={playlist.id} className="space-y-4">
            {/* Playlist Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={playlist.thumbnail.url}
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    {playlist.videoCount} videos
                    {playlist.videos.length > 0 && (
                      <>
                        <span>•</span>
                        <Eye className="w-4 h-4" />
                        Total views: {playlist.videos.reduce((sum, video) => sum + (video.rawViewCount || 0), 0).toLocaleString()}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                {/* View All Button */}
                <button
                  onClick={() => handleViewAllPlaylist(playlist.id)}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Videos Container */}
            <div className="relative">
              {playlist.isLoading ? (
                <div className="flex space-x-4 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-80 h-48 bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : playlist.videos.length > 0 ? (
                <div className="overflow-hidden">
                  <Marquee
                    className={`[--duration:${getMarqueeDuration(playlist.videos.length)}s]`}
                    pauseOnHover
                    style={{
                      '--duration': `${getMarqueeDuration(playlist.videos.length)}s`
                    } as React.CSSProperties}
                  >
                    {playlist.videos.map((video) => (
                      <div key={video.id} className="flex-shrink-0 w-80 mr-4">
                        <VideoCard
                          video={video}
                          onPlay={onVideoPlay}
                          className="h-full"
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No videos found in this playlist</p>
                </div>
              )}
            </div>

            {/* Playlist Description */}
            {playlist.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 max-w-4xl">
                {playlist.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}