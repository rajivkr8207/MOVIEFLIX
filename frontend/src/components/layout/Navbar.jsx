import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";

const categories = [
  { id: "trending", label: "Trending" },
  { id: "popular", label: "Popular" },
  { id: "top", label: "Top Rated" },
  { id: "upcoming", label: "Upcoming" },
];

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const isAdmin = user?.role === "admin";

  const theme = useSelector((s) => s.theme.theme);
  const isDark = theme === "dark";

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-color)]/90 backdrop-blur-lg border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenu(true)} className="lg:hidden">
                <FiMenu size={24} />
              </button>

              <Link to="/" className="text-2xl font-bold text-[#e50914]">
                MOVIEFLIX
              </Link>

              {/* Categories */}
              <div
                className={`hidden lg:flex gap-2 ml-6 ${isDark ? "text-white" : "text-black"}`}
              >
                {categories.map((c) => (
                  <button
                    key={c.id}
                    className="px-3 py-1 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER SEARCH */}
            <div
              className={`hidden md:block w-80  ${isDark ? "text-white" : "text-black"} `}
            >
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search movies..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border bg-[var(--card-bg)]"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <button className={`relative  ${isDark ? 'text-white' : "text-black"} `}>
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {!isAuthenticated ? (
                <div className="flex gap-2">
                  <Link
                    to="/auth/login"
                    className={`px-4 py-1 rounded-lg hover:bg-gray-200  ${isDark ? 'text-white' : "text-black"} `}
                  >
                    Login
                  </Link>

                  <Link
                    to="/auth/register"
                    className="px-4 py-1 rounded-lg bg-[#e50914] text-white"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  </button>

                  <AnimatePresence>
                    {profileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-3 w-48 bg-[var(--card-bg)] border rounded-lg shadow-lg"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>

                        <Link
                          to="/watchlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Watchlist
                        </Link>

                        <Link
                          to="/favorites"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Favorites
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 text-blue-500"
                          >
                            Admin Dashboard
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FiLogOut />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-0 left-0 w-64 h-full bg-[var(--card-bg)] z-50 shadow-lg"
          >
            <div className="flex justify-between p-4 border-b">
              <h2 className="font-bold">Menu</h2>
              <button onClick={() => setMobileMenu(false)}>
                <FiX size={22} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
