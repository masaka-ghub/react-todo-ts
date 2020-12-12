export const appendTodo = (value: string) => {
  return { type: "APPEND_TODO" as const, value };
};

export const updateMessage = (message: string) => {
  return { type: "UPDATE_MESSAGE" as const, message };
};

export const removeAllTodo = () => {
  return { type: "CLEAR_TODO" as const };
};

export type TodoState = {
  todoItems: string[];
  message: string;
};

type TodoActions = ReturnType<typeof appendTodo> | ReturnType<typeof updateMessage> | ReturnType<typeof removeAllTodo>;

const todoReducer: React.Reducer<TodoState, TodoActions> = (state, action) => {
  switch (action.type) {
    case "APPEND_TODO":
      return { ...state, todoItems: [...state.todoItems, action.value] };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
    case "CLEAR_TODO":
      return { ...state, todoItems: [] };
  }
};

export default todoReducer;
