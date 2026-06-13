import type { RootState } from "../../store";
import { todosAdapter } from "./todosSlice";

// Memoized selectors derived from the entity adapter. `selectAll` returns the
// todos as an array; `selectById` / `selectIds` / `selectTotal` come for free.
// The input selector tells the adapter where its slice lives in the store.
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  selectTotal: selectTodosTotal,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

// Plain (non-adapter) selectors for the slice's extra fields.
export const selectIsLoading = (state: RootState) => state.todos.isLoading;
