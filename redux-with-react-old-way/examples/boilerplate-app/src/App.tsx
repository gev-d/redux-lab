import { useAppDispatch, useAppSelector } from "./hooks/react-redux";
import { selectAllTodos, selectIsLoading } from "./redux/selectors/todos";
import {
  fetchTodos,
  todoToggled,
  todoDeleted,
  allCompleted,
  completedCleared,
} from "./redux/actions";

function App() {
  // useSelector: read pieces of state from the store.
  // The component re-renders whenever the selected value changes.
  const todos = useAppSelector(selectAllTodos);
  const isLoading = useAppSelector(selectIsLoading);

  // useDispatch: get the store's dispatch function to send actions.
  const dispatch = useAppDispatch();

  return (
    <div
      style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Todos</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => dispatch(fetchTodos())} disabled={isLoading}>
          {isLoading ? "Loading…" : "Fetch todos"}
        </button>
        <button onClick={() => dispatch(allCompleted())}>Complete all</button>
        <button onClick={() => dispatch(completedCleared())}>
          Clear completed
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 0",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(todoToggled(todo.id))}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(todoDeleted(todo.id))}
              style={{ marginLeft: "auto" }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
