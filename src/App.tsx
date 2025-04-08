import TodoList from "./component/TodoList";
import { useThemeStore } from "./store/todoStore";

function App() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div
      className={`min-h-screen transition text-gray-900 dark:text-gray-100 ${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-r from-pink-100 to-blue-100"
      }`}
    >
      <div className="flex justify-between items-center p-4 w-full">
        <h1 className="font-semibold text-gray-800 dark:text-indigo-300 flex-grow text-center"></h1>
        <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="theme-toggle"
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="sr-only"
            />
            <div className="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                theme === "dark" ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3 text-xl">{theme === "dark" ? "🌙" : "☀️"}</span>
        </label>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
