# Bejaus Sessions

A production-ready full-stack React application template with an integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod, and modern tooling.

## Tech Stack

- **Frontend:** React 18, React Router 6 (SPA), TypeScript, Vite, TailwindCSS 3
- **Backend:** Express server (integrated with Vite dev server), Netlify Functions (for serverless deployment)
- **Testing:** Vitest
- **UI:** Radix UI, TailwindCSS 3, Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point and SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share API interfaces

netlify/functions/        # Netlify serverless functions (for deployment)
```

## Key Features

- **SPA Routing:** Powered by React Router 6. Route files are in `client/pages/`, and routes are defined in `client/App.tsx`.
- **Styling:** TailwindCSS 3 utility classes, with theme and design tokens in `client/global.css`.
- **UI Components:** Pre-built, customizable UI components in `client/components/ui/`.
- **Express Server Integration:** Single port for both frontend and backend in development, with hot reload for both.
- **API Endpoints:** All API routes are prefixed with `/api/` (e.g., `/api/ping`, `/api/demo`).
- **Type Safety:** Shared types/interfaces between client and server in `shared/`.
- **Testing:** Vitest for unit and integration tests.

## Getting Started

### Install pnpm (if you don't have it)

```bash
npm install -g pnpm
```

### Clean Install

To do a clean install (recommended):

```bash
rm -rf node_modules
pnpm install
```

## Development Commands

```bash
pnpm run dev        # Start dev server (client + server)
pnpm run build      # Production build
pnpm run start      # Start production server
pnpm run typecheck  # TypeScript validation
pnpm test           # Run Vitest tests
```

## Adding Features

### Add a New API Route

1. (Optional) Create a shared interface in `shared/api.ts`:
   ```typescript
   export interface MyRouteResponse {
     message: string;
   }
   ```
2. Create a new route handler in `server/routes/my-route.ts`:

   ```typescript
   import { RequestHandler } from "express";
   import { MyRouteResponse } from "@shared/api";

   export const handleMyRoute: RequestHandler = (req, res) => {
     const response: MyRouteResponse = { message: "Hello from my endpoint!" };
     res.json(response);
   };
   ```

3. Register the route in `server/index.ts`:
   ```typescript
   import { handleMyRoute } from "./routes/my-route";
   app.get("/api/my-endpoint", handleMyRoute);
   ```
4. Use in React components with type safety:
   ```typescript
   import { MyRouteResponse } from "@shared/api";
   const response = await fetch("/api/my-endpoint");
   const data: MyRouteResponse = await response.json();
   ```

### Add a New Page Route

1. Create a component in `client/pages/MyPage.tsx`.
2. Add the route in `client/App.tsx`:
   ```typescript
   <Route path="/my-page" element={<MyPage />} />
   ```

## Production Deployment

- **Standard:** `pnpm run build` + `pnpm run start`
- **Netlify:** Uses Netlify Functions for serverless deployment. See `netlify.toml` for configuration.
- **Docker:** Dockerfile included (if present).
- **Binary:** Self-contained executables (Linux, macOS, Windows).
- Express serves the built React SPA with fallback routing support.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces

---

Feel free to customize this README further to match your project’s branding or specific requirements.
