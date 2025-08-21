import { NextRequest, NextResponse } from 'next/server';
import { youtubeService } from '@/lib/services/youtube.service';

/**
 * GET /api/youtube/search - Search videos in the channel
 * Query parameters:
 * - q: string (required) - search query
 * - maxResults: number (default: 20)
 * - pageToken: string (optional) - pagination token
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const query = searchParams.get('q');
    const maxResults = parseInt(searchParams.get('maxResults') || '20');
    const pageToken = searchParams.get('pageToken');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    if (maxResults < 1 || maxResults > 50) {
      return NextResponse.json(
        { error: 'maxResults must be between 1 and 50' },
        { status: 400 }
      );
    }

    const searchResponse = await youtubeService.searchVideosWithPagination(query, maxResults, pageToken || undefined);

    return NextResponse.json(searchResponse, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=150', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('API Error - /api/youtube/search:', error);
    return NextResponse.json(
      { error: 'Failed to search videos' },
      { status: 500 }
    );
  }
}
