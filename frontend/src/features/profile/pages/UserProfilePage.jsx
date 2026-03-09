// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiHeart,
  FiClock,
  FiStar,
  FiEye,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchFavorites,
  fetchHistory,
  fetchProfile,
} from "../../../stores/slices/profileSlice";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useSelector((state) => state.profile.history);
  const favorites = useSelector((state) => state.profile.favorites);

  useEffect(() => {
    if (activeTab === "history") {
      dispatch(fetchHistory({}));
    } else if (activeTab === "favorites") {
      dispatch(fetchFavorites({}));
    }
  }, [activeTab, dispatch]);

  const isDark = theme === "dark";
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <div
      className={`"min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]" ${isDark ? "text-white" : "text-black"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 mb-8">
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {profile?.name}
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FiCalendar size={16} />
                Member since {profile?.createBy.split("T")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex border-b border-[var(--border-color)] mb-8 overflow-x-auto scrollbar-hide">
          {[
            { id: "profile", label: "Profile", icon: FiUser },
            { id: "history", label: "Watch History", icon: FiClock },
            { id: "favorites", label: "Favorites", icon: FiHeart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? "text-[#e50914]"
                  : "text-gray-500 hover:text-[var(--text-color)]"
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

        <div className="pb-12">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[var(--card-bg)] rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                        <FiUser className="text-[#e50914]" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Full Name</p>

                        <p className="font-medium">{profile?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                        <FiMail className="text-[#e50914]" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{profile?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                        <FiCalendar className="text-[#e50914]" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">
                          {profile?.createBy.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Watch History</h2>
                <button className="text-sm text-[#e50914] hover:underline">
                  Clear History
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {history?.map((movie) => (
                  <div
                    key={movie.movieId._id}
                    onClick={() => navigate(`/movies/${movie.movieId._id}`)}
                    className="bg-[var(--warning-color)]/20 backdrop-blur-lg rounded-xl p-4 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={movie.movieId.poster}
                        alt={movie.movieId.title}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">
                              {movie.movieId.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <FiEye size={14} />
                            Watched on {movie.watchedAt.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Favorite Movies</h2>
                <p className="text-gray-500">{favorites.length} movies</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {favorites.map((item) => (
                  <div
                    key={item?.movie._id}
                    onClick={() => navigate(`/movies/${item.movie._id}`)}
                    className="bg-[var(--card-bg)] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={item?.movie.poster}
                        alt={item?.movie.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1 truncate">
                        {item?.movie.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item?.movie.genre.map((g, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-[var(--hover-color)] rounded-full"
                          >
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
