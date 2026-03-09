// src/components/admin/MovieManagement.jsx
import React, { useEffect, useState } from 'react';
import {
  FiFilm,
  FiPlus,
  FiSearch,
  FiFilter,
  FiX,
} from 'react-icons/fi';
import AddMovieModal from './AddMovieModal';
import EditMovieModal from './EditMovieModal';
import MovieDetailsModal from './MovieDetailsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../../../stores/slices/movieSlice';
import useMovie from '../../hooks/useMovie';

const MovieManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const {handleDeleteMovie} = useMovie()
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  // Get unique genres for filter
  const allGenres = [...new Set(movies.flatMap(movie => movie.genre))];

  // Filter movies based on search, status, and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || movie.status === filterStatus;
    const matchesGenre = filterGenre === 'all' || movie.genre.includes(filterGenre);

    return matchesSearch && matchesStatus && matchesGenre;
  });


  const handleEditMovie = () => {
    setShowEditModal(false);
    setSelectedMovie(null);
  };

  const handleDelete = (id) => {
    if (selectedMovie) {
      setShowDeleteModal(false);
      setSelectedMovie(null);
    }
    handleDeleteMovie(id)
    dispatch(fetchMovies());
  };



  const totalMovies = movies.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Movie Management</h1>
          <p className="text-gray-600 mt-1">Manage your movie catalog</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          <FiPlus size={20} />
          Add New Movie
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Movies</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalMovies}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FiFilm className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies by title, director, cast..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 border-l pl-4">
              <FiFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border-none bg-transparent focus:outline-none text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Genres</option>
                {allGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredMovies.length} of {movies.length} movies
        </div>
      </div>

      {/* Movies Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} setSelectedMovie={setSelectedMovie} setShowDeleteModal={setShowDeleteModal} setShowDetailsModal={setShowDetailsModal} setShowEditModal={setShowEditModal} />

        ))}
      </div>


      {/* Modals */}
      {showAddModal && (
        <AddMovieModal
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && selectedMovie && (
        <EditMovieModal
          movie={selectedMovie}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMovie(null);
          }}
          onEdit={handleEditMovie}
        />
      )}

      {showDetailsModal && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedMovie(null);
          }}
        />
      )}

      {showDeleteModal && selectedMovie && (
        <DeleteConfirmationModal
          movie={selectedMovie}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMovie(null);
          }}
          onConfirm={()=>handleDelete(selectedMovie._id)}
        />
      )}
    </div>
  );
};

export default MovieManagement;