// src/components/CategoryRow.jsx
import React, { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';

const CategoryRow = ({ title, movies, icon: Icon }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Update arrow visibility
    setTimeout(() => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.offsetWidth);
    }, 100);
  };

  return (
    <div className="relative group">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {Icon && <Icon className="text-[#e50914]" size={24} />}
        {title}
      </h2>

      {/* Scroll Buttons */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[var(--card-bg)] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--hover-color)]"
        >
          <FiChevronLeft size={24} />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[var(--card-bg)] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--hover-color)]"
        >
          <FiChevronRight size={24} />
        </button>
      )}

      {/* Movies Row */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 pb-4">
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;