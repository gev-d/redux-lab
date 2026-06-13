import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Todo } from "./todosSlice";

// Same job as the old-way `fetchTodos` thunk, but written the Redux Toolkit way.
// `createAsyncThunk` generates `pending` / `fulfilled` / `rejected` action types
// for us; the returned value becomes the `fulfilled` action payload. Handle these
// in the slice via `extraReducers` (e.g. set `isLoading` on pending, write
// `state.todos` on fulfilled).
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  // Simulate an API call
  const todos = await new Promise<Todo[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 0, text: "Learn React", completed: true },
        { id: 1, text: "Learn Redux", completed: false, color: "purple" },
        { id: 2, text: "Build something fun!", completed: false, color: "blue" },
      ]);
    }, 1000);
  });

  return todos;
});
