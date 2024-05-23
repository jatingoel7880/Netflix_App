import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import LazyLoadedVideoBackground from "../main/LazyVideoComp";
import useMovieData from "../../hooks/useMovieData";
import Review from "./Review";
import { clearMovieData } from "../../utils/movieDataSlice";
import TopCast from "./TopCast";
 import LazyImagesMovies from "./LazyLoadedImages";

const PlayComponent = () => {
  const { movieId } = useParams();
  useMovieData(movieId);
  const moviesData = useSelector((state) => state.moviesData?.movieData);
  console.log(moviesData);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMovieData()); // Clear movie data when component mounts
    return () => {
      dispatch(clearMovieData()); // Clear movie data when component unmounts
    };
  }, [dispatch]);

  function toogleExpand() {
    setExpanded(!expanded);
  }
  function truncated(string, n) {
    return string?.length > n && !expanded
      ? string.substr(0, n - 1) + ""
      : string;
  }

  if (!moviesData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-50">
        <Loader />
      </div>
    );
  }

  // const hours = Math.floor(moviesData.runtime / 60);
  // const minutes = moviesData.runtime % 60;
  // const runtimeFormatted = `${hours} hr ${minutes} min`;

  return (
    <div className="p-4 bg-black">
      <div
        className="cursor-pointer flex items-center mb- text-white"
        onClick={() => navigate("/browse")}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 text-white" />
        <span className="text-blue-500 hover:underline">
          Return to Search Page
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-white">{moviesData.title}</h1>
      <LazyLoadedVideoBackground />

      <div className="flex flex-col md:flex-row justify-between px-8 mt-10 ">
        <div className="md:w-2/3">
          <p className="italic mb-2 text-gray-600 font-bold">Overview:</p>
          <p className="text-lg mb-2 md:mb-4 text-white" onClick={toogleExpand}>
            {truncated(moviesData?.overview, 150)}
            {!expanded && moviesData.overview.length > 150 && (
              <span className="text-blue-500 cursor-pointer"> ...more</span>
            )}
            {expanded && (
              <span className="text-red-700 font-semibold cursor-pointer">
                {" "}
                Collapse
              </span>
            )}
          </p>

          {moviesData.tagline !== "" && (
            <>
              <p className="italic mb-2 text-gray-600 font-bold">Tagline:</p>
              <p className="italic mb-2 text-white">{moviesData.tagline}</p>
            </>
          )}
        </div>

        <div>
          <p className="text-gray-600 mb-2 font-bold">
            Release Date:{" "}
            <span className="text-white px-2"> {moviesData.release_date}</span>
          </p>
          <p className="mb-2 text-gray-600 font-bold">
            Runtime:{" "}
            <span className="text-white px-2">
              {moviesData.runtimeFormatted}
            </span>
          </p>
          <p className="mb-2 text-gray-600 font-bold">
            Status: <span className="text-white px-2">{moviesData.status}</span>
          </p>
        </div>
      </div>
      <TopCast />
      <Review />
      {/* <ImagesMovie /> */}
      <LazyImagesMovies/>
    </div>
  );
};

export default PlayComponent;
