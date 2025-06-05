import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./Redux/darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});
