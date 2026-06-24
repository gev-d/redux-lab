import type { Post } from "./types";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Renders the grid of post cards, or an empty-state message. */
export function PostList({ posts, onView, onDelete }: PostListProps) {
  if (posts.length === 0) {
    return <p className="empty">No posts yet — add one above.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
