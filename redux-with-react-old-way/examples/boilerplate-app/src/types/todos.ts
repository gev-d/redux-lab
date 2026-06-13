// A single todo item.
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color?: string;
};

// Normalized lookup map: todo id -> todo.
// e.g. { 0: {…}, 1: {…} } instead of an array.
export type TodosById = Record<Todo["id"], Todo>;

// Shape of the `todos` slice in the store.
export type TodosState = {
  isLoading: boolean;
  todos: TodosById;
};
