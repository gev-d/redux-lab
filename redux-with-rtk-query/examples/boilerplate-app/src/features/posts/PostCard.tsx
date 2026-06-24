import type { Post } from "./types";

interface PostCardProps {
  post: Post;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Presentational card for a single post. No data fetching here. */
export function PostCard({ post, onView, onDelete }: PostCardProps) {
  return (
    <article className="post-card">
      <h3 className="post-card__title">
        <button type="button" className="link" onClick={() => onView(post.id)}>
          {post.title}
        </button>
      </h3>
      <p className="post-card__meta">by {post.author}</p>
      <p className="post-card__content">{post.content}</p>
      <div className="post-card__actions">
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
