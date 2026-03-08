import { Routes, Route } from "react-router-dom";
import HomePage from "../features/home/page/Home";
import Navbar from "../components/layout/Navbar";
import HomeLayout from "../features/home/layout/HomeLayout";
import SearchPage from "../features/home/components/SearchResult";
import MoviePage from "../features/home/page/MoviePage";
import WatchMoviePage from "../features/home/page/WatchMoviePage";
import UserProfilePage from "../features/home/page/UserProfilePage";
// import Movies from "../pages/public/Movies";

export default function PublicRoutes() {
  return (
    <>
      <HomeLayout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<UserProfilePage />} />

          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/watch/:id" element={<WatchMoviePage />} />

        </Routes>
      </HomeLayout>

    </>

  );
}