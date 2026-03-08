import React from 'react';
import {  AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  isAdmin,
  user,
  navLinks,
}) => {
  // const dispatch = useDispatch();

  const handleLogout = async () => {
    // await dispatch(logout());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            <div className="p-4">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
                type="button"
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* User Info (if authenticated) */}
              {isAuthenticated && (
                <div className="mb-6 mt-8">
                  <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <span className="inline-block mt-1 text-xs bg-[var(--primary)] text-white px-2 py-0.5 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-[var(--primary)] text-white text-xs px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Auth Buttons or User Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={onClose}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span role="img" aria-label="profile">👤</span>
                      <span>Your Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={onClose}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span role="img" aria-label="settings">⚙️</span>
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      type="button"
                    >
                      <span role="img" aria-label="logout">🚪</span>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={onClose}
                      className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={onClose}
                      className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;