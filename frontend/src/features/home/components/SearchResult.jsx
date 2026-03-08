import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    if (!query) return;

    const fetchMovies = async () => {

      const res = await axios.get(
        `/api/movies/search?q=${query}`
      );

      setMovies(res.data.movies);

    };

    fetchMovies();

  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      <div className="grid grid-cols-4 gap-4">

        {movies.map((movie) => (

          <div key={movie._id} className="border p-3 rounded-lg">

            <img
              src={movie.poster}
              className="w-full h-60 object-cover"
            />

            <p className="font-semibold mt-2">
              {movie.title}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default SearchPage;