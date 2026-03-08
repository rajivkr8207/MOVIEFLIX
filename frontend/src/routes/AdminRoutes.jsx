import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

// import Users from "../pages/Users";
// import Movies from "../pages/Movies";

export default function AdminRoutes() {
  return (
    <Routes>


        <Route path="dashboard" element={<AdminDashboard />} />

        {/* <Route path="users" element={<Users />} />

        <Route path="movies" element={<Movies />} /> */}


    </Routes>
  );
}