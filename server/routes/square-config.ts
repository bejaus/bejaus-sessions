import { RequestHandler } from "express";
import { SquareConfig } from "../../shared/square";

export const handleSquareConfig: RequestHandler = async (req, res) => {
  try {
    // Only return public configuration needed for client-side Square SDK
    const config: SquareConfig = {
      applicationId: process.env.SQUARE_APPLICATION_ID || 'sandbox-sq0idb-demo-app-id',
      locationId: process.env.SQUARE_LOCATION_ID || 'demo-location-id',
      environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'production' | 'sandbox',
    };

    res.json(config);
  } catch (error) {
    console.error('Error fetching Square config:', error);
    res.status(500).json({ error: 'Failed to fetch Square configuration' });
  }
};
