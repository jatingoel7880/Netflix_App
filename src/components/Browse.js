import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./main/MainContainer";
import SecondaryContainer from "./secondary/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
// import useTvSeriesPopularList from "../hooks/useTvList";
import GptSearch from "./GptSearch/GptSearch";
import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  // useTvSeriesPopularList();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
         {/* onMovieClick={handleMovieClick} */}
          <MainContainer />
          <SecondaryContainer />
          {/* <Footer/> */}
        </>
      )}

 
    </div>
  );
};

export default Browse;
