import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePopularMovies from "../../hooks/usePopularMovies";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MovieCategoryPage from "../MovieCategoryPage";
import LoaderNetflix from '../loader/LoaderNetflix';

// Lazy load SecondaryContainer
const MovieList = lazy(() => import("./MovieList"));

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const navigate = useNavigate();
  const [mainContainerLoaded, setMainContainerLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContainerLoaded(true);
      // Trigger fade in animation after loading
      setTimeout(() => setFadeIn(true), 100);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  const renderLoadingSkeleton = () => (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderNetflix />
    </div>
  );

  const renderCategoryTitle = (title, category) => (
    <div 
      className="flex items-center group cursor-pointer transform transition-all duration-300 hover:scale-105 relative"
      onClick={() => handleCategoryClick(category)}
    >
      {/* Animated red dot */}
      <span className="w-3 h-3 mr-3 rounded-full bg-red-600 shadow-lg shadow-red-500/50 animate-pulse group-hover:scale-125 transition-transform duration-300"></span>
      <span className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-white group-hover:text-red-500 transition-all duration-300 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-red-400">
        {title}
      </span>
      {/* Animated underline */}
      <span className="absolute left-6 -bottom-1 w-0 h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full group-hover:w-3/4 transition-all duration-500"></span>
      <FontAwesomeIcon 
        icon={faChevronRight} 
        className="ml-3 text-lg transition-all duration-300 group-hover:scale-125 group-hover:text-red-500 group-hover:translate-x-1 animate-pulse group-hover:animate-none" 
      />
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#141414] via-[#0f0f0f] to-[#141414] min-h-screen">
      <div className={`pl-8 md:pl-12 relative transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        {mainContainerLoaded ? (
          <Suspense fallback={renderLoadingSkeleton()}>
            {selectedCategory ? (
              <MovieCategoryPage category={selectedCategory} />
            ) : (
              <div className="space-y-16 py-8">
                {/* Enhanced section with better spacing and animations */}
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <MovieList
                    title={renderCategoryTitle("Now Playing", "now_playing")}
                    movies={movies.nowPlayingMovies}
                  />
                </div>
                
                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <MovieList
                    title={renderCategoryTitle("Trending Movies", "trending")}
                    movies={movies.trendingMovies}
                  />
                </div>

                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <MovieList
                    title={renderCategoryTitle("Popular Movies", "popular")}
                    movies={movies.popularMovies}
                  />
                </div>

                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <MovieList
                    title={renderCategoryTitle("Upcoming Movies", "upcoming")}
                    movies={movies.upcomingMovies}
                  />
                </div>

                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <MovieList
                    title={renderCategoryTitle("Top Rated Movies", "top_rated")}
                    movies={movies.topRatedMovies}
                  />
                </div>
                
                <Footer />
              </div>
            )}
          </Suspense>
        ) : (
          renderLoadingSkeleton()
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;