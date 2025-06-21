import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoaderNetflix from "../loader/LoaderNetflix";
import LazyLoadedVideoBackground from "../main/LazyVideoComp";
import useMovieData from "../../hooks/useMovieData";
import Review from "./Review";
import { clearMovieData } from "../../utils/movieDataSlice";
import TopCast from "./TopCast";
import LazyImagesMovies from "./LazyLoadedImages";
import Header from "../Header";

const PlayComponent = () => {
  const { movieId } = useParams();
  useMovieData(movieId);
  const moviesData = useSelector((state) => state.moviesData?.movieData);
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
      <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0 z-50 bg-black/90">
        <LoaderNetflix />
      </div>
    );
  }

  // const hours = Math.floor(moviesData.runtime / 60);
  // const minutes = moviesData.runtime % 60;
  // const runtimeFormatted = `${hours} hr ${minutes} min`;

  return (
    <div className=" bg-black overflow-x-hidden">
      <Header isPlayComponent={true}/>
      <div className="pt-20">
        <div className="flex flex-col items-center mb-8">
          <button
            className="flex items-center gap-2 px-5 py-2 bg-black/80 hover:bg-red-600 text-white font-semibold rounded-full border border-white/20 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 mb-4"
            style={{ zIndex: 2 }}
            onClick={() => navigate("/browse")}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span className="tracking-wide">Back</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-2">
            {moviesData.title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-white to-blue-500 rounded-full mb-4" />
        </div>
        <LazyLoadedVideoBackground />

        <div className="flex flex-col md:flex-row justify-between px-8 mt-10 ">
          <div className="md:w-2/3">
            <p className="italic mb-2 text-gray-600 font-bold">Overview:</p>
            <p
              className="text-lg mb-2 md:mb-4 text-white"
              onClick={toogleExpand}
            >
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
              <span className="text-white px-2">
                {" "}
                {moviesData.release_date}
              </span>
            </p>
            <p className="mb-2 text-gray-600 font-bold">
              Runtime:{" "}
              <span className="text-white px-2">
                {moviesData.runtimeFormatted}
              </span>
            </p>
            <p className="mb-2 text-gray-600 font-bold">
              Status:{" "}
              <span className="text-white px-2">{moviesData.status}</span>
            </p>
          </div>
        </div>
        <TopCast />
        <Review />
        {/* <ImagesMovie /> */}
        <LazyImagesMovies />
      </div>
    </div>
  );
};

export default PlayComponent;
