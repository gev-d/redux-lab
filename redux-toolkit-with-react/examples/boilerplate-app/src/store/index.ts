import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../features/todos/todosSlice";

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
  },
});

// Inferred types for use throughout the app (typed hooks live in `./hooks`).
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
