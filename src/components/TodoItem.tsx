import React from "react";
import { useTodoDataSource } from "../hooks/UseTodoDataSource";

type TodoItemProps = {
  index: number;
  value: string;
};

const TodoItem: React.FC<TodoItemProps> = ({ index, value }) => {
  const { remove } = useTodoDataSource();

  return (
    <div className="todo-item">
      <button type="button" className="remove-todo-item" onClick={() => remove(index)}>
        削除
      </button>
      {value}
    </div>
  );
};

export default TodoItem;
