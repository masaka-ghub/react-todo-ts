## Todo リストチュートリアル

### 1.React プロジェクトの作成

<<<<<<< HEAD
まず、React のプロジェクトを作成します。create-react-app を使います。  
`--typescript`オプションをつけることで typescript プロジェクトも作成することができる様になっています。

```
// npx create-react-app <プロジェクト名>
npx create-react-app todo-list --typescript
```

ここではプロジェクトの作成は割愛し、作成済みのコミットに同期します。

```
git clone https://github.com/masaka-ghub/react-todo-ts.git
cd react-todo-ts
git reset --hard d5aa714bfb946dcd0846458c0fb4bf2784d4a127
yarn
yarn start
```

これで react のサンプルプロジェクトが起動することと思います。
=======
まず、React のプロジェクトを作成します。create-react-app を使います。

```
npx create-react-app <プロジェクト名>
npx create-react-app todo-list
```

・ここまでのコミット-> `d5aa714bfb946dcd0846458c0fb4bf2784d4a127`
>>>>>>> 3963a63... 5.までのREADME

### 2.Todo リストの親コンポーネント作成

まずは TODO リストの親コンポーネントを作成します。  
`/src/components/`ディレクトリ以下にコンポーネントファイルを作成します。

```
<<<<<<< HEAD
// src/components/TodoList.tsx

=======
// src/components/TodoList.js
>>>>>>> 3963a63... 5.までのREADME
import React from 'react';

const TodoList = () => {
  return (
    <>
      <div className="list-container" />
      <button onClick={() => alert('Todoを追加する')}>Todo追加</button>
    </>
  );
};

export default TodoList;
```

単純に TODO リストを並べる箱と、追加のためのボタンを持たせているだけです。
先頭が空のタグ`<>`になっているものは、return される要素は一つでなければならないと言う制約があるからです。不要なタグをレンダリングしたくない時に使います。`React.Fragment`でも OK です。Fragment は属性をつけることができます。

スタイル

```
// src/index.cssに追加
.list-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  border: solid 1px #000000;
  width: 300px;
  height: 480px;
  background-color: #fff;
}
```

これで TODO リストの親コンポーネントが作成できました。
<<<<<<< HEAD
App.tsx に Todo リストコンポーネントを追加し、表示させてみます。

```
// App.tsx

=======
App.js に Todo リストコンポーネントを追加し、表示させてみます。

```
>>>>>>> 3963a63... 5.までのREADME
import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;

```

とりあえず外枠とボタンは表示されました。  
ボタンを押してもアラート表示がされるだけです。

<<<<<<< HEAD
・ここまでのコミットに同期する->`git reset --hard 7a5b9dcfe07250913026a4e92c454bce7d2c080b`
=======
・ここまでのコミット->`6ec35c37c754b314cc4b44e32d2f2694bcc96980`
>>>>>>> 3963a63... 5.までのREADME

### 3-1.useState で状態を管理する

hooks の一つ、useState を使ってコンポーネントに状態を持たせます。  
<<<<<<< HEAD
TodoList に`inputの入力値`と、`Todoリスト`の二つの状態を定義します。

[useState による定義](https://github.com/masaka-ghub/react-todo-ts/commit/085bf4ab7da3ec0d29cb94e921f931268c2fbebe)
=======
TodoList に input の入力値と、Todo リストの二つの値を定義します。

[useState による定義](https://github.com/masaka-ghub/react-hooks-todo/commit/8071161a48bb66eeb2355258d718884bca55de65#diff-efaef22c970cf38cd94a7e2ec3c146f8L1-R7)
>>>>>>> 3963a63... 5.までのREADME

```
// src/components/TodoList.tsx

