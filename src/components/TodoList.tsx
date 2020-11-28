import React, { useState } from 'react';

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
    setTodoItems(prev => {
      if (prev.some(todo => todo === input)) {
        return prev;
      }
      return [...prev, input];
    });

    // 入力値を削除する
    setInput('');
  };

  const clearTodo = () => {
    setTodoItems([]);
  };

  const removeOwn = () => {};

  return (
    <>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <div key={i} onClick={removeOwn}>
            {item}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addTodo}>Todo追加</button>
      {/* 全削除ボタン */}
      <div>
        <button style={{ backgroundColor: '#f06060' }} onClick={clearTodo}>
          Todo全削除
        </button>
      </div>
    </>
  );
};

export default TodoList;
