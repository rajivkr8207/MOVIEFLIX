import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import api from "../../../lib/api/axios";

const MovieSearch = () => {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {

    if (!debouncedQuery) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {

      try {

        const res = await api.get(
          `/api/movies/search?q=${debouncedQuery}`
        );

        setMovies(res.data.movies);

      } catch (err) {
        console.log(err);
      }

    };

    fetchMovies();

  }, [debouncedQuery]);

  return (
    <div className="max-w-xl mx-auto">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg"
      />

      {/* Results */}
      <div className="mt-4 space-y-2">

        {movies.map((movie) => (

          <div
            key={movie._id}
            className="flex items-center gap-3 border p-2 rounded-lg"
          >

            <img
              src={movie.poster}
              alt={movie.title}
              className="w-12 h-16 object-cover"
            />

            <div>
              <p className="font-semibold">
                {movie.title}
              </p>

              <p className="text-sm text-gray-500">
                {movie.releaseDate}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MovieSearch;