import React from 'react'
import {  useSelector } from "react-redux";
import { IMG_CDN_URL } from "../../utils/constants";


const TopCast = () => {
    const movieCast = useSelector((state) => state.moviesData?.movieCast);
//  
  return (
    <div className="bg-black/60 rounded-2xl shadow-lg p-6 md:p-8 text-white mb-6">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide text-center bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent">
        Top Cast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movieCast &&
          movieCast
            .filter((cast) => cast.order < 10)
            .map((cast) => (
              <div
                key={cast.id}
                className="flex flex-col items-center bg-white/5 rounded-xl p-3 hover:scale-105 transition-transform duration-200 shadow-md"
              >
                <div className="rounded-full overflow-hidden w-24 h-24 mb-2 border-4 border-white/20 shadow-lg">
                  <img
                    src={IMG_CDN_URL + cast.profile_path}
                    alt={cast.original_name}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
                <p className="text-white font-semibold text-base text-center truncate w-24">
                  {cast.original_name}
                </p>
                <p className="text-gray-300 font-normal text-sm text-center truncate w-24">
                  {cast.character}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default TopCast