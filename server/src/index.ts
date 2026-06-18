import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { postsRouter } from "./routes/posts.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Allow the browser client (Vite dev server) to call this API.
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

// Artificial delay so RTK Query's loading / isFetching states are visible in
// the UI. Tune with DELAY_MS, or set it to 0 to disable.
const DELAY_MS = Number(process.env.DELAY_MS ?? 300);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  if (DELAY_MS > 0) setTimeout(next, DELAY_MS);
  else next();
});

// Health check.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Posts CRUD.
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
