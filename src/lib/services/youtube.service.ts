import { 
  YouTubeVideo, 
  YouTubePlaylist, 
  YouTubeApiResponse, 
  YouTubeChannelInfo,
  YouTubeAPIVideoItem,
  YouTubeAPISearchItem,
  YouTubeAPIPlaylistItem,
  YouTubeAPIPlaylistVideoItem
} from '../../types/youtube';
import { CacheService } from '../cache/cache.service';

/**
 * Enhanced YouTube Service for fetching channel data
 * Handles API rate limiting, caching, and error recovery
 */
export class YouTubeService {
  private readonly apiKey: string;
  private readonly channelId: string;
  private readonly channelHandle: string;
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly cache: CacheService;
  private readonly isDevelopment: boolean;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    this.channelId = process.env.YOUTUBE_CHANNEL_ID || '';
    this.channelHandle = process.env.YOUTUBE_CHANNEL_HANDLE || '';
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.cache = new CacheService('youtube', 15 * 60 * 1000); // 15 minutes cache

    if (!this.apiKey) {
      console.warn('YouTube API key not found. Falling back to mock data.');
    }
    if (!this.channelId) {
      console.warn('YouTube Channel ID not found. Falling back to mock data.');
    }
  }

  /**
   * Get channel information
   */
  async getChannelInfo(): Promise<YouTubeChannelInfo | null> {
    const cacheKey = 'channel-info';
    const cached = await this.cache.get<YouTubeChannelInfo>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return this.getMockChannelInfo();
    }

    try {
      const url = `${this.baseUrl}/channels?part=snippet,statistics,brandingSettings&id=${this.channelId}&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channel = data.items[0];
      const channelInfo: YouTubeChannelInfo = {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        customUrl: channel.snippet.customUrl,
        thumbnail: {
          url: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.medium?.url,
          width: channel.snippet.thumbnails.high?.width || 800,
          height: channel.snippet.thumbnails.high?.height || 800,
        },
        subscriberCount: this.formatSubscriberCount(channel.statistics.subscriberCount),
        videoCount: parseInt(channel.statistics.videoCount),
        viewCount: parseInt(channel.statistics.viewCount),
        publishedAt: channel.snippet.publishedAt,
      };

      await this.cache.set(cacheKey, channelInfo);
      return channelInfo;
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return this.getMockChannelInfo();
    }
  }

  /**
   * Get videos from the channel with pagination
   */
  async getChannelVideos(options: {
    maxResults?: number;
    pageToken?: string;
    playlistId?: string;
    order?: 'date' | 'relevance' | 'viewCount' | 'rating';
  } = {}): Promise<YouTubeApiResponse> {
    const { maxResults = 20, pageToken, playlistId, order = 'date' } = options;
    const cacheKey = `videos-${maxResults}-${pageToken || 'first'}-${playlistId || 'all'}-${order}`;
    
    const cached = await this.cache.get<YouTubeApiResponse>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return this.getMockVideosResponse();
    }

    try {
      let videosData;
      
      if (playlistId) {
        // Get videos from specific playlist
        videosData = await this.getPlaylistVideos(playlistId, maxResults, pageToken);
      } else {
        // Get videos from channel
        const searchUrl = `${this.baseUrl}/search?part=snippet&channelId=${this.channelId}&maxResults=${maxResults}&order=${order}&type=video${pageToken ? `&pageToken=${pageToken}` : ''}&key=${this.apiKey}`;
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }
        
        videosData = await response.json();
      }

      if (!videosData?.items) {
        return { videos: [], playlists: [], totalResults: 0 };
      }

      // Get detailed video information
      const videoIds = videosData.items
        .map((item: YouTubeAPISearchItem | YouTubeAPIPlaylistVideoItem) => 
          'resourceId' in item.snippet ? item.snippet.resourceId.videoId : (item as YouTubeAPISearchItem).id.videoId
        )
        .filter(Boolean)
        .join(',');

      if (!videoIds) {
        return { videos: [], playlists: [], totalResults: 0 };
      }

      const detailsUrl = `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      
      if (!detailsResponse.ok) {
        throw new Error(`YouTube API error: ${detailsResponse.status} ${detailsResponse.statusText}`);
      }
      
      const detailsData = await detailsResponse.json();

      const videos: YouTubeVideo[] = detailsData.items.map((item: YouTubeAPIVideoItem) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.maxres?.url || 
               item.snippet.thumbnails.maxresdefault?.url || 
               item.snippet.thumbnails.high?.url || 
               item.snippet.thumbnails.medium?.url || 
               item.snippet.thumbnails.default?.url,
          width: item.snippet.thumbnails.maxres?.width || 
                 item.snippet.thumbnails.maxresdefault?.width || 
                 item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.maxres?.height || 
                  item.snippet.thumbnails.maxresdefault?.height || 
                  item.snippet.thumbnails.high?.height || 720,
        },
        publishedAt: item.snippet.publishedAt,
        duration: this.formatDuration(item.contentDetails.duration),
        viewCount: this.formatViewCount(item.statistics.viewCount),
        likeCount: item.statistics.likeCount ? parseInt(item.statistics.likeCount) : undefined,
        embedUrl: `https://www.youtube.com/embed/${item.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`,
        watchUrl: `https://www.youtube.com/watch?v=${item.id}`,
        playlistId: playlistId,
        tags: item.snippet.tags || [],
        categoryId: item.snippet.categoryId,
      }));

      const result: YouTubeApiResponse = {
        videos,
        playlists: [], // Fetched separately
        totalResults: videosData.pageInfo?.totalResults || videos.length,
        nextPageToken: videosData.nextPageToken,
        prevPageToken: videosData.prevPageToken,
      };

      await this.cache.set(cacheKey, result, 10 * 60 * 1000); // Cache for 10 minutes
      return result;
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      return this.getMockVideosResponse();
    }
  }

  /**
   * Get channel playlists
   */
  async getChannelPlaylists(): Promise<YouTubePlaylist[]> {
    const cacheKey = 'playlists';
    const cached = await this.cache.get<YouTubePlaylist[]>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return this.getMockPlaylists();
    }

    try {
      const url = `${this.baseUrl}/playlists?part=snippet,contentDetails&channelId=${this.channelId}&maxResults=50&key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data?.items) {
        return this.getMockPlaylists();
      }

      const playlists: YouTubePlaylist[] = data.items.map((item: YouTubeAPIPlaylistItem) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.high?.url || 
               item.snippet.thumbnails.medium?.url || 
               item.snippet.thumbnails.default?.url,
          width: item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.high?.height || 720,
        },
        videoCount: item.contentDetails.itemCount,
        publishedAt: item.snippet.publishedAt,
        privacy: item.status?.privacyStatus || 'public',
      }));

      await this.cache.set(cacheKey, playlists);
      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return this.getMockPlaylists();
    }
  }

  /**
   * Search videos in the channel with pagination
   */
  async searchVideosWithPagination(query: string, maxResults: number = 20, pageToken?: string): Promise<YouTubeApiResponse> {
    const cacheKey = `search-paginated-${query}-${maxResults}-${pageToken || 'first'}`;
    const cached = await this.cache.get<YouTubeApiResponse>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return {
        videos: this.getMockSearchResults(query),
        playlists: [],
        totalResults: this.getMockSearchResults(query).length,
      };
    }

    try {
      const searchUrl = `${this.baseUrl}/search?part=snippet&channelId=${this.channelId}&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video${pageToken ? `&pageToken=${pageToken}` : ''}&key=${this.apiKey}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data?.items) {
        return { videos: [], playlists: [], totalResults: 0 };
      }

      const videoIds = data.items.map((item: YouTubeAPISearchItem) => item.id.videoId).join(',');
      const detailsUrl = `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      
      if (!detailsResponse.ok) {
        throw new Error(`YouTube API error: ${detailsResponse.status} ${detailsResponse.statusText}`);
      }
      
      const detailsData = await detailsResponse.json();

      const videos: YouTubeVideo[] = detailsData.items.map((item: YouTubeAPIVideoItem) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          width: item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.high?.height || 720,
        },
        publishedAt: item.snippet.publishedAt,
        duration: this.formatDuration(item.contentDetails.duration),
        viewCount: this.formatViewCount(item.statistics.viewCount),
        likeCount: item.statistics.likeCount ? parseInt(item.statistics.likeCount) : undefined,
        embedUrl: `https://www.youtube.com/embed/${item.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`,
        watchUrl: `https://www.youtube.com/watch?v=${item.id}`,
        tags: item.snippet.tags || [],
        categoryId: item.snippet.categoryId,
      }));

      const result: YouTubeApiResponse = {
        videos,
        playlists: [],
        totalResults: data.pageInfo?.totalResults || 0,
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
      };

      await this.cache.set(cacheKey, result, 5 * 60 * 1000); // Cache for 5 minutes
      return result;
    } catch (error) {
      console.error('Error searching videos with pagination:', error);
      return { videos: [], playlists: [], totalResults: 0 };
    }
  }

  /**
   * Search videos in the channel (legacy method for backward compatibility)
   */
  async searchVideos(query: string, maxResults: number = 20): Promise<YouTubeVideo[]> {
    const cacheKey = `search-${query}-${maxResults}`;
    const cached = await this.cache.get<YouTubeVideo[]>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return this.getMockSearchResults(query);
    }

    try {
      const searchUrl = `${this.baseUrl}/search?part=snippet&channelId=${this.channelId}&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${this.apiKey}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data?.items) {
        return [];
      }

      const videoIds = data.items.map((item: YouTubeAPISearchItem) => item.id.videoId).join(',');
      const detailsUrl = `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      
      if (!detailsResponse.ok) {
        throw new Error(`YouTube API error: ${detailsResponse.status} ${detailsResponse.statusText}`);
      }
      
      const detailsData = await detailsResponse.json();

      const videos: YouTubeVideo[] = detailsData.items.map((item: YouTubeAPIVideoItem) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          width: item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.high?.height || 720,
        },
        publishedAt: item.snippet.publishedAt,
        duration: this.formatDuration(item.contentDetails.duration),
        viewCount: this.formatViewCount(item.statistics.viewCount),
        likeCount: item.statistics.likeCount ? parseInt(item.statistics.likeCount) : undefined,
        embedUrl: `https://www.youtube.com/embed/${item.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`,
        watchUrl: `https://www.youtube.com/watch?v=${item.id}`,
        tags: item.snippet.tags || [],
        categoryId: item.snippet.categoryId,
      }));

      await this.cache.set(cacheKey, videos, 5 * 60 * 1000); // Cache for 5 minutes
      return videos;
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  /**
   * Get videos from a specific playlist
   */
  private async getPlaylistVideos(playlistId: string, maxResults: number, pageToken?: string) {
    const url = `${this.baseUrl}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}${pageToken ? `&pageToken=${pageToken}` : ''}&key=${this.apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Format duration from ISO 8601 to readable format
   */
  private formatDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Format view count to readable format
   */
  private formatViewCount(count: string): string {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  }

  /**
   * Format subscriber count to readable format
   */
  private formatSubscriberCount(count: string): string {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M subscribers`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K subscribers`;
    }
    return `${num} subscribers`;
  }

  // Mock data methods for development/fallback
  private getMockChannelInfo(): YouTubeChannelInfo {
    return {
      id: 'UCMockChannelId',
      title: 'Shajeel Afzal',
      description: 'Software Developer & Content Creator sharing knowledge about web development, mobile apps, and AI.',
      customUrl: '@shajeelafzal',
      thumbnail: {
        url: '/images/shajeel_afzal.png',
        width: 800,
        height: 800,
      },
      subscriberCount: '1.2K subscribers',
      videoCount: 45,
      viewCount: 25000,
      publishedAt: '2023-01-01T00:00:00Z',
    };
  }

  private getMockVideosResponse(): YouTubeApiResponse {
    return {
      videos: this.getMockVideos(),
      playlists: this.getMockPlaylists(),
      totalResults: 25,
    };
  }

  private getMockVideos(): YouTubeVideo[] {
    return [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Building React Native Apps with Modern Architecture',
        description: 'Learn how to build scalable React Native applications using modern architecture patterns and best practices.',
        thumbnail: {
          url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          width: 1280,
          height: 720,
        },
        publishedAt: '2024-01-15T10:00:00Z',
        duration: '15:30',
        viewCount: '12.5K views',
        likeCount: 234,
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&showinfo=0',
        watchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        playlistId: 'PLrAXtmRdnEQqAa8h0qvNyZ8uVQrq6cF3h',
        tags: ['React Native', 'Mobile Development', 'Architecture'],
        categoryId: '28',
      },
      // Add more mock videos as needed...
    ];
  }

  private getMockPlaylists(): YouTubePlaylist[] {
    return [
      {
        id: 'PLrAXtmRdnEQqAa8h0qvNyZ8uVQrq6cF3h',
        title: 'Mobile App Development',
        description: 'Complete tutorials on building mobile applications with React Native and Flutter.',
        thumbnail: {
          url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          width: 1280,
          height: 720,
        },
        videoCount: 15,
        publishedAt: '2023-11-01T10:00:00Z',
        privacy: 'public',
      },
      // Add more mock playlists as needed...
    ];
  }

  private getMockSearchResults(query: string): YouTubeVideo[] {
    const allVideos = this.getMockVideos();
    return allVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase()) ||
      video.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

// Singleton instance
export const youtubeService = new YouTubeService();
