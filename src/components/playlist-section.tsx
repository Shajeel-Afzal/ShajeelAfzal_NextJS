"use client";

import { useState, useEffect, useDeferredValue, startTransition } from "react";
import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { YouTubePlaylist, YouTubeVideo } from "@/types/youtube";
import { VideoCard } from "./video-card";
import { Marquee } from "./magicui/marquee";
import { youtubeAPI } from "@/lib/services/youtube-client.service";
import { playlistCache } from "@/lib/cache/client-cache.service";

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
  // Initialize with empty state to prevent blocking
  const [playlistsWithVideos, setPlaylistsWithVideos] = useState<PlaylistWithVideos[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [isProcessingCache, setIsProcessingCache] = useState(true);
  
  // Use deferred value for non-critical updates
  const deferredPlaylists = useDeferredValue(playlistsWithVideos);

  // Initialize playlists with cached data asynchronously
  useEffect(() => {
    // Prevent unnecessary initialization during development hot reloads
    const isDevelopment = process.env.NODE_ENV === 'development';
    const lastInit = isDevelopment ? ((window as unknown) as { __lastPlaylistInit?: number }).__lastPlaylistInit : 0;
    const hasRecentlyInitialized = lastInit && Date.now() - lastInit < 2000;
    
    if (isDevelopment && hasRecentlyInitialized) {
      setIsProcessingCache(false);
      return;
    }
    
    // Process cache in a non-blocking way
    const initializeWithCache = async () => {
      // Use setTimeout to defer execution and prevent blocking
      await new Promise(resolve => setTimeout(resolve, 0));
      
      startTransition(() => {
        // Clean expired cache entries asynchronously (throttled)
        playlistCache.cleanExpired();
        
        // Sort initially by video count and check cache
        const initialPlaylists = playlists
          .sort((a, b) => b.videoCount - a.videoCount)
          .map(playlist => {
            const cacheKey = `playlist-videos-${playlist.id}`;
            const cachedVideos = playlistCache.get<YouTubeVideo[]>(cacheKey);
            
            return {
              ...playlist,
              videos: cachedVideos || [],
              isLoading: !cachedVideos // Only show loading if not cached
            };
          });
        
        setPlaylistsWithVideos(initialPlaylists);
        setIsProcessingCache(false);
        
        // Mark initialization timestamp for development
        if (isDevelopment) {
          ((window as unknown) as { __lastPlaylistInit?: number }).__lastPlaylistInit = Date.now();
        }
      });
    };
    
    initializeWithCache();
  }, [playlists]);

  // Fetch videos for playlists with batching and rate limiting
  useEffect(() => {
    // Skip if already initialized or still processing cache
    if (hasInitialized || isProcessingCache) {
      return;
    }
    
    const fetchPlaylistVideos = async () => {
      // Only fetch top 10 playlists initially (by video count)
      const topPlaylists = playlists
        .sort((a, b) => b.videoCount - a.videoCount)
        .slice(0, 10); // Limit to top 10 playlists
      
      const playlistsToFetch = topPlaylists.filter(playlist => {
        const cacheKey = `playlist-videos-${playlist.id}`;
        return !playlistCache.get<YouTubeVideo[]>(cacheKey);
      });

      if (playlistsToFetch.length === 0) {
        setHasInitialized(true);
        return;
      }

      // Show loading indicator
      setIsLoading(true);
      setLoadingCount(playlistsToFetch.length);

      // Batch requests to avoid overwhelming the API (2 concurrent requests max)
      const BATCH_SIZE = 2;
      const fetchResults: Array<{playlistId: string; videos: YouTubeVideo[]; error: unknown}> = [];
      
      for (let i = 0; i < playlistsToFetch.length; i += BATCH_SIZE) {
        const batch = playlistsToFetch.slice(i, i + BATCH_SIZE);
        
        const batchPromises = batch.map(async (playlist) => {
          const cacheKey = `playlist-videos-${playlist.id}`;
          
          try {
            // Only fetch 5 videos per playlist to reduce API usage
            const response = await youtubeAPI.getPlaylistVideos(playlist.id, 5);
            const videos = response?.videos || [];
            
            // Cache the result for 30 minutes (longer cache)
            playlistCache.set(cacheKey, videos, 30 * 60 * 1000);
            
            return {
              playlistId: playlist.id,
              videos,
              error: null
            };
          } catch (error) {
            console.error(`Error fetching videos for playlist ${playlist.id}:`, error);
            return {
              playlistId: playlist.id,
              videos: [],
              error
            };
          }
        });

        // Wait for current batch to complete
        const batchResults = await Promise.all(batchPromises);
        fetchResults.push(...batchResults);
        
        // Add delay between batches to respect API rate limits
        if (i + BATCH_SIZE < playlistsToFetch.length) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
      }
      
      // Update only the playlists that were fetched
      setPlaylistsWithVideos(prev => {
        const updated = prev.map(playlist => {
          const fetchResult = fetchResults.find(result => result.playlistId === playlist.id);
          if (fetchResult) {
            return {
              ...playlist,
              videos: fetchResult.videos,
              isLoading: false
            };
          }
          return playlist;
        });
        
        // Sort by video count after updating
        return updated.sort((a, b) => b.videoCount - a.videoCount);
      });
      
      setIsLoading(false);
      setHasInitialized(true);
    };

    fetchPlaylistVideos();
  }, [playlists, hasInitialized, isProcessingCache]);

  // Lazy load remaining playlists on user interaction
  const loadMorePlaylists = async () => {
    const remainingPlaylists = playlists
      .slice(10) // Skip top 10 already loaded
      .filter(playlist => {
        const cacheKey = `playlist-videos-${playlist.id}`;
        return !playlistCache.get<YouTubeVideo[]>(cacheKey);
      })
      .slice(0, 5); // Load next 5 playlists

    if (remainingPlaylists.length === 0) return;

    setIsLoading(true);
    setLoadingCount(remainingPlaylists.length);

    // Batch process remaining playlists
    for (const playlist of remainingPlaylists) {
      const cacheKey = `playlist-videos-${playlist.id}`;
      
      try {
        const response = await youtubeAPI.getPlaylistVideos(playlist.id, 5);
        const videos = response?.videos || [];
        
        playlistCache.set(cacheKey, videos, 30 * 60 * 1000);
        
        // Update state for this playlist
        setPlaylistsWithVideos(prev => prev.map(p => 
          p.id === playlist.id 
            ? { ...p, videos, isLoading: false }
            : p
        ));
        
        // Add delay between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error fetching videos for playlist ${playlist.id}:`, error);
      }
    }

    setIsLoading(false);
  };


  const handleViewAllPlaylist = (playlistId: string) => {
    // Navigate to playlist page or show all videos
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  };

  // Calculate marquee duration based on number of videos (very slow animation)
  const getMarqueeDuration = (videoCount: number) => {
    // Base duration of 80s, increased by 15s for each additional video beyond 3
    return Math.max(80, 80 + (videoCount - 3) * 15);
  };

  // Show processing state while initializing
  if (isProcessingCache) {
    return (
      <div className={cn("space-y-12", className)}>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading playlists...</span>
          </div>
        </div>
      </div>
    );
  }

  if (deferredPlaylists.length === 0) {
    return null;
  }

  // Calculate if there are more playlists to load
  const hasMorePlaylists = playlists.length > 10 && deferredPlaylists.filter(p => p.videos.length > 0).length < Math.min(15, playlists.length);

  return (
    <div className={cn("space-y-12", className)} data-testid="playlist-section">
      {/* Non-blocking loading indicator */}
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-center py-4"
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading {loadingCount} playlist{loadingCount !== 1 ? 's' : ''}...</span>
          </div>
        </motion.div>
      )}
      
      <div className="space-y-10">
        {deferredPlaylists
          .filter(playlist => playlist.videos.length > 0 || playlist.isLoading) // Only show playlists with videos or loading
          .map((playlist, index) => (
          <div key={playlist.id} className="space-y-4">
            {/* Playlist Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted relative">
                    <Image
                      src={playlist.thumbnail.url}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                      sizes="64px"
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
                    reverse={index % 2 === 1} // Alternate direction for odd-indexed playlists
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

      {/* Load More Button */}
      {hasMorePlaylists && !isLoading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMorePlaylists}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Load More Playlists
          </button>
        </div>
      )}
    </div>
  );
}