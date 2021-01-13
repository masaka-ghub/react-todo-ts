import React, { createContext, useReducer } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoMessage from "./components/TodoMessage";
import todoReducer, { Store } from "./reducers/TodoReducer";

export const todoContext = createContext<Store>({} as Store);

const TodoListProvider: React.FC = ({ children }): JSX.Element => {
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], message: "" });
  return <todoContext.Provider value={{ todoState, dispatch }}>{children}</todoContext.Provider>;
};

function App() {
  return (
    <TodoListProvider>
      <div className="App">
        <TodoMessage />
        <TodoList />
      </div>
    </TodoListProvider>
  );
}

export default App;
