import { createSelector } from "reselect";
import type { RootState } from "../store";

export const selectTodos = (state: RootState) => state.todos.todos;

export const selectIsLoading = (state: RootState) => state.todos.isLoading;

export const selectTodoIds = createSelector([selectTodos], (todos) =>
  todos.map((todo: any) => todo.id),
);
