"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { clearError } from "../../../stores/slices/authSlice";
import useAuth from "../hooks/UseAuth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {handleLogin} = useAuth()
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(formData)
  };

  return (
    <AuthLayout>
      <div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className={`rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden ${
            isDark
              ? "bg-gray-800/90 border border-gray-700"
              : "bg-white/90 border border-gray-200"
          }`}
        >
          <div className="p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h2
                className={`text-3xl font-extrabold  mb-2 ${isDark ? "text-white" : "text-black"}`}
              >
                Welcome Back!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sign in to continue your movie journey
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <div
                  key="error"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center"
                >
                  <span className="mr-2 text-lg">⚠️</span>
                  {error}
                </div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 text-lg">
                      📧
                    </span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg  outline-none transition-all ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 text-lg">
                      🔒
                    </span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg outline-none transition-all ${
                      errors.password
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    } `}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[var(--primary)] to-orange-500 hover:from-[var(--primary)]-hover hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-[var(--primary)] hover:text-[var(--primary)]-hover transition-colors"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
