import { useState, useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
