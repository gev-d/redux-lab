import { useState } from "react";
import type { NewPost } from "./types";
import { PostForm } from "./PostForm";
import { useGetPostQuery, useEditPostMutation } from "../api/apiSlice";

interface SinglePostViewProps {
  postId: string;
  onClose: () => void;
}

/**
 * Fetches a single post by id (via the `getPost` query) and lets you edit it
 * in place. Switching to edit mode reuses PostForm; saving fires the `editPost`
 * mutation, which invalidates the "Post" tag so both this view and the list
 * refetch the updated data.
 */
export function SinglePostView({ postId, onClose }: SinglePostViewProps) {
  const { data: post, isLoading, isError } = useGetPostQuery(postId);
  const [updatePost] = useEditPostMutation();
  const [isEditing, setIsEditing] = useState(false);

  async function handleSave(values: NewPost) {
    await updatePost({ id: postId, ...values });
    setIsEditing(false);
  }

  return (
    <section className="post-view">
      <div className="post-view__bar">
        <span className="post-view__label">
          {isEditing ? "Editing post" : "Current post"}
        </span>
        <button type="button" className="secondary" onClick={onClose}>
          Close
        </button>
      </div>

      {isLoading && <p className="empty">Loading post…</p>}
      {isError && <p className="empty">Couldn't load that post.</p>}

      {post && !isEditing && (
        <article>
          <h2 className="post-view__title">{post.title}</h2>
          <p className="post-card__meta">by {post.author}</p>
          <p className="post-card__content">{post.content}</p>
          <p className="post-view__dates">
            Updated {new Date(post.updatedAt).toLocaleString()}
          </p>
          <div className="post-card__actions">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit this post
            </button>
          </div>
        </article>
      )}

      {post && isEditing && (
        <PostForm
          initialPost={post}
          onSubmit={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </section>
  );
}
