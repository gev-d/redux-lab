/**
 * Shape of a post stored on the server. The client's RTK Query `Post` type
 * should mirror this so `useGetPostsQuery()` etc. are fully typed.
 */
export interface Post {
  id: string; // generated with crypto.randomUUID()
  title: string;
  content: string;
  author: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

/** Payload accepted when creating a post (POST) or fully replacing one (PUT). */
export type NewPost = Pick<Post, "title" | "content" | "author">;

/** Payload accepted when partially updating a post (PATCH). */
export type PostUpdate = Partial<NewPost>;
