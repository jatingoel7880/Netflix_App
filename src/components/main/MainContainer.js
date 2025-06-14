import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import LazyLoadedVideoBackground from "./LazyVideoComp";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movies && movies.length > 0 && randomIndex === null) {
      const newIndex = Math.floor(Math.random() * movies.length);
      setRandomIndex(newIndex);
    }
  }, [movies]);

  useEffect(() => {
    if (movies && randomIndex !== null) {
      setRandomMovie(movies[randomIndex]);
      setIsLoading(false);
    }
  }, [movies, randomIndex]);   

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!randomMovie) return null;

  const { original_title, overview, id } = randomMovie;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10"></div>
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <LazyLoadedVideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
