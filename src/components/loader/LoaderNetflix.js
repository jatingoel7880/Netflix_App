import React from 'react';

const LoaderNetflix = () => {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
};

export default LoaderNetflix; 