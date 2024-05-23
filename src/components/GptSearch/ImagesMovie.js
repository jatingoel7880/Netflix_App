

import React, { useState } from 'react'
import { IMG_CDN_URL } from "../../utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


const ImagesMovie = () => {
    const movieImage = useSelector((state) => state.moviesData?.movieImage);
    // const [swiperRef, setSwiperRef] = useState(null);
    console.log(movieImage);
    const [loadedImages, setLoadedImages] = useState(10); // Number of initially loaded images
 

    const loadMoreImages=()=>{
      setLoadedImages((prevLoadedImages)=> prevLoadedImages+10);
    };

    const handleReachEnd=()=>{
      loadMoreImages();
    }

  return (
    <div>
    <h2 className="text-white font-bold text-xl px-8 mt-10" >Images:</h2>
    {/* <div className="flex overflow-x-auto mt-10 px-8"> */}
        
      <Swiper
        // onSwiper={setSwiperRef}
        slidesPerView={4}
        // centeredSlides={true}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        onReachEnd={handleReachEnd}
       
      >
{/* 
{movieImage.backdrops.map((images) => (
      <SwiperSlide 
        key={images.file_path}>
        <img
        src={IMG_CDN_URL + images.file_path}
        alt="Images"
        className="w-[300px] h-[200px] mr-4"
      /> */}
       {movieImage.backdrops.slice(0, loadedImages).map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={IMG_CDN_URL + image.file_path}
              alt="Images"
              className="mt-8 ml-8"
            />
      </SwiperSlide>
    ))}  
     </Swiper>
         {/* Apply inline style to move the left swiper button */}
         <style>
                {`
                .swiper-button-prev {
                    left: 40px; /* Adjust the value to your desired position */
                    right: auto;
                }
                `}
            </style>
  </div>
 
  )
}

export default ImagesMovie
