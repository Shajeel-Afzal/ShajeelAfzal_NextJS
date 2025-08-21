import { YouTubeVideo, YouTubePlaylist, YouTubeApiResponse, YouTubeChannelInfo } from '@/types/youtube';

/**
 * Client-side YouTube API service
 * Consumes the backend API endpoints
 */
export class YouTubeAPIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/youtube';
  }

  /**
   * Get channel information
   */
  async getChannelInfo(): Promise<YouTubeChannelInfo | null> {
    try {
      const response = await fetch(`${this.baseUrl}/channel`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch channel info: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return null;
    }
  }

  /**
   * Get channel videos with optional filtering
   */
  async getChannelVideos(options: {
    maxResults?: number;
    pageToken?: string;
    playlistId?: string;
    order?: 'date' | 'relevance' | 'viewCount' | 'rating';
  } = {}): Promise<YouTubeApiResponse | null> {
    try {
      const params = new URLSearchParams();
      
      if (options.maxResults) params.append('maxResults', options.maxResults.toString());
      if (options.pageToken) params.append('pageToken', options.pageToken);
      if (options.playlistId) params.append('playlistId', options.playlistId);
      if (options.order) params.append('order', options.order);

      const response = await fetch(`${this.baseUrl}/videos?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      return null;
    }
  }

  /**
   * Get channel playlists
   */
  async getChannelPlaylists(): Promise<YouTubePlaylist[]> {
    try {
      const response = await fetch(`${this.baseUrl}/playlists`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  /**
   * Search videos in the channel with pagination
   */
  async searchVideosWithPagination(options: {
    query: string;
    maxResults?: number;
    pageToken?: string;
  }): Promise<YouTubeApiResponse | null> {
    try {
      const params = new URLSearchParams({
        q: options.query,
        maxResults: (options.maxResults || 20).toString(),
      });

      if (options.pageToken) {
        params.append('pageToken', options.pageToken);
      }

      const response = await fetch(`${this.baseUrl}/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to search videos: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching videos with pagination:', error);
      return null;
    }
  }

  /**
   * Search videos in the channel (legacy method for backward compatibility)
   */
  async searchVideos(query: string, maxResults: number = 20): Promise<YouTubeVideo[]> {
    try {
      const result = await this.searchVideosWithPagination({
        query,
        maxResults
      });
      return result?.videos || [];
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  /**
   * Get videos from a specific playlist
   */
  async getPlaylistVideos(playlistId: string, maxResults: number = 20, pageToken?: string): Promise<YouTubeApiResponse | null> {
    return this.getChannelVideos({
      playlistId,
      maxResults,
      pageToken,
    });
  }

  /**
   * Get the most recent videos
   */
  async getRecentVideos(count: number = 6): Promise<YouTubeVideo[]> {
    const response = await this.getChannelVideos({
      maxResults: count,
      order: 'date',
    });

    return response?.videos || [];
  }

  /**
   * Get popular videos
   */
  async getPopularVideos(count: number = 6): Promise<YouTubeVideo[]> {
    const response = await this.getChannelVideos({
      maxResults: count,
      order: 'viewCount',
    });

    return response?.videos || [];
  }
}

// Singleton instance for use throughout the app
export const youtubeAPI = new YouTubeAPIClient();
