export type TodoState = {
  todoItems: string[];
  message: string;
};

type TodoActions = { type: "ADD_TODO"; value: string } | { type: "UPDATE_MESSAGE"; message: string };

const todoReducer: React.Reducer<TodoState, TodoActions> = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todoItems: [...state.todoItems, action.value] };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
  }
};

export default todoReducer;
