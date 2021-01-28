import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendTodo, removeAllTodo, TodoActions, TodoState } from "../reducers/TodoReducer";
import Timer from "./Timer";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState("");

  // inputDOMへの参照用
  const inputRef = useRef<HTMLInputElement>(null)

  // useSelectorでtodoリストを参照する
  const todoItems = useSelector((state: TodoState) => state.todoItems);

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  // timerは初期表示offにしておく
  const [showTimer, setShowTimer] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    dispatch(appendTodo({isDone: false, value: input}));
    inputRef.current?.focus()
  };

  const clearTodo = () => {
    dispatch(removeAllTodo());
    inputRef.current?.focus()
  };

  const loggingDispatch = useCallback((action: TodoActions) => {
    console.log(action)
    return dispatch(action)
  }, [dispatch])

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>timer表示</button>
      {showTimer && <Timer />}
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItem key={i} index={i} isDone={item.isDone} value={item.value} dispatch={loggingDispatch} />
        ))}
      </div>
      <input ref={inputRef} type="text" value={input} onChange={handleInput} />
      <button onClick={addTodo}>Todo追加</button>
      <button onClick={clearTodo}>Todo全削除</button>
    </>
  );
};

export default TodoList;
