import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import movieReducer from "./slices/movieSlice";
import userReducer from "./slices/userSlice";
// import favoriteReducer from "./slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    movies: movieReducer,
    users: userReducer
    // favorites: favoriteReducer
  }
});