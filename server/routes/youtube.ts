import { RequestHandler } from "express";
import { YouTubeVideo, YouTubeApiResponse } from "@shared/api";

export const handleYouTubeVideos: RequestHandler = async (req, res) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    console.log('YouTube API Request started');
    console.log('API_KEY configured:', !!API_KEY);
    console.log('CHANNEL_ID configured:', !!CHANNEL_ID);

    if (!API_KEY || !CHANNEL_ID) {
      console.log('YouTube API not fully configured, returning mock data');

      // Return mock data for development when API is not configured
      const mockResponse: YouTubeApiResponse = {
        latest: {
          id: 'bR29G5pSpaQ',
          title: 'Bejaus Sessions - Última Sesión',
          description: 'La sesión más reciente de Bejaus Sessions',
          thumbnail: '',
          publishedAt: new Date().toISOString(),
          viewCount: '1500',
        },
        popular: [
          {
            id: 'fflf6I7UHXM',
            title: 'Bejaus Sessions - Jou Nielsen',
            description: 'Una noche mágica con sonidos únicos',
            thumbnail: '',
            publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            viewCount: '2500',
          },
          {
            id: 'zaoEoFKjoR4',
            title: 'Bejaus Sessions - Noé',
            description: 'Ritmos que conectan almas',
            thumbnail: '',
            publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            viewCount: '3200',
          },
          {
            id: 'X52oRpXKOxM',
            title: 'Bejaus Sessions - Alexx Zander Johnson',
            description: 'Experiencias que trascienden',
            thumbnail: '',
            publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            viewCount: '1800',
          },
        ],
      };

      return res.json(mockResponse);
    }

    console.log('Fetching videos from channel:', CHANNEL_ID);

    // Fetch latest videos from the channel
    const channelUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=10&type=video`;
    console.log('Channel API URL:', channelUrl.replace(API_KEY, 'HIDDEN_API_KEY'));

    const channelResponse = await fetch(channelUrl);

    console.log('Channel response status:', channelResponse.status);

    if (!channelResponse.ok) {
      const errorText = await channelResponse.text();
      console.error('Channel API Error:', errorText);
      throw new Error(`Failed to fetch channel videos: ${channelResponse.status} - ${errorText}`);
    }

    const channelData = await channelResponse.json();
    console.log('Channel data received, items count:', channelData.items?.length || 0);

    if (!channelData.items || channelData.items.length === 0) {
      console.log('No videos found in channel');
      return res.status(404).json({
        error: 'No videos found in channel',
        debug: 'Check if the channel ID is correct and has public videos'
      });
    }

    const videoIds = channelData.items.map((item: any) => item.id.videoId).join(',');
    console.log('Video IDs to fetch stats for:', videoIds);

    // Get detailed video statistics
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const statsResponse = await fetch(statsUrl);

    console.log('Stats response status:', statsResponse.status);

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error('Stats API Error:', errorText);
      throw new Error(`Failed to fetch video statistics: ${statsResponse.status} - ${errorText}`);
    }

    const statsData = await statsResponse.json();
    console.log('Stats data received, items count:', statsData.items?.length || 0);

    const videos: YouTubeVideo[] = statsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: item.statistics.viewCount,
      duration: item.contentDetails.duration,
    }));

    // Latest video (most recent)
    const latest = videos[0];

    // Most popular videos (sorted by view count, excluding the latest)
    const popular = videos
      .slice(1) // Exclude the latest video
      .sort((a, b) => parseInt(b.viewCount || '0') - parseInt(a.viewCount || '0'))
      .slice(0, 3); // Top 3 most viewed

    const response: YouTubeApiResponse = {
      latest,
      popular,
    };

    console.log('Successfully processed YouTube data:', {
      latestTitle: latest?.title,
      popularCount: popular.length
    });

    res.json(response);
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch YouTube videos',
      details: error instanceof Error ? error.message : 'Unknown error',
      debug: 'Check server logs for more details'
    });
  }
};
