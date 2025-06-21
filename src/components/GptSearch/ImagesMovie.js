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
    <div className="bg-black/60 rounded-2xl shadow-lg p-6 md:p-8 text-white mb-6">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide text-center bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent">
        Images
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={32}
        pagination={{ clickable: true }}
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        onReachEnd={handleReachEnd}
        className="mb-6"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {movieImage.backdrops.slice(0, loadedImages).map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={IMG_CDN_URL + image.file_path}
              alt="Images"
              className="rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 w-full h-[200px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {loadedImages < movieImage.backdrops.length && (
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none"
            onClick={loadMoreImages}
          >
            Load More
          </button>
        </div>
      )}
      <style>
        {`
          .swiper-button-prev {
            left: 40px;
            right: auto;
          }
        `}
      </style>
    </div>
  );
}

export default ImagesMovie
