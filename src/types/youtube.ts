// YouTube API Types
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount?: number;
  embedUrl: string;
  watchUrl: string;
  playlistId?: string;
  tags: string[];
  categoryId: string;
  rawViewCount?: number; // For internal sorting purposes
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  videoCount: number;
  publishedAt: string;
  privacy: 'public' | 'private' | 'unlisted';
}

export interface YouTubeChannelInfo {
  id: string;
  title: string;
  description: string;
  customUrl?: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  subscriberCount: string;
  videoCount: number;
  viewCount: number;
  publishedAt: string;
}

export interface YouTubeApiResponse {
  videos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  totalResults: number;
  nextPageToken?: string;
  prevPageToken?: string;
}

// YouTube API Response Types (for proper typing of API responses)
export interface YouTubeAPIVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
      maxresdefault?: { url: string; width: number; height: number };
    };
    tags?: string[];
    categoryId: string;
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
  };
  contentDetails: {
    duration: string;
  };
}

export interface YouTubeAPISearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
      maxresdefault?: { url: string; width: number; height: number };
    };
  };
}

export interface YouTubeAPIPlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
      maxresdefault?: { url: string; width: number; height: number };
    };
  };
  contentDetails: {
    itemCount: number;
  };
  status: {
    privacyStatus: 'public' | 'private' | 'unlisted';
  };
}

export interface YouTubeAPIPlaylistVideoItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
      maxresdefault?: { url: string; width: number; height: number };
    };
  };
}

export interface YouTubeAPIChannelItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
      maxresdefault?: { url: string; width: number; height: number };
    };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
  brandingSettings?: {
    channel?: {
      title: string;
      description: string;
    };
  };
}

// API Response wrapper types
export interface YouTubeAPIResponse<T> {
  items: T[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
  prevPageToken?: string;
}
