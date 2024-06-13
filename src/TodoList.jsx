import { useContext } from "react";
import { TodoContext } from "./App";
export function TodoList() {
  const { toggleTodo, deleteTodo, todos } = useContext(TodoContext);
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.name}
            <input
              type="checkbox"
              value={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
