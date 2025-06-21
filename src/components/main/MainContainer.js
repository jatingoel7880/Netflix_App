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
  const [fadeIn, setFadeIn] = useState(false);

  console.warn(movies);
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
      // Trigger fade in animation after a short delay
      setTimeout(() => setFadeIn(true), 100);
    }
  }, [movies, randomIndex]);   

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-red-600"></div>
          <div className="absolute inset-0 rounded-full border-4 border-red-600/20 animate-ping"></div>
          <div className="mt-8 text-center">
            <div className="text-red-600 text-xl font-semibold animate-pulse">Netflix</div>
            <div className="text-gray-400 text-sm mt-2">Loading your entertainment...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!randomMovie) return null;

  const { original_title, overview, id,release_date,adult } = randomMovie;

  return (
    <div className={`relative w-screen h-[100vh] overflow-hidden transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 z-10"></div>
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-5 z-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
      </div>
      
      <VideoTitle title={original_title} overview={overview} movieId={id} release_date={release_date} adult={adult} />
      <LazyLoadedVideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
