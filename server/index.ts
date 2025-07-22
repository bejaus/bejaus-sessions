import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleYouTubeVideos } from "./routes/youtube";
import { handleSquarePayment } from "./routes/square";

export function createServer() {
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
  app.post("/api/square-payment", handleSquarePayment);

  return app;
}
