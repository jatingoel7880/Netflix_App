import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  
  //fetch trailer video in useMovieTrailer and updating the store with trailer video data
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  // console.log(trailerVideo)
  useMovieTrailer(movieId);
  

  return (
    <div  className="w-[1350px] h-[750px] overflow-x-hidden">
       
      <iframe
        className="w-full h-full"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=1&enablejsapi=0&disablekb=1"

        }
        frameborder="0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen;"
        referrerpolicy="strict-origin-when-cross-origin"
       allowfullscreen >

      </iframe>
       
       </div>
      )
    }
export default VideoBackground;

