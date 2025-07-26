import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleYouTubeVideos } from "./routes/youtube";
import { handleSquarePayment, handleSquareProducts } from "./routes/square";
import { handleSquareConfig } from "./routes/square-config";

export function createServer() {
  console.log(`YOUTUBE_API_KEY: ${process.env.YOUTUBE_API_KEY}`);
  console.log(`YOUTUBE_CHANNEL_ID: ${process.env.YOUTUBE_CHANNEL_ID}`);
  console.log(`SQUARE_ACCESS_TOKEN: ${process.env.SQUARE_ACCESS_TOKEN}`);
  console.log(`SQUARE_APPLICATION_ID: ${process.env.SQUARE_APPLICATION_ID}`);
  console.log(`SQUARE_LOCATION_ID: ${process.env.SQUARE_LOCATION_ID}`);
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/youtube-videos", handleYouTubeVideos);
  app.get("/api/square-config", handleSquareConfig);
  app.get("/api/square-products", handleSquareProducts);
  app.post("/api/square-payment", handleSquarePayment);

  return app;
}
