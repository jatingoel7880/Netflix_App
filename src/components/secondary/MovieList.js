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
  const [isHovered, setIsHovered] = useState(false);

  const moviesToSlide = 4;
  const movieWidth = 155; // 200px width + 4px margin
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
      onMouseEnter={() => {
        setControlVisibility(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setControlVisibility(false);
        setIsHovered(false);
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="transform transition-all duration-300 hover:scale-105">
          {title}
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-300 rounded-full"
              style={{ 
                width: `${movies ? (sliderPosition / Math.max(1, movies.length - moviesToSlide)) * 100 : 0}%` 
              }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {sliderPosition + 1} / {movies ? Math.max(1, movies.length - moviesToSlide + 1) : 1}
          </span>
        </div>
      </div>
      
      <div className="wrapper">
        <div className={`slider-action left ${!controlVisibility || !canScrollLeft ? 'none' : ''}`}>
          <button 
            onClick={() => handleDirection('left')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              canScrollLeft 
                ? 'bg-black/70 hover:bg-black/90 shadow-lg' 
                : 'bg-black/30 cursor-not-allowed'
            }`}
            disabled={!canScrollLeft}
          >
            <AiOutlineLeft className="text-2xl text-white" />
          </button>
        </div>
        
        <div className="slider" ref={listRef} style={{ width: `${sliderWidth}px` }}>
          <div className="flex">
            {movies && movies.map((movie, index) => (
              <div 
                key={movie.id}
                className="transform transition-all duration-300 hover:scale-105"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isHovered ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                }}
              >
                <MovieCard
                  movieId={movie.id}
                  posterPath={movie.poster_path}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className={`slider-action right ${!controlVisibility || !canScrollRight ? 'none' : ''}`}>
          <button 
            onClick={() => handleDirection('right')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              canScrollRight 
                ? 'bg-black/70 hover:bg-black/90 shadow-lg' 
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
  padding: 2rem 0;
  margin: 0 1rem;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .wrapper {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    padding: 0 1rem;

    .slider {
      display: flex;
      gap: 12px;
      transition: 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
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
      width: 60px;
      transition: 0.3s ease-in-out;
      opacity: 0;
      transform: translateX(${props => props.controlVisibility ? '0' : '20px'});
    }

    .left {
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.9), transparent);
    }

    .right {
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.9), transparent);
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

