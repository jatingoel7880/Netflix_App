// import React from "react";
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const MovieCategoryPage = ({ category }) => {
//   const movies = useSelector((store) => store.movies);
//   const navigate = useNavigate();

//   let title, movieData;

//   switch (category) {
//     case "now-playing":
//       title = "Now Playing";
//       movieData = movies.nowPlayingMovies;
//       break;
//     case "trending-movies":
//       title = "Trending Movies";
//       movieData = movies.trendingMovies;
//       break;
//     case "popular-movies":
//       title = "Popular Movies";
//       movieData = movies.popularMovies;
//       break;
//     case "upcoming-movies":
//       title = "Upcoming Movies";
//       movieData = movies.upcomingMovies;
//       break;
//     case "top-rated-movies":
//       title = "Top Rated Movies";
//       movieData = movies.topRatedMovies;
//       break;
//     default:
//       title = "";
//       movieData = [];
//   }

//   return (
//     <div>
//       <h2 className="text-white text-2xl mb-4">{title}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {movieData.map((movie, index) => (
//           <div key={index} className="relative">
//             <img
//               src={movie.poster}
//               alt={movie.title}
//               className="w-full rounded-lg cursor-pointer"
//             />
//             <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//               <FontAwesomeIcon
//                 icon={faChevronRight}
//                 className="text-white text-4xl"
//                 onClick={() => navigate(`/movie/${movie.id}`)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieCategoryPage;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Loader2 from "./loader/Loader2";
// import { API_OPTIONS, BACK_LOGO, IMG_CDN_URL } from "../utils/constants";
// import Footer from "./Footer/Footer";

// const MovieCategoryPage = () => {
//   const { category } = useParams();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   let totalPages = 20;

//   useEffect(() => {
// //     // const fetchMovies = async () => {
// //     //   try {
// //     //     let allMovies=[];
// //     //     for(let page=1; page<= totalPages;page++){
// //     //     const response = await fetch(
// //     //       `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`, API_OPTIONS
// //     //     );
// //     //     // "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

// //     //     if (response.ok) {
// //     //       const data = await response.json();
// //     //       allMovies = [...allMovies, ...data.results];
// //     //       // setMovies(data.results);
// //     //       setMovies(allMovies);
// //     //       console.log(data)
// //     //     } else {
// //     //       console.error("Failed to fetch movies",page);
// //     //     }
// //     //   }
// //     //  } catch (error) {
// //     //     console.error("Error fetching movies:", error);
// //     //   } finally {
// //     //     setLoading(false);
// //     //   }
// //     // };

// const fetchMovies = async () => {
//   try {
//     let allMovies = [];
//     for (let page = 1; page <= totalPages; page++) {
//       let apiEndpoint = "";
//       switch (category) {
//         case "trending":
//           apiEndpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
//           break;
//         default:
//           apiEndpoint = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
//           break;
//       }

//       const response = await fetch(apiEndpoint, API_OPTIONS);

//       if (response.ok) {
//         const data = await response.json();
//         allMovies = [...allMovies, ...data.results];
//         setMovies(allMovies);
//       } else {
//         console.error("Failed to fetch movies");
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// fetchMovies();
// }, [category]);


//   return (
//     <div>
//       {loading ? (
//         <p>
//           <Loader2 />
//         </p>
//       ) : (
//         <>
//         <div className="fixed -z-10 opacity-90">
//         <img src={BACK_LOGO} alt="logo" />
//         </div>
//           <div className="container mx-auto px-4 py-8 ">
//             <div className="flex flex-wrap justify-start">
//               <h2>{category}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//                 {/* title={category} movies={movies} */}
//                 {movies.map(
//                   (movie, index) =>
//                     movie.poster_path && (
//                       <div
//                         className="relative group m-2 w-[200px] h-[300px]"
//                         key={index}
//                       >
//                         <Link to={`/play/${movie.id}`}>
//                           {/* <Link to="/play"> */}
//                           <img
//                             src={`${IMG_CDN_URL}${movie.poster_path}`}
//                             alt={movie.title}
//                             className="object-cover w-full h-full rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-x-105"
//                             // style={{ width: "150px", height: "225px" }}
//                           />

//                           {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity rounded-lg flex items-center justify-center">
//                     <h3 className="text-white text-md font-semibold text-center">
//                       {movie.title}
//                     </h3>
//                   </div>  */}
//                         </Link>
//                       </div>
//                     )
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//                {/* <Footer/> */}
//     </div>
//   );
// };

// export default MovieCategoryPage;

import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Loader2 from "./loader/Loader2";
import { API_OPTIONS, BACK_LOGO, IMG_CDN_URL } from "../utils/constants";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Skeleton from "./loader/Skeleton";

const MovieCategoryPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let apiEndpoint = "";
        switch (category) {
          case "trending":
            apiEndpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
            break;
          default:
            apiEndpoint = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
            break;
        }

        const response = await fetch(apiEndpoint, API_OPTIONS);

        if (response.ok) {
          const data = await response.json();
          if (page === 1) {
            setMovies(data.results);
          } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          }
          setTotalPages(data.total_pages);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        // Load more movies if not already at the last page
        if (page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, totalPages]);


  function formatCategory(category){
    return category
    .split('_')
    .map(word=>word.charAt(0).toUpperCase()+word.slice(1))
    .join(' ') + " :-";
  }

  return (
    <div>
      <Header isCategory={true} />
      {loading ? (
        <p>
          <Loader2 />
        </p>
      ) : (
        <>
          <div className="fixed -z-10 opacity-90">
            <img src={BACK_LOGO} alt="logo" />
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-evenly m-6">
            <h2 className="text-2xl text-white italic font-bold m-6 underline">{formatCategory(category)}</h2>
              {/* <h2>{category}</h2> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {page===1 &&
                movies.map(
                  (movie, index) =>
                    movie.poster_path ? (
                      <div
                        className="relative group m-2 w-[200px] h-[300px]"
                        key={index}
                      >
                        <Link to={`/play/${movie.id}`}>
                          <img
                            src={`${IMG_CDN_URL}${movie.poster_path}`}
                            alt={movie.title}
                            className="object-cover w-full h-full rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-x-105"
                          />
                        </Link>
                      </div>
                    ) :null 
                )}
                {page>1 &&
                movies.map(
                  (movie, index) =>
                    movie.poster_path ? (
                      <div
                        className="relative group m-2 w-[200px] h-[300px]"
                        key={index}
                      >
                        <Link to={`/play/${movie.id}`}>
                          <img
                            src={`${IMG_CDN_URL}${movie.poster_path}`}
                            alt={movie.title}
                            className="object-cover w-full h-full rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-x-105"
                          />
                        </Link>
                      </div>
                    ) :null 
                )} 
              </div>
              {loading && <p>Loading</p>}
            </div>
          </div>
        </>
      )}
      {/* <Footer/> */}
    </div>
  );
};

export default MovieCategoryPage;
