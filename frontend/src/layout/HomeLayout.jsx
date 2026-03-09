import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

const HomeLayout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[var(--primary)]/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="5" fill="currentColor" />
          </pattern>

          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -40, 40, -40],
              rotate: 360,
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["🎬", "🍿", "🎥", "📽️", "🎞️", "🎫", "🍿", "🎬"][i]}
          </motion.div>
        ))}
      </div>

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default HomeLayout;