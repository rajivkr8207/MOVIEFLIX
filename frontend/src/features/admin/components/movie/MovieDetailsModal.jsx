// src/components/admin/MovieDetailsModal.jsx
import React from 'react';
import { 
  FiX, 
  FiStar, 
  FiClock, 
  FiCalendar,
  FiEye,
  FiHeart,
  FiDollarSign,
  FiGlobe,
  FiFilm,
  FiUser,
  FiYoutube
} from 'react-icons/fi';

const MovieDetailsModal = ({ movie, onClose, onStatusToggle }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Movie Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Hero Section with Backdrop */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <img 
              src={movie.backdropUrl || movie.posterUrl} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end gap-6">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span>{movie.duration} min</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <FiStar className="mx-auto text-yellow-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{movie.rating}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <FiEye className="mx-auto text-blue-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{movie.views.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Views</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <FiHeart className="mx-auto text-red-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{movie.likes.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Likes</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{movie.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Movie Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiUser className="text-gray-400" size={18} />
                  <span><span className="font-medium">Director:</span> {movie.director}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiFilm className="text-gray-400" size={18} />
                  <span><span className="font-medium">Genre:</span> {movie.genre.join(', ')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiCalendar className="text-gray-400" size={18} />
                  <span><span className="font-medium">Release Date:</span> {movie.releaseDate}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiClock className="text-gray-400" size={18} />
                  <span><span className="font-medium">Duration:</span> {movie.duration} minutes</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiGlobe className="text-gray-400" size={18} />
                  <span><span className="font-medium">Language:</span> {movie.language}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiDollarSign className="text-gray-400" size={18} />
                  <span><span className="font-medium">Revenue:</span> {movie.revenue}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="font-medium">Age Rating:</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                    {movie.ageRating}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    movie.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {movie.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cast */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Cast</h3>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((actor, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {actor}
                </span>
              ))}
            </div>
          </div>

          {/* Trailer */}
          {movie.trailerUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Trailer</h3>
              <a 
                href={movie.trailerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiYoutube size={20} />
                Watch Trailer on YouTube
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onStatusToggle(movie)}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                movie.status === 'active' 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {movie.status === 'active' ? 'Deactivate Movie' : 'Activate Movie'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;