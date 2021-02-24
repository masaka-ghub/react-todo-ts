import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TodoDatabase } from "../lib/TodoDatabase";
import { setTodo } from "../reducers/TodoReducer";

const db = new TodoDatabase();

export const useTodoDataSource = () => {
  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  // Todoリストを取得し、表示を更新する関数
  const getAll = useCallback(async () => {
    const todoList = await db.findAll();
    dispatch(setTodo(todoList.map(todo => todo.content)));
  }, [dispatch]);

  const put = useCallback(
    async (todo: string) => {
      await db.bulkPut([todo]);
      await getAll();
    },
    [getAll]
  );

  return { put };
};
