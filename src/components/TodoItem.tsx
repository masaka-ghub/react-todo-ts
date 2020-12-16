import React, { Dispatch } from "react";
import { removeTodo, TodoActions } from "../reducers/TodoReducer";

type TodoItemProps = {
  index: number;
  value: string;
  dispatch: Dispatch<TodoActions>;
};

const TodoItem: React.FC<TodoItemProps> = ({ index, value, dispatch }) => {
  return (
    <div className="todo-item">
      <button type="button" className="remove-todo-item" onClick={() => dispatch(removeTodo(index))}>
        削除
      </button>
      {value}
    </div>
  );
};

export default TodoItem;
