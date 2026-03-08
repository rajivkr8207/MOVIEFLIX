// src/pages/WatchMoviePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize, FiSkipBack, FiSkipForward, FiSettings, FiHeart, FiShare2, FiDownload, FiThumbsUp, FiMessageCircle, FiAlertCircle, FiChevronLeft, FiChevronRight, FiFilm, FiClock, FiStar, FiCalendar } from "react-icons/fi";
import { getMovieById } from "../services/movie.api";
// import VideoPlayer from "../components/VideoPlayer";
// import RelatedMovies from "../components/RelatedMovies";

const WatchMoviePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [quality, setQuality] = useState('1080p');
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [showEpisodeSelector, setShowEpisodeSelector] = useState(false);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [totalEpisodes] = useState(10);
    const [isLiked, setIsLiked] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

    const videoRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const res = await getMovieById(id);
                setMovie(res.movie);
            } catch (error) {
                console.error("Error fetching movie:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    // Auto-hide controls
    useEffect(() => {
        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => {
                if (isPlaying) {
                    setShowControls(false);
                }
            }, 3000);
        };

        const playerContainer = playerContainerRef.current;
        if (playerContainer) {
            playerContainer.addEventListener('mousemove', handleMouseMove);
            playerContainer.addEventListener('mouseleave', () => setShowControls(true));
        }

        return () => {
            if (playerContainer) {
                playerContainer.removeEventListener('mousemove', handleMouseMove);
            }
            clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleEpisodeChange = (episode) => {
        setCurrentEpisode(episode);
        setShowEpisodeSelector(false);
        // Here you would load the new episode video
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[var(--text-color)]">Loading video player...</p>
                </div>
            </div>
        );
    }
    function getYoutubeId(url) {

        if (!url) return "";

        const regExp =
            /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;

        const match = url.match(regExp);

        return match ? match[1] : "";
    }
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            {/* Video Player Section */}
            <div
                ref={playerContainerRef}
                className="relative bg-black w-full"
                style={{ height: 'calc(100vh - 80px)' }}
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYoutubeId(movie?.movieurl)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

                {/* Overlay Controls */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-white hover:text-[#e50914] transition-colors"
                        >
                            <FiChevronLeft size={24} />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <FiSettings size={20} className="text-white" />
                            </button>
                            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <FiShare2 size={20} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Center Play/Pause Button (Big) */}
                    <button
                        onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#e50914] rounded-full flex items-center justify-center hover:bg-[#f40612] transition-all hover:scale-110"
                    >
                        {isPlaying ? <FiPause size={40} className="text-white" /> : <FiPlay size={40} className="text-white ml-1" />}
                    </button>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                        {/* Progress Bar */}
                        <div className="relative group">
                            <input
                                type="range"
                                min="0"
                                max={duration || 100}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-slider"
                                style={{
                                    background: `linear-gradient(to right, #e50914 0%, #e50914 ${(currentTime / (duration || 1)) * 100}%, #4a4a4a ${(currentTime / (duration || 1)) * 100}%, #4a4a4a 100%)`
                                }}
                            />
                            <div className="absolute -top-8 left-0 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </div>
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="text-white hover:text-[#e50914] transition-colors"
                                >
                                    {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                                </button>

                                <button
                                    onClick={skipBackward}
                                    className="text-white hover:text-[#e50914] transition-colors"
                                >
                                    <FiSkipBack size={24} />
                                </button>

                                <button
                                    onClick={skipForward}
                                    className="text-white hover:text-[#e50914] transition-colors"
                                >
                                    <FiSkipForward size={24} />
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleMute}
                                        className="text-white hover:text-[#e50914] transition-colors"
                                    >
                                        {isMuted || volume === 0 ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <span className="text-white text-sm">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Episode Selector (for TV shows) */}
                                {movie?.isSeries && (
                                    <button
                                        onClick={() => setShowEpisodeSelector(!showEpisodeSelector)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                    >
                                        <FiFilm size={18} className="text-white" />
                                        <span className="text-white">E{currentEpisode}</span>
                                        <FiChevronRight size={18} className="text-white" />
                                    </button>
                                )}

                                {/* Quality Selector */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="px-3 py-1 bg-white/20 rounded text-white text-sm hover:bg-white/30 transition-colors"
                                    >
                                        {quality}
                                    </button>
                                    {showSettings && (
                                        <div className="absolute bottom-10 right-0 bg-[var(--card-bg)] rounded-lg shadow-xl py-2 min-w-32">
                                            {['1080p', '720p', '480p', '360p'].map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => {
                                                        setQuality(q);
                                                        setShowSettings(false);
                                                    }}
                                                    className={`w-full px-4 py-2 text-left hover:bg-[var(--hover-color)] transition-colors ${quality === q ? 'text-[#e50914]' : ''
                                                        }`}
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Playback Speed */}
                                <select
                                    value={playbackSpeed}
                                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                                    className="bg-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none"
                                >
                                    <option value="0.5">0.5x</option>
                                    <option value="1">1x</option>
                                    <option value="1.25">1.25x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>

                                <button
                                    onClick={toggleFullscreen}
                                    className="text-white hover:text-[#e50914] transition-colors"
                                >
                                    {isFullscreen ? <FiMinimize size={24} /> : <FiMaximize size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Episode Selector Dropdown */}
                {showEpisodeSelector && (
                    <div className="absolute bottom-24 right-6 w-80 bg-[var(--card-bg)] rounded-xl shadow-2xl border border-[var(--border-color)] overflow-hidden">
                        <div className="p-4 border-b border-[var(--border-color)]">
                            <h3 className="font-semibold">Episodes</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((ep) => (
                                <button
                                    key={ep}
                                    onClick={() => handleEpisodeChange(ep)}
                                    className={`w-full p-4 text-left hover:bg-[var(--hover-color)] transition-colors flex items-center gap-3 ${currentEpisode === ep ? 'bg-[#e50914]/10' : ''
                                        }`}
                                >
                                    <div className="w-16 h-10 bg-gray-700 rounded flex items-center justify-center">
                                        <FiFilm size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${currentEpisode === ep ? 'text-[#e50914]' : ''}`}>
                                            Episode {ep}
                                        </p>
                                        <p className="text-sm text-gray-500">45 min</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Movie Info Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2">
                        {/* Title and Actions */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{movie?.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <FiStar className="text-yellow-500" />
                                        {movie?.rating || '8.5'}
                                    </span>
                                    <span>{movie?.releaseYear || '2024'}</span>
                                    <span>{movie?.duration || '148'} min</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`p-3 rounded-lg transition-colors ${isLiked
                                            ? 'bg-[#e50914] text-white'
                                            : 'bg-[var(--card-bg)] hover:bg-[var(--hover-color)]'
                                        }`}
                                >
                                    <FiHeart size={20} fill={isLiked ? 'white' : 'none'} />
                                </button>
                                <button
                                    onClick={() => setShowShareModal(true)}
                                    className="p-3 bg-[var(--card-bg)] rounded-lg hover:bg-[var(--hover-color)] transition-colors"
                                >
                                    <FiShare2 size={20} />
                                </button>
                                <button className="p-3 bg-[var(--card-bg)] rounded-lg hover:bg-[var(--hover-color)] transition-colors">
                                    <FiDownload size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-3">Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {movie?.description}
                            </p>
                        </div>

                        {/* Cast & Crew */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Cast & Crew</h2>
                            <div className="flex flex-wrap gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Director</p>
                                    <p className="font-medium">{movie?.director || 'Christopher Nolan'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Cast</p>
                                    <p className="font-medium">{movie?.cast?.slice(0, 3).join(', ') || 'Leonardo DiCaprio, Joseph Gordon-Levitt'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Genre</p>
                                    <p className="font-medium">{movie?.genre?.join(', ') || 'Sci-Fi, Action'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Comments</h2>
                            <div className="space-y-4">
                                {/* Comment Input */}
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            className="w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                                        />
                                    </div>
                                </div>

                                {/* Sample Comments */}
                                {[1, 2].map((comment) => (
                                    <div key={comment} className="flex gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">John Doe</span>
                                                <span className="text-xs text-gray-500">2 hours ago</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Amazing movie! The cinematography is breathtaking.
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#e50914]">
                                                    <FiThumbsUp size={14} />
                                                    12
                                                </button>
                                                <button className="text-sm text-gray-500 hover:text-[#e50914]">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Related Movies */}
                    {/* <div>
                        <h2 className="text-xl font-semibold mb-4">You might also like</h2>
                        <RelatedMovies currentMovieId={id} />
                    </div> */}
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[var(--border-color)]">
                            <h3 className="text-xl font-bold">Share</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-500 mb-4">Share this movie with your friends</p>
                            <div className="flex justify-center gap-4 mb-6">
                                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                                    f
                                </button>
                                <button className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                                    X
                                </button>
                                <button className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                                    IG
                                </button>
                                <button className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                                    WA
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={window.location.href}
                                    readOnly
                                    className="flex-1 px-4 py-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg"
                                />
                                <button className="px-4 py-2 bg-[#e50914] text-white rounded-lg hover:bg-[#f40612]">
                                    Copy
                                </button>
                            </div>
                        </div>
                        <div className="p-6 border-t border-[var(--border-color)]">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full px-4 py-2 bg-[var(--hover-color)] rounded-lg hover:opacity-80"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-[var(--border-color)]">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <FiAlertCircle className="text-yellow-500" />
                                Report Issue
                            </h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-500 mb-4">What seems to be the problem?</p>
                            <div className="space-y-2">
                                {['Video not playing', 'Audio issues', 'Subtitles not working', 'Wrong episode', 'Other'].map((issue) => (
                                    <label key={issue} className="flex items-center gap-3 p-3 bg-[var(--bg-color)] rounded-lg cursor-pointer hover:bg-[var(--hover-color)]">
                                        <input type="radio" name="issue" className="text-[#e50914]" />
                                        <span>{issue}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-[var(--border-color)] flex gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="flex-1 px-4 py-2 bg-[var(--hover-color)] rounded-lg hover:opacity-80"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 px-4 py-2 bg-[#e50914] text-white rounded-lg hover:bg-[#f40612]">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchMoviePage;