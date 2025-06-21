import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { addMovieCast, addMovieData, addMovieImage, addMovieReview } from "../utils/movieDataSlice";

const useMovieData = (movieId) => {
  //   const { movieId } = useParams();
  //   const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch();


    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          API_OPTIONS
        );       
        // console.log(movieResponse);
        const movieData = await movieResponse.json();
        // console.log("yyyyyyyyyyyyyyyyyyyyyyy",movieData);
        // setSelectedMovie(movieData);

        // Fetch trailer video
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );

        const trailerData = await trailerResponse.json();
        // console.log(trailerData);
        const trailer =
          trailerData.results.find(
            (video) => video.name === "Official Trailer"
          ) || trailerData.results[0]; // If no trailer found, select the first video
        // console.log(trailer);

        const movieReview = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          API_OPTIONS
        );
        // console.log(movieReview)
        const reviews = await movieReview.json();
        // console.log(reviews);


        const movieCast=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, API_OPTIONS);
        // console.log(movieCast)
        const casts=await movieCast.json();
        // console.log(casts)
        

        const movieImage= await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, API_OPTIONS);
        const images=await movieImage.json();
        console.log(images)

        dispatch(addTrailerVideo(trailer));
        dispatch(
          addMovieData({
            ...movieData,
            runtimeFormatted: formatRuntime(movieData.runtime),
            title: movieData.title,
            overview: movieData.overview,
            tagline: movieData.tagline,
            releaseDate: movieData.releaseDate,
            status: movieData.status,
            spokenLanguage: movieData.spoken_languages,
            originalLanguage: movieData.original_language,

          }),
        dispatch(addMovieReview(reviews.results)),
        dispatch(addMovieCast(casts.cast)));

        dispatch(addMovieImage({...images,
          backdrops: images.backdrops,
         posters:images.posters}));
        
        
        
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails, movieId]);

  

return null;
};
const formatRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours} hr ${minutes} min`;
};

export default useMovieData;

 