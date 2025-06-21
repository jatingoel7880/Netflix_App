import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";
import { useState, useEffect } from "react";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  
  useMovieTrailer(movieId);

    // if (!trailerVideo?.key) {
  //   return (
  //     <div className="w-screen h-screen bg-black">
  //       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black"></div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    // Show fallback if no trailer after 3 seconds
    const timer = setTimeout(() => {
      if (!trailerVideo?.key) {
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [trailerVideo]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (!trailerVideo?.key || showFallback) {
    return (
      <div className="w-screen h-[100vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Netflix-style background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90"></div>
        
        {/* Subtle moving particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    // <div className="w-screen h-screen overflow-hidden">
    // {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black z-10"></div> */}
    // <iframe
    //   className="w-screen h-screen object-cover scale-110"
    //   src={`https://www.youtube.com/embed/${trailerVideo?.key}?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=0&enablejsapi=0&disablekb=1&loop=1&playlist=${trailerVideo?.key}`}
    //   frameBorder="0"
    //   title="YouTube video player"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
    //   referrerPolicy="strict-origin-when-cross-origin"
    //   allowFullScreen
    // />
    <div className="w-screen h-[100vh] overflow-hidden relative">
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10"></div>
      
      {/* Video container with enhanced styling */}
      <div className={`relative w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <iframe
          className="w-screen h-[100vh] object-cover scale-110 transform transition-transform duration-1000 hover:scale-105"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?rel=0&autoplay=1&mute=1&controls=0&cc_load_policy=0&modestbranding=1&showinfo=0&enablejsapi=0&disablekb=1&loop=1&playlist=${trailerVideo?.key}&iv_load_policy=3&fs=0`}
          frameBorder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={handleVideoLoad}
          style={{
            filter: 'brightness(0.8) contrast(1.1)',
          }}
        />
      </div>
      
      {/* Loading overlay */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
            <div className="text-white text-lg">Loading trailer...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;

