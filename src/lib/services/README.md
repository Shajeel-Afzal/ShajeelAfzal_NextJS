# YouTube API Service Documentation

This documentation covers the enhanced YouTube API integration for the portfolio website.

## Architecture Overview

The YouTube integration follows a clean, scalable backend architecture:

```
src/
├── app/api/youtube/          # Next.js API routes (backend endpoints)
│   ├── videos/route.ts       # GET /api/youtube/videos
│   ├── playlists/route.ts    # GET /api/youtube/playlists  
│   ├── search/route.ts       # GET /api/youtube/search
│   └── channel/route.ts      # GET /api/youtube/channel
├── lib/
│   ├── services/             # Business logic services
│   │   ├── youtube.service.ts        # Core YouTube API service (backend only)
│   │   └── youtube-client.service.ts # Client-side API consumer
│   └── cache/
│       └── cache.service.ts  # In-memory caching service
└── types/
    └── youtube.ts           # TypeScript type definitions
```

## Key Features

### ✅ Enhanced Security
- **Backend-only API calls**: YouTube API key never exposed to client
- **Environment variable management**: Secure credential handling
- **Input validation**: Proper parameter validation and sanitization

### ✅ Performance Optimizations
- **Multi-layer caching**: In-memory cache + HTTP cache headers
- **Intelligent fallbacks**: Mock data when API is unavailable
- **Rate limiting protection**: Prevents API quota exhaustion

### ✅ Type Safety
- **Full TypeScript support**: Complete type definitions for all API responses
- **Proper error handling**: Comprehensive error boundaries
- **Lint compliance**: Clean, maintainable code

### ✅ Feature-Rich API
- **Channel information**: Subscriber count, video count, etc.
- **Video management**: Fetch, search, filter by playlist
- **Advanced search**: Real-time video search functionality
- **Pagination support**: Handle large video collections

## Environment Setup

### 1. YouTube API Key Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Restrict the key to YouTube Data API v3

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# YouTube API Configuration
YOUTUBE_API_KEY="your_actual_api_key_here"
YOUTUBE_CHANNEL_ID="your_channel_id_here"  
YOUTUBE_CHANNEL_HANDLE="@your_handle_here"
NODE_ENV="development"
```

### 3. Finding Your Channel ID

- Method 1: YouTube Studio → Settings → Channel → Advanced Settings
- Method 2: Use this URL: `https://www.youtube.com/account_advanced`
- Method 3: From your channel URL, extract the ID after `/channel/`

## API Endpoints

### GET /api/youtube/videos

Fetch channel videos with filtering options.

**Query Parameters:**
- `maxResults` (number, 1-50): Number of videos to return (default: 20)
- `pageToken` (string): For pagination
- `playlistId` (string): Filter by specific playlist
- `order` (string): Sort order - 'date', 'relevance', 'viewCount', 'rating' (default: 'date')

**Example:**
```typescript
// Get latest 10 videos
const response = await fetch('/api/youtube/videos?maxResults=10&order=date');

// Get videos from specific playlist
const response = await fetch('/api/youtube/videos?playlistId=PLxxxxxx&maxResults=20');
```

### GET /api/youtube/playlists

Fetch all channel playlists.

**Response:**
```typescript
YouTubePlaylist[] // Array of playlist objects
```

### GET /api/youtube/search

Search videos within the channel.

**Query Parameters:**
- `q` (string, required): Search query
- `maxResults` (number, 1-50): Number of results (default: 20)

**Example:**
```typescript
const response = await fetch('/api/youtube/search?q=react&maxResults=10');
```

### GET /api/youtube/channel

Get channel information.

**Response:**
```typescript
YouTubeChannelInfo // Channel metadata
```

## Usage Examples

### Client-Side Usage

```typescript
import { youtubeAPI } from '@/lib/services/youtube-client.service';

// Get recent videos
const recentVideos = await youtubeAPI.getRecentVideos(6);

// Search videos
const searchResults = await youtubeAPI.searchVideos('nextjs tutorial');

// Get channel info
const channelInfo = await youtubeAPI.getChannelInfo();

// Get playlist videos
const playlistVideos = await youtubeAPI.getPlaylistVideos('PLxxxxxx');
```

### React Component Example

```tsx
'use client';

import { useState, useEffect } from 'react';
import { youtubeAPI } from '@/lib/services/youtube-client.service';
import { YouTubeVideo } from '@/types/youtube';

export function VideoGrid() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const result = await youtubeAPI.getChannelVideos({ maxResults: 12 });
        setVideos(result?.videos || []);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <div>Loading videos...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <img src={video.thumbnail.url} alt={video.title} />
          <h3>{video.title}</h3>
          <p>{video.viewCount} • {video.duration}</p>
        </div>
      ))}
    </div>
  );
}
```

