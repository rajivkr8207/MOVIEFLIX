import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./stores/slices/authSlice";
import ScrollToTop from "./utils/ScrollToTop";

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthRoutes />
    </BrowserRouter>
  );
}
