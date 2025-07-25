import { RequestHandler } from "express";
import { SquareConfig } from "../../shared/square";

export const handleSquareConfig: RequestHandler = async (req, res) => {
  try {
    console.log("Square config request received");

    // Only return public configuration needed for client-side Square SDK
    console.log("SQUARE_ACCESS_TOKEN", process.env.SQUARE_ACCESS_TOKEN);
    console.log("SQUARE_LOCATION_ID", process.env.SQUARE_LOCATION_ID);
    console.log("NODE_ENV", process.env.NODE_ENV);
    console.log("SQUARE_APPLICATION_ID", process.env.SQUARE_APPLICATION_ID);
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
