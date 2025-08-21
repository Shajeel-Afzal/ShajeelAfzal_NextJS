"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { YouTubeVideo, YouTubePlaylist } from "@/types/youtube";

interface VideosFilterGridProps {
  videos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  isLoading?: boolean;
  className?: string;
}

type SortOption = 'latest' | 'oldest' | 'most-viewed' | 'alphabetical';
type ViewMode = 'grid' | 'list';

export function VideosFilterGrid({ videos, playlists, isLoading = false, className }: VideosFilterGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort videos
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = videos;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      );
    }

    // Filter by playlist
    if (selectedPlaylist) {
      filtered = filtered.filter(video => video.playlistId === selectedPlaylist);
    }

    // Sort videos
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'most-viewed':
          return parseInt(b.viewCount.replace(/[^\d]/g, '')) - parseInt(a.viewCount.replace(/[^\d]/g, ''));
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [videos, searchQuery, selectedPlaylist, sortBy]);

  const handleVideoPlay = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlaylist(null);
    setSortBy('latest');
  };

  const hasActiveFilters = searchQuery || selectedPlaylist || sortBy !== 'latest';

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Loading skeleton for filters */}
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="flex gap-2">
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        
        {/* Loading skeleton for video grid */}
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video animate-pulse rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-5 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="flex gap-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none border-r"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredAndSortedVideos.length} video{filteredAndSortedVideos.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t pt-4"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Playlist Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Playlist</label>
                  <select
                    value={selectedPlaylist || ''}
                    onChange={(e) => setSelectedPlaylist(e.target.value || null)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All Playlists</option>
                    {playlists.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>
                        {playlist.title} ({playlist.videoCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-viewed">Most Viewed</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      {filteredAndSortedVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-6xl">🎥</div>
          <h3 className="mb-2 text-lg font-semibold">No videos found</h3>
          <p className="mb-4 text-muted-foreground">
            {searchQuery || selectedPlaylist ? 
              "Try adjusting your search or filters" : 
              "No videos are available at the moment"}
          </p>
          {hasActiveFilters && (
            <Button onClick={handleClearFilters} variant="outline">
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <motion.div
          layout
          className={cn(
            "mx-auto grid gap-6",
            viewMode === 'grid' 
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 max-w-4xl"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard
                  video={video}
                  onPlay={handleVideoPlay}
                  className={viewMode === 'list' ? 'flex gap-4' : ''}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-16 right-0 z-20 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md hover:bg-neutral-900/70 dark:bg-neutral-100/50 dark:text-black dark:hover:bg-neutral-100/70"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="size-full rounded-2xl"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
          />
        </div>
      )}
    </div>
  );
}
