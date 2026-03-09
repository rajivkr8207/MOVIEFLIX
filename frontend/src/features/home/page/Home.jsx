import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
  fetchHistoryMovies,
  fetchMovies,
} from "../../../stores/slices/movieSlice";
import HeroSection from "../components/HeroSection";
import CategoryRow from "../components/CategoryRow";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import SearchBox from "../../../components/layout/SearchBox";
import { FaHistory } from "react-icons/fa";

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
  const dispatch = useDispatch();

  const { movies, page, loading, hasMore, history } = useSelector(
    (state) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchHistoryMovies({ page: 1, limit: 10 }));
  }, [dispatch]);

  const observer = useRef();

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
  
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchMovies(page));
        }
      });
  
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, dispatch],
  );

  useEffect(() => {
    dispatch(fetchMovies(1));
  }, []);

  const filteredMovies = (movies) => {
    if (!movies) return [];

    if (Array.isArray(movies)) {
      return movies.map((movie) => movie.movieId || movie);
    }

    return movies.movieId || movies;
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <SearchBox />
      <main className="pt-16">
        <HeroSection movie={featuredMovie} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <CategoryRow
            title="History"
            movies={filteredMovies(history)}
            icon={FaHistory}
          />
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
