import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import VideoForModal from "./VideoForModal";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useMovieData from "../hooks/useMovieData";
import { IMG_CDN_URL } from "../utils/constants";
import useSimilarMovies from "../hooks/useSimilarMovies";

const Modal = ({ onClose, movieId }) => {
  // const [isClicked, setIsClicked] = useState(false);
  // const { movieId } = useParams();
  useMovieData(movieId);
  useSimilarMovies(movieId);
  const moviesData = useSelector((state) => state.moviesData?.movieData);
  const similarMovies = useSelector((state) => state.similarMovies);
  console.log(similarMovies);
  console.log(moviesData);
  console.log(moviesData.genres);

  const navigate = useNavigate();

  const handleClick = () => {
    // setIsClicked(true);
    onClose();
  };
  const handlePlayClick = () => {
    navigate(`/play/${movieId}`);
  };


  useEffect(() => {
    // Disable scrolling on the body element when the modal is open
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on the body element when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 flex justify-center items-center">
        <div className="relative p-4 w-full max-w-4xl max-h-full">
          <div className="relative  bg-[#141414] rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className={`absolute top-4 right-4 text-white bg-slate-950 rounded-2xl text-xl w-8 h-8 ms-auto justify-center items-center
                   transition-all`}
              data-modal-hide="default-modal"
              onClick={handleClick}
            >
              {/*duration-100 hover:text-white hover:border hover:border-white*/}
              <FontAwesomeIcon icon={faXmark} />
              {/* <span className="sr-only">Close modal</span> */}
            </button>

            <div className="flex items-center justify-between rounded-t dark:border-gray-600">
              {/* <h3 className="text-xl font-semibold text-white dark:text-white"> */}
              <VideoForModal />
              {/* </h3> */}
            </div>

            <div className="p-4 md:p-5 max-h-[70vh] overflow-y-auto">
              <button
                className="bg-white text-black p-2 px-6 text-xl rounded-lg hover:bg-opacity-80"
                onClick={handlePlayClick}
              >
                <FontAwesomeIcon icon={faPlay} /> Play
              </button>

              <div className="mt-10 text-gray-500 dark:text-gray-400 flex flex-col md:flex-row md:items-start">
              <div className="md:w-2/3">
    {moviesData.overview}
  </div>
                {/* </div>
              {moviesData && (
                <> */}
                <div className="md:w-1/3 md:ml-4">


{moviesData && moviesData.genres && (
  <h2>Genres: {moviesData.genres.map((genre) => `• ${genre.name}`).join(' ')}</h2>
)}


                <div className="text-gray-500 dark:text-gray-400">
                  {moviesData.status}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {moviesData.tagline}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {moviesData.release_date}
                </div>

                <div className="text-gray-500 dark:text-gray-400">
                  {moviesData.runtimeFormatted}
                  {moviesData.original_language}

                </div>

              <div className="text-gray-500 dark:text-gray-400">
              {moviesData.spoken_languages.map((spoken)=>(
                <div key={spoken.id}>{spoken.name}</div>
              ))}
              </div>

        
              </div>
            </div>
            </div>


            <div className="px-4 font-bold text-lg text-amber-700">
              Similar Movies:-
              {/* <div className="flex flex-wrap justify-start mt-4">    */}
              <div className="flex flex-wrap px-3 mt-4">
                {similarMovies &&
                  similarMovies.length > 0 &&
                  similarMovies
                    .filter((movie) => movie.poster_path || movie.backdrop_path) // Filter out movies without poster or backdrop
                    .map((movie) => (
                      <div
                        key={movie.id}
                        className="m-2 w-[250px] h-72  rounded-lg bg-[#2f2f2f]"
                      >
                        {/* className="flex flex-col items-center px-1 mt-4 h-80 bg-slate-500 " */}

                        <img
                          // src={IMG_CDN_URL + movie.poster_path}
                          src={
                            movie.poster_path
                              ? IMG_CDN_URL + movie.poster_path
                              : IMG_CDN_URL + movie.backdrop_path
                          }
                          alt={movie.title}
                          // className="w-52 h-28 mx-2 rounded-lg "
                          className="absolute w-[250px] h-72 object-fit "
                          onClick={() => navigate(`/play/${movie.id}`)}
                        />

                      </div>
                    ))
                  // </div>
                }
              </div>
              {/* </div> */}
              {!similarMovies && <p>No similar movies found.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;