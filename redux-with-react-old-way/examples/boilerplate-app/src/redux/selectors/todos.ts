import { createSelector } from "reselect";
import type { RootState } from "../store";

// Raw normalized map: `{ [id]: todo }`.
export const selectTodos = (state: RootState) => state.todos.todos;

export const selectIsLoading = (state: RootState) => state.todos.isLoading;

// Array form for rendering / iteration (memoized).
export const selectAllTodos = createSelector([selectTodos], (todos) =>
  Object.values(todos),
);

export const selectTodoIds = createSelector([selectAllTodos], (todos) =>
  todos.map((todo) => todo.id),
);
