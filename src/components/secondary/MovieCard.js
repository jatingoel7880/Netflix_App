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
    className="relative w-[300px] h-[180px] pr-4"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <Link to={`/play/${movieId}`} className="block w-full h-full">
      <img
        className="w-full h-full object-fill transition rounded-md duration-300"
        alt="Movie Image"
        src={IMG_CDN_URL + posterPath}
      />
    </Link>
      {/* This is the hover card */}
      {hovered && (
           <div className=" absolute top-0 left-0 w-auto h-auto z-20 ">
          <Card id={movieId}/>
        </div>
      )}
  </div>
  );
};

export default MovieCard;

