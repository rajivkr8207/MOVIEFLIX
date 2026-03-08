// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiTrendingUp,

} from "react-icons/fi";
// import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import CategoryRow from "../components/CategoryRow";
// import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { fetchMovies } from "../../../stores/slices/movieSlice";
import SearchBox from "../../../components/layout/SearchBox";

const HomePage = () => {
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";
  const featuredMovie = {
    id: 1,
    title: "Ekaki Chapter 5",
    description:
      "Ekaki Chapter 5 : The Conqueror | Ashish Chanchlani | ACV Studios",
    backdropUrl:
      "https://imgs.search.brave.com/XA1ffxVrPgcLUDm1vGMl5sd-1dPkruhy_XxcIKBOw5s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubW9uZXljb250/cm9sLmNvbS9zdGF0/aWMtbWNuZXdzLzIw/MjYvMDIvMjAyNjAy/MjUxMjUwMTlfZWth/a2ljaGFwdGVyNS5q/cGc_aW1wb2xpY3k9/d2Vic2l0ZSZ3aWR0/aD03NzAmaGVpZ2h0/PTQzMQ",
    rating: 8.8,
    year: 2026,
    duration: 148,
    genre: ["Funny", "Action", "Thriller"],
  };
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {

    dispatch(fetchMovies(page));

  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 200
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const filteredMovies = (movies) => {
    return movies
  };



  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : "bg-white text-black"}`}>
<SearchBox />
      <main className="pt-16">
        <HeroSection movie={featuredMovie} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <CategoryRow
            title="Movie Now"
            movies={filteredMovies(movies)}
            icon={FiTrendingUp}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
