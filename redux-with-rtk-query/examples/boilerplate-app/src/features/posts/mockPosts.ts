import type { Post } from "./types";

/**
 * Sample data so the UI has something to show. This is purely local/mock data —
 * later you'll replace it with `useGetPostsQuery()` from RTK Query and delete
 * this file.
 */
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Welcome to RTK Query",
    content:
      "These cards are rendered from local mock data. Once you wire up RTK Query, they'll come from the Express server in redux-lab/server.",
    author: "Admin",
    createdAt: "2026-06-18T09:00:00.000Z",
    updatedAt: "2026-06-18T09:00:00.000Z",
  },
  {
    id: "2",
    title: "Queries vs Mutations",
    content:
      "Reads (GET) become builder.query; writes (POST/PUT/PATCH/DELETE) become builder.mutation. Tags keep the cache fresh.",
    author: "Admin",
    createdAt: "2026-06-18T10:30:00.000Z",
    updatedAt: "2026-06-18T10:30:00.000Z",
  },
  {
    id: "3",
    title: "Try editing me",
    content:
      "Click Edit to load this post into the form, or Delete to remove it. All of it is local state for now.",
    author: "You",
    createdAt: "2026-06-18T12:15:00.000Z",
    updatedAt: "2026-06-18T12:15:00.000Z",
  },
];
