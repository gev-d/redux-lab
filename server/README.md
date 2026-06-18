# Posts API server

A tiny **Express + TypeScript** REST API with full CRUD for `posts`, built to practice
**RTK Query** against a real backend. Data lives in an **in-memory array** (see
[`src/db.ts`](src/db.ts)) and resets to the seed data every time the server restarts — no
database to install.

## Run it

```bash
cd redux-lab/server
pnpm install
pnpm dev          # starts on http://localhost:4000 with auto-reload (tsx watch)
```

Other scripts:

| Script         | What it does                                      |
| -------------- | ------------------------------------------------- |
| `pnpm dev`     | Run with auto-reload via `tsx watch` (use this)   |
| `pnpm start`   | Run once via `tsx` (no watch)                     |
| `pnpm build`   | Type-check + compile to `dist/`                   |
| `pnpm serve`   | Run the compiled output (`node dist/index.js`)    |

Environment variables:

- `PORT` — server port (default `4000`).
- `DELAY_MS` — artificial delay added to every request so RTK Query loading states are
  visible (default `300`; set to `0` to disable).

## Endpoints

Base URL: `http://localhost:4000`

| Method   | Path         | Body          | Success        | Notes                          |
| -------- | ------------ | ------------- | -------------- | ------------------------------ |
| `GET`    | `/health`    | —             | `200 {status}` | Sanity check                   |
| `GET`    | `/posts`     | —             | `200 Post[]`   | All posts, newest first        |
| `GET`    | `/posts/:id` | —             | `200 Post`     | `404` if not found             |
| `POST`   | `/posts`     | `NewPost`     | `201 Post`     | Generates `id` + timestamps    |
| `PUT`    | `/posts/:id` | `NewPost`     | `200 Post`     | Full replace; `404` if missing |
| `PATCH`  | `/posts/:id` | `PostUpdate`  | `200 Post`     | Partial update; `404` if missing |
| `DELETE` | `/posts/:id` | —             | `204`          | `404` if missing               |

`POST` / `PUT` require `title`, `content`, and `author`; missing fields return `400` with a
JSON error.

### Post shape

```ts
interface Post {
  id: string;        // uuid
  title: string;
  content: string;
  author: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

type NewPost = Pick<Post, "title" | "content" | "author">; // POST / PUT body
type PostUpdate = Partial<NewPost>;                         // PATCH body
```

## Example requests

```bash
# list
curl http://localhost:4000/posts

# create
curl -X POST http://localhost:4000/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hi","content":"world","author":"me"}'

# read one
curl http://localhost:4000/posts/<id>

# partial update
curl -X PATCH http://localhost:4000/posts/<id> \
  -H 'Content-Type: application/json' \
  -d '{"title":"Edited"}'

# delete
curl -i -X DELETE http://localhost:4000/posts/<id>
```

## Connect from the RTK Query client

The client lives in
[`../redux-with-rtk-query/examples/boilerplate-app`](../redux-with-rtk-query/examples/boilerplate-app)
and its `apiSlice.ts` currently uses `baseUrl: "/fakeApi"`. Two ways to point it at this server:

**Option 1 — call the server directly (needs CORS, which is enabled here):**

```ts
// src/features/api/apiSlice.ts
baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
```

**Option 2 — keep `baseUrl: "/fakeApi"` and add a Vite proxy:**

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/fakeApi": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fakeApi/, ""),
      },
    },
  },
});
```

Either way, the existing endpoints (`getPosts` → `GET /posts`, `getPost` → `GET /posts/:id`,
`addNewPost` → `POST /posts`) line up with this server. Add `updatePost` (`PATCH`) and
`deletePost` (`DELETE`) endpoints on the client to practice the rest of CRUD.
