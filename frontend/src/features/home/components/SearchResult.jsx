import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../lib/api/axios";
import { useSelector } from "react-redux";
import SearchBox from "../../../components/layout/SearchBox";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await api.get(
      `/movie/all?page=${page}&limit=10&search=${query}`,
    );

    const newMovies = res.data.movies;

    setMovies((prev) => {
      const ids = new Set(prev.map((m) => m._id));
      const filtered = newMovies.filter((m) => !ids.has(m._id));
      return [...prev, ...filtered];
    });

    if (newMovies.length === 0) {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!query) return;

    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    fetchMovies();
  }, [page, query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";
  return (
    <div
      className={`"max-w-6xl mx-auto  my-24 p-6" ${isDark ? "text-white" : "text-black"} z-10 `}
    >
      <SearchBox />
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      <div className="flex flex-wrap gap-4">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            onClick={()=>navigate(`/movies/${movie._id} `)}
            className="w-80 border p-3 rounded-lg  cursor-pointer "
          >
            <img
              src={movie.poster}
              className="w-full h-60 object-cover pointer-events-none"
            />

            <p 
            className="font-semibold mt-2">124{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
