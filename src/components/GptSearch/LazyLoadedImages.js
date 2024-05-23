import React, { lazy, Suspense } from 'react';

const LazyImagesMovie = lazy(() => import('./ImagesMovie'));

const LazyImagesMovies= () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImagesMovie />
      </Suspense>
    </div>
  );
};

export default  LazyImagesMovies;
