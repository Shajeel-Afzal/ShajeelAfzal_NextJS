// YouTube API service for fetching videos and playlists
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
  likeCount?: string;
  embedUrl: string;
  playlistId?: string;
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
}

export interface YouTubeApiResponse {
  videos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  totalResults: number;
  nextPageToken?: string;
}

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Mock data for development/demo purposes
const MOCK_VIDEOS: YouTubeVideo[] = [
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
    duration: 'PT15M30S',
    viewCount: '12450',
    likeCount: '234',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    playlistId: 'PLrAXtmRdnEQqAa8h0qvNyZ8uVQrq6cF3h',
  },
  {
    id: 'ScMzIvxBSi4',
    title: 'AI Chatbot Development with OpenAI API',
    description: 'Complete guide to building intelligent chatbots using OpenAI API, including best practices and deployment.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    publishedAt: '2024-01-10T14:30:00Z',
    duration: 'PT22M15S',
    viewCount: '8920',
    likeCount: '189',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    playlistId: 'PLrAXtmRdnEQqBb9i2qxNaZ7uVQrq6cF3h',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Flutter vs React Native: Complete Comparison 2024',
    description: 'Detailed comparison of Flutter and React Native for cross-platform mobile development in 2024.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    publishedAt: '2024-01-05T09:15:00Z',
    duration: 'PT18M45S',
    viewCount: '15670',
    likeCount: '312',
    embedUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    playlistId: 'PLrAXtmRdnEQqAa8h0qvNyZ8uVQrq6cF3h',
  },
  {
    id: 'QH2-TGUlwu4',
    title: 'Next.js 15 New Features and Performance Improvements',
    description: 'Explore the latest features in Next.js 15 and how they improve performance and developer experience.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    publishedAt: '2023-12-28T16:00:00Z',
    duration: 'PT12M20S',
    viewCount: '9830',
    likeCount: '201',
    embedUrl: 'https://www.youtube.com/embed/QH2-TGUlwu4',
    playlistId: 'PLrAXtmRdnEQqCc9j3qxNaZ7uVQrq6cF3h',
  },
  {
    id: 'A3l6YYkXzzg',
    title: 'Building Microservices with Node.js and Docker',
    description: 'Learn how to architect and deploy microservices using Node.js, Express, and Docker containers.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/A3l6YYkXzzg/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    publishedAt: '2023-12-20T11:45:00Z',
    duration: 'PT25M10S',
    viewCount: '6750',
    likeCount: '156',
    embedUrl: 'https://www.youtube.com/embed/A3l6YYkXzzg',
    playlistId: 'PLrAXtmRdnEQqCc9j3qxNaZ7uVQrq6cF3h',
  },
  {
    id: 'Nv7UmC6OJkU',
    title: 'TypeScript Advanced Patterns for React Developers',
    description: 'Master advanced TypeScript patterns and techniques specifically designed for React development.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/Nv7UmC6OJkU/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    publishedAt: '2023-12-15T13:20:00Z',
    duration: 'PT19M55S',
    viewCount: '11240',
    likeCount: '278',
    embedUrl: 'https://www.youtube.com/embed/Nv7UmC6OJkU',
    playlistId: 'PLrAXtmRdnEQqCc9j3qxNaZ7uVQrq6cF3h',
  },
];

const MOCK_PLAYLISTS: YouTubePlaylist[] = [
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
  },
  {
    id: 'PLrAXtmRdnEQqBb9i2qxNaZ7uVQrq6cF3h',
    title: 'AI & Machine Learning',
    description: 'AI development, chatbots, and machine learning integration tutorials.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    videoCount: 12,
    publishedAt: '2023-10-15T14:00:00Z',
  },
  {
    id: 'PLrAXtmRdnEQqCc9j3qxNaZ7uVQrq6cF3h',
    title: 'Web Development',
    description: 'Modern web development with Next.js, React, and Node.js.',
    thumbnail: {
      url: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
      width: 1280,
      height: 720,
    },
    videoCount: 18,
    publishedAt: '2023-09-20T09:00:00Z',
  },
];

