import { createContext, useEffect, useReducer, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

const INITAL_KEY_VALUE = "Todo";
const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
};
export const TodoContext = createContext();

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.todoName, id: crypto.randomUUID(), completed: false },
      ];
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);

    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed };
        }

        return todo;
      });
  }
}

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [count, setCount] = useState(() => {
    const localCount = localStorage.getItem("Count");
    return localCount ? parseInt(localCount) : 0;
  });
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const localValue = localStorage.getItem(INITAL_KEY_VALUE, [""]);
    if (localValue == null) {
      return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(INITAL_KEY_VALUE, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("Count", count);
  }, [count]);

  function addTodo(todoName) {
    dispatch({ type: ACTIONS.ADD, payload: { todoName } });
    setNewTodo("");
  }

  function deleteTodo(todoID) {
    todos.map((todo) => {
      if (todo.id === todoID) {
        if (todo.completed !== false) {
          setCount((currentCount) => {
            return currentCount + 1;
          });
        }
      }
    });
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoID } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  return (
    <>
      <TodoContext.Provider
        value={{ addTodo, count, toggleTodo, deleteTodo, todos }}
      >
        <TodoList />
        <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} />
      </TodoContext.Provider>
    </>
  );
}

export default App;
