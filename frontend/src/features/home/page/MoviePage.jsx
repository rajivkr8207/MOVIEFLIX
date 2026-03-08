// src/pages/MoviePage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiPlay, FiPlus, FiHeart, FiShare2, FiStar, FiClock, FiCalendar, FiUser, FiFilm, FiThumbsUp, FiMessageCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { getMovieById } from "../services/movie.api";
import TrailerModal from "../components/TrailerModal";
import { useSelector } from "react-redux";
import MovieModal from "../components/MovieModal";
import { addFavorite, removeFavorite } from "../services/favorite.api";

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showMovie, setShowMovie] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const theme = useSelector((state) => state.theme.theme);
    // const navigate = useNavigate()
    const isDark = theme === "dark";
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const res = await getMovieById(id);
                setMovie(res.movie);
                setIsFavorite(res.isFavorite)
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[var(--text-color)]">Loading movie details...</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[var(--text-color)] mb-2">Movie Not Found</h2>
                    <p className="text-gray-500">The movie you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(movie._id);
            } else {
                await addFavorite(movie._id);
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.log(err);
        }
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const trailerId = getYouTubeId(movie.trailer);
    const movieId = getYouTubeId(movie.movieurl);


    return (
        <div className={`"min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]" ${isDark ? "text-white" : "text-black"}`}>
            <div className="relative h-[70vh] min-h-[600px] w-full">
                <div className="absolute inset-0">
                    <img
                        src={movie.backdropUrl || movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        <div className="hidden md:block w-64 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-[var(--border-color)]"
                            />
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1">
                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                {movie.title}
                            </h1>

                            {/* Movie Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                                <span className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full">
                                    <FiStar size={16} />
                                    {movie.rating || '8.5'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiCalendar size={16} className="text-gray-400" />
                                    {movie.releaseDate?.split('-')[0] || '2024'}
                                </span>


                            </div>

                            {/* Genre Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {movie.genre?.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-[var(--card-bg)] rounded-lg text-sm hover:bg-[#e50914] hover:text-white transition-colors cursor-pointer"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {trailerId && (
                                    <button
                                        onClick={() => setShowTrailer(true)}
                                        className="px-8 py-3 bg-[#e50914] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#f40612] transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        <FiPlay size={20} />
                                        Watch Trailer
                                    </button>
                                )}
                                {movieId && (

                                    <button
                                        onClick={() => setShowMovie(true)}

                                        className="px-8 py-3 bg-[#e50914] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#f40612] transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        <FiPlay size={20} />
                                        Watch Movie
                                    </button>
                                )}

                                <button className="px-8 py-3 bg-[var(--card-bg)] text-[var(--text-color)] rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--hover-color)] transition-all transform hover:scale-105">
                                    <FiPlus size={20} />
                                    Add to Watchlist
                                </button>

                                <button onClick={toggleFavorite}
                                    className={`p-3 rounded-lg transition-all transform hover:scale-105 ${isFavorite ? "text-red-600" : " "}`} >
                                    {isFavorite ? <>
                                        <FaHeart size={20} />
                                    </>
                                        : <>
                                            <FiHeart size={20} />
                                        </>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Mobile Poster (shown only on mobile) */}
                <div className="md:hidden mb-8">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-48 h-72 object-cover rounded-2xl shadow-2xl mx-auto"
                    />
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[var(--border-color)] mb-8 overflow-x-auto scrollbar-hide">
                    {['about'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors relative ${activeTab === tab
                                ? 'text-[#e50914]'
                                : 'text-gray-500 hover:text-[var(--text-color)]'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e50914]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Storyline</h2>
                                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                        {movie.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[var(--card-bg)] p-4 rounded-xl">
                                        <p className="text-gray-500 text-sm">Release Date</p>
                                        <p className="font-semibold">{movie.releaseDate || 'Coming Soon'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Rating Card */}
                        <div className="bg-[var(--card-bg)] rounded-2xl p-6">
                            <h3 className="font-semibold mb-4">Ratings</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#e50914]">{movie.rating || '8.5'}</div>
                                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                                        <FiStar size={16} fill="currentColor" />
                                        <FiStar size={16} fill="currentColor" />
                                        <FiStar size={16} fill="currentColor" />
                                        <FiStar size={16} fill="currentColor" />
                                        <FiStar size={16} />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">125K votes</p>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-2 text-sm">
                                            <span>{star}★</span>
                                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#e50914]"
                                                    style={{ width: `${star * 20}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-500">{star * 20}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-[var(--card-bg)] rounded-2xl p-6">
                            <h3 className="font-semibold mb-4">Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Release Date</span>
                                    <span className="font-medium">{movie.releaseDate}</span>
                                </div>

                            </div>
                        </div>

                        {/* Trailers Card */}
                        {movie.trailer && (
                            <div className="bg-[var(--card-bg)] rounded-2xl p-6">
                                <h3 className="font-semibold mb-4">Trailers</h3>
                                <button
                                    onClick={() => setShowTrailer(true)}
                                    className="w-full aspect-video bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                                    <div className="relative z-10 text-center">
                                        <div className="w-16 h-16 bg-[#e50914] rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                            <FiPlay size={30} className="text-white ml-1" />
                                        </div>
                                        <p className="text-white font-semibold">Play Trailer</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && trailerId && (
                <TrailerModal
                    trailerId={trailerId}
                    onClose={() => setShowTrailer(false)}
                    title={movie.title}
                />
            )}
            {showMovie && movieId && (
                <MovieModal
                    trailerId={movieId}
                    onClose={() => setShowMovie(false)}
                    title={movie.title}
                />
            )}
        </div>
    );
};

export default MoviePage;