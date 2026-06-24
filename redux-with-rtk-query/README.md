# RTK Query

RTK Query is an advanced data-fetching and caching tool designed to simplify the common cases of loading data in a web application. It's built on top of the Redux Toolkit core and leverages RTK APIs like `createSlice` and `createAsyncThunk` under the hood — so you don't have to hand-write data-fetching and caching logic yourself.

RTK Query ships **inside** the Redux Toolkit package, and the Redux team recommends it as the **default approach for data fetching** in Redux apps.

---

## In this lab

This folder is a runnable example backed by a small Express server:

- **Client (UI):** [`examples/boilerplate-app`](examples/boilerplate-app) — Vite + React + RTK Query. Run with `pnpm dev` → http://localhost:5173
- **Server (API):** [`../server`](../server) — Express posts CRUD. Run with `pnpm dev` → http://localhost:4000

Start both (each in its own terminal) to see queries, mutations, cache invalidation, and selectors working end-to-end.

---

## Motivation

Web apps normally need to fetch data from a server, send updates back, and keep the client cache in sync with the server. In practice that means also handling:

- Tracking **loading state** to show spinners
- **Avoiding duplicate requests** for the same data
- **Optimistic updates** to make the UI feel faster
- Managing **cache lifetimes** as the user navigates

You *can* build all of this with `createAsyncThunk` + `createSlice`, but it's a lot of manual work: create the thunk, make the request, pull fields out of the response, add loading-state fields, write `extraReducers` for pending/fulfilled/rejected, and hand-write every state update.

The community has realized that **"data fetching & caching" is a different concern than "state management."** RTK Query is purpose-built for the data-fetching half, so you stop writing that boilerplate.

---

## Bundle size

RTK Query adds a fixed, one-time amount to your bundle. Because it builds on Redux Toolkit and React-Redux, the added size depends on whether you already use those:

| Situation | Approx. min+gzip |
| --- | --- |
| Already using RTK | ~9 kB (RTK Query) + ~2 kB (hooks) |
| Not using RTK, without React | ~17 kB (RTK + deps + RTK Query) |
| Not using RTK, with React | ~19 kB + React-Redux (peer dependency) |

---

## The default: one `createApi` per backend

> Your application is expected to have only **one `createApi` call** for a given backend. That one API slice should contain **all endpoints that talk to the same base URL.**

For example, `/posts` and `/users` on the same server belong in the **same** API slice. Keeping them together is what makes RTK Query's coordination features work:

- **Tag-based cache invalidation** (`providesTags` / `invalidatesTags`) only connects endpoints **within the same `createApi`**. A mutation can only auto-refetch a query if they live in the same api.
- **One reducer + one middleware** to register in the store.
- **Shared config** — one `baseQuery`, `baseUrl`, auth headers, etc.

### Splitting endpoints across files — `injectEndpoints`

Wanting per-feature files does **not** mean you need multiple API slices. Define one base api, then have each feature inject its endpoints into it:

```ts
// features/comments/commentsApiSlice.ts
import { apiSlice } from "../api/apiSlice"; // the ONE api

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: ["Comment"],
    }),
    addComment: builder.mutation<Comment, NewComment>({
      query: (body) => ({ url: "/comments", method: "POST", body }),
      invalidatesTags: ["Comment", "Post"], // can still invalidate Posts!
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApiSlice;
```

You get per-feature organization **and** keep one shared cache, one middleware, and cross-feature tag invalidation.

---

## Multiple API slices — when, where & trade-offs

The "one api" rule is about **coordination**, not a hard limit. You *can* have several `createApi` instances. The right question is: **do these endpoints need to share a cache or invalidate each other?**

> ⚠️ Don't confuse this with `createSlice`. You normally have **many** `createSlice` feature slices (one per feature) — that's encouraged. The "one api" guidance applies **only to `createApi` (RTK Query)**.

### When to use multiple `createApi`

Use separate API slices when the domains are **genuinely independent** — they never coordinate. Classic example: a **posts** API and a **music** API that have nothing to do with each other.

The strongest signals to split:

- **Different backends / base URLs** (e.g. `localhost:4000` for posts, a streaming service for music)
- **Different `baseQuery` or auth** (one needs a token, the other doesn't)
- You **never** need a mutation in one to invalidate/refetch a query in the other

If instead they hit the **same backend** and *might* coordinate later, prefer **one api + `injectEndpoints`** — it's the safer default.

### Where it lives (store wiring)

Each `createApi` produces its own reducer **and** middleware, so register both. Each api needs a **distinct `reducerPath`** (the default is `"api"`, so two defaults would collide):

```ts
// features/posts/postsApi.ts
export const postsApi = createApi({ reducerPath: "postsApi", /* ... */ });

// features/music/musicApi.ts
export const musicApi  = createApi({ reducerPath: "musicApi", /* ... */ });
```

```ts
// store/index.ts
export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, musicApi.middleware),
});

setupListeners(store.dispatch); // one call covers all apis
```

### Pros & cons

| | Single `createApi` (+ `injectEndpoints`) | Multiple `createApi` |
| --- | --- | --- |
| **Cross-endpoint tag invalidation** | ✅ Works across all features | ❌ Tags **don't** cross api boundaries |
| **Store wiring** | One reducer + one middleware | One reducer + middleware **per api** |
| **Shared `baseQuery` / auth / config** | ✅ Defined once | Configured per api |
| **Per-feature file organization** | ✅ via `injectEndpoints` | ✅ naturally separate |
| **Different backends / auth schemes** | Awkward to mix | ✅ Clean separation |
| **Cache isolation between domains** | Shared cache | ✅ Independent cache islands |

**Rule of thumb:**

- Same backend, may need to coordinate → **one api**, split files with `injectEndpoints`.
- Unrelated services (posts vs music) that never share tags → **multiple apis** is correct, and the extra wiring cost is essentially free since you didn't need coordination anyway.

---

## Accessing cached data: hooks vs selectors

**Default — use the query hooks.** You normally read cached data with the generated hooks; don't hand-write `useSelector`/`useEffect` to fetch:

```ts
const { data, isLoading, isError } = useGetPostsQuery();
```

If multiple components need the same data, **call the same hook with the same args** in each. RTK Query dedupes — the data is fetched once and every component re-renders as needed:

```ts
useGetPostQuery("123"); // call in 3 components → 1 request, all stay in sync
```

**You can also read the cache via selectors.** Each endpoint exposes a selector for its cached result, which you read with `useSelector` — this does **not** trigger a fetch, it just reflects whatever data is already cached:

```ts
const selectPostsResult = apiSlice.endpoints.getPosts.select();

// memoize derived data so it only recomputes when the posts actually change
const selectPostsStats = createSelector(selectPostsResult, (result) => {
  const posts = result.data ?? [];
  return { total: posts.length };
});

const { total } = useAppSelector(selectPostsStats);
```

Because the selector only *reads*, it relies on something else having fetched the query (e.g. a list component using `useGetPostsQuery`). When that cache entry updates — say, after a mutation invalidates its tag — every subscriber, hook or selector, re-renders. See [`features/posts/PostsStats.tsx`](examples/boilerplate-app/src/features/posts/PostsStats.tsx) for a working example.
