import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  allCompleted,
  colorSelected,
  completedCleared,
  todoDeleted,
  todoToggled,
} from "./actions";
import { fetchTodos } from "./asyncThunks";
import { selectAllTodos, selectIsLoading } from "./selectors";

const COLORS = ["", "purple", "blue", "green", "orange", "red"];

export function TodosList() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectAllTodos);
  const isLoading = useAppSelector(selectIsLoading);

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <section style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Todos</h1>

      <button onClick={() => dispatch(fetchTodos())} disabled={isLoading}>
        {isLoading ? "Loading…" : "Reload todos"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(todoToggled(todo.id))}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.color || "inherit",
              }}
            >
              {todo.text}
            </span>

            <select
              value={todo.color ?? ""}
              onChange={(e) => dispatch(colorSelected(todo.id, e.target.value))}
            >
              {COLORS.map((color) => (
                <option key={color} value={color}>
                  {color || "no color"}
                </option>
              ))}
            </select>

            <button onClick={() => dispatch(todoDeleted(todo.id))}>✕</button>
          </li>
        ))}
      </ul>

      <footer style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <span>{remaining} remaining</span>
        <span style={{ display: "flex", gap: 8 }}>
          <button onClick={() => dispatch(allCompleted())}>Mark all complete</button>
          <button onClick={() => dispatch(completedCleared())}>Clear completed</button>
        </span>
      </footer>
    </section>
  );
}
