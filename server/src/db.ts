import { randomUUID } from "node:crypto";
import type { NewPost, Post, PostUpdate } from "./types.js";

/**
 * In-memory "database". This is intentionally simple: data lives in a plain
 * array and resets to the seed below every time the server restarts. That is
 * perfect for learning RTK Query without setting up a real database. To swap in
 * a real DB later, only the helper functions in this file need to change.
 */

// All seed posts share one creation timestamp.
const now = new Date().toISOString();

let posts: Post[] = [
  {
    id: randomUUID(),
    title: "Welcome to RTK Query",
    content:
      "This post is served by the Express server in redux-lab/server. Edit, delete, or add more via the API.",
    author: "Admin",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: randomUUID(),
    title: "Queries vs Mutations",
    content:
      "Use builder.query for reads (GET) and builder.mutation for writes (POST/PUT/PATCH/DELETE). Tags keep the cache in sync.",
    author: "Admin",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: randomUUID(),
    title: "Try it out",
    content:
      "Run `pnpm dev`, then hit http://localhost:4000/posts. Add the matching RTK Query endpoints on the client to see caching in action.",
    author: "Admin",
    createdAt: now,
    updatedAt: now,
  },
];

/** Return all posts (newest first). */
export function getAll(): Post[] {
  return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Find a single post by id, or undefined if it does not exist. */
export function getById(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

/** Create a new post from the given payload and store it. */
export function create(data: NewPost): Post {
  const timestamp = new Date().toISOString();
  const post: Post = {
    id: randomUUID(),
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  posts.push(post);
  return post;
}

/** Fully replace the editable fields of a post (PUT). Returns undefined if missing. */
export function replace(id: string, data: NewPost): Post | undefined {
  const existing = getById(id);
  if (!existing) return undefined;
  existing.title = data.title;
  existing.content = data.content;
  existing.author = data.author;
  existing.updatedAt = new Date().toISOString();
  return existing;
}

/** Partially update a post (PATCH). Returns undefined if missing. */
export function update(id: string, data: PostUpdate): Post | undefined {
  const existing = getById(id);
  if (!existing) return undefined;
  if (data.title !== undefined) existing.title = data.title;
  if (data.content !== undefined) existing.content = data.content;
  if (data.author !== undefined) existing.author = data.author;
  existing.updatedAt = new Date().toISOString();
  return existing;
}

/** Remove a post by id. Returns true if something was deleted. */
export function remove(id: string): boolean {
  const before = posts.length;
  posts = posts.filter((p) => p.id !== id);
  return posts.length < before;
}