-import React from 'react';
+import React, { useState } from 'react';

 const TodoList = () => {
+  // 入力されたテキストを管理
+  const [input, setInput] = useState('');
+  // Todoリストを管理
+  const [todoItems, setTodoItems] = useState([]);
```

<<<<<<< HEAD
input と todoItems の二つの state と、それぞれの setter を useState を使用して定義しました。
useState は変数と setter をまとめて配列で返します。汎用的な書式は以下の様になります。
=======
input と todoItems の二つの state と、それぞれの setter を useState を使用して定義しました。ここでは別々の値で定義していますが、オブジェクト型として一つにまとめる事もできます。

`const [stateObject, setStateObject] = useState({hoge: '', fuga: {}})`...と言った感じです。  
ただ、分けられるものは分けて定義した方が扱いやすいと思います。

useState は変数と setter をまとめて配列で返します。汎用的な書式は
>>>>>>> 3963a63... 5.までのREADME

```
const [state, setState] = useState(initialState);
```

<<<<<<< HEAD
input の初期値は\`\`, todoItems の初期値は[]として定義されました。初期値をセットする場合は useState に引数として渡します。  
`useState('初期値')`

ここでは別々の値で定義していますが、オブジェクト型として一つにまとめる事もできます。

`const [stateObject, setStateObject] = useState({hoge: '', fuga: {}})`...と言った感じです。  
ただ、分けられるものは分けて定義した方が扱いやすいと思います。

#### 3-2.setState で状態を変更する

テキスト入力タグ(`<input type="text">`)で input の値を、button のクリックで todoItems の追加がされるようにしてみます。  
=======
です。input の初期値は\`\`, todoItems の初期値は[]として定義されました。初期値をセットする場合は useState に引数として渡します。  
`useState('初期値')`

#### 3-2.setState で状態を変更する

テキスト入力で input の値を、button のクリックで todoItems の追加がされるようにしてみます。  
>>>>>>> 3963a63... 5.までのREADME
まずはテキスト入力の値を state 側に反映させます。  
useState で受け取った setter 関数を使用します。  
加えて、input の値を別のタグに表示し、変更を確認してみましょう。

```
+  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
+    setInput(e.target.value);
+  };
+
   return (
     <>
       <div className="list-container" />
+      <div>{input}</div>
+      <input type="text" value={input} onChange={handleInput} />
       <button onClick={() => alert('Todoを追加する')}>Todo追加</button>
     </>
   );
 };
```

した入力値が反映されていることが確認できました。

<<<<<<< HEAD
**hands on**

- テキスト入力欄の上部に表示される文字列を、入力文字数に変更してください
- 10 文字を超えた場合にのみ、入力文字数を表示してください
=======
・ここまでのコミット->`7714c8312d2bb7265ce759235b7f69e881ba164c`
>>>>>>> 3963a63... 5.までのREADME

#### 3-3.setState で配列型の値を変更する

次に、ボタンのクリックでに input 入力値を todo に追加できる様にします。
ボタンの`onClick`に、配列で宣言された`todoItems`に input の値を追加する関数を割り当てます。

```
// TodoList.tsx

<<<<<<< HEAD
  // Todoリストを管理
- const [todoItems, setTodoItems] = useState([]);
+ const [todoItems, setTodoItems] = useState<string[]>([]);



=======
>>>>>>> 3963a63... 5.までのREADME
+  const addTodo = () => {
+    todoItems.push(input);
+    setTodoItems(todoItems);
+  };
+
   return (
     <>
       <div className="list-container" />
-      <div>入力値：{input}</div>
+      <div>todoリスト：{todoItems}</div>
       <input type="text" value={input} onChange={handleInput} />
-      <button onClick={() => alert('Todoを追加する')}>Todo追加</button>
+      <button onClick={addTodo}>Todo追加</button>
     </>
   );
 };

```

todoItems に追加し、set する処理を書きました。  
**しかしこれは意図した通りに動きません。**

useState に配列やオブジェクトを使用する場合、中の要素を変更してもコンポーネントは再描画されません。(state の参照先が前回と同じなため)

そのため、新しい配列やオブジェクトを setter に渡す必要があります。  
コードを修正てみます。

```
// TodoList.tsx

   const addTodo = () => {
-    todoItems.push(input);
-    setTodoItems(todoItems);
+    // setterに関数を渡す場合、前回値が引数として使用できる
+    setTodoItems(prev => [...prev, input]);
   };
```

これで`todoItems`に追加される様になりました。  
リスト表示に変えてみましょう。

```
// TodoList.tsx

