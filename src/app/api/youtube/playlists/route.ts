import { NextResponse } from 'next/server';
import { youtubeService } from '@/lib/services/youtube.service';

/**
 * GET /api/youtube/playlists - Get channel playlists
 */
export async function GET() {
  try {
    const playlists = await youtubeService.getChannelPlaylists();

    return NextResponse.json(playlists, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=600', // Cache for 30 minutes
      },
    });
  } catch (error) {
    console.error('API Error - /api/youtube/playlists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}
