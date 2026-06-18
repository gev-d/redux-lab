import { useState } from "react";
import type { NewPost, Post } from "./types";
import { mockPosts } from "./mockPosts";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";

/** Throwaway id generator for the local demo (the server will assign real ids). */
function makeLocalId() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * The page that ties the UI together. For now it owns the posts in local
 * component state so everything is interactive without a backend.
 *
 * This is the component you'll later "upgrade": swap `useState(mockPosts)` for
 * `useGetPostsQuery()` and the handlers for `useAddNewPostMutation()` /
 * update / delete mutations. The presentational pieces below won't change.
 */
export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  function handleAdd(values: NewPost) {
    const now = new Date().toISOString();
    const post: Post = { id: makeLocalId(), ...values, createdAt: now, updatedAt: now };
    setPosts((prev) => [post, ...prev]);
  }

  function handleUpdate(values: NewPost) {
    if (!editingPost) return;
    const now = new Date().toISOString();
    setPosts((prev) =>
      prev.map((post) =>
        post.id === editingPost.id ? { ...post, ...values, updatedAt: now } : post,
      ),
    );
    setEditingPost(null);
  }

  function handleDelete(id: string) {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    if (editingPost?.id === id) setEditingPost(null);
  }

  return (
    <main className="posts-page">
      <header className="posts-page__header">
        <h1>Posts</h1>
        <p className="subtitle">
          UI only — backed by local state for now. Wire up RTK Query next.
        </p>
      </header>

      <PostForm
        key={editingPost?.id ?? "new"}
        initialPost={editingPost}
        onSubmit={editingPost ? handleUpdate : handleAdd}
        onCancel={editingPost ? () => setEditingPost(null) : undefined}
      />

      <PostList posts={posts} onEdit={setEditingPost} onDelete={handleDelete} />
    </main>
  );
}
