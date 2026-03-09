import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleTheme } from "../../stores/slices/themeSlice";

const ThemeToggle = () => {

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTheme())}
      className="relative p-2 rounded-full"
      aria-label="Toggle theme"
    >

      <div
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
          isDark
            ? "bg-gray-700"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }`}
      >

        {/* Sun */}
        <span
          className={`absolute left-1 top-1 text-sm transition-all duration-300 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        >
          ☀️
        </span>

        {/* Moon */}
        <span
          className={`absolute right-1 top-1 text-sm transition-all duration-300 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          🌙
        </span>

        {/* Slider */}
        <motion.div
          animate={{ x: isDark ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`absolute top-0.5 left-[2px] w-6 h-6 rounded-full shadow-lg ${
            isDark
              ? "bg-gradient-to-br from-gray-300 to-gray-400"
              : "bg-gradient-to-br from-yellow-300 to-yellow-500"
          }`}
        />
      </div>

    </motion.button>
  );
};

export default ThemeToggle;