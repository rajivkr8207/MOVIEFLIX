"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { clearError } from "../../../stores/slices/authSlice";
import useAuth from "../hooks/UseAuth";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  const isDark = useSelector((state) => state.theme.theme === "dark");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const  {handleRegister} = useAuth()
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    if (password.match(/[$@#&!]+/)) strength += 25; // Extra for special chars
    return Math.min(strength, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    handleRegister(formData)
    // const result = await dispatch(
    //   registerUser({
    //     name: formData.name,
    //     email: formData.email,
    //     password: formData.password,
    //   }),
    // );

    // if (!result.error) {
    //   navigate("/?registered=true");
    // }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Medium";
    return "Strong";
  };

  return (
    <AuthLayout>
      <div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div
          className={`max-w-md w-full space-y-8 p-8 rounded-2xl shadow-2xl backdrop-blur-sm ${
            isDark
              ? "bg-gray-800/90 border border-gray-700"
              : "bg-white/90 border border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="text-center">
            <div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Link href="/" className="inline-block">
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-orange-500 rounded-lg blur opacity-70"></div>
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-r from-[var(--primary)] to-orange-500 rounded-lg">
                      <span className="text-white font-bold text-2xl">M</span>
                    </div>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#e50914] to-orange-500 bg-clip-text text-transparent">
                    MovieFlix
                  </span>
                </div>
              </Link>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join the ultimate movie streaming community
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </div>
            )}
          </AnimatePresence>

          {/* Register Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="John Doe"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-2xl">👤</span>
                  </div>
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-2xl">📧</span>
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                      errors.password
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Password strength:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength < 50
                            ? "text-red-500"
                            : passwordStrength < 75
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        className={`h-full ${getStrengthColor()}`}
                      />
                    </div>
                    <ul className="mt-2 space-y-1">
                      <li
                        className={`text-xs flex items-center ${formData.password.length >= 8 ? "text-green-500" : "text-gray-500"}`}
                      >
                        <span className="mr-1">
                          {formData.password.length >= 8 ? "✓" : "○"}
                        </span>
                        At least 8 characters
                      </li>
                      <li
                        className={`text-xs flex items-center ${/(?=.*[a-z])/.test(formData.password) ? "text-green-500" : "text-gray-500"}`}
                      >
                        <span className="mr-1">
                          {/(?=.*[a-z])/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One lowercase letter
                      </li>
                      <li
                        className={`text-xs flex items-center ${/(?=.*[A-Z])/.test(formData.password) ? "text-green-500" : "text-gray-500"}`}
                      >
                        <span className="mr-1">
                          {/(?=.*[A-Z])/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One uppercase letter
                      </li>
                      <li
                        className={`text-xs flex items-center ${/(?=.*[0-9])/.test(formData.password) ? "text-green-500" : "text-gray-500"}`}
                      >
                        <span className="mr-1">
                          {/(?=.*[0-9])/.test(formData.password) ? "✓" : "○"}
                        </span>
                        One number
                      </li>
                    </ul>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                      errors.confirmPassword
                        ? "border-red-500 dark:border-red-500"
                        : isDark
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                          : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[var(--primary)] hover:text-[var(--primary)]-hover font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--primary)] hover:text-[var(--primary)]-hover font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[var(--primary)] to-orange-500 hover:from-[var(--primary)]-hover hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[var(--primary)] hover:text-[var(--primary)]-hover"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
