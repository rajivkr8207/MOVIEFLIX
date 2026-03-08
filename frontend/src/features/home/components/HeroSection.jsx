import { FiPlay, FiInfo, FiPlus } from 'react-icons/fi';

const HeroSection = ({ movie }) => {

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-white`}>
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            {movie.title}
          </h1>

          {/* Movie Info */}
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="text-green-500 font-semibold">{movie.rating} Rating</span>
            <span>{movie.year}</span>
            <span>{movie.duration} min</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            {movie.description}
          </p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genre.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--card-bg)] rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-[#e50914] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#f40612] transition-colors transform hover:scale-105">
              <FiPlay size={20} />
              Play Now
            </button>

            <button className="px-8 py-3 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--hover-color)] transition-colors transform hover:scale-105">
              <FiPlus size={20} />
              Add to Watchlist
            </button>

            <button className="p-3 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors transform hover:scale-105">
              <FiInfo size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;