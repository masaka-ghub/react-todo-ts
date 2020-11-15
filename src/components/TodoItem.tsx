import React from 'react';

type TodoItemProps = {
  value: string
}

const TodoItem: React.FC<TodoItemProps> = ({ value })  => {
  return <div className="todo-item">{value}</div>;
}

export default TodoItem;
