import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoDatabase } from "../lib/TodoDatabase";
import { setTodo, TodoState } from "../reducers/TodoReducer";

const db = new TodoDatabase();

export const useTodoDataSource = () => {
  // useSelectorでtodoリストを参照する
  const todoItems = useSelector((state: TodoState) => state.todoItems);

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  // Todoリストを取得し、表示を更新する関数
  const getAll = useCallback(async () => {
    const todoList = await db.findAll();
    dispatch(setTodo(todoList.map(todo => todo.content)));
  }, [dispatch]);

  // 最初にDBからTodoListを取得し、stateに反映する
  useEffect(() => {
    getAll();
  }, [getAll]);

  const put = useCallback(
    async (todo: string) => {
      await db.bulkPut([todo]);
      await getAll();
    },
    [getAll]
  );

  return { todoItems, put };
};
