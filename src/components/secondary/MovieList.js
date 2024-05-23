import React, { useState, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from "styled-components";

const MovieList = ({ title, movies}) => {
  const listRef = useRef();
  const [controlVisibility, setControlVisibility] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const handleDirection = (direction) => {
    // const containerWidth = listRef.current.offsetWidth;
    const moviesToSlide = 4; // Change this value to adjust the number of movies to slide
    const movieWidth = 297; // Width of each movie card
    const spacing = 10; // Spacing between movie cards
    
    // const slideDistance = (movieWidth + spacing) * moviesToSlide; // Adjusted distance based on movie card width and spacing
  
    if (direction === 'left' && sliderPosition > 0) {
      const newPosition = Math.max(0, sliderPosition - moviesToSlide);
      const newTranslate = (movieWidth + spacing) * newPosition;
      listRef.current.style.transform = `translateX(-${newTranslate}px)`;
      setSliderPosition(newPosition);
    }
    
    if (direction === 'right' && sliderPosition < (movies.length || 0) - moviesToSlide) {
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
      <h1 className="text-xl py-4 text-white">{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!controlVisibility ? 'none' : ''}`}>
          <AiOutlineLeft onClick={() => handleDirection('left')} />
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
        <div className={`slider-action right ${!controlVisibility ? 'none' : ''}`}>
          <AiOutlineRight onClick={() => handleDirection('right')} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
gap: 0.7rem;
position: relative;
padding: 1rem 0;

.wrapper {
  overflow-x: hidden; /* Hide horizontal overflow */\
  overflow-y: hidden; /* Hide vertical overflow */

  .slider {
    display: flex;
    gap: 8px; // Adjusted spacing between movie cards
    transition: 0.15s cubic-bezier(0.25, 0.1, 0.25, 1); /* Adjust the transition duration and timing function */
    margin-left: 5px;
  }
  
  
  .slider-action {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 99;
    height: 100%;
    top: 2rem;
    bottom: 0;
    width: 50px;
    transition: 0.1s ease-in-out;
    svg {
      font-size: 2rem;
      cursor: pointer;
      color: white;
    }
  }
  .left {
    left: 0;
  }
  .right {
    right: 10px;
  }
  .none {
    display: none;
  }
}
`;


export default MovieList;

