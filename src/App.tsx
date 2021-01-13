import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoMessage from "./components/TodoMessage";
import todoReducer from "./reducers/TodoReducer";

const store = createStore(todoReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoMessage />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
