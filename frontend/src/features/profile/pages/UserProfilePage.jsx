// src/pages/UserProfilePage.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const profile = useSelector((state) => state.profile.profile);

  const historyLoading = useSelector((state) => state.profile.historyLoading);
  const favoritesLoading = useSelector(
    (state) => state.profile.favoritesLoading,
  );

  // Use refs to track if data has been fetched
  const hasFetchedHistory = useRef(false);
  const hasFetchedFavorites = useRef(false);
  const hasFetchedProfile = useRef(false);

  const isDark = theme === "dark";

  // SOLUTION 1: Fetch profile only once
  useEffect(() => {
    if (!hasFetchedProfile.current && !profile) {
      dispatch(fetchProfile());
      hasFetchedProfile.current = true;
    }
  }, [dispatch, profile]);

  // SOLUTION 2: Use useCallback for tab change handler
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // SOLUTION 3: Fetch data based on tab with proper conditions
  useEffect(() => {
    // Skip if no active tab
    if (!activeTab) return;

    // Handle history tab
    if (activeTab === "history") {
      // Only fetch if history is empty and not already fetched
      if (!history?.length && !hasFetchedHistory.current && !historyLoading) {
        dispatch(fetchHistory({ page: 1, limit: 20 }));
        hasFetchedHistory.current = true;
      }
    }
    // Handle favorites tab
    else if (activeTab === "favorites") {
      // Only fetch if favorites is empty and not already fetched
      if (
        !favorites?.length &&
        !hasFetchedFavorites.current &&
        !favoritesLoading
      ) {
        dispatch(fetchFavorites({ page: 1, limit: 20 }));
        hasFetchedFavorites.current = true;
      }
    }
  }, [
    activeTab,
    dispatch,
    history,
    favorites,
    historyLoading,
    favoritesLoading,
  ]);

  // SOLUTION 4: Add refresh function if needed
  const refreshHistory = useCallback(() => {
    hasFetchedHistory.current = false;
    dispatch(fetchHistory({ page: 1, limit: 20 }));
  }, [dispatch]);

  const refreshFavorites = useCallback(() => {
    hasFetchedFavorites.current = false;
    dispatch(fetchFavorites({ page: 1, limit: 20 }));
  }, [dispatch]);

  const clearHistory = useCallback(() => {
    hasFetchedHistory.current = false;
  }, []);
  // Add loading indicators
  const renderLoading = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e50914]"></div>
    </div>
  );

  return (
    <div
      className={`min-h-screen my-72 ${isDark ? "text-white" : "text-black"}`}
      style={{
        backgroundColor: "var(--bg-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 mb-8">
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {profile?.name || "Loading..."}
              </h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FiCalendar size={16} />
                Member since{" "}
                {profile?.createBy ? profile.createBy.split("T")[0] : "N/A"}
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
              onClick={() => handleTabChange(tab.id)}
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
                        <p className="font-medium">{profile?.name || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                        <FiMail className="text-[#e50914]" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{profile?.email || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--hover-color)] rounded-lg flex items-center justify-center">
                        <FiCalendar className="text-[#e50914]" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">
                          {profile?.createBy
                            ? profile.createBy.split("T")[0]
                            : "N/A"}
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
                <button
                  onClick={clearHistory}
                  className="text-sm text-[#e50914] hover:underline"
                >
                  Clear History
                </button>
                <button
                  onClick={refreshHistory}
                  className="text-sm text-[#e50914] hover:underline ml-2"
                >
                  Refresh
                </button>
              </div>

              {historyLoading ? (
                renderLoading()
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {history?.map((movie) => (
                    <div
                      key={movie.movieId?._id || Math.random()}
                      onClick={() => navigate(`/movies/${movie.movieId?._id}`)}
                      className="bg-[var(--warning-color)]/20 backdrop-blur-lg rounded-xl p-4 transition-colors hover:bg-opacity-30 cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <img
                          src={movie.movieId?.poster}
                          alt={movie.movieId?.title}
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {movie.movieId?.title || "Unknown"}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FiEye size={14} />
                              Watched on{" "}
                              {movie.watchedAt
                                ? movie.watchedAt.split("T")[0]
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Favorite Movies</h2>
                <p className="text-gray-500">{favorites?.length || 0} movies</p>
                <button
                  onClick={refreshFavorites}
                  className="text-sm text-[#e50914] hover:underline ml-2"
                >
                  Refresh
                </button>
              </div>

              {favoritesLoading ? (
                renderLoading()
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {favorites?.map((item) => (
                    <div
                      key={item?.movie?._id || Math.random()}
                      onClick={() => navigate(`/movies/${item?.movie?._id}`)}
                      className="bg-[var(--card-bg)] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={item?.movie?.poster}
                          alt={item?.movie?.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-1 truncate">
                          {item?.movie?.title || "Unknown"}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item?.movie?.genre?.map((g, i) => (
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
