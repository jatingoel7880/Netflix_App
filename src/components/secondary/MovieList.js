import React, { useState, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from "styled-components";

const MovieList = ({ title, movies }) => {
  const listRef = useRef();
  const [controlVisibility, setControlVisibility] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const moviesToSlide = 4;
  const movieWidth = 204; // 200px width + 4px margin
  const spacing = 8; // 4px margin on each side

  useEffect(() => {
    if (movies) {
      const maxPosition = Math.max(0, movies.length - moviesToSlide);
      setCanScrollRight(sliderPosition < maxPosition);
      setCanScrollLeft(sliderPosition > 0);
    }
  }, [sliderPosition, movies]);

  const handleDirection = (direction) => {
    if (direction === 'left' && canScrollLeft) {
      const newPosition = Math.max(0, sliderPosition - moviesToSlide);
      const newTranslate = (movieWidth + spacing) * newPosition;
      listRef.current.style.transform = `translateX(-${newTranslate}px)`;
      setSliderPosition(newPosition);
    }
    
    if (direction === 'right' && canScrollRight) {
      const newPosition = Math.min((movies.length || 0) - moviesToSlide, sliderPosition + moviesToSlide);
      const newTranslate = (movieWidth + spacing) * newPosition;
      listRef.current.style.transform = `translateX(-${newTranslate}px)`;
      setSliderPosition(newPosition);
    }
  };
  
  return (
    <Container
      controlVisibility={controlVisibility}
      onMouseEnter={() => setControlVisibility(true)}
      onMouseLeave={() => setControlVisibility(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white hover:text-red-500 transition-colors duration-300">
          {title}
        </h1>
      </div>
      
      <div className="wrapper">
        <div className={`slider-action left ${!controlVisibility || !canScrollLeft ? 'none' : ''}`}>
          <button 
            onClick={() => handleDirection('left')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollLeft 
                ? 'bg-black/50 hover:bg-black/80' 
                : 'bg-black/30 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <AiOutlineLeft className="text-2xl text-white" />
          </button>
        </div>
        
        <div className="slider" ref={listRef} style={{ width: `${sliderWidth}px` }}>
          <div className="flex">
            {movies && movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        </div>
        
        <div className={`slider-action right ${!controlVisibility || !canScrollRight ? 'none' : ''}`}>
          <button 
            onClick={() => handleDirection('right')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollRight 
                ? 'bg-black/50 hover:bg-black/80' 
                : 'bg-black/30 cursor-not-allowed'
            }`}
            disabled={!canScrollRight}
          >
            <AiOutlineRight className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  gap: 0.7rem;
  position: relative;
  padding: 1.5rem 0;
  margin: 0 1rem;

  .wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    padding: 0 1rem;

    .slider {
      display: flex;
      gap: 8px;
      transition: 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      margin-left: 5px;
    }
    
    .slider-action {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      opacity: 0;
      transform: translateX(${props => props.controlVisibility ? '0' : '20px'});
    }

    .left {
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.8), transparent);
    }

    .right {
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.8), transparent);
    }

    .none {
      display: none;
    }
  }

  &:hover .slider-action {
    opacity: 1;
  }
`;

export default MovieList;

