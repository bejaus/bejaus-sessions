import { RequestHandler } from "express";
import { SquareConfig } from "../../shared/square";

export const handleSquareConfig: RequestHandler = async (req, res) => {
  try {
    console.log("Square config request received");

    // Only return public configuration needed for client-side Square SDK

    const config: SquareConfig = {
      applicationId:
        process.env.SQUARE_APPLICATION_ID || "sandbox-sq0idb-demo-app-id",
      locationId: process.env.SQUARE_LOCATION_ID || "demo-location-id",
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    };

    res.json(config);
  } catch (error) {
    console.error("Error fetching Square config:", error);
    res.status(500).json({ error: "Failed to fetch Square configuration" });
  }
};
