import React, { useState, useEffect, lazy, Suspense } from "react";
import LoaderNetflix from "../loader/LoaderNetflix";

// Lazy load the VideoBackground component
const LazyVideoComp = lazy(() => import("./VideoBackground"));
// A loading component to show while the VideoBackground is loading
// const Loading = () => <div><LoaderNetflix/></div>;

// Enhanced loading component with better animations
const Loading = () => (
  <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-600"></div>
        <div className="absolute inset-0 rounded-full border-4 border-red-600/20 animate-ping"></div>
      </div>
      <div className="mt-6">
        <div className="text-red-600 text-xl font-semibold animate-pulse mb-2">
          Netflix
        </div>
        <div className="text-gray-400 text-sm">
          Preparing your experience...
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center mt-4 space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Wrap the lazy loaded component with Suspense
const LazyLoadedVideoBackground = ({ movieId }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Show loader for minimum 1.5 seconds for better UX
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    // Trigger fade in animation after component is ready
    if (!showLoader) {
      const fadeTimer = setTimeout(() => {
        setFadeIn(true);
      }, 200);
      return () => clearTimeout(fadeTimer);
    }
  }, [showLoader]);

  const handleComponentLoad = () => {
    setIsComponentLoaded(true);
  };

  return (
    <Suspense fallback={showLoader ? <Loading /> : null}>
      {!showLoader && (
        <div
          className={`transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <LazyVideoComp movieId={movieId} onLoad={handleComponentLoad} />
        </div>
      )}
    </Suspense>
  );
};

export default LazyLoadedVideoBackground;
