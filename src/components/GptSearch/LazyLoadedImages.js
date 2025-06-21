import React, { lazy, Suspense } from 'react';

const LazyImagesMovie = lazy(() => import('./ImagesMovie'));

const LazyImagesMovies= () => {
  return (
    <Suspense fallback={<div className="text-center text-white py-8">Loading images...</div>}>
      <LazyImagesMovie />
    </Suspense>
  );
};

export default  LazyImagesMovies;
