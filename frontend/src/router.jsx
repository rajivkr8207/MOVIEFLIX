import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Navbar from "./components/layout/Navbar";


export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Auth */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}