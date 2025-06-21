import React, { useState } from "react";
import { useSelector } from "react-redux";

const Review = () => {
  const moviesReview = useSelector((state) => state.moviesData?.movieReview);
  // console.log(moviesReview);

 // Render the headline only if there are movie reviews available
 const renderReviewHeadline = moviesReview && moviesReview.length > 0;


  return (
    <div className="bg-black/60 rounded-2xl shadow-lg p-6 md:p-8 text-white mb-6">
      {renderReviewHeadline && (
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide text-center bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent">
          Reviews
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {moviesReview &&
          moviesReview.map((movie) => (
            <MovieReview key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

const MovieReview = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function truncated(string, n) {
    return string?.length > n && !expanded
      ? string.substr(0, n - 1) + "..."
      : string;
  }
  return (
    <div className="bg-gray-900/80 rounded-xl p-5 shadow-md hover:scale-105 transition-transform duration-200 flex flex-col min-h-[180px]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-bold text-blue-200 truncate max-w-[70%]">{movie.author}</p>
        {movie.author_details?.rating !== null && (
          <span className="text-yellow-400 font-semibold text-sm bg-yellow-900/30 px-2 py-1 rounded-full ml-2">★ {movie.author_details?.rating}</span>
        )}
      </div>
      <p className="text-white text-base leading-relaxed cursor-pointer" onClick={toggleExpand}>
        {truncated(movie.content, 200)}
        {!expanded && movie.content.length > 180 && (
          <span className="text-blue-400 font-semibold ml-1 hover:underline">...more</span>
        )}
        {expanded && (
          <span className="text-red-400 font-semibold ml-2 hover:underline">Collapse</span>
        )}
      </p>
    </div>
  );
};

export default Review;
