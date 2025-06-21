import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../../utils/constants";
import { clearCardTrailer, addCardTrailer } from "../../utils/cardsTrailer";
import Card from "./Card";

const MovieCard = ({ posterPath, movieId }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setHovered(true);
    dispatch(addCardTrailer({ movieId, trailer: true }));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    dispatch(clearCardTrailer(movieId));
  };

  if (!posterPath) return null;

  return (
    <div
      className="relative w-[200px] h-[300px] pr-4 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/play/${movieId}`} className="block w-full h-full">
        <div className="w-full h-full overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
          <img
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
            alt="Movie Poster"
            src={IMG_CDN_URL + posterPath}
            loading="lazy"
          />
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover overlay with play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Enhanced hover card */}
      {/* {hovered && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 2147483647 }}
        >
          <div className="w-[90vw] max-w-[400px] pointer-events-auto" style={{ zIndex: 2147483647 }}>
            <Card id={movieId} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MovieCard;

