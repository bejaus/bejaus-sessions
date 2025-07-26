import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleYouTubeVideos } from "./routes/youtube";
import { handleSquarePayment, handleSquareProducts } from "./routes/square";
import { handleSquareConfig } from "./routes/square-config";
import { handleSubscribe } from "./routes/subscribe";

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
  app.get("/api/square-config", handleSquareConfig);
  app.get("/api/square-products", handleSquareProducts);
  app.post("/api/square-payment", handleSquarePayment);
  app.post("/api/subscribe", handleSubscribe);

  return app;
}
