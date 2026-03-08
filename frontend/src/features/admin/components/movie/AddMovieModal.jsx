// src/components/admin/AddMovieModal.jsx
import React, { useState } from 'react';
import { FiX, FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';

const AddMovieModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseYear: '',
    duration: '',
    genre: [],
    director: '',
    cast: [''],
    rating: '',
    posterUrl: '',
    backdropUrl: '',
    trailerUrl: '',
    language: 'English',
    ageRating: 'PG-13',
    status: 'active',
    releaseDate: ''
  });

  const [errors, setErrors] = useState({});
  const [posterPreview, setPosterPreview] = useState('');
  const [backdropPreview, setBackdropPreview] = useState('');
  const [genreInput, setGenreInput] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.releaseYear) newErrors.releaseYear = 'Release year is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    if (formData.genre.length === 0) newErrors.genre = 'At least one genre is required';
    if (!formData.releaseDate) newErrors.releaseDate = 'Release date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && !formData.genre.includes(genreInput.trim())) {
      setFormData(prev => ({
        ...prev,
        genre: [...prev.genre, genreInput.trim()]
      }));
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.filter(g => g !== genreToRemove)
    }));
  };

  const handleCastChange = (index, value) => {
    const newCast = [...formData.cast];
    newCast[index] = value;
    setFormData(prev => ({ ...prev, cast: newCast }));
  };

  const handleAddCast = () => {
    setFormData(prev => ({ ...prev, cast: [...prev.cast, ''] }));
  };

  const handleRemoveCast = (index) => {
    if (formData.cast.length > 1) {
      setFormData(prev => ({
        ...prev,
        cast: prev.cast.filter((_, i) => i !== index)
      }));
    }
  };

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
        setFormData(prev => ({ ...prev, posterUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackdropUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackdropPreview(reader.result);
        setFormData(prev => ({ ...prev, backdropUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd({
        ...formData,
        releaseYear: parseInt(formData.releaseYear),
        duration: parseInt(formData.duration),
        rating: parseFloat(formData.rating) || 0,
        cast: formData.cast.filter(c => c.trim() !== '')
      });
    }
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
            {/* Left Column - Image Uploads */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Movie Poster *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {posterPreview ? (
                    <div className="relative">
                      <img src={posterPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setPosterPreview('');
                          setFormData(prev => ({ ...prev, posterUrl: '' }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-500 mb-2">Click to upload poster</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterUpload}
                        className="hidden"
                        id="poster-upload"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('poster-upload').click()}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Choose Image
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: 300x450px, JPG or PNG
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backdrop Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {backdropPreview ? (
                    <div className="relative">
                      <img src={backdropPreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setBackdropPreview('');
                          setFormData(prev => ({ ...prev, backdropUrl: '' }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-gray-500 mb-2">Click to upload backdrop</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackdropUpload}
                        className="hidden"
                        id="backdrop-upload"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('backdrop-upload').click()}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Choose Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
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
                    Release Year *
                  </label>
                  <input
                    type="number"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    min="1900"
                    max="2024"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.releaseYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2024"
                  />
                  {errors.releaseYear && (
                    <p className="mt-1 text-xs text-red-500">{errors.releaseYear}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.duration ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="120"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="8.5"
                  />
                </div>
              </div>

              {/* Release Date and Language */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.releaseDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.releaseDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.releaseDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
              </div>

              {/* Director */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Director *
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.director ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Director name"
                />
                {errors.director && (
                  <p className="mt-1 text-xs text-red-500">{errors.director}</p>
                )}
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
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGenre())}
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

              {/* Cast */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cast
                </label>
                {formData.cast.map((actor, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={actor}
                      onChange={(e) => handleCastChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Actor ${index + 1}`}
                    />
                    {formData.cast.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCast(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCast}
                  className="mt-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <FiPlus size={16} />
                  Add Another Actor
                </button>
              </div>

              {/* Trailer URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trailer URL
                </label>
                <input
                  type="url"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              {/* Age Rating and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Rating
                  </label>
                  <select
                    name="ageRating"
                    value={formData.ageRating}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="G">G - General Audiences</option>
                    <option value="PG">PG - Parental Guidance</option>
                    <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                    <option value="R">R - Restricted</option>
                    <option value="NC-17">NC-17 - Adults Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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