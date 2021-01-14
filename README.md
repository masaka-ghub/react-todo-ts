## Todo リストチュートリアル

### 1.React プロジェクトの作成

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

### 2.Todo リストの親コンポーネント作成

まずは TODO リストの親コンポーネントを作成します。  
`/src/components/`ディレクトリ以下にコンポーネントファイルを作成します。

```
// src/components/TodoList.tsx

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
App.tsx に Todo リストコンポーネントを追加し、表示させてみます。

```
// App.tsx

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

・ここまでのコミットに同期する->`git reset --hard 5ebf6741eb7a8092f8fdd71ca446e59ca46eb9cb`

### 3-1.useState で状態を管理する

hooks の一つ、useState を使ってコンポーネントに状態を持たせます。  
TodoList に`inputの入力値`と、`Todoリスト`の二つの状態を定義します。

[useState による定義](https://github.com/masaka-ghub/react-todo-ts/commit/085bf4ab7da3ec0d29cb94e921f931268c2fbebe)

```
// src/components/TodoList.tsx

-import React from 'react';
+import React, { useState } from 'react';

 const TodoList = () => {
+  // 入力されたテキストを管理
+  const [input, setInput] = useState('');
+  // Todoリストを管理
+  const [todoItems, setTodoItems] = useState([]);

   return (
```

input と todoItems の二つの state と、それぞれの setter を useState を使用して定義しました。
useState は変数と setter をまとめて配列で返します。分割代入を利用して以下のような書式で使われます。

```
const [state, setState] = useState(initialState);
```

input の初期値は`''`, todoItems の初期値は`[]`として定義されました。

ここでは別々の値で定義していますが、オブジェクト型として一つにまとめる事もできます。

`const [stateObject, setStateObject] = useState({hoge: '', fuga: {}})`...と言った感じです。  
ただ、分けられるものは分けて定義した方が扱いやすいと思います。  
後述しますが、複雑な state を管理する場合は`useReducer`の利用を検討したほうが良いです。

### 3-2.setState で状態を変更する

テキスト入力タグ(`<input type="text">`)で input の値を、button のクリックで todoItems の追加がされるようにしてみます。  
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

**hands on**

- テキスト入力欄の上部に表示される文字列を、入力文字数に変更してください
- 10 文字を超えた場合にのみ、入力文字数を表示してください

### 3-3.setState で配列型の値を変更する

次に、ボタンのクリックで input 入力値を todo に追加できる様にします。  
ボタンの`onClick`に、配列で宣言された`todoItems`に input の値を追加する関数を割り当てます。  
`todoItems`は string のリストにするため、型の指定が必要です。  
`useState`にジェネリクス型を追加します。

```
// TodoList.tsx

  // Todoリストを管理
- const [todoItems, setTodoItems] = useState([]);
+ const [todoItems, setTodoItems] = useState<string[]>([]);

...

+  const addTodo = () => {
+    todoItems.push(input);
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

todoItems に追加する処理を書きました。  
**しかしこれは意図した通りに動きません。**

useState に配列やオブジェクトを使用する場合、中の要素を変更してもコンポーネントは再描画されません。  
また、`todoItems.push(input)`の後に

```
setTodoItems(todoItems)
```

としてもやはり動きません。(state の参照先が前回と同じなため)

再描画させるためには新しい配列やオブジェクトを setter に渡す必要があります。  
コードを修正します。

```
// TodoList.tsx

   const addTodo = () => {
-    todoItems.push(input);
+    // setterに関数を渡す場合、前回値が引数として使用できる
+    setTodoItems(prev => [...prev, input]);

     // 以下のようにしても動くが、前回のstateに基づいた変更の場合は上記の様に関数を使う方が良い
     // const newArray = [...todoItems, input]
     // setTodoItemst(newArray)
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

・ここまでのコミットに同期->`git reset --hard b00f627ef456a341a9c710360c9dbadec7c09643`

** handson **

1. ボタンをクリックして Todo リストに追加された時、入力した値が消えるようにしてください。
2. Todo リストを全て削除するボタンを追加してください。
3. 重複した Todo を追加できないようにしてください。(重複していたら無視)

### 4 TodoItem を別のコンポーネントにする

リスト内の要素、`TodoItem`を別のコンポーネントにしておきます。  
TodoItem 用のスタイル定義も行います。

[diff](https://github.com/masaka-ghub/react-todo-ts/commit/35090cf38c505e463b64dca854fbba130856c141)

・ここまでのコミットに同期->`git reset --hard 35090cf38c505e463b64dca854fbba130856c141`

### 5 useEffect を使う

次は[useEffect](https://ja.reactjs.org/docs/hooks-reference.html#useeffect)を使用して行きます。  
副作用のある処理は基本的にこの useEffect を使用して記述して行きます。

まず Todo リストの件数表示を追加してみましょう。  
useState を使用して、管理するメッセージ state を追加します。

```diff
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

```
useEffect(() => {}, [])
```

- 第一引数は実行させたい関数
- 第二引数は実行される条件の配列、この配列に指定した値が前回と変わっていると実行される(空配列なら初回のみ)
- 第一引数の関数内で return される関数はこのコンポーネントがアンマウントされた時に実行されるクリーンアップ関数

実際に useEffect を使用し、メッセージを更新してみます。

```diff
// TodoList.tsx
-    import React, { useState } from 'react';
+    import React, { useState, useEffect } from 'react';

// 途中省略

   const [message, setMessage] = useState('初期メッセージ'); //  初期値を適当に入れておく

+  useEffect(() => {
+    setMessage(`TODO LIST: ${todoItems.length}件`);
+  }, []);

   return (
     <>
       <p>{message}</p>
```

`初期メッセージ`が`TODO LIST：0件`の表示に変わっていることが確認できます。  
このままでは Todo の件数が変化してもメッセージが変わりません。  
useEffect の第二引数が空の配列になっているためです。
TodoList の件数が変化した時にメッセージを変更するようにします。

```diff
   useEffect(() => {
     setMessage(`TODO LIST: ${todoItems.length}件`);
-  }, []);
+  }, [todoItems.length]);
```

これで TodoList の件数変化を表示することが出来ました。

useEffect はクラスコンポーネントの

- componentDidMount
- componentDidUpdate
- componentWillUnMount

といったライフサイクルメソッドが一つにまとまったイメージです。

ここでは、Todo リストの件数が変更されていた場合にメッセージを変化させています。  
一般的には Ajax 処理をはじめとした非同期処理や、副作用を伴う処理は useEffect で行います。

・ここまでのコミットに同期->`git reset --hard ad316451571f591d9c22b084adf0e5e35e69aeee`

### 5-1.クリーンアップ無しの useEffect

useEffect の第一引数はコールバック関数ですが、この関数は必要なクリーンアップ関数を return させることができます。  
このクリーンアップ関数は、このコンポーネントがアンマウントされる前、またはこの useEffect が次回実行される前に実行されます。  
useEffect には非同期処理や副作用のある処理が入ってくるので、このクリーンアップを適切に行わないと無駄な処理が続いたり、メモリを食い潰したりします。

ここでは、現在時刻を表示する[Timer コンポーネント](https://github.com/masaka-ghub/react-todo-ts/blob/react-todolist/src/components/Timer.tsx)を追加して試してみます。

** hands on **

TodoList に Timer を追加する

Timer コンポーネントの雛形

```TypeScript
import React, { useState } from 'react';

const Timer = () => {
  const [now, setNow] = useState('時刻取得中...');

  // 現在時刻の表示例: new Date().toLocaleString();

  /* 10秒毎に何かする
  setInterval(function() {
    // 実行したい処理
  }, 10000);
  */

  return <div>{now}</div>;
};

export default Timer;

```

1. 上記の Timer コンポーネント雛形で components/Timer.tsx ファイルを作成してください。
1. Timer コンポーネントを編集し、`useEffect`を使用して現在時刻を表示するように変更してください。
1. 10 秒ごとに現在時刻が更新されるようにしてください。
1. TodoList に Timer コンポーネントの追加と、Timer コンポーネントの有り無しを切り替えられるボタンを追加してください。→[TodoList の編集](https://github.com/masaka-ghub/react-todo-ts/commit/dfce67611ee050b78b3245c0e66fff25b1068055#diff-faf663d4dd497fd71dff9adbed49bf1f75c297ed67517dbd6a049f90b345b52e)

上記は`new Date()`によって時刻を取得していますが、[コミット](dfce67611ee050b78b3245c0e66fff25b1068055)の Timer コンポーネントでは下記を実行しています。

- 10 秒毎に NTP にリクエストし、現在時刻表示を JSON で取得し表示更新

このコミット時点の`Timer`には、クリーンアップ関数が有りません。(useEffect 内で何も return していない)
そのため、`timer表示ボタン`で現在時刻表示を消しても、setInterval が動き続けてしまいます。
開発者ツールで console を表示し、`timer表示ボタン`を何度もクリックしてみると、`Timer`コンポーネントが表示された回数だけ NTP へのリクエストループが動き続ける様子がわかります。

・ここまでのコミットに同期->`git reset --hard 28c393cd1f443f6616dba3633d872257f589dc71`

### 5-2.useEffect のクリーンアップ

`Timer`にクリーンアップを追加しました。

```diff
  useEffect(() => {
    // 10秒毎にntpにfetchし、現在時刻を更新する
    const id = setInterval(async () => {
      console.log(`${id}:timer reflesh start`);
      const res = await (await fetch('https://ntp-a1.nict.go.jp/cgi-bin/json', { mode: 'cors' })).json();
      const current = new Date(res.st * 1000);
      setNow(current.toLocaleString());
      console.log(`${id}:timer reflesh end`);
    }, 10000);

+   // unmount時に実行されるcleanup関数
+   return () => {
+     console.log(`clear setInterval - id:${id}`);
+     clearInterval(id);
+   };
  }, []);
```

表示を切り替える毎に、クリーンアップ関数が実行され、不要になった setInterval を止めています。

ここまでのコミットに同期-> `git reset --hard cbe8d97df08ee969a39953db74b01eb6b930c3ce`

### 6.useReducer

次は [useReducer](https://ja.reactjs.org/docs/hooks-reference.html#usereducer) です。  
useState の代替で、状態を管理する hooks です。  
useState に比べ、複雑な state を管理するのに向いています。

- 参考
  - https://qiita.com/suzukenz/items/40afe717029c2f8f4a54
  - https://ics.media/entry/200409/
  - https://mktmkt.hatenablog.com/entry/2019/09/11/231814
  - https://github.com/reduxjs/redux/issues/653

```TypeScript
// useStsateでオブジェクトを管理
const [state, setState] = useState(['initial value'])
setState([...state, 'added_value'])

// useReducerの場合
const [state, dispatch] = useReducer(reducer, ['initial value'])
// actionオブジェクトをdispatch関数に渡す
dispatch({type: ADD, value: 'added_value' })
```

Redux で使用していたような Reducer を作成し、そこに繋げる hooks です。
(Redux で使用していた Action,Reducer などほぼ使いまわせると思います)

#### 登場人物

- state: 管理対象の状態。
- dispatch: action を受け取り、reducer を実行させる関数。
- Action: Reducer へ dispatch される`オブジェクト`。`type`と,
  その他の変更のためのパラメータをもつ。`type`は必須。
  - `{ type: 'ADD_TODO', value: 'new todo' }`
- ActionCreator: 必要なパラメータで Action を生成する関数。
  ```
  function addTodo(value) {
    return { type: 'ADD_TODO', value: value };
  }
  ```
- Reducer: 状態を変更する関数。Action を受け取り、現在の state を元に、Action の内容を反映した新しい state を返す。

useState 同様 useReducer を定義したコンポーネントに管理されます。useState より複雑な値を管理したい時に使用されます。

** hands on **

これまで useState で管理し、セッターで変更していた state を useReducer 使用に変更してみます。

[差分](https://github.com/masaka-ghub/react-todo-ts/commit/3f2194f56f307d8dc4020da85b602531a079f81f)

#### 1.Reducer を作成します。TODO に追加するアクションとメッセージを変更するアクションを処理するようにしています。

- [Reducer の作成](https://github.com/masaka-ghub/react-todo-ts/commit/3f2194f56f307d8dc4020da85b602531a079f81f#diff-439b5a85b45978aee5f2a1535c1b62561d5d921fb236b2ae79d39d8c1ca1e8cd)

#### 2.TodoList の useState を useReducer に変更します。

- todoItems と message を useReducer に変更します。
  - [TodoList の編集](https://github.com/masaka-ghub/react-todo-ts/commit/3f2194f56f307d8dc4020da85b602531a079f81f#diff-faf663d4dd497fd71dff9adbed49bf1f75c297ed67517dbd6a049f90b345b52e)

・ここまでのコミットに同期->`git reset --hard 3f2194f56f307d8dc4020da85b602531a079f81f`

#### 3.TodoList を全削除するボタンの追加

useState の時やったことと同様のことを useReducer で行ってみます。  
まず削除ボタンを追加します。

```diff
// TodoList.tsx

      <button onClick={addTodo}>Todo追加</button>
+     <button onClick={clearTodo}>Todo全削除</button> {/* 削除ボタンを追加 */}
```

action・reducer を編集し、削除ボタンがクリックされた時に全削除の action が dispatch されるようにしてみてください。

[削除ボタンを追加したもの](https://github.com/masaka-ghub/react-todo-ts/commit/7a5c5649f8702e59b64d0f14da85ec561931038c)

[次のコミット](https://github.com/masaka-ghub/react-todo-ts/commit/785cf0e4c64c182b90f28bfafcf23286eb8d85db)では、Action を dispatch している部分を ActionCreator を使用するように変更しています。

### 7.子コンポーネントから親コンポーネントの状態更新を行う

-useReducer の続き-

Reducer の処理要求(dispatch)を子コンポーネントに渡せば、子のコンポーネントから親コンポーネントで管理している状態の更新が行えるようになります。

Todo それぞれに削除ボタンを追加し、個別に削除できるように変更してみます。

TodoItem コンポーネントに削除ボタンを追加しますが、クリックされた時に 親コンポーネントで管理している TodoList から自信を削除するような挙動です。
TodoList は親コンポーネントの useReducer によって管理されています。  
useReducer の dispatch 関数を子コンポーネントに渡します。

- [全体の差分](https://github.com/masaka-ghub/react-todo-ts/commit/2b5d98d8c408e8563ed4db9eb5db894219ccf1ee)

親コンポーネントから渡された Reducer への dispatch を使い、削除処理を実行しています。

・ここまでのコミットに同期->`git reset --hard a4fd4f07548cde5a79cf3e236648fd3d4b0cd222`

### 8.Context API と useContext の使用

異なるコンポーネント間で共通して状態を取り扱うため、context API と useContext を使用します。
これまでは親のコンポーネントが持っている state(TodoState)を子コンポーネントでも参照するため、props と言う形で子のコンポーネントに必要な state を渡していました。
useContext を使用し、Redux の様に props を介さずに異なるコンポーネントから共通の値にアクセスできる様にします。

#### App.tsx で context の作成

まず、context を作成します。
この context を export する事で、import したコンポーネントは共通的にこの context にアクセスできます。

```
export const todoContext = createContext<Store>({} as Store);
```

次に先ほど作成した TodoContext から provider を作成します。
この **provider に渡す value が共通管理したい値です。**  
この例では前回に引き続き、useReducer による state を使用していますが、管理したい値が単純であれば useState でも構いません。

```typescript
const TodoListProvider: React.FC = ({ children }): JSX.Element => {
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], message: "" });
  return <todoContext.Provider value={{ todoState, dispatch }}>{children}</todoContext.Provider>;
};
```

作成した provider でこれまでの TodoList コンポーネントを囲ってあげます。

```
    <TodoListProvider>
      <div className="App">
        <TodoMessage />
        <TodoList />
      </div>
    </TodoListProvider>
```

これで、TodoList 側から TodoContext にアクセスする準備ができました。

#### コンポーネント側で context の利用

TodoList 側から TodoContext にアクセスするために useContext を使用します。

```
// App で作成した context を使う
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
// App で作成した context を使う
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

```typescript
// App.tsx

function App() {
  return (
    <TodoListProvider>
      <div className="App">
        <TodoMessage />
        <TodoList />
      </div>
    </TodoListProvider>
  );
}
```

これで、`TODOLIST: xx件`と表示するメッセージ部分は TodoList のコンポーネントから分離され、別コンポーネントになりました。

この状態で動かしてみると、これまで同様の動きを見せることと思います。  
state を context で管理することによって、異なるコンポーネントから同じ状態にアクセスできる様になりました。

・ここまでのコミットに同期 -> `git reset --hard 652f9a349c13b15e422d2262454e3fdcd72b3576`

### 9. useSelector で Redux を使う
※8.を飛ばす場合は7.終了のコミットに同期してください -> `git reset --hard a4fd4f07548cde5a79cf3e236648fd3d4b0cd222`

useSelector を使い、Redux で状態管理をするよう変更してみます。  
これまで特定のコンポーネント(TodoList)に useReducer で状態を管理させていましたが、これだと TodoList とその子のコンポーネントからのみ管理している状態にアクセスできます。  
メッセージ表示の部分だけを別コンポーネントにして、TodoList の外に出してみます。  
以下のようなイメージです。

