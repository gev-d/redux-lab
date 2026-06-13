import type { Dispatch } from "redux";

import type { Todo } from "../../types/todos";

export const todoToggled = (id: number) => ({
  type: "todos/todoToggled",
  payload: id,
});

export const colorSelected = (todoId: number, color: string) => ({
  type: "todos/colorSelected",
  payload: { todoId, color },
});

export const todoDeleted = (id: number) => ({
  type: "todos/todoDeleted",
  payload: id,
});

export const allCompleted = () => ({
  type: "todos/allCompleted",
});

export const completedCleared = () => ({
  type: "todos/completedCleared",
});

export const setTodos = (todos: Todo[]) => ({
  type: "todos/setTodos",
  payload: todos,
});
 
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
