interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  // ✅ ระบุ type ของ Store อย่างชัดเจน
  interface TodoStore {
    todos: Todo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
  }
  
  import { create } from "zustand";
  
  export const useTodoStore = create<TodoStore>((set) => ({
    todos: JSON.parse(localStorage.getItem("todos") || "[]"),
    addTodo: (text) =>
      set((state) => {
        const newTodos: Todo[] = [
          ...state.todos,
          { id: Date.now(), text, completed: false },
        ];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
    deleteTodo: (id) =>
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
    toggleComplete: (id) =>
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
    updateTodo: (id, newText) =>
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        );
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
  }));
  
  // ---------- Theme Store ----------
  
  interface ThemeStore {
    theme: string;
    toggleTheme: () => void;
  }
  
  export const useThemeStore = create<ThemeStore>((set) => ({
    theme: localStorage.getItem("theme") || "dark",
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        return { theme: newTheme };
      }),
  }));
  