// src/components/MovieCard.jsx
import React, { useState } from 'react';
import { FiPlay, FiPlus, FiHeart, FiStar, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/movies/${movie._id}`)}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative rounded-xl overflow-hidden transition-all duration-300 transform ${isHovered ? 'scale-110 z-10 shadow-2xl' : 'scale-100'
        }`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold mb-2">{movie.title}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <span>•</span>
              <span>{movie.releaseDate}</span>
              <span>•</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="p-2 bg-[#e50914] rounded-full hover:bg-[#f40612] transition-colors">
                <FiPlay size={16} className="text-white" />
              </button>
              <button className="p-2 bg-[var(--card-bg)] rounded-full hover:bg-[var(--hover-color)] transition-colors">
                <FiPlus size={16} />
              </button>

            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-[var(--card-bg)] px-2 py-1 rounded-lg text-xs">
          {movie.releaseDate}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;