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

  useEffect(() => {
    dispatch(fetchMovies({ page: 1, limit: 10 }));
  }, [dispatch]);

  const observer = useRef();
  const observerTarget = useRef(null);

  useEffect(() => {
    const currentObserver = observer.current;
    
    const observeTarget = observerTarget.current;
    
    if (!observeTarget) return;

    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMore) {
        dispatch(fetchMovies({ page: page + 1, limit: 5 }));
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, options);
    observer.current.observe(observeTarget);

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [loading, hasMore, page, dispatch]);

  // Helper function to extract movies from response
  const extractMovies = (data) => {
    if (!data) return [];
    
    if (Array.isArray(data)) {
      return data.map(item => item.movieId || item);
    }
    
    return data.movieId ? [data.movieId] : [data];
  };

  const historyMovies = extractMovies(history);
  const nowMovies = extractMovies(movies);

  return (
    <div
      className={`min-h-screen ${isDark ? "text-white" : " text-black"} mt-24`}
    >
      <SearchBox />
      <main className="pt-16">
        <HeroSection movie={featuredMovie} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <CategoryRow
            title="History"
            movies={historyMovies}
            icon={FaHistory}
          />
          
          <div>
            <CategoryRow
              title="Movie Now"
              movies={nowMovies}
              icon={FiTrendingUp}
            />
            
            {/* Observer target for infinite scroll */}
            {hasMore && (
              <div 
                ref={observerTarget} 
                className="w-full h-10 flex justify-center items-center mt-4"
              >
                {loading && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;