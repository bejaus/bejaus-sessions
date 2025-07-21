import { RequestHandler } from "express";
import { YouTubeVideo, YouTubeApiResponse } from "@shared/api";

export const handleYouTubeVideos: RequestHandler = async (req, res) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCYourChannelId'; // Bejaus Sessions channel ID
    
    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'YouTube API key not configured' 
      });
    }

    // Fetch latest videos from the channel
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=10&type=video`
    );

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel videos');
    }

    const channelData = await channelResponse.json();
    const videoIds = channelData.items.map((item: any) => item.id.videoId).join(',');

    // Get detailed video statistics
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`
    );

    if (!statsResponse.ok) {
      throw new Error('Failed to fetch video statistics');
    }

    const statsData = await statsResponse.json();

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

    res.json(response);
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch YouTube videos',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
