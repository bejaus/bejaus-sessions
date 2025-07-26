import { RequestHandler } from "express";
import { YouTubeVideo, YouTubeApiResponse } from "@shared/api";
import { Redis } from "@upstash/redis";
import fs from "fs";

// Helper function to get mock YouTube data from JSON file
function getMockYouTubeData(): YouTubeApiResponse {
  try {
    const mockData = fs.readFileSync("youtube_videos_cache.json", "utf8");
    return JSON.parse(mockData);
  } catch (error) {
    console.log("Failed to read mock YouTube data:", error);
    return getMockResponse();
  }
}

// Helper function to get mock response
function getMockResponse(): YouTubeApiResponse {
  return {
    latest: {
      id: "bR29G5pSpaQ",
      title: "Bejaus Sessions - Última Sesión",
      description: "La sesión más reciente de Bejaus Sessions",
      thumbnail: "",
      publishedAt: new Date().toISOString(),
      viewCount: "1500",
    },
    popular: [
      {
        id: "fflf6I7UHXM",
        title: "Bejaus Sessions - Jou Nielsen",
        description: "Una noche mágica con sonidos únicos",
        thumbnail: "",
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        viewCount: "2500",
      },
      {
        id: "zaoEoFKjoR4",
        title: "Bejaus Sessions - Noé",
        description: "Ritmos que conectan almas",
        thumbnail: "",
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        viewCount: "3200",
      },
      {
        id: "X52oRpXKOxM",
        title: "Bejaus Sessions - Alexx Zander Johnson",
        description: "Experiencias que trascienden",
        thumbnail: "",
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        viewCount: "1800",
      },
    ],
  };
}

export const handleYouTubeVideos: RequestHandler = async (req, res) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
    const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
    const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

    // Initialize Redis cache if credentials are available
    let redis: any = null;
    const CACHE_KEY = "youtube_videos_cache";
    const CACHE_DURATION = 60 * 60; // 1 hour in seconds

    if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
      try {
        redis = new Redis({
          url: UPSTASH_REDIS_REST_URL,
          token: UPSTASH_REDIS_REST_TOKEN,
        });
        console.log("Upstash Redis cache enabled");

        // Check cache first
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
          console.log("Returning cached YouTube data");
          res.setHeader("X-Cache", "HIT");
          return res.json(cached);
        }
      } catch (error) {
        console.log("Redis cache error, proceeding without cache:", error);
        redis = null;
      }
    } else {
      console.log("Upstash Redis not configured, proceeding without cache");
    }

    // Check if we have all required configurations
    if (!API_KEY || !CHANNEL_ID) {
      console.log(
        "YouTube API not fully configured, using mock data from JSON file",
      );
      res.setHeader("X-Cache", "DISABLED");
      return res.json(getMockYouTubeData());
    }

    // Check if Redis is configured for caching
    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
      console.log(
        "Redis cache not configured - using mock data from JSON file to avoid YouTube API quota issues",
      );
      console.log(
        "To enable real YouTube data, configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN",
      );
      res.setHeader("X-Cache", "DISABLED");
      return res.json(getMockYouTubeData());
    }

    console.log("Fetching videos from channel:", CHANNEL_ID);

    // Fetch latest videos from the channel
    const channelUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=10&type=video`;
    console.log(
      "Channel API URL:",
      channelUrl.replace(API_KEY, "HIDDEN_API_KEY"),
    );

    const channelResponse = await fetch(channelUrl);

    console.log("Channel response status:", channelResponse.status);

    if (!channelResponse.ok) {
      const errorText = await channelResponse.text();
      console.error("Channel API Error, using mock data:", errorText);
      res.setHeader("X-Cache", "DISABLED");
      return res.json(getMockYouTubeData());
    }

    const channelData = await channelResponse.json();
    console.log(
      "Channel data received, items count:",
      channelData.items?.length || 0,
    );

    if (!channelData.items || channelData.items.length === 0) {
      console.log("No videos found in channel");
      return res.status(404).json({
        error: "No videos found in channel",
        debug: "Check if the channel ID is correct and has public videos",
      });
    }

    const videoIds = channelData.items
      .map((item: any) => item.id.videoId)
      .join(",");
    console.log("Video IDs to fetch stats for:", videoIds);

    // Get detailed video statistics
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const statsResponse = await fetch(statsUrl);

    console.log("Stats response status:", statsResponse.status);

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error("Stats API Error, using mock data:", errorText);
      res.setHeader("X-Cache", "DISABLED");
      return res.json(getMockYouTubeData());
    }

    const statsData = await statsResponse.json();
    console.log(
      "Stats data received, items count:",
      statsData.items?.length || 0,
    );

    const videos: YouTubeVideo[] = statsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: item.statistics.viewCount,
      duration: item.contentDetails.duration,
    }));

    // Latest video (most recent)
    const latest = videos[0];

    // Most popular videos (sorted by view count, excluding the latest)
    const popular = videos
      .slice(1) // Exclude the latest video
      .sort(
        (a, b) => parseInt(b.viewCount || "0") - parseInt(a.viewCount || "0"),
      )
      .slice(0, 3); // Top 3 most viewed

    const response: YouTubeApiResponse = {
      latest,
      popular,
    };

    console.log("Successfully processed YouTube data:", {
      latestTitle: latest?.title,
      popularCount: popular.length,
    });

    // Cache the response if Redis is available
    if (redis) {
      try {
        await redis.set(CACHE_KEY, response, { ex: CACHE_DURATION });
        console.log("YouTube data cached for 1 hour");
        res.setHeader("X-Cache", "MISS");
      } catch (error) {
        console.log("Failed to cache response:", error);
        res.setHeader("X-Cache", "ERROR");
      }
    } else {
      res.setHeader("X-Cache", "DISABLED");
    }

    res.json(response);
  } catch (error) {
    console.error("YouTube API Error, using mock data:", error);
    res.setHeader("X-Cache", "DISABLED");
    res.json(getMockYouTubeData());
  }
};
