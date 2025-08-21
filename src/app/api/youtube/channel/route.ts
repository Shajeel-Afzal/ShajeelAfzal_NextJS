import { NextResponse } from 'next/server';
import { youtubeService } from '@/lib/services/youtube.service';

/**
 * GET /api/youtube/channel - Get channel information
 */
export async function GET() {
  try {
    const channelInfo = await youtubeService.getChannelInfo();

    if (!channelInfo) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(channelInfo, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('API Error - /api/youtube/channel:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channel info' },
      { status: 500 }
    );
  }
}