## Type Definitions

### Core Types

```typescript
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: { url: string; width: number; height: number };
  publishedAt: string;
  duration: string;        // Formatted: "15:30"
  viewCount: string;       // Formatted: "12.5K views"
  likeCount?: number;
  embedUrl: string;        // For embedding
  watchUrl: string;        // For direct YouTube link
  playlistId?: string;
  tags: string[];
  categoryId: string;
}

interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: { url: string; width: number; height: number };
  videoCount: number;
  publishedAt: string;
  privacy: 'public' | 'private' | 'unlisted';
}

interface YouTubeChannelInfo {
  id: string;
  title: string;
  description: string;
  customUrl?: string;
  thumbnail: { url: string; width: number; height: number };
  subscriberCount: string; // Formatted: "1.2K subscribers"
  videoCount: number;
  viewCount: number;
  publishedAt: string;
}
```

## Caching Strategy

### Backend Caching
- **In-memory cache**: 15-minute default TTL
- **API responses**: Cached to minimize YouTube API calls
- **Automatic cleanup**: Expired entries removed automatically

### Frontend Caching
- **HTTP cache headers**: Proper cache control
- **Videos**: 10-minute cache
- **Playlists**: 30-minute cache
- **Channel info**: 1-hour cache
- **Search results**: 5-minute cache

### Cache Configuration

```typescript
// Customize cache TTL
const cache = new CacheService('youtube', 20 * 60 * 1000); // 20 minutes

// Cache specific data
await cache.set('videos-latest', videos, 5 * 60 * 1000); // 5 minutes
```

## Error Handling

### Graceful Degradation
- **API failures**: Automatically fallback to mock data
- **Rate limiting**: Serve cached content when limits exceeded
- **Network issues**: Display cached data with retry options

### Error Types
```typescript
// API errors are handled gracefully
try {
  const videos = await youtubeAPI.getRecentVideos();
} catch (error) {
  // Service automatically falls back to mock data
  // No need for explicit error handling in most cases
}
```

## Performance Considerations

### Best Practices
1. **Batch requests**: Use pagination for large datasets
2. **Cache effectively**: Leverage both backend and frontend caching
3. **Lazy loading**: Load videos on demand
4. **Image optimization**: Use Next.js Image component for thumbnails
5. **Error boundaries**: Implement React error boundaries

### Rate Limiting
- YouTube API has daily quotas
- Service implements intelligent caching to minimize API calls
- Mock data ensures development continues without API access

## Security Best Practices

### API Key Protection
- ✅ Never expose API keys to client-side code
- ✅ Use environment variables for configuration
- ✅ Implement proper CORS policies
- ✅ Validate all input parameters

### Content Security
- ✅ Sanitize video descriptions and titles
- ✅ Implement CSP headers for embedded videos
- ✅ Validate video IDs and playlist IDs

## Monitoring & Debugging

### Development Mode
```bash
NODE_ENV=development # Enables mock data and detailed logging
```

### Logging
```typescript
// Service logs API calls and errors
console.log('YouTube API call:', endpoint);
console.error('YouTube API error:', error);
```

### Cache Debugging
```typescript
// Check cache status
const cacheSize = youtubeService.cache.size();
youtubeService.cache.cleanExpired();
```

## Migration from Old Service

The old `youtube-api.ts` has been replaced with a more robust architecture:

### What Changed
- ✅ **Moved to backend**: API calls now happen server-side
- ✅ **Better caching**: Multi-layer caching strategy
- ✅ **Type safety**: Complete TypeScript coverage
- ✅ **Error handling**: Graceful degradation
- ✅ **Security**: API keys protected

### Migration Steps
1. Update imports: `youtube-api.ts` → `youtube-client.service.ts`
2. Configure environment variables
3. Use new API endpoints or client service
4. Update component implementations

## Troubleshooting

### Common Issues

**1. API Key Not Working**
- Verify key is enabled for YouTube Data API v3
- Check API key restrictions
- Ensure environment variable is set correctly

**2. No Videos Returned**
- Verify channel ID is correct
- Check if channel has public videos
- Review API quotas in Google Cloud Console

**3. Cache Not Working**
- Check if NODE_ENV is set correctly
- Verify cache TTL settings
- Review server logs for cache operations

**4. TypeScript Errors**
- Ensure all types are imported correctly
- Check path aliases in tsconfig.json
- Verify relative import paths

### Getting Help

1. Check server logs for detailed error messages
2. Verify YouTube API quota in Google Cloud Console
3. Test API endpoints directly in browser/Postman
4. Review environment variable configuration

---

This enhanced YouTube service provides a robust, scalable foundation for displaying video content while maintaining security, performance, and type safety.
