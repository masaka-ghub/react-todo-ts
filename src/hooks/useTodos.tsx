import React, { useCallback, useRef, useState } from "react";
import {
  appendTodo,
    done,
  removeAllTodo,
  removeTodo,
  TodoActions,
  TodoItem,
  TodoState,
} from "../reducers/TodoReducer";
import { useDispatch, useSelector } from "react-redux";

export type Operation = {
  add: (value: string) => void;
  clear: () => void;
  complete: (index: number) => void;
  remove: (index: number) => void;
};

const useTodos = (): [ TodoItem[], Operation ] => {
  // useSelectorでtodoリストを参照する
  const todoItems = useSelector((state: TodoState) => state.todoItems);

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  const add = (value: string) => dispatch(appendTodo({ isDone: false, value }));
  const clear = () => dispatch(removeAllTodo());
  const complete = (index: number) => dispatch(done(index))
  const remove = (index:number) => dispatch(removeTodo(index))

  return [todoItems, {add, clear, complete, remove}]
};
