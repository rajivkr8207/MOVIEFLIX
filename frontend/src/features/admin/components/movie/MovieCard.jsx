import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const MovieCard = ({
  movie,
  setSelectedMovie,
  setShowDeleteModal,
  setShowDetailsModal,
  setShowEditModal
}) => {

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">

      {/* Poster */}
      <div className="relative h-64 overflow-hidden">

        <img
          src={movie?.poster}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-3">

          <button
            onClick={() => {
              setSelectedMovie(movie);
              setShowDetailsModal(true);
            }}
            className="bg-white/20 text-white p-2 rounded-full"
          >
            <FiEye size={18} />
          </button>

          <button
            onClick={() => {
              setSelectedMovie(movie);
              setShowEditModal(true);
            }}
            className="bg-white/20 text-white p-2 rounded-full"
          >
            <FiEdit2 size={18} />
          </button>

          <button
            onClick={() => {
              setSelectedMovie(movie);
              setShowDeleteModal(true);
            }}
            className="bg-white/20 text-white p-2 rounded-full hover:text-red-400"
          >
            <FiTrash2 size={18} />
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="font-semibold text-gray-800">
          {movie?.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {movie?.releaseDate}
        </p>

        {/* Genre */}
        <div className="flex flex-wrap gap-1">

          {movie?.genre?.map((g, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {g}
            </span>
          ))}

        </div>

        {/* Category */}
        <p className="mt-2 text-xs text-gray-400 uppercase">
          {movie?.category}
        </p>

      </div>

    </div>
  );
};

export default MovieCard;