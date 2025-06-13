import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import LazyLoadedVideoBackground from "./LazyVideoComp";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false); // New local state to control loading

   // Reset randomIndex on component re-render
  //  useEffect(() => {
  //   setRandomIndex(null);
  // }, [movies]);


  useEffect(() => {
    if (movies && movies.length > 0 && randomIndex === null) {
      const newIndex = Math.floor(Math.random() * movies.length);
      setRandomIndex(newIndex);
    }
}, [movies]);

  useEffect(() => {
    if (movies && randomIndex !== null ) {
      setRandomMovie(movies[randomIndex]);
    }
}, [movies, randomIndex]);   

 
  
  if (!randomMovie) return null; // Early return if randomMovie is not available

  const { original_title, overview, id } = randomMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} movieId={id} />
      <LazyLoadedVideoBackground movieId={id} />
      {/* <VideoBackground /> */}
    </div>
  );
};

export default MainContainer;
