import { Routes, Route } from "react-router-dom";
import HomePage from "../features/home/page/Home";
// import Movies from "../pages/public/Movies";

export default function PublicRoutes() {
  return (
    <Routes>
       <Route path="/" element={<HomePage />} />
      {/* <Route path="/movies" element={<Movies />} /> */}
    </Routes>
  );
}