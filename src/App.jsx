import SkipHireApp from "./componants/SkipHireApp";

export default function App() {
  return (
    <>
      <SkipHireApp />
    </>
  );
}
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleDarkMode, setDarkMode } from "./Redux/darkModeSlice";

// export default function App() {
//   const darkMode = useSelector((state) => state.darkMode.darkMode);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const savedMode = localStorage.getItem("darkMode");
//     if (savedMode !== null) {
//       dispatch(setDarkMode(savedMode === "true"));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (darkMode) {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode.toString());
//   }, [darkMode]);

//   return (
//     <div
//       style={{
//         backgroundColor: darkMode ? "black" : "white",
//       }}
//       className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300 flex flex-col items-center justify-center"
//     >
//       <button
//         onClick={() => dispatch(toggleDarkMode())}
//         className="mb-8 px-6 py-3 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
//       >
//         {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
//       </button>

//       <h1
//         className="text-4xl font-bold mb-4"
//         style={{
//           color: darkMode ? "white" : "black",
//         }}
//       >
//         Welcome to Dark Mode with Redux!
//       </h1>
//       <p
//         className="text-lg max-w-md text-center"
//         style={{
//           color: darkMode ? "white" : "black",
//         }}
//       >
//         Toggle the mode and see the magic! The background, text, and button
//         colors all change smoothly.
//       </p>
//     </div>
//   );
// }
