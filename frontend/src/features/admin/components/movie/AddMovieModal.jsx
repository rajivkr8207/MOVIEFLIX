// src/components/admin/AddMovieModal.jsx
import { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import useMovie from '../../hooks/useMovie';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../../../stores/slices/movieSlice';

const AddMovieModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: [],
    poster: '',
    movieurl:'',
    trailer: '',
    category: 'movie',
  });
  const { handlecreateMovie } = useMovie()
  const [errors, setErrors] = useState({});
  const [genreInput, setGenreInput] = useState('');

  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

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

  const handleRemoveGenre = (genreToRemove) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove)
    }));
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handlecreateMovie(formData)
    dispatch(fetchMovies());

    onClose()
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Movie</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Right Column - Form Fields */}
            <div className="md:col-span-2 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter movie title"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter movie description"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Release Year, Duration, Rating */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    releaseDate
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    min="1900"
                    max="2024"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.releaseDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="2024"
                  />
                  {errors.releaseDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.releaseDate}</p>
                  )}
                </div>

              </div>



              {/* Genre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre *
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={genreInput}
                    onChange={(e) => setGenreInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add genre (e.g., Action)"
                  />
                  <button
                    type="button"
                    onClick={handleAddGenre}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.genre.map((g, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                    >
                      {g}
                      <button
                        type="button"
                        onClick={() => handleRemoveGenre(g)}
                        className="hover:text-red-600"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.genre && (
                  <p className="mt-1 text-xs text-red-500">{errors.genre}</p>
                )}
              </div>


              {/* Trailer URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trailer URL
                </label>
                <input
                  type="url"
                  name="trailer"
                  value={formData.trailer}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
                     <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Movie URL
                </label>
                <input
                  type="url"
                  name="movieurl"
                  value={formData.movieurl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  poster
                </label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              {/* Age Rating and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;