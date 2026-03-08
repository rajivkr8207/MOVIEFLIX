// src/components/TrailerModal.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';

const MovieModal = ({ trailerId, onClose, title }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-[#e50914] transition-colors z-10"
            >
                <FiX size={32} />
            </button>

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl">
                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    {title} - Official Trailer
                </h2>

                {/* Video Container */}
                <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                        title={`${title} Trailer`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                
            </div>
        </div>
    );
};

export default MovieModal;