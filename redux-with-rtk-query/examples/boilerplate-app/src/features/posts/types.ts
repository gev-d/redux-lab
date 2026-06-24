/**
 * UI-side post types. These mirror the shape returned by the Express server in
 * redux-lab/server. When you add the RTK Query layer, you can re-export these
 * from the api/postsSlice instead.
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/** Fields the user supplies when creating or editing a post. */
export type NewPost = Pick<Post, "title" | "content" | "author">;

/** Payload for editing a post: its id plus the editable fields. */
export type PostUpdate = Pick<Post, "id"> & NewPost;
