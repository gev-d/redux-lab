import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/hooks";
import { apiSlice } from "../api/apiSlice";

/**
 * Demonstrates reading RTK Query data through SELECTORS instead of the
 * `useGetPostsQuery()` hook.
 *
 * `apiSlice.endpoints.getPosts.select()` builds a selector for the cached
 * result of the `getPosts` query (the same cache entry the list subscribes to).
 * Reading it here does NOT start a new request — this component just reflects
 * whatever data the list already fetched. If nothing has fetched `getPosts`
 * yet, `data` is undefined and `status` is "uninitialized".
 */
const selectPostsResult = apiSlice.endpoints.getPosts.select();

/**
 * `createSelector` memoizes derived data, so these stats are only recomputed
 * when the cached posts array actually changes.
 */
const selectPostsStats = createSelector(selectPostsResult, (postsResult) => {
  const posts = postsResult.data ?? [];
  const authors = new Set(posts.map((post) => post.author));
  return {
    total: posts.length,
    authors: authors.size,
    status: postsResult.status,
  };
});

export function PostsStats() {
  const { total, authors, status } = useAppSelector(selectPostsStats);

  if (status === "pending" && total === 0) {
    return <p className="empty">Loading stats…</p>;
  }

  return (
    <section className="posts-stats">
      <span>
        <strong>{total}</strong> posts
      </span>
      <span aria-hidden>·</span>
      <span>
        <strong>{authors}</strong> authors
      </span>
    </section>
  );
}
