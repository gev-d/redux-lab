import { produce } from "immer";

import { initialState } from "./initialState";
import type { TodosState } from "../../../types/todos";

// `produce(recipe, initialState)` returns a reducer. Inside the recipe we can
// "mutate" the `draft` directly — Immer produces the next immutable state for us.
// State is normalized: `draft.todos` is a map of `id -> todo`.
const todosReducer = produce((draft: TodosState, action: any) => {
  switch (action.type) {
    case "todos/todoToggled": {
      draft.todos[action.payload].completed =
        !draft.todos[action.payload].completed;
      break;
    }
    case "todos/colorSelected": {
      const { color, todoId } = action.payload;
      draft.todos[todoId].color = color;
      break;
    }
    case "todos/todoDeleted": {
      delete draft.todos[action.payload];
      break;
    }
    case "todos/allCompleted": {
      Object.values(draft.todos).forEach((todo) => {
        todo.completed = true;
      });
      break;
    }
    case "todos/completedCleared": {
      Object.values(draft.todos)
        .filter((todo) => todo.completed)
        .forEach((todo) => {
          delete draft.todos[todo.id];
        });
      break;
    }
    case "todos/setTodos": {
      draft.todos = action.payload.reduce((acum: any, todo: any) => {
        acum[todo.id] = todo;
        return acum;
      }, {});
      draft.isLoading = false;
      break;
    }
  }
}, initialState);

export default todosReducer;
