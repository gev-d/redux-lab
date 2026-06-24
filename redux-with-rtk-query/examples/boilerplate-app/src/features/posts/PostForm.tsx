import { useState, type FormEvent } from "react";
import type { NewPost, Post } from "./types";

interface PostFormProps {
  /** When provided, the form is in "edit" mode and pre-filled. */
  initialPost?: Post | null;
  onSubmit: (values: NewPost) => void;
  onCancel?: () => void;
}

/**
 * Controlled add/edit form. Holds its own input state only — submitting just
 * calls `onSubmit` with the values; the parent decides what to do with them.
 *
 * Tip: give this component a `key` that changes per edited post so React
 * re-mounts it (and resets the inputs) when you switch which post you edit.
 */
export function PostForm({ initialPost, onSubmit, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [author, setAuthor] = useState(initialPost?.author ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
 
  const isEditing = Boolean(initialPost);
  const canSave =
    title.trim() !== "" && content.trim() !== "" && author.trim() !== "";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSave) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });
    if (!isEditing) {
      setTitle("");
      setAuthor("");
      setContent("");
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit post" : "Add a new post"}</h2>

      <label>
        Title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Post title"
        />
      </label>

      <label>
        Author
        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        Content
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="What's on your mind?"
          rows={4}
        />
      </label>

      <div className="post-form__actions">
        <button type="submit" disabled={!canSave}>
          {isEditing ? "Save changes" : "Add post"}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
