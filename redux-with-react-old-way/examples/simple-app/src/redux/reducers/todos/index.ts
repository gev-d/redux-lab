import { produce } from "immer";

import { initialState } from "./initialState";

// `produce(recipe, initialState)` returns a reducer. Inside the recipe we can
// "mutate" the `draft` directly — Immer produces the next immutable state for us.
const todosReducer = produce((draft, action: any) => {
  switch (action.type) {
    case "todos/todoToggled": {
      const todo = draft.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      break;
    }
    case "todos/colorSelected": {
      const { color, todoId } = action.payload;
      const todo = draft.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.color = color;
      }
      break;
    }
    case "todos/todoDeleted": {
      draft.todos = draft.todos.filter((t) => t.id !== action.payload);
      break;
    }
    case "todos/allCompleted": {
      draft.todos.forEach((todo) => {
        todo.completed = true;
      });
      break;
    }
    case "todos/completedCleared": {
      draft.todos = draft.todos.filter((todo) => !todo.completed);
      break;
    }
    case "todos/setTodos": {
      draft.todos = action.payload;
      draft.isLoading = false;
      break;
    }
  }
}, initialState);

export default todosReducer;
