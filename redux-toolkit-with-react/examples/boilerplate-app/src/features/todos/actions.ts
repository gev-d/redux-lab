import { todosSlice } from "./todosSlice";

// Action creators are generated for each case reducer function in the slice.
// Re-exported here so the slice file stays small and components import actions
// from one place.
export const {
  todoToggled,
  colorSelected,
  todoDeleted,
  allCompleted,
  completedCleared,
  setTodos,
} = todosSlice.actions;
