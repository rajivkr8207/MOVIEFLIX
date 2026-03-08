// src/components/admin/MovieDetailsModal.jsx
import React from 'react';
import {
  FiX,
  FiCalendar,
  FiFilm,
  FiYoutube
} from 'react-icons/fi';

const MovieDetailsModal = ({ movie, onClose }) => {
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
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end gap-6">
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{movie?.releaseDate}</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{movie?.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Movie Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiFilm className="text-gray-400" size={18} />
                  <span><span className="font-medium">Genre:</span> {movie?.genre.join(', ')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiCalendar className="text-gray-400" size={18} />
                  <span><span className="font-medium">Release Date:</span> {movie?.releaseDate}</span>
                </div>

              </div>
            </div>


          </div>



          {/* Trailer */}
          {movie?.trailerUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Trailer</h3>
              <a
                href={movie?.trailer}
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;