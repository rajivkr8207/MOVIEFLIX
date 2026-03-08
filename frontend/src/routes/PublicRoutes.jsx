import { Routes, Route } from "react-router-dom";
import HomePage from "../features/home/page/Home";
import Navbar from "../components/layout/Navbar";
import HomeLayout from "../features/home/layout/HomeLayout";
import SearchPage from "../features/home/components/SearchResult";
// import Movies from "../pages/public/Movies";

export default function PublicRoutes() {
  return (
    <>
      <HomeLayout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/movies" element={<Movies />} /> */}
        </Routes>
      </HomeLayout>

    </>

  );
}