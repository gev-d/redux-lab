import { Router, type Request, type Response } from "express";
import * as db from "../db.js";
import type { NewPost, PostUpdate } from "../types.js";

export const postsRouter = Router();

/** Validate the body for POST/PUT. Returns an error message, or null if valid. */
function validateNewPost(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return "Body must be a JSON object.";
  const { title, content, author } = body as Record<string, unknown>;
  if (typeof title !== "string" || title.trim() === "") return "`title` is required.";
  if (typeof content !== "string" || content.trim() === "") return "`content` is required.";
  if (typeof author !== "string" || author.trim() === "") return "`author` is required.";
  return null;
}

// GET /posts — list all posts
postsRouter.get("/", (_req: Request, res: Response) => {
  res.json(db.getAll());
});

// GET /posts/:id — fetch a single post
postsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const post = db.getById(req.params.id);
  if (!post) {
    res.status(404).json({ error: `Post ${req.params.id} not found.` });
    return;
  }
  res.json(post);
});

// POST /posts — create a new post
postsRouter.post("/", (req: Request, res: Response) => {
  const error = validateNewPost(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const created = db.create(req.body as NewPost);
  res.status(201).json(created);
});

// PUT /posts/:id — fully replace a post
postsRouter.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const error = validateNewPost(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const updated = db.replace(req.params.id, req.body as NewPost);
  if (!updated) {
    res.status(404).json({ error: `Post ${req.params.id} not found.` });
    return;
  }
  res.json(updated);
});

// PATCH /posts/:id — partially update a post
postsRouter.patch("/:id", (req: Request<{ id: string }>, res: Response) => {
  const updated = db.update(req.params.id, (req.body ?? {}) as PostUpdate);
  if (!updated) {
    res.status(404).json({ error: `Post ${req.params.id} not found.` });
    return;
  }
  res.json(updated);
});

// DELETE /posts/:id — remove a post
postsRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const deleted = db.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: `Post ${req.params.id} not found.` });
    return;
  }
  res.status(204).end();
});
