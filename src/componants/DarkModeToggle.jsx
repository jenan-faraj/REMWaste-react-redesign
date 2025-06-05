// components/DarkModeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}

export function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
        darkMode
          ? "bg-yellow-500 hover:bg-yellow-400 text-white"
          : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
