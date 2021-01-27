import React, { Dispatch } from "react";
import { removeTodo, TodoActions, done } from "../reducers/TodoReducer";

type TodoItemProps = {
  index: number;
  isDone: boolean;
  value: string;
  dispatch: Dispatch<TodoActions>;
};

const TodoItem: React.FC<TodoItemProps> = ({
  index,
  isDone,
  value,
  dispatch,
}) => {
  console.log(`todoItem ${index} がレンダリングされました。`)

  return (
    <div className="todo-item">
      <div className="button-area" >
      {!isDone && (
        <button
          type="button"
          className="status-button-todo-item"
          onClick={() => dispatch(done(index))}
        >
          完了
        </button>
      )}
      </div>
      <span style={isDone ? { textDecorationLine: "line-through" } : {}}>
        {value}
      </span>
      <button
        type="button"
        className="remove-todo-item"
        onClick={() => dispatch(removeTodo(index))}
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;
