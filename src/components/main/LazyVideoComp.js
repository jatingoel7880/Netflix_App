import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../loader/Loader';

// Lazy load the VideoBackground component
const LazyVideoComp = lazy(() => import('./VideoBackground'));

// A loading component to show while the VideoBackground is loading
const Loading = () => <div><Loader/></div>;

// Wrap the lazy loaded component with Suspense
const LazyLoadedVideoBackground = ({ movieId }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // Show loader for 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={showLoader ? <Loading /> : null}>
      {!showLoader && <LazyVideoComp movieId={movieId} />}
    </Suspense>
  );
};

export default LazyLoadedVideoBackground;
