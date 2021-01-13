import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoState } from "../reducers/TodoReducer";

const TodoMessage = () => {
  // useSelectorでtodoリストを参照する
  const todoItems = useSelector((state: TodoState) => state.todoItems);
  const message = useSelector((state: TodoState) => state.message);
  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "UPDATE_MESSAGE", message: `TODO LIST: ${todoItems.length}件` });
  }, [todoItems.length]);

  return <p>{message}</p>;
};

export default TodoMessage;
