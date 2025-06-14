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
      className="relative w-[200px] h-[100%] pr-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/play/${movieId}`} className="block w-full h-full">
        <div className="w-full h-full overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
            alt="Movie Poster"
            src={IMG_CDN_URL + posterPath}
            loading="lazy"
          />
        </div>
      </Link>
      {hovered && (
        <div className="absolute top-0 left-0 w-auto h-auto z-20">
          <Card id={movieId} />
        </div>
      )}
    </div>
  );
};

export default MovieCard;

