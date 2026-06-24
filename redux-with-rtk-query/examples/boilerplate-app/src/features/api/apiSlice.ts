import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Post, NewPost, PostUpdate } from "../posts/types";
export type { Post, NewPost, PostUpdate };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result = [], _, __) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id }) as const),
      ],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_, __, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        // The HTTP URL will be '/fakeApi/posts'
        url: "/posts",
        // This is an HTTP POST request, sending an update
        method: "POST",
        // Include the entire post object as the body of the request
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice;
