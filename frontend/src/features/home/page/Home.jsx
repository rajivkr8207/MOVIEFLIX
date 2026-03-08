// src/pages/HomePage.jsx
import React, { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiMoon,
  FiSun,
  FiTrendingUp,
  FiStar,
  FiClock,
  FiCalendar,
  FiPlay,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiFilm,
  FiTv,
  FiHeart,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
// import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import CategoryRow from "../components/CategoryRow";
// import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSearch, setShowSearch] = useState(false);

  // Sample movie data
  const featuredMovie = {
    id: 1,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    rating: 8.8,
    year: 2010,
    duration: 148,
    genre: ["Sci-Fi", "Action", "Thriller"],
  };

  const trendingMovies = [
    {
      id: 1,
      title: "Inception",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      rating: 8.8,
      year: 2010,
      duration: 148,
    },
    {
      id: 2,
      title: "The Dark Knight",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      rating: 9.0,
      year: 2008,
      duration: 152,
    },
    {
      id: 3,
      title: "Interstellar",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
      rating: 8.6,
      year: 2014,
      duration: 169,
    },
    {
      id: 4,
      title: "Tenet",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BZGQzZmY5ZmYtZjU5Yy00MmQ2LWI2YmMtMDEwMjg1Yzc5OTA5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      rating: 7.5,
      year: 2020,
      duration: 150,
    },
    {
      id: 5,
      title: "Dunkirk",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg2YyI4YzU1Y2U5YmZkY2FmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_FMjpg_UX1000_.jpg",
      rating: 7.9,
      year: 2017,
      duration: 106,
    },
    {
      id: 6,
      title: "The Prestige",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_FMjpg_UX1000_.jpg",
      rating: 8.5,
      year: 2006,
      duration: 130,
    },
  ];

  const popularMovies = [
    {
      id: 7,
      title: "Avatar",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_FMjpg_UX1000_.jpg",
      rating: 7.8,
      year: 2009,
      duration: 162,
    },
    {
      id: 8,
      title: "Avengers: Endgame",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
      rating: 8.4,
      year: 2019,
      duration: 181,
    },
    {
      id: 9,
      title: "Joker",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
      rating: 8.7,
      year: 2019,
      duration: 122,
    },
    {
      id: 10,
      title: "The Matrix",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
      rating: 8.7,
      year: 1999,
      duration: 136,
    },
    {
      id: 11,
      title: "Gladiator",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
      rating: 8.5,
      year: 2000,
      duration: 155,
    },
    {
      id: 12,
      title: "The Godfather",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
      rating: 9.2,
      year: 1972,
      duration: 175,
    },
  ];

  const newReleases = [
    {
      id: 13,
      title: "Oppenheimer",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_FMjpg_UX1000_.jpg",
      rating: 8.5,
      year: 2023,
      duration: 180,
    },
    {
      id: 14,
      title: "Barbie",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
      rating: 7.0,
      year: 2023,
      duration: 114,
    },
    {
      id: 15,
      title: "Killers of the Flower Moon",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njg1LTk1MTItNmI0ZjI5MWQzNDgzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
      rating: 8.2,
      year: 2023,
      duration: 206,
    },
    {
      id: 16,
      title: "Dune: Part Two",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
      rating: 8.7,
      year: 2024,
      duration: 166,
    },
    {
      id: 17,
      title: "Poor Things",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BN2UxYjIzMDAtMzU1ZS00NmI3LTkyOGUtZjQ1YzQ5YThkZWMxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      rating: 8.0,
      year: 2023,
      duration: 141,
    },
    {
      id: 18,
      title: "The Batman",
      posterUrl:
        "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_FMjpg_UX1000_.jpg",
      rating: 7.8,
      year: 2022,
      duration: 176,
    },
  ];

  const categories = [
    { id: "all", label: "All", icon: FiHome },
    { id: "trending", label: "Trending", icon: FiTrendingUp },
    { id: "popular", label: "Popular", icon: FiStar },
    { id: "new", label: "New Releases", icon: FiCalendar },
    { id: "action", label: "Action", icon: FiFilm },
    { id: "comedy", label: "Comedy", icon: FiTv },
    { id: "drama", label: "Drama", icon: FiHeart },
  ];

  const filteredMovies = (movies) => {
    if (!searchQuery) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
{/* Main content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection movie={featuredMovie} />

        {/* Movie rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Trending Now */}
          <CategoryRow
            title="Trending Now"
            movies={filteredMovies(trendingMovies)}
            icon={FiTrendingUp}
          />

          {/* Popular on MovieFlix */}
          <CategoryRow
            title="Popular on MovieFlix"
            movies={filteredMovies(popularMovies)}
            icon={FiStar}
          />

          {/* New Releases */}
          <CategoryRow
            title="New Releases"
            movies={filteredMovies(newReleases)}
            icon={FiCalendar}
          />

          {/* Continue Watching */}
          <div className="bg-gradient-to-r from-[#e50914]/10 to-transparent rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiClock className="text-[#e50914]" />
              Continue Watching
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {trendingMovies.slice(0, 3).map((movie) => (
                <div key={movie.id} className="relative group">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <div className="h-full w-2/3 bg-[#e50914]"></div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button className="p-3 bg-[#e50914] rounded-full hover:bg-[#f40612] transform scale-0 group-hover:scale-100 transition-transform">
                      <FiPlay size={24} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated */}
          <CategoryRow
            title="Top Rated"
            movies={filteredMovies(
              [...trendingMovies, ...popularMovies]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6),
            )}
            icon={FiStar}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MovieFlix</h3>
              <p className="text-sm text-gray-500">
                Your ultimate destination for movies and entertainment.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    Movies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    TV Shows
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    My List
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e50914]">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                >
                  <span className="text-xl">📘</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                >
                  <span className="text-xl">🐦</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center text-sm text-gray-500">
            <p>&copy; 2024 MovieFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
