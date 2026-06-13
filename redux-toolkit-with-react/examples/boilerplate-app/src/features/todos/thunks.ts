import type { Dispatch } from "@reduxjs/toolkit";

import { setTodos } from "./actions";

// Classic Redux "thunk" (a function that returns a function), the same pattern
// used in the old-way app. No `createAsyncThunk` — just dispatch a plain action
// once the async work finishes.
export const fetchTodos = () => (dispatch: Dispatch) => {
  // Simulate an API call
  setTimeout(() => {
    const todos = [
      { id: 0, text: "Learn React", completed: true },
      { id: 1, text: "Learn Redux", completed: false, color: "purple" },
      { id: 2, text: "Build something fun!", completed: false, color: "blue" },
    ];

    dispatch(setTodos(todos));
  }, 1000);
};
