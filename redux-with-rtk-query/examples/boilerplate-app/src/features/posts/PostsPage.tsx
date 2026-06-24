import { useState } from "react";
import type { NewPost } from "./types";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { SinglePostView } from "./SinglePostView";
import { Modal } from "./Modal";
import { PostsStats } from "./PostsStats";
import { useGetPostsQuery, useAddNewPostMutation } from "../api/apiSlice";

/**
 * Container for the posts UI. Data comes from RTK Query; the presentational
 * pieces (PostForm, PostList, PostCard, SinglePostView) just render props.
 */
export function PostsPage() {
  // UI-only state.
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { data: posts = [] } = useGetPostsQuery();
  const [addNewPost] = useAddNewPostMutation();

  async function handleAdd(values: NewPost) {
    await addNewPost(values).unwrap();
  }

  // TODO: const [deletePost] = useDeletePostMutation();
  function handleDelete(id: string) {
    // await deletePost(id).unwrap();
    console.log("delete post", id);
  }

  return (
    <main className="posts-page">
      <header className="posts-page__header">
        <h1>Posts</h1>
        <p className="subtitle">Click a post title to view it.</p>
        <PostsStats />
      </header>

      <PostForm key={"new"} onSubmit={handleAdd} onCancel={undefined} />

      {selectedPostId && (
        <Modal onClose={() => setSelectedPostId(null)}>
          <SinglePostView
            key={selectedPostId}
            postId={selectedPostId}
            onClose={() => setSelectedPostId(null)}
          />
        </Modal>
      )}

      <PostList
        posts={posts}
        onView={setSelectedPostId}
        onDelete={handleDelete}
      />
    </main>
  );
}
