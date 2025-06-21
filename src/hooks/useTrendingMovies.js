import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { nowTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data = await fetch(
      //   'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      //   API_OPTIONS
      // );
      // const json=await data.json();
      // console.log(json)

      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(nowTrendingMovies(json.results));
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
