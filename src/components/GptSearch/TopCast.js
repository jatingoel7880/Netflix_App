import React from 'react'
import {  useSelector } from "react-redux";
import { IMG_CDN_URL } from "../../utils/constants";


const TopCast = () => {
    const movieCast = useSelector((state) => state.moviesData?.movieCast);
//  
  return (
    <div className="text-white font-bold text-xl px-8 mt-10">
    Top Cast :
    {/* <div className="flex flex-wrap px-2 mt-2 "> */}
<div className="grid grid-cols-1 md:grid-cols-5 gap-3 px-2 mt-2">
      {movieCast &&
        movieCast
          .filter((cast) => cast.order < 10) // Filter out movies without poster or backdrop
          .map((cast) => (
            // <div key={cast.id} className="m-4 flex flex-col items-center" style={{ flexBasis: '20%' }}>
            <div key={cast.id} className="m-4 flex flex-col items-center" >  
            {/* Use flex and flex-col to stack elements vertically */}
              <div className="rounded-full overflow-hidden w-28 h-28">
                <img
                  // src={IMG_CDN_URL + movie.poster_path}
                  src={IMG_CDN_URL + cast.profile_path}
                  alt={cast.original_name}
                  // className="w-52 h-28 mx-2 rounded-lg "
                  className="w-full h-full object-cover" // Use object-cover to ensure the image fills the container
                  // onClick={() => navigate(`/play/${movie.id}`)}
                />
              </div>
              <p className=" text-white font-normal text-lg flex justify-center ">
                {cast.original_name}
              </p>
              <p className=" text-gray-400 font-normal text-base flex justify-center  ">
                {cast.character}
              </p>
            </div>
          ))}
    </div>
  </div>
 
  )
}

export default TopCast