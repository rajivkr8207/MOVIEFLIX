import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[var(--primary)]/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Movie Reel Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="25"
              cy="25"
              r="5"
              fill="currentColor"
              className="text-gray-500"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          />
        </svg>
      </div>

      {/* Floating Movie Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
              rotate: 0,
            }}
            animate={{
              y: [null, -40, 40, -40],
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            {["🎬", "🍿", "🎥", "📽️", "🎞️", "🎫", "🍿", "🎬"][i]}
          </motion.div>
        ))}
      </div>
      {children}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(12deg);
          }
          100% {
            transform: translateX(200%) rotate(12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
