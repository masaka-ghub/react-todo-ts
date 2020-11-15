import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Todoリストを管理
  const [todoItems, setTodoItems] = useState<string[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    // setterに関数を渡す場合、前回値が引数として使用できる
    setTodoItems(prev => [...prev, input]);
  };

  return (
    <>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItem key={i} value={item} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addTodo}>Todo追加</button>
    </>
  );
};

export default TodoList;