-      <div className="list-container" />
-      <div>入力値：{input}</div>
+      <div className="list-container">
+        {todoItems.map((item, i) => (
+          <div key={i}>{item}</div>
+        ))}
+      </div>
```

入力値を追加できる様になりました。

・ここまでのコミット->`2875347cb9c132ffabab14ef8cd25bf75d0b8232`

** handson **

1. ボタンをクリックして Todo リストに追加された時、入力した値が消えるようにしてください。
2. Todo リストを全て削除するボタンを追加してください。

#### 4 TodoItem を別のコンポーネントにする

リスト内の要素、`TodoItem`を別のコンポーネントにしておきます。  
TodoItem 用のスタイル定義も行います。

・ここまでのコミット->`95f5fcd4c58517d65f991bcdf54fee00b418b825`

#### 5 useEffect を使う

次は[useEffect](https://ja.reactjs.org/docs/hooks-reference.html#useeffect)を使用して行きます。  
副作用のある処理は基本的にこの useEffect を使用して記述して行きます。

まず Todo リストの件数表示を追加してみましょう。  
useState を使用して、管理するメッセージ state を追加します。

```
// TodoList.tsx

   // Todoリストを管理
   const [todoItems, setTodoItems] = useState<string[]>([]);
+  // 件数表示のメッセージ
+  const [message, setMessage] = useState('初期メッセージ'); // 初期値を適当に入れておく


   return (
     <>
+      <p>{message}</p>
       <div className="list-container">
```

上部にメッセージが表示される様になりました。  
useEffect を使い、Todo リストの件数が変化した時にこのメッセージを変更させてみます。  
useEffect はコンポーネントの**レンダリングが完了した後**に自動的に処理される hooks です。ざっくり説明すると以下のような感じです。

- 第一引数は実行させたい関数
- 第二引数は実行される条件の配列、この配列に指定した値が前回と変わっていると実行される(空配列なら初回のみ)
- return される関数はこのコンポーネントがアンマウントされた時に実行されるクリーンアップ関数

```
// TodoList.tsx


  useEffect(() => {
    setMessage(`TODO LIST: ${todoItems.length}件`);
  }, [todoItems.length]);
```

クラスコンポーネントの

- componentDidMount
- componentDidUpdate
- componentWillUnMount

が一つにまとまったイメージです。

ここでは、Todo リストの件数が変更されていた場合にメッセージを変化させています。  
一般的には Ajax 処理をはじめとした非同期処理や、副作用を伴う処理は useEffect で行われます。

useEffect の cleanup に関しては、別のブランチ`react-todolist-sample_useeffect-cleanup`で例を挙げています。
`git checkout -b react-todolist-sample_useeffect-cleanup origin/react-todolist-sample_useeffect-cleanup`

・ここまでのコミット->`86e4f43010e809e2f53a182575b2c0864ac347d0`

#### 6.useReducer を使う

次は useReducer です。  
Redux で使用していたような Reducer を作成し、そこに繋げる hooks です。
(Redux で使用していた Action,Reducer などほぼ使いまわせると思います)

Redux とは異なり、useState 同様 useReducer を定義したコンポーネントに管理されます。useState より複雑な値を管理したい時に使用されます。

まず、これまで useState で管理し、セッターで変更していた state を useReducer 使用に変更してみます。

・ここまでのコミット->`3c53ab4f2867e738a8a9b51572583e434fa69da8`

### 7.子コンポーネントから親コンポーネントの更新を行う

useReducer の続きになります。
Reducer の処理要求(dispatch)を子コンポーネントに渡せば、子のコンポーネントからコンポーネントの更新が行えます。

Todo それぞれおに削除ボタンを追加してみます。  
TodoItem コンポーネントに削除ボタンを追加しますが、クリックされた時に TodoList から自信を削除するような挙動です。  
TodoList は親コンポーネントの useReducer によって管理されています。

親コンポーネントから渡された Reducer への dispatch を使い、削除処理を実行しています。

・ここまでのコミット->`6381e453ec5db80805a6f3be43a4206c68492e1a`

### 8.Context API と useContext の使用

異なるコンポーネント間で共通して状態を取り扱うため、context API と useContext を使用します。  
これまでは親のコンポーネントが持っている state(TodoState)を子コンポーネントでも参照するため、props と言う形で子のコンポーネントに必要な state を渡していました。  
useContext を使用し、Redux の様に props を介さずに異なるコンポーネントから共通の値にアクセスできる様にします。

まず、context を作成します。  
この context を export する事で、import したコンポーネントは共通的にこの context にアクセスできます。

```
export const TodoContext = createContext();
```

次に先ほど作成した TodoContext から provider を作成します。  
この **provider に渡す value が共通管理したい値です。**  
この例では前回に引き続き、useReducer による state を使用していますが、管理したい値が単純であれば useState でも構いません。

```
const TodoListProvider = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '', lastId: 1 });
  // const [value, setValue] = useState('') の様なシンプルな値などでも良い

  return <TodoContext.Provider value={{ todoState, dispatch }}>{children}</TodoContext.Provider>;
};
```

※ここで出てくる children は React で用意されている[コンポジション](https://ja.reactjs.org/docs/composition-vs-inheritance.html)を利用しています。コンポーネントで囲まれた要素がそのまま入ってきます。

上の例だと、このタグ`<TodoListProvier><div>何か</div></TodoListProvider>`がそのまま children として渡ってきます。

作成した provider でこれまでの TodoList コンポーネントを囲ってあげます。

```
      <TodoListProvider>
        <TodoMessage />
        <TodoList />
      </TodoListProvider>
