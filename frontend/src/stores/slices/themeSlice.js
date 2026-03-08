import { createSlice } from "@reduxjs/toolkit";

// Function to get initial theme
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  
  // Default to light for SSR
  return "light";
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;