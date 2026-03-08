// src/components/CategoryRow.jsx
import React, { useRef,  } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';

const CategoryRow = ({ title, movies, icon: Icon }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  };

  return (
    <div className="relative group">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {Icon && <Icon className="text-[#e50914]" size={24} />}
        {title}
      </h2>
      {/* Movies Row */}
      <div 
        ref={scrollRef}
        className="scrollbar-hide"
      >
        <div className="flex flex-wrap gap-4 pb-4">
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-48 mx-auto">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;