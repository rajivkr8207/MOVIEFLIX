// src/components/admin/MovieManagement.jsx
import React, { useState } from 'react';
import { 
  FiFilm, 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiFilter,
  FiStar,
  FiClock,
  FiCalendar,
  FiDownload,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp
} from 'react-icons/fi';
import AddMovieModal from './AddMovieModal';
import EditMovieModal from './EditMovieModal';
import MovieDetailsModal from './MovieDetailsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
// import AddMovieModal from './AddMovieModal';
// import EditMovieModal from './EditMovieModal';
// import MovieDetailsModal from './MovieDetailsModal';
// import DeleteConfirmationModal from './DeleteConfirmationModal';

const MovieManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or table

  // Sample movies data
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: "Inception", 
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      releaseYear: 2010,
      duration: 148,
      genre: ["Sci-Fi", "Action", "Thriller"],
      director: "Christopher Nolan",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
      rating: 8.8,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
      backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      status: "active",
      views: 45231,
      likes: 3241,
      revenue: "$125.4M",
      releaseDate: "2010-07-16",
      language: "English",
      ageRating: "PG-13"
    },
    { 
      id: 2, 
      title: "The Dark Knight", 
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      releaseYear: 2008,
      duration: 152,
      genre: ["Action", "Crime", "Drama"],
      director: "Christopher Nolan",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      rating: 9.0,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      status: "active",
      views: 67892,
      likes: 5432,
      revenue: "$158.2M",
      releaseDate: "2008-07-18",
      language: "English",
      ageRating: "PG-13"
    },
    { 
      id: 3, 
      title: "Interstellar", 
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      releaseYear: 2014,
      duration: 169,
      genre: ["Sci-Fi", "Adventure", "Drama"],
      director: "Christopher Nolan",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      rating: 8.6,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
      backdropUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      status: "active",
      views: 38901,
      likes: 2876,
      revenue: "$98.7M",
      releaseDate: "2014-11-07",
      language: "English",
      ageRating: "PG-13"
    },
    { 
      id: 4, 
      title: "Tenet", 
      description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      releaseYear: 2020,
      duration: 150,
      genre: ["Action", "Sci-Fi", "Thriller"],
      director: "Christopher Nolan",
      cast: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"],
      rating: 7.5,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BZGQzZmY5ZmYtZjU5Yy00MmQ2LWI2YmMtMDEwMjg1Yzc5OTA5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=L3pk_TBkihU",
      status: "inactive",
      views: 15234,
      likes: 987,
      revenue: "$45.6M",
      releaseDate: "2020-09-03",
      language: "English",
      ageRating: "PG-13"
    },
    { 
      id: 5, 
      title: "Dunkirk", 
      description: "Allied soldiers from Belgium, the British Empire, and France are surrounded by the German army and evacuated during a fierce battle in World War II.",
      releaseYear: 2017,
      duration: 106,
      genre: ["War", "Action", "Drama"],
      director: "Christopher Nolan",
      cast: ["Fionn Whitehead", "Barry Keoghan", "Mark Rylance"],
      rating: 7.9,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg2YyI4YzU1Y2U5YmZkY2FmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_FMjpg_UX1000_.jpg",
      backdropUrl: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      trailerUrl: "https://www.youtube.com/watch?v=F-eMt3SrfFU",
      status: "active",
      views: 22456,
      likes: 1654,
      revenue: "$67.3M",
      releaseDate: "2017-07-21",
      language: "English",
      ageRating: "PG-13"
    }
  ]);

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

  const handleAddMovie = (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: movies.length + 1,
      views: 0,
      likes: 0,
      revenue: "$0"
    };
    setMovies([movieWithId, ...movies]);
    setShowAddModal(false);
  };

  const handleEditMovie = (updatedMovie) => {
    setMovies(movies.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
    setShowEditModal(false);
    setSelectedMovie(null);
  };

  const handleDeleteMovie = () => {
    if (selectedMovie) {
      setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
      setShowDeleteModal(false);
      setSelectedMovie(null);
    }
  };

  const handleStatusToggle = (movie) => {
    setMovies(movies.map(m => 
      m.id === movie.id 
        ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' }
        : m
    ));
  };

  // Statistics
  const totalMovies = movies.length;
  const activeMovies = movies.filter(m => m.status === 'active').length;
  const totalViews = movies.reduce((acc, movie) => acc + movie.views, 0);
  const avgRating = (movies.reduce((acc, movie) => acc + movie.rating, 0) / movies.length).toFixed(1);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: FiCheckCircle, label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FiAlertCircle, label: 'Inactive' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    
    return (
      <span className={`${config.bg} ${config.text} px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

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
          <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Movies</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{activeMovies}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FiCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{totalMovies - activeMovies} inactive</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Views</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalViews.toLocaleString()}</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FiTrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 8% from yesterday</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Rating</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{avgRating}</h3>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <FiStar className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">out of 10</p>
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

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Table
              </button>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <FiDownload size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredMovies.length} of {movies.length} movies
        </div>
      </div>

      {/* Movies Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowDetailsModal(true);
                        }}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowEditModal(true);
                        }}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        title="Edit Movie"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(movie)}
                        className={`bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors ${
                          movie.status === 'active' ? 'text-green-400' : 'text-gray-400'
                        }`}
                        title={movie.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <FiCheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowDeleteModal(true);
                        }}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors hover:text-red-400"
                        title="Delete Movie"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <StatusBadge status={movie.status} />
                </div>
                <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <FiStar size={12} /> {movie.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{movie.releaseYear} • {movie.duration} min</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {g}
                    </span>
                  ))}
                  {movie.genre.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{movie.genre.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <FiEye size={14} /> {movie.views.toLocaleString()}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <FiClock size={14} /> {movie.duration}m
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <FiCalendar size={14} /> {movie.releaseYear}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 px-2 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowEditModal(true);
                    }}
                    className="flex-1 px-2 py-1.5 bg-blue-100 text-blue-600 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={movie.posterUrl} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                      <div>
                        <div className="font-medium text-gray-800">{movie.title}</div>
                        <div className="text-sm text-gray-500">{movie.director}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {movie.genre.slice(0, 2).map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" size={16} />
                      <span>{movie.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{movie.duration} min</td>
                  <td className="px-6 py-4">{movie.releaseYear}</td>
                  <td className="px-6 py-4">{movie.views.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={movie.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowDetailsModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="View Details"
                      >
                        <FiEye size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowEditModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit Movie"
                      >
                        <FiEdit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleStatusToggle(movie)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={movie.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <FiCheckCircle size={18} className={movie.status === 'active' ? 'text-green-600' : 'text-gray-400'} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMovie(movie);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete Movie"
                      >
                        <FiTrash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddMovieModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMovie}
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
          onStatusToggle={handleStatusToggle}
        />
      )}

      {showDeleteModal && selectedMovie && (
        <DeleteConfirmationModal
          movie={selectedMovie}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMovie(null);
          }}
          onConfirm={handleDeleteMovie}
        />
      )}
    </div>
  );
};

export default MovieManagement;