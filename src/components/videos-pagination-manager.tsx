"use client";

import { useState } from "react";
import { VideosFilterGrid } from "./videos-filter-grid";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { youtubeAPI } from "@/lib/services/youtube-client.service";
import type { YouTubeVideo, YouTubePlaylist } from "@/types/youtube";

interface VideosPaginationManagerProps {
  initialVideos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  initialTotalResults: number;
  initialNextPageToken?: string;
  viewMode?: 'grid' | 'list';
  searchQuery?: string;
}

export function VideosPaginationManager({ 
  initialVideos, 
  playlists, 
  initialTotalResults,
  initialNextPageToken,
  viewMode = 'grid',
  searchQuery = ''
}: VideosPaginationManagerProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>(initialVideos);
  const [totalResults, setTotalResults] = useState(initialTotalResults);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(initialNextPageToken);
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const videosPerPage = 20;
  const totalPages = Math.ceil(totalResults / videosPerPage);
  const hasNextPage = !!nextPageToken;
  const hasPrevPage = currentPage > 1;

  // Load more videos (append to current list)
  const loadMoreVideos = async () => {
    if (!nextPageToken || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const data = await youtubeAPI.getChannelVideos({
        pageToken: nextPageToken,
        maxResults: videosPerPage
      });
      
      if (data) {
        setVideos(prev => [...prev, ...data.videos]);
        setNextPageToken(data.nextPageToken);
        setTotalResults(data.totalResults);
      }
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Navigate to specific page (replace current list)
  const navigateToPage = async (pageToken?: string, page?: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await youtubeAPI.getChannelVideos({
        maxResults: videosPerPage,
        pageToken: pageToken
      });
      
      if (data) {
        setVideos(data.videos);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setTotalResults(data.totalResults);
        setCurrentPage(page || 1);
        
        // Scroll to top when navigating pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error navigating to page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      navigateToPage(nextPageToken, currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (hasPrevPage) {
      navigateToPage(prevPageToken, currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    if (currentPage !== 1) {
      navigateToPage(undefined, 1);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Videos Grid */}
      <VideosFilterGrid 
        videos={videos} 
        playlists={playlists} 
        isLoading={isLoading}
        viewMode={viewMode}
        searchQuery={searchQuery}
        className=""
      />

      {/* Pagination Controls */}
      {totalResults > videosPerPage && (
        <div className="space-y-6">
          {/* Load More Button */}
          {hasNextPage && !isLoading && (
            <div className="flex justify-center">
              <Button
                onClick={loadMoreVideos}
                disabled={isLoadingMore}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading more videos...
                  </>
                ) : (
                  `Load More Videos`
                )}
              </Button>
            </div>
          )}

          {/* Page Navigation */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Page Info */}
            <div className="text-sm text-muted-foreground">
              Showing {Math.min((currentPage - 1) * videosPerPage + 1, totalResults)} - {Math.min(currentPage * videosPerPage, totalResults)} of {totalResults} videos
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={goToFirstPage}
                disabled={!hasPrevPage || isLoading}
                variant="outline"
                size="sm"
              >
                First
              </Button>
              
              <Button
                onClick={goToPrevPage}
                disabled={!hasPrevPage || isLoading}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2 px-3 py-1.5 text-sm">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                onClick={goToNextPage}
                disabled={!hasNextPage || isLoading}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State for Page Navigation */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading videos...
          </div>
        </div>
      )}
    </div>
  );
}
