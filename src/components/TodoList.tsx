import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoDatabase } from "../lib/TodoDatabase";
import { removeAllTodo, setTodo, TodoState } from "../reducers/TodoReducer";
import Timer from "./Timer";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState("");

  // TodoDatabase
  const [db, setDb] = useState<TodoDatabase>();
  useEffect(() => {
    // 初期化時にDBインスタンスをセット
    const db = new TodoDatabase();
    setDb(db);
  }, []);

  // useSelectorでtodoリストを参照する
  const todoItems = useSelector((state: TodoState) => state.todoItems);

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  // timerは初期表示offにしておく
  const [showTimer, setShowTimer] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = async () => {
    await db?.bulkPut([input]);
    const newTodoList = await db?.findAll();
    const todoItems = newTodoList?.map(todo => todo.content);
    if (todoItems) dispatch(setTodo(todoItems));
  };

  const clearTodo = () => {
    dispatch(removeAllTodo());
  };

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>timer表示</button>
      {showTimer && <Timer />}
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
