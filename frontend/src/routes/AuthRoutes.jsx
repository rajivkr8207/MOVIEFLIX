import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Navbar from "../components/layout/Navbar";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../features/home/page/Home";
import SearchPage from "../features/home/components/SearchResult";
import UserProfilePage from "../features/profile/pages/UserProfilePage";
import MoviePage from "../features/movie/pages/MoviePage";
import HomeLayout from "../layout/HomeLayout";

export default function AuthRoutes() {
  return (
    <>
      <HomeLayout>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MoviePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HomeLayout>
    </>
  );
}
