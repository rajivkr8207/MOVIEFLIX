import React, { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import useMovie from "../../hooks/useMovie";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../../../stores/slices/movieSlice";

const EditMovieModal = ({ movie, onClose, onEdit }) => {

  const [formData, setFormData] = useState({
    id: movie._id,
    title: movie.title || "",
    description: movie.description || "",
    poster: movie.poster || "",
    releaseDate: movie.releaseDate || "",
    trailer: movie.trailer || "",
    genre: movie.genre || [],
    category: movie.category || "movie"
  });

  const [genreInput, setGenreInput] = useState("");
  const { handleEditmovie } = useMovie()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // add genre
  const handleAddGenre = () => {
    const value = genreInput.trim();

    if (!value) return;

    if (formData.genre.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      genre: [...prev.genre, value]
    }));

    setGenreInput("");
  };

  // remove genre
  const handleRemoveGenre = (g) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((item) => item !== g)
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditmovie(formData.id, formData)
    dispatch(fetchMovies());

    onEdit({
      ...movie,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-3xl">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">

          <h2 className="text-lg font-semibold">
            Edit Movie
          </h2>

          <button onClick={onClose}>
            <FiX size={20} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Movie Title"
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Poster */}
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="Poster URL"
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Trailer */}
          <input
            type="url"
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            placeholder="Trailer URL"
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Release Date */}
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
          </select>

          {/* Genre */}
          <div>

            <div className="flex gap-2">

              <input
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddGenre();
                  }
                }}
                placeholder="Add genre"
                className="flex-1 border px-4 py-2 rounded-lg"
              />

              <button
                type="button"
                onClick={handleAddGenre}
                className="bg-blue-600 text-white px-3 rounded-lg"
              >
                <FiPlus />
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-2">

              {formData.genre.map((g, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >

                  {g}

                  <button
                    type="button"
                    onClick={() => handleRemoveGenre(g)}
                  >
                    <FiX size={14} />
                  </button>

                </span>
              ))}

            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
            >
              Update Movie
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditMovieModal;