"use client";

import { useState, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid, List, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VideosPaginationManager } from "@/components/videos-pagination-manager";
import { VideosFilterGrid } from "@/components/videos-filter-grid";
import { PlaylistSection } from "@/components/playlist-section";
import type { YouTubeVideo, YouTubePlaylist } from "@/types/youtube";

interface VideosTabsContentProps {
  initialVideos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  initialTotalResults: number;
  initialNextPageToken?: string;
  onVideoPlay?: (video: YouTubeVideo) => void;
}

export function VideosTabsContent({
  initialVideos,
  playlists,
  initialTotalResults,
  initialNextPageToken,
  onVideoPlay
}: VideosTabsContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'most-viewed'>('latest');

  const handleVideoPlay = (video: YouTubeVideo) => {
    if (onVideoPlay) {
      onVideoPlay(video);
    } else {
      window.open(video.watchUrl, '_blank');
    }
  };

  return (
    <Tabs defaultValue="videos" className="w-full">
      <div className="flex items-center justify-between mb-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="shorts">Shorts</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={(value: 'latest' | 'oldest' | 'most-viewed') => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
          
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
        </div>
      </div>

      <TabsContent value="videos">
        <Suspense fallback={<VideosFilterGrid videos={[]} playlists={[]} isLoading={true} />}>
          <VideosPaginationManager
            initialVideos={initialVideos}
            playlists={playlists}
            initialTotalResults={initialTotalResults}
            initialNextPageToken={initialNextPageToken}
            viewMode={viewMode}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />
        </Suspense>
      </TabsContent>

      <TabsContent value="playlists">
        <PlaylistSection 
          playlists={playlists}
          onVideoPlay={handleVideoPlay}
        />
      </TabsContent>

      <TabsContent value="shorts">
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold mb-4">Shorts Coming Soon</h3>
          <p className="text-muted-foreground">
            Quick bite-sized video content will be featured here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}