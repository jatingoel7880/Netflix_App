import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCardTrailer } from "../utils/cardsTrailer";


const useVideoCard = (movieId) => {
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
      console.log(json);
      
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      console.log(trailer); // Log the trailer object to see if it's as expected

      dispatch(addCardTrailer(trailer));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useVideoCard;
