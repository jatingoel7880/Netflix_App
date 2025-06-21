import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlay,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import useMovieData from "../../hooks/useMovieData"; // Import the useMovieData hook

const VideoTitle = ({ title, overview, movieId, release_date, adult }) => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useMovieData(movieId);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function truncated(string, n) {
    return string?.length > n && !expanded
      ? string.substr(0, n - 1) + ""
      : string;
  }

  const navigate = useNavigate();
  const year = release_date.split("-")[0];

  return (
    // <div className="absolute w-full pt-[20%] px-16 text-white z-20">
    // <div className="max-w-4xl">
    //   <h1 className="text-6xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">
    //     {title}
    //   </h1>

    //   <div className="flex gap-4 mb-6">

    <div className="absolute w-full pt-[15%] px-8 md:px-16 text-white z-20">
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transform transition-all duration-700 hover:scale-105 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="bg-green-500 text-black px-3 py-1 rounded-full font-semibold">
              98% Match
            </span>
            <span className="bg-gray-600/50 text-white px-3 py-1 rounded-full">
              {adult===true ? "Adult" : "18+"}
            </span>
            <span className="bg-gray-600/50 text-white px-3 py-1 rounded-full">
              TV-MA
            </span>
            <span className="bg-gray-600/50 text-white px-3 py-1 rounded-full">
              {year}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            // className="bg-white text-black p-3 px-8 text-xl rounded-lg hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 flex items-center gap-2"

            className="group bg-white text-black p-4 px-8 text-lg font-semibold rounded-lg hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            onClick={() => navigate(`/play/${movieId}`)}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-xl group-hover:scale-110 transition-transform duration-200"
            />
            <span>Play</span>
          </button>

          <button
            // className="bg-gray-500/70 text-white p-3 px-8 text-xl rounded-lg hover:bg-gray-500/90 transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
            className="group bg-gray-600/70 text-white p-4 px-8 text-lg font-semibold rounded-lg hover:bg-gray-600/90 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 backdrop-blur-sm border border-gray-500/30"
            onClick={() => setModalOpen(true)}
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-xl group-hover:scale-110 transition-transform duration-200"
            />
            <span>More Info</span>
          </button>

          <button
            className="group bg-gray-600/70 text-white p-4 rounded-lg hover:bg-gray-600/90 transform transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-gray-500/30"
            onClick={() => setIsMuted(!isMuted)}
          >
            <FontAwesomeIcon
              icon={isMuted ? faVolumeMute : faVolumeUp}
              className="text-xl group-hover:scale-110 transition-transform duration-200"
            />
          </button>
        </div>

        <div
          // className="py-4 text-lg w-2/3 leading-relaxed"

          className="py-4 text-base md:text-lg w-full md:w-2/3 leading-relaxed"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <p className="transition-all duration-300">
            {truncated(overview, 150)}
            {!expanded && overview?.length > 150 && ( */}

          <p
            className={`transition-all duration-500 ${
              isHovered ? "text-gray-200" : "text-gray-300"
            }`}
          >
            {truncated(overview, 200)}
            {!expanded && overview?.length > 200 && (
              <span
                // className="text-blue-400 cursor-pointer hover:text-blue-300 ml-1"

                className="text-red-400 cursor-pointer hover:text-red-300 ml-1 font-semibold transition-colors duration-200"
                onClick={toggleExpand}
              >
                ...more
              </span>
            )}
            {expanded && (
              <span
                // className="text-red-400 cursor-pointer hover:text-red-300 ml-1"

                className="text-red-400 cursor-pointer hover:text-red-300 ml-1 font-semibold transition-colors duration-200"
                onClick={toggleExpand}
              >
                Show less
              </span>
            )}
          </p>
        </div>

        {/* <div className="mt-6 text-sm text-gray-400">
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">Starring: Tom Hanks, Tim Allen</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">Genres: Animation, Adventure, Comedy</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">This show is: Feel-good, Exciting</span>
          </div>
        </div> */}
      </div>

      {modalOpen && (
        <Modal
          // overview={overview}
          movieId={movieId}
          // onClose={() => setModalOpen(false)}
          onClose={() => {
    console.log("Closing modal...");
    setModalOpen(false);
  }}
        />
      )}
    </div>
  );
};

export default VideoTitle;
