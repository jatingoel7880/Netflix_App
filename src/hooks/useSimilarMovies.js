import { useDispatch } from "react-redux";
import { addSimilarMovie } from "../utils/similarMovieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useSimilarMovies = (movieId) => {
  const dispatch = useDispatch();

  const getSimilarMovies = async () => {
    const similar = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1'`,
      API_OPTIONS
    );

    const similars = await similar.json();
    console.log(similars);
    console.log(similars.results);
    dispatch(addSimilarMovie(similars.results));
    

    const similarMovies = similars.results;

    // Extract IDs of similar movies
    const similarMovieIds = similarMovies.map(movie => movie.id);

    // Fetch detailed information for each similar movie
    const detailedSimilarMovies = await Promise.all(
      similarMovieIds.map(async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          API_OPTIONS
        );
        // const detailMovie=await response.json();
        // console.log(detailMovie)
        if (!response.ok) {
          throw new Error(`Failed to fetch detailed info for movie with ID ${id}`);
        }
        const detailMovie=await response.json();
        console.log(detailMovie)
      })
    );
  };

useEffect(()=>{
    getSimilarMovies();
},[]);
};

export default useSimilarMovies;



// const movieResponse = await fetch(
//   `https://api.themoviedb.org/3/movie/${movieId}`,
//   API_OPTIONS
// );       
// // console.log(movieResponse);
// const movieData = await movieResponse.json();