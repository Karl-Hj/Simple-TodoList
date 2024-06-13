import { useContext } from "react";
import { TodoContext } from "./App";

export function TodoForm({ newTodo, setNewTodo }) {
  const { addTodo, count } = useContext(TodoContext);

  return (
    <div>
      <label htmlFor="nameField">Todo List</label>
      <input
        id="nameField"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={() => addTodo(newTodo)}>Add Todo</button>
      <br />
      Completed Tasks: {count}
    </div>
  );
}
