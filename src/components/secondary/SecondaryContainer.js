import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePopularMovies from "../../hooks/usePopularMovies";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MovieCategoryPage from "../MovieCategoryPage";

// Lazy load SecondaryContainer
const MovieList = lazy(() => import("./MovieList"));

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const navigate = useNavigate();
  // const { loading, loadMoreMovies } = usePopularMovies();
  const [mainContainerLoaded, setMainContainerLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContainerLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  const renderLoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="mb-8">
          <div className="h-8 w-48 bg-gray-700/50 rounded-lg mb-4"></div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((card) => (
              <div key={card} className="w-[300px] h-[180px] bg-gray-700/50 rounded-md"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCategoryTitle = (title, category) => (
    <div className="flex items-center group cursor-pointer" onClick={() => handleCategoryClick(category)}>
      <span className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
        {title}
      </span>
      <FontAwesomeIcon 
        icon={faChevronRight} 
        className="ml-3 text-lg transition-all duration-300 group-hover:scale-125 group-hover:text-red-500" 
      />
    </div>
  );

  return (
    <div className="bg-[#141414] min-h-screen">
      <div className="pl-12 relative">
        {mainContainerLoaded ? (
          <Suspense fallback={renderLoadingSkeleton()}>
            {selectedCategory ? (
              <MovieCategoryPage category={selectedCategory} />
            ) : (
              <div className="space-y-12 py-8">
                <MovieList
                  title={renderCategoryTitle("Now Playing", "now_playing")}
                  movies={movies.nowPlayingMovies}
                />
                
                <MovieList
                  title={renderCategoryTitle("Trending Movies", "trending")}
                  movies={movies.trendingMovies}
                />

                <MovieList
                  title={renderCategoryTitle("Popular Movies", "popular")}
                  movies={movies.popularMovies}
                />

                <MovieList
                  title={renderCategoryTitle("Upcoming Movies", "upcoming")}
                  movies={movies.upcomingMovies}
                />

                <MovieList
                  title={renderCategoryTitle("Top Rated Movies", "top_rated")}
                  movies={movies.topRatedMovies}
                />
                
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
