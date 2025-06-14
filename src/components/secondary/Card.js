import React from "react";
import { useNavigate } from "react-router-dom";
import useVideoCard from "../../hooks/useVideoCard";
import { useSelector } from "react-redux";

const Card = ({ id }) => {
  const cardTrailer = useSelector((store) => store.card?.cardTrailer);
  useVideoCard(id);
  const navigate = useNavigate();

  return (
    <div className="top-0 left-0 w-[400px] h-[180px] bg-gray-900 rounded-md p-2 z-30">
      <iframe
        className="aspect-video"
        style={{ width: '100%', height: '100%' }}
        src={
          "https://www.youtube.com/embed/" +
          cardTrailer?.key +
          "?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=1&enablejsapi=0&disablekb=1"
        }
        frameBorder="0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <button
        className="bg-white text-black my-2 px-6 text-xl rounded-lg hover:bg-opacity-80 absolute bottom-4 right-6"
        onClick={() => navigate(`/play/${id}`)}
      >
        Play
      </button>
    </div>
  );
};
export default Card;
