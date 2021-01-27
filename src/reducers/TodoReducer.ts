export const appendTodo = (todo: { isDone: boolean, value: string }) => {
  return { type: "APPEND_TODO" as const, todo };
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

export const done = (index: number) => {
  return { type: "DONE_TODO" as const, index };
};

export type TodoState = {
  todoItems: { isDone: boolean, value: string }[];
  message: string;
};

export type TodoActions =
  | ReturnType<typeof appendTodo>
  | ReturnType<typeof updateMessage>
  | ReturnType<typeof removeAllTodo>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof done>;

const initialState: TodoState = { todoItems: [], message: "" };

const todoReducer = (state: TodoState = initialState, action: TodoActions) => {
  switch (action.type) {
    case "APPEND_TODO":
      return { ...state, todoItems: [...state.todoItems, action.todo] };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
    case "CLEAR_TODO":
      return { ...state, todoItems: [] };
    case "REMOVE_TODO":
      return { ...state, todoItems: state.todoItems.filter((_, i) => i !== action.index) };
    case "DONE_TODO":
      return { ...state, todoItems: state.todoItems.map((todo, i) => {
        return i === action.index ? {isDone: true, value: todo.value}
        : todo
      })}
    default:
      const chk: never = action;
      return state;
  }
};

export default todoReducer;
