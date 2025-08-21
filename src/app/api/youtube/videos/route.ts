import { NextRequest, NextResponse } from 'next/server';
import { youtubeService } from '@/lib/services/youtube.service';

/**
 * GET /api/youtube/videos - Get channel videos with optional filtering
 * Query parameters:
 * - maxResults: number (default: 20)
 * - pageToken: string (for pagination)
 * - playlistId: string (filter by playlist)
 * - order: 'date' | 'relevance' | 'viewCount' | 'rating' (default: 'date')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const maxResults = parseInt(searchParams.get('maxResults') || '20');
    const pageToken = searchParams.get('pageToken') || undefined;
    const playlistId = searchParams.get('playlistId') || undefined;
    const order = (searchParams.get('order') || 'date') as 'date' | 'relevance' | 'viewCount' | 'rating';

    // Validate parameters
    if (maxResults < 1 || maxResults > 50) {
      return NextResponse.json(
        { error: 'maxResults must be between 1 and 50' },
        { status: 400 }
      );
    }

    const response = await youtubeService.getChannelVideos({
      maxResults,
      pageToken,
      playlistId,
      order,
    });

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300', // Cache for 10 minutes
      },
    });
  } catch (error) {
    console.error('API Error - /api/youtube/videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
