import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo?.key) {
    return (
      <div className="w-screen h-screen bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black"></div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10"></div>
      <iframe
        className="w-screen h-screen object-cover scale-110"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=0&enablejsapi=0&disablekb=1&loop=1&playlist=${trailerVideo?.key}`}
        frameBorder="0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoBackground;

