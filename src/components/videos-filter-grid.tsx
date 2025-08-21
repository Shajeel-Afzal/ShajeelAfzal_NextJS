"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, Filter, X, Grid, List, Loader2 } from "lucide-react";
import { youtubeAPI } from "@/lib/services/youtube-client.service";
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
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTotalResults, setSearchTotalResults] = useState(0);
  const [searchNextPageToken, setSearchNextPageToken] = useState<string | undefined>(undefined);
  const [isLoadingMoreSearch, setIsLoadingMoreSearch] = useState(false);
  
  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Helper function to parse view count strings like "1.2K views" or "12.5M views"
  const parseViewCount = useCallback((viewCount: string): number => {
    const numStr = viewCount.replace(/[^\d.KMB]/gi, '');
    const num = parseFloat(numStr);
    
    if (viewCount.includes('M')) {
      return num * 1000000;
    } else if (viewCount.includes('K')) {
      return num * 1000;
    } else if (viewCount.includes('B')) {
      return num * 1000000000;
    }
    
    return num || 0;
  }, []);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setIsSearchMode(false);
        setSearchResults([]);
        setSearchTotalResults(0);
        setSearchNextPageToken(undefined);
        return;
      }

      setIsSearching(true);
      setIsSearchMode(true);

      try {
        const result = await youtubeAPI.searchVideosWithPagination({
          query: debouncedSearchQuery,
          maxResults: 50
        });
        
        if (result) {
          setSearchResults(result.videos);
          setSearchTotalResults(result.totalResults);
          setSearchNextPageToken(result.nextPageToken);
        } else {
          setSearchResults([]);
          setSearchTotalResults(0);
          setSearchNextPageToken(undefined);
        }
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
        setSearchTotalResults(0);
        setSearchNextPageToken(undefined);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  // Load more search results
  const loadMoreSearchResults = async () => {
    if (!searchNextPageToken || isLoadingMoreSearch || !debouncedSearchQuery.trim()) return;

    setIsLoadingMoreSearch(true);
    
    try {
      const result = await youtubeAPI.searchVideosWithPagination({
        query: debouncedSearchQuery,
        maxResults: 50,
        pageToken: searchNextPageToken
      });
      
      if (result) {
        setSearchResults(prev => [...prev, ...result.videos]);
        setSearchNextPageToken(result.nextPageToken);
        setSearchTotalResults(result.totalResults);
      }
    } catch (error) {
      console.error('Failed to load more search results:', error);
    } finally {
      setIsLoadingMoreSearch(false);
    }
  };

  // Filter and sort videos
  const filteredAndSortedVideos = useMemo(() => {
    // Use search results when in search mode, otherwise use provided videos
    let filtered = isSearchMode ? searchResults : videos;

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
          const aViews = parseViewCount(a.viewCount);
          const bViews = parseViewCount(b.viewCount);
          return bViews - aViews;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [videos, searchResults, isSearchMode, selectedPlaylist, sortBy, parseViewCount]);

  const handleVideoPlay = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlaylist(null);
    setSortBy('latest');
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchTotalResults(0);
    setSearchNextPageToken(undefined);
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
  <div className="mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
          {isSearchMode && searchTotalResults > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {searchTotalResults} total
            </div>
          )}
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
            {isSearchMode && searchQuery ? (
              <>
                Search: &ldquo;{searchQuery}&rdquo; - {filteredAndSortedVideos.length} of {searchTotalResults} video{searchTotalResults !== 1 ? 's' : ''}
              </>
            ) : (
              <>
                {filteredAndSortedVideos.length} video{filteredAndSortedVideos.length !== 1 ? 's' : ''}
              </>
            )}
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
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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

      {/* Load More Search Results */}
      {isSearchMode && searchNextPageToken && !isLoadingMoreSearch && (
        <div className="flex justify-center py-8">
          <Button
            onClick={loadMoreSearchResults}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            Load More Results ({searchTotalResults - filteredAndSortedVideos.length} remaining)
          </Button>
        </div>
      )}

      {/* Loading More Search Results */}
      {isLoadingMoreSearch && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading more search results...
          </div>
        </div>
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
