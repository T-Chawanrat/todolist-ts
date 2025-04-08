import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useThemeStore } from "../store/todoStore";

// ✅ เพิ่ม type ให้กับ Todo เพื่อให้รู้ว่า todo ใน list มีโครงสร้างแบบไหน
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const { todos, addTodo, deleteTodo, updateTodo, toggleComplete } =
    useTodoStore();
  const { theme } = useThemeStore();

  // ✅ เพิ่ม type ให้ useState
  const [text, setText] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  const handleUpdate = (id: number) => {
    if (editingText.trim()) {
      updateTodo(id, editingText);
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-indigo-300">
          📝 Todo List
        </h1>

        <div className="text-lg font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">
          {" "}
          วันที่{" "}
          {new Intl.DateTimeFormat("th-TH", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }).format(new Date())}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className={`flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white focus:ring-indigo-400"
                : "border-gray-300 bg-white text-gray-800 focus:ring-indigo-400"
            }`}
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between px-4 py-2 rounded-xl border ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 accent-purple-500"
                />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className={`flex-1 px-2 py-1 w-full ${
                      theme === "dark"
                        ? "bg-gray-600 border-gray-500 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    } rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                ) : (
                  <span
                    className={`text-lg ${
                      todo.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 ml-2">
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="text-green-400 font-semibold hover:underline"
                    >
                      💾
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-400 hover:underline"
                    >
                      ↩️
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditingText(todo.text);
                      }}
                      className="text-blue-400 font-semibold hover:underline"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 font-semibold hover:underline"
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
