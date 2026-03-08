// src/pages/UserProfilePage.jsx
import React, { useState } from 'react';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiEdit2,
    FiCamera,
    FiHeart,
    FiClock,
    FiFilm,
    FiStar,
    FiEye,
    FiSettings,
    FiLogOut,
    FiSave,
    FiX,
    FiCheckCircle,
    FiAward,
    FiTrendingUp
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const theme = useSelector((state) => state.theme.theme);

    const isDark = theme === "dark";
    // User data state
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        location: 'New York, USA',
        bio: 'Movie enthusiast and avid traveler. Love watching sci-fi and action movies in my free time.',
        joinDate: 'January 2024',
        avatar: 'https://i.pravatar.cc/300?img=7',
        coverPhoto: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    });

    const [editedData, setEditedData] = useState({ ...userData });

    // Watch history data
    const watchHistory = [
        {
            id: 1,
            title: 'Inception',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
            watchedDate: '2024-03-15',
            progress: 100,
            rating: 5,
            duration: '148 min'
        },
        {
            id: 2,
            title: 'The Dark Knight',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
            watchedDate: '2024-03-10',
            progress: 100,
            rating: 5,
            duration: '152 min'
        },
        {
            id: 3,
            title: 'Interstellar',
            poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
            watchedDate: '2024-03-05',
            progress: 100,
            rating: 4,
            duration: '169 min'
        },
        {
            id: 4,
            title: 'Tenet',
            poster: 'https://m.media-amazon.com/images/M/MV5BZGQzZmY5ZmYtZjU5Yy00MmQ2LWI2YmMtMDEwMjg1Yzc5OTA5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
            watchedDate: '2024-02-28',
            progress: 75,
            rating: 0,
            duration: '150 min'
        },
        {
            id: 5,
            title: 'Dunkirk',
            poster: 'https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg2YyI4YzU1Y2U5YmZkY2FmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_FMjpg_UX1000_.jpg',
            watchedDate: '2024-02-20',
            progress: 100,
            rating: 4,
            duration: '106 min'
        }
    ];

    // Favorite movies data
    const favoriteMovies = [
        {
            id: 1,
            title: 'Inception',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
            rating: 8.8,
            year: 2010,
            genre: ['Sci-Fi', 'Action']
        },
        {
            id: 2,
            title: 'The Dark Knight',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg',
            rating: 9.0,
            year: 2008,
            genre: ['Action', 'Crime']
        },
        {
            id: 3,
            title: 'Interstellar',
            poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
            rating: 8.6,
            year: 2014,
            genre: ['Sci-Fi', 'Drama']
        },
        {
            id: 4,
            title: 'The Prestige',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_FMjpg_UX1000_.jpg',
            rating: 8.5,
            year: 2006,
            genre: ['Drama', 'Mystery']
        },
        {
            id: 5,
            title: 'Memento',
            poster: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
            rating: 8.4,
            year: 2000,
            genre: ['Mystery', 'Thriller']
        },
        {
            id: 6,
            title: 'The Matrix',
            poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
            rating: 8.7,
            year: 1999,
            genre: ['Sci-Fi', 'Action']
        }
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedData(prev => ({ ...prev, coverPhoto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const getRatingStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                        key={star}
                        size={14}
                        className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={`"min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]" ${isDark ? "text-white": "text-black"}`}>
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn">
                    <FiCheckCircle size={20} />
                    <span>Profile updated successfully!</span>
                </div>
            )}

            {/* Cover Photo */}
            <div className="relative h-64 md:h-80 w-full">
                <img
                    src={isEditing ? editedData.coverPhoto : userData.coverPhoto}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent"></div>

                {isEditing && (
                    <div className="absolute bottom-4 right-4">
                        <label className="cursor-pointer bg-[var(--card-bg)] p-3 rounded-full hover:bg-[var(--hover-color)] transition-colors">
                            <FiCamera size={20} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Profile Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 mb-8">
                    <div className="relative group">
                        <img
                            src={isEditing ? editedData.avatar : userData.avatar}
                            alt={userData.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-[var(--border-color)] object-cover"
                        />
                        {isEditing && (
                            <label className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                <FiCamera size={30} className="text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {isEditing ? editedData.name : userData.name}
                            </h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-2">
                                <FiCalendar size={16} />
                                Member since {userData.joinDate}
                            </p>
                        </div>

                    </div>
                </div>


                {/* Tabs */}
                <div className="flex border-b border-[var(--border-color)] mb-8 overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'profile', label: 'Profile', icon: FiUser },
                        { id: 'history', label: 'Watch History', icon: FiClock },
                        { id: 'favorites', label: 'Favorites', icon: FiHeart },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors relative ${activeTab === tab.id
                                ? 'text-[#e50914]'
                                : 'text-gray-500 hover:text-[var(--text-color)]'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e50914]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="pb-12">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Personal Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-[var(--card-bg)] rounded-2xl p-6">
                                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                                                <FiUser className="text-[#e50914]" size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editedData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userData.name}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                                                <FiMail className="text-[#e50914]" size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Email Address</p>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editedData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userData.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                                                <FiPhone className="text-[#e50914]" size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Phone Number</p>
                                                {isEditing ? (
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={editedData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                                                    />
                                                ) : (
                                                    <p className="font-medium">{userData.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                                                <FiCalendar className="text-[#e50914]" size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500">Member Since</p>
                                                <p className="font-medium">{userData.joinDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Watch History Tab */}
                    {activeTab === 'history' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Watch History</h2>
                                <button className="text-sm text-[#e50914] hover:underline">
                                    Clear History
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {watchHistory.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="bg-[var(--card-bg)] rounded-xl p-4 hover:bg-[var(--hover-color)] transition-colors"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                className="w-24 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
                                                        <p className="text-sm text-gray-500 mb-2">{movie.duration}</p>
                                                    </div>
                                                    <Link
                                                        to={`/watch/${movie.id}`}
                                                        className="px-4 py-2 bg-[#e50914] text-white rounded-lg hover:bg-[#f40612] transition-colors"
                                                    >
                                                        Watch Again
                                                    </Link>
                                                </div>

                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                        <FiEye size={14} />
                                                        Watched on {movie.watchedDate}
                                                    </span>
                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                        <FiClock size={14} />
                                                        {movie.progress}% completed
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-gray-500">Your rating:</span>
                                                    {getRatingStars(movie.rating)}
                                                </div>

                                                {movie.progress < 100 && (
                                                    <div className="mt-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-[#e50914]"
                                                                    style={{ width: `${movie.progress}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm text-gray-500">{movie.progress}%</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Favorites Tab */}
                    {activeTab === 'favorites' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Favorite Movies</h2>
                                <p className="text-gray-500">{favoriteMovies.length} movies</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {favoriteMovies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="bg-[var(--card-bg)] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={movie.poster}
                                                alt={movie.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Link
                                                    to={`/watch/${movie.id}`}
                                                    className="p-2 bg-[#e50914] rounded-full hover:bg-[#f40612] transition-colors"
                                                >
                                                    <FiEye size={18} className="text-white" />
                                                </Link>
                                                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                                    <FiHeart size={18} className="text-white fill-white" />
                                                </button>
                                            </div>
                                            <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                                                {movie.rating}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm mb-1 truncate">{movie.title}</h3>
                                            <p className="text-xs text-gray-500">{movie.year}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {movie.genre.map((g, i) => (
                                                    <span key={i} className="text-xs px-2 py-0.5 bg-[var(--hover-color)] rounded-full">
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;