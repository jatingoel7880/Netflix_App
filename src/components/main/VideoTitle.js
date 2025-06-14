import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modal';
import useMovieData from '../../hooks/useMovieData'; // Import the useMovieData hook


const VideoTitle = ({title, overview, movieId}) => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useMovieData(movieId);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  function truncated(string, n) {
    return string?.length > n && !expanded ? string.substr(0, n-1) + '' : string;
  } 

  const navigate = useNavigate();

  return (
    <div className="absolute w-full pt-[20%] px-16 text-white z-20">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">
          {title}
        </h1>
        
        <div className="flex gap-4 mb-6">
          <button 
            className="bg-white text-black p-3 px-8 text-xl rounded-lg hover:bg-opacity-90 transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
            onClick={() => navigate(`/play/${movieId}`)}
          >
            <FontAwesomeIcon icon={faPlay} className="text-lg" /> Play
          </button>
          
          <button 
            className="bg-gray-500/70 text-white p-3 px-8 text-xl rounded-lg hover:bg-gray-500/90 transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
            onClick={() => setModalOpen(true)}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="text-lg" /> More Info
          </button>
        </div>

        <div 
          className="py-4 text-lg w-2/3 leading-relaxed"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="transition-all duration-300">
            {truncated(overview, 150)}
            {!expanded && overview?.length > 150 && (
              <span 
                className="text-blue-400 cursor-pointer hover:text-blue-300 ml-1"
                onClick={toggleExpand}
              >
                ...more
              </span>
            )}
            {expanded && (
              <span 
                className="text-red-400 cursor-pointer hover:text-red-300 ml-1"
                onClick={toggleExpand}
              >
                Show less
              </span>
            )}
          </p>
        </div>
      </div>

      {modalOpen && (
        <Modal 
          overview={overview} 
          movieId={movieId} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default VideoTitle;