```

これで、TodoList 側から TodoContext にアクセスする準備ができました。  
TodoList 側から TodoContext にアクセスするために useContext を使用します。

```
/* TodoList */

  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);
```

これで、App.js で用意した context に TodoList からアクセスできる様になりました。

TodoList とは別のコンポーネントからもこの context を使用できる事を確認してみましょう。  
TodoList 内にある、`TodoList: ~件`のメッセージを TodoList の外に出してみます。

新たに TodoMessage.js を作成し、メッセージの表示と更新をこちらのコンポーネントに移動させます。

```
import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../App';

const TodoMessage = () => {
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoState.todoItems.length}件` });
  }, [todoState.todoItems.length]);

  return <p>{todoState.message}</p>;
};

export default TodoMessage;
```

ほぼ TodoList から切り取ってきただけですが、TodoList 同様`useContext(TodoContext)`が有ります。

これを、TodoComponent の外に出します。

```
/* App.js */
function App() {
  return (
    <div className="App">
      <TodoListProvider>
        <TodoMessage />
        <TodoList />
      </TodoListProvider>
    </div>
  );
}
```

これで動かしてみると、これまで同様の動きを見せることと思います。  
state を context で管理することによって、異なるコンポーネントからアクセスできる様になりました。

・ここまでのコミット->`7d6d6d7b1f4d9a341ab2ca39305875f44330c985`

### 9. Redux を使う

useContext による state 管理を Redux に変更してみます。  
まず必要なライブラリを install します。

`yarn add redux react-redux`

必要なライブラリを追加したら、はじめに App.js を編集します。  
createContext で作成していた context を、createStore により作成した store に置き換えします。  
context ではなく store で

```
-export const TodoContext = createContext();
-
-const TodoListProvider = ({ children }) => {
-  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '' });
-  return <TodoContext.Provider value={{ todoState, dispatch }}>{children}</TodoContext.Provider>;
-};

+const store = createStore(todoReducer);
```

続いて context.Provider で括っていた部分を、react-redux の Provider に変更します。

```
-      <TodoListProvider>
+      <Provider store={store}>
         <TodoMessage />
         <TodoList />
-      </TodoListProvider>
+      </Provider>
```

これで Provider 以下のコンポーネントから共通の store にアクセスする準備ができました。

続いて reducer です。Redux を使用する場合は、state に初期値を与えます。

```
/* TodoReducer.js */
const initialState = { todoItems: [], messge: '', lastId: 1 };

const todoReducer = (state = initialState, action) => {
...
```

TodoList 側では Redux を使用するために seSelector と useDispatch を追加します。  
useSelector で store の state を、useDispatch で store への dispatch 関数に繋ぎます。

context を使用していた部分を置き換えて行きます。

TodoMessage の方も同様に useSelector と useDispatch に変更します。

ここまでのコミット->`b879411cf5e691c1bb42006bf0e41cdda4e1e76b`