class YouTubeService {
  private apiKey: string;
  private channelId: string;
  private isDevelopment: boolean;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || 'demo_key';
    this.channelId = process.env.YOUTUBE_CHANNEL_ID || 'demo_channel';
    this.isDevelopment = process.env.NODE_ENV === 'development' || this.apiKey === 'demo_key';
  }

  private async fetchFromAPI(endpoint: string): Promise<any> {
    if (this.isDevelopment) {
      // Return mock data in development or when API key is not available
      return null;
    }

    try {
      const response = await fetch(`${YOUTUBE_API_BASE}${endpoint}&key=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('YouTube API fetch error:', error);
      throw error;
    }
  }

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

  private formatViewCount(count: string): string {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  }

  async getChannelVideos(maxResults: number = 20, pageToken?: string): Promise<YouTubeApiResponse> {
    if (this.isDevelopment) {
      // Return mock data
      return {
        videos: MOCK_VIDEOS.map(video => ({
          ...video,
          duration: this.formatDuration(video.duration),
          viewCount: this.formatViewCount(video.viewCount),
        })),
        playlists: MOCK_PLAYLISTS,
        totalResults: MOCK_VIDEOS.length,
      };
    }

    try {
      // Fetch channel videos
      const videosEndpoint = `/search?part=snippet&channelId=${this.channelId}&maxResults=${maxResults}&order=date&type=video${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const videosData = await this.fetchFromAPI(videosEndpoint);

      if (!videosData?.items) {
        throw new Error('No videos found');
      }

      // Get detailed video information
      const videoIds = videosData.items.map((item: any) => item.id.videoId).join(',');
      const detailsEndpoint = `/videos?part=snippet,statistics,contentDetails&id=${videoIds}`;
      const detailsData = await this.fetchFromAPI(detailsEndpoint);

      const videos: YouTubeVideo[] = detailsData.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          width: item.snippet.thumbnails.maxres?.width || item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.maxres?.height || item.snippet.thumbnails.high?.height || 720,
        },
        publishedAt: item.snippet.publishedAt,
        duration: this.formatDuration(item.contentDetails.duration),
        viewCount: this.formatViewCount(item.statistics.viewCount),
        likeCount: item.statistics.likeCount,
        embedUrl: `https://www.youtube.com/embed/${item.id}`,
      }));

      return {
        videos,
        playlists: [], // Will be fetched separately
        totalResults: videosData.pageInfo.totalResults,
        nextPageToken: videosData.nextPageToken,
      };
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      // Fallback to mock data
      return {
        videos: MOCK_VIDEOS.map(video => ({
          ...video,
          duration: this.formatDuration(video.duration),
          viewCount: this.formatViewCount(video.viewCount),
        })),
        playlists: MOCK_PLAYLISTS,
        totalResults: MOCK_VIDEOS.length,
      };
    }
  }

  async getChannelPlaylists(): Promise<YouTubePlaylist[]> {
    if (this.isDevelopment) {
      return MOCK_PLAYLISTS;
    }

    try {
      const endpoint = `/playlists?part=snippet,contentDetails&channelId=${this.channelId}&maxResults=50`;
      const data = await this.fetchFromAPI(endpoint);

      if (!data?.items) {
        return MOCK_PLAYLISTS;
      }

      return data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          width: item.snippet.thumbnails.high?.width || 1280,
          height: item.snippet.thumbnails.high?.height || 720,
        },
        videoCount: item.contentDetails.itemCount,
        publishedAt: item.snippet.publishedAt,
      }));
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return MOCK_PLAYLISTS;
    }
  }

  async searchVideos(query: string, maxResults: number = 20): Promise<YouTubeVideo[]> {
    if (this.isDevelopment) {
      // Simple mock search
      const filtered = MOCK_VIDEOS.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      return filtered.map(video => ({
        ...video,
        duration: this.formatDuration(video.duration),
        viewCount: this.formatViewCount(video.viewCount),
      }));
    }

    try {
      const endpoint = `/search?part=snippet&channelId=${this.channelId}&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video`;
      const data = await this.fetchFromAPI(endpoint);

      if (!data?.items) {
        return [];
      }

      // Get detailed video information
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      const detailsEndpoint = `/videos?part=snippet,statistics,contentDetails&id=${videoIds}`;
      const detailsData = await this.fetchFromAPI(detailsEndpoint);

      return detailsData.items.map((item: any) => ({
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
        likeCount: item.statistics.likeCount,
        embedUrl: `https://www.youtube.com/embed/${item.id}`,
      }));
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }
}

export const youtubeService = new YouTubeService();