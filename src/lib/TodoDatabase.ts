import Dexie from "dexie";

export class TodoDatabase extends Dexie {
  todos: Dexie.Table<TodoEntity, number>;

  constructor() {
    console.log("constructor: TodoDatabase");
    super("TodoDatabase");
    this.version(1).stores({
      // テーブル定義
      todos: "++id, content, created"
    });
    this.todos = this.table("todos");
  }

  async bulkPut(todoItems: string[]) {
    const now = Date.now();
    return await this.todos.bulkPut(todoItems.map(todo => ({ content: todo, created: now })));
  }

  async findAll() {
    return await this.todos.toArray();
  }

  async bulkDelete(idList: number[]) {
    return this.todos.bulkDelete(idList);
  }

  async deleteAll() {
    return this.todos.clear();
  }
}

export interface TodoEntity {
  id?: number;
  content: string;
  created: number;
}

export var db = new TodoDatabase();
