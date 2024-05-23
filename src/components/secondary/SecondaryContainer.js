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
  const navigate=useNavigate();
  // const { loading, loadMoreMovies } = usePopularMovies();
  const [mainContainerLoaded, setMainContainerLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    // Simulate main container loading
    const timer = setTimeout(() => {
      setMainContainerLoaded(true);
    }, 2000); // Adjust this delay according to your actual loading time or use a proper loading indication from your main container

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };

  return (
    <div className="bg-[#141414]">
      <div className="pl-12 relative">
        {/* Only render SecondaryContainer if MainContainer is loaded */}
        {mainContainerLoaded && (
          <Suspense fallback={null}>
            {selectedCategory ? (
              <MovieCategoryPage category={selectedCategory} />
            ) : (
              <>
            {/* <MovieList
              title={"Now Playing"}
              movies={movies.nowPlayingMovies}
            /> */}
            <MovieList
              title={
                <>
                  <span> Now Playing</span>
                  &nbsp;&nbsp; {/* Add non-breaking space for spacing */}
                <FontAwesomeIcon icon={faChevronRight} className="transition-transform hover:scale-150" 
                //  onClick={()=>navigate("/now-playing")}
                onClick={() => handleCategoryClick("now_playing")}/>
                
                </>
              }
              movies={movies.nowPlayingMovies}
              
            />
            
            <MovieList  title={
                <>
                  <span>Trending Movies</span>
                  &nbsp;&nbsp; 
                  <FontAwesomeIcon icon={faChevronRight} className="transition-transform hover:scale-150" 
                    // onClick={()=>navigate("/trending-movies")}
                    onClick={() => handleCategoryClick("trending")}
                   />
                  
                </>
              } movies={movies.trendingMovies} />


            <MovieList
           title={
                <>
                  <span>Popular Movie</span>
                  &nbsp;&nbsp; 
                  <FontAwesomeIcon icon={faChevronRight} className="transition-transform hover:scale-150"
                  // onClick={()=>navigate("/popular-movies")} 
                  onClick={() => handleCategoryClick("popular")}
                  />
                </>
              }
              movies={movies.popularMovies}
              // onLoadMore={loadMoreMovies}
            />

            <MovieList  title={
                <>
                  <span>Upcoming Movie</span>
                  &nbsp;&nbsp; 
                  <FontAwesomeIcon icon={faChevronRight} className="transition-transform hover:scale-150"
                //  onClick={() => navigate("/upcoming-movies")}
                 onClick={() => handleCategoryClick("upcoming")}
                 />
                </>
              } movies={movies.upcomingMovies} />

            <MovieList  title={
                <>
                  <span>Top Rated Movie</span>
                  &nbsp;&nbsp; 
                  <FontAwesomeIcon icon={faChevronRight} className="transition-transform hover:scale-150"
                    // onClick={()=>navigate("/topRated-movie")} 
                    onClick={() => handleCategoryClick("top_rated")}
                    />       

                </>
              } movies={movies.topRatedMovies} />
            {/* <MovieList title={"TV List"} movies={movies.tvSeriesPopularList} /> */}
            <Footer />
          
            </>
        )}
        </Suspense>
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
