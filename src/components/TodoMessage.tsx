import React, { useContext, useEffect } from "react";
import { todoContext } from "../App";

const TodoMessage = () => {
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(todoContext);

  useEffect(() => {
    dispatch({ type: "UPDATE_MESSAGE", message: `TODO LIST件数: ${todoState.todoItems.length}件` });
  }, [todoState.todoItems.length]);

  return <p>{todoState.message}</p>;
};

export default TodoMessage;
