import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTodoDataSource } from "../hooks/UseTodoDataSource";
import Timer from "./Timer";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState("");

  // カスタムフックからTODOリストと処理関数を取得
  const { todoItems, put, clear } = useTodoDataSource();

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  // timerは初期表示offにしておく
  const [showTimer, setShowTimer] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    put(input);
  };

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>timer表示</button>
      {showTimer && <Timer />}
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItem key={i} index={i} value={item} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addTodo}>Todo追加</button>
      <button onClick={clear}>Todo全削除</button>
    </>
  );
};

export default TodoList;
