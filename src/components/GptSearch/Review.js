import React, { useState } from "react";
import { useSelector } from "react-redux";

const Review = () => {
  const moviesReview = useSelector((state) => state.moviesData?.movieReview);
  // console.log(moviesReview);

 // Render the headline only if there are movie reviews available
 const renderReviewHeadline = moviesReview && moviesReview.length > 0;


  return (
    <div>
      {renderReviewHeadline && (
      <p className="text-white font-bold text-xl px-8 mt-10">
      Review :</p>)}
      <div className="grid grid-cols-1 md:grid-cols-4 px-8 py-2 ">
        {/* <div className="flex flex-wrap p-2"> */}
          {moviesReview &&
            moviesReview.map((movie) => (
              <MovieReview key={movie.id} movie={movie} />
            ))}
        </div>
      {/* </div> */}
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
    <div className="w-64 bg-gray-800 rounded-lg p-2 m-4">
      <p className="text-white font-semibold">{movie.author}</p>
      <p className="text-white" onClick={toggleExpand}>
        {truncated(movie.content, 200)}
        {!expanded && movie.content.length > 180 && (
          <span className="text-blue-500 cursor-pointer"> ...more</span>
        )}
        {expanded && (
          <span className="text-red-700 font-semibold cursor-pointer">
            {" "}
            Collapse
          </span>
        )}
      </p>

{movie.author_details?.rating !== null &&(
      <p className="text-white">Rating: {movie.author_details?.rating}</p>)}
    </div>
  );
};

export default Review;