```
App.tsx
┣TodoList
┗TodoMessage
```

この TodoList と TodoMessage の両コンポーネントから共通の状態にアクセスできるようにします。

#### Redux のインストール

Redux は React 本体には含まれていないので、まず必要なライブラリを install します。

`yarn add redux react-redux`
`yarn add -D @types/react-redux`

#### Reducer に初期値を設定する

必要なライブラリを追加したら、はじめに TodoReducer を編集します。  
redux の場合、state の初期値を設定します。  
(React.Reducerの型だとReduxと整合性が取れないようなので、パラメータに型を指定しています)

[reducer の差分](https://github.com/masaka-ghub/react-todo-ts/compare/2b5d98d8c408e8563ed4db9eb5db894219ccf1ee...ef46bfe59f27efef27551f6b4c2fa0088ec61921#diff-439b5a85b45978aee5f2a1535c1b62561d5d921fb236b2ae79d39d8c1ca1e8cd)

他は useReducer で使用していた状態をそのまま使います。

#### グローバルな Redux Store を作成する

App.tsx に以下の編集を行います。

- グローバルな Store を作成
- TodoMessage コンポーネントを組み込む(あとで作ります)
- react-redux.Provider で共通の状態にアクセスするコンポーネントを囲う

[App.tsx の差分](https://github.com/masaka-ghub/react-todo-ts/compare/2b5d98d8c408e8563ed4db9eb5db894219ccf1ee...ef46bfe59f27efef27551f6b4c2fa0088ec61921#diff-26ad4b834941d9b19ebf9db8082bd202aaf72ea0ddea85f5a8a0cb3c729cc6f2)

#### TodoList から Redux に接続する

App.tsx で作成した Redux Store に接続します。  
useReducer で取得していた state, dispatch をそれぞれ変更します。

- state -> useSelector を使用して取得
- dispatch -> useDispatch を使用して取得

メッセージ更新の処理(useEffect)はメッセージを管理するコンポーネントに移動させるので、TodoList からは消してしまいます。

[TodoList の差分](https://github.com/masaka-ghub/react-todo-ts/compare/2b5d98d8c408e8563ed4db9eb5db894219ccf1ee...ef46bfe59f27efef27551f6b4c2fa0088ec61921#diff-faf663d4dd497fd71dff9adbed49bf1f75c297ed67517dbd6a049f90b345b52e)

#### メッセージコンポーネントを作成する

次に、`TODOLIST: xx件`のメッセージを別のコンポーネントにします。
`src/components/TodoMessage.tsx`を作成します。

[TodoMessage.tsx](https://github.com/masaka-ghub/react-todo-ts/compare/2b5d98d8c408e8563ed4db9eb5db894219ccf1ee...ef46bfe59f27efef27551f6b4c2fa0088ec61921#diff-e89e6a307e9a2ca3f7c69dc2bf6773e16141c1945114c5b3443c2bb7eee803ed)の作成

これで useReducer から Redux への置き換えが出来ました。  
Reducer や Action などの概念はほぼそのまま使えます。  
Hooks の利用により、Redux の導入は若干容易になりました。
