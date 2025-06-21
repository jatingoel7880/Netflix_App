
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";
import { addCardTrailer } from "../utils/cardsTrailer";


const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //fetch trailer video and updating the store with trailer video data
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos", API_OPTIONS
      );
      

      if (!data.ok) {   
        throw new Error(`Failed to fetch movie videos: ${data.status} ${data.statusText}`);
      }

      const json = await data.json();
      console.log(json); // Log the JSON response to see its structure

      //If more than 1 trailers are given then fetch the 1st trailer else nothing
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      console.log(trailer); // Log the trailer object to see if it's as expected

      dispatch(addTrailerVideo(trailer));
      dispatch(addCardTrailer(trailer));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
