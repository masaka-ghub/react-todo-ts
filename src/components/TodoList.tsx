import React, { useEffect, useReducer, useState } from "react";
import todoReducer, { appendTodo, removeAllTodo, updateMessage } from "../reducers/TodoReducer";
import Timer from "./Timer";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState("");

  // todoItems, messageをuseReducerで管理する
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], message: "初期メッセージ" });

  // timerは初期表示offにしておく
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    dispatch(updateMessage(`TODO LIST: ${todoState.todoItems.length}件`));
  }, [todoState.todoItems.length]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    dispatch(appendTodo(input));
  };

  const clearTodo = () => {
    dispatch(removeAllTodo());
  };

  const { message, todoItems } = todoState;
  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>timer表示</button>
      {showTimer && <Timer />}
      <p>{message}</p>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItem key={i} index={i} value={item} dispatch={dispatch} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addTodo}>Todo追加</button>
      <button onClick={clearTodo}>Todo全削除</button>
    </>
  );
};

export default TodoList;
