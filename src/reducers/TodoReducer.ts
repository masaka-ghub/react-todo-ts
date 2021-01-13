import { Dispatch } from "react";
export const appendTodo = (value: string) => {
  return { type: "APPEND_TODO" as const, value };
};

export const updateMessage = (message: string) => {
  return { type: "UPDATE_MESSAGE" as const, message };
};

export const removeAllTodo = () => {
  return { type: "CLEAR_TODO" as const };
};

export const removeTodo = (index: number) => {
  return { type: "REMOVE_TODO" as const, index };
};

export type Store = {
  todoState: TodoState;
  dispatch: Dispatch<TodoActions>;
};

export type TodoState = {
  todoItems: string[];
  message: string;
};

export type TodoActions =
  | ReturnType<typeof appendTodo>
  | ReturnType<typeof updateMessage>
  | ReturnType<typeof removeAllTodo>
  | ReturnType<typeof removeTodo>;

const todoReducer: React.Reducer<TodoState, TodoActions> = (state, action) => {
  switch (action.type) {
    case "APPEND_TODO":
      return { ...state, todoItems: [...state.todoItems, action.value] };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
    case "CLEAR_TODO":
      return { ...state, todoItems: [] };
    case "REMOVE_TODO":
      return { ...state, todoItems: state.todoItems.filter((_, i) => i !== action.index) };
    default:
      const chk: never = action;
      return state;
  }
};

export default todoReducer;
