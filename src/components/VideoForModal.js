import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoForModal = ({ movieId}) => {
  // Fetch trailer video in useMovieTrailer and update the store with trailer video data
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <iframe
      className="aspect-video modal-video" // Custom class for modal video
      style={{ width: '100%', minHeight: 'auto', maxHeight: '80vh' }} // Inline styles for max height and width
      src={
        "https://www.youtube.com/embed/" +
        trailerVideo?.key +
        "?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=1&enablejsapi=0&disablekb=1"
      }
      frameborder="0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen;"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  );
};
 export default VideoForModal;