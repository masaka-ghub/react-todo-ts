import React, { useState } from 'react';

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Todoリストを管理
  const [todoItems, setTodoItems] = useState([]);

  return (
    <>
      <div className="list-container" />
      <button onClick={() => alert('Todoを追加する')}>Todo追加</button>
    </>
  );
};

export default TodoList;
