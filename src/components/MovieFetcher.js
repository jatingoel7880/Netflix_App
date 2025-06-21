// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Loader2 from "./loader/Loader2";
// import { API_OPTIONS, BACK_LOGO, IMG_CDN_URL } from "../utils/constants";
// // import Footer from "./Footer/Footer";

// const MovieFetcher = ({
//   category,
//   page,
//   setPage,
//   loading,
//   setLoading,
//   setHasMore,
//   loaderRef,
// }) => {
//   const [movies, setMovies] = useState([]);
//   //   const [loading, setLoading] = useState(true);
//   //   let totalPages = 20;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         let allMovies = [];

//         let apiEndpoint = "";
//         switch (category) {
//           case "trending":
//             apiEndpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
//             break;
//           default:
//             apiEndpoint = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
//             break;
//         }

//         const response = await fetch(apiEndpoint, API_OPTIONS);

//         //           if (response.ok) {
//         //             const data = await response.json();
//         //             allMovies = [...allMovies, ...data.results];
//         //             setMovies(allMovies);
//         //           } else {
//         //             console.error("Failed to fetch movies");
//         //           }
//         //         }
//         //        catch (error) {
//         //         console.error("Error fetching movies:", error);
//         //       } finally {
//         //         setLoading(false);
//         //       }
//         //     };
//         //     fetchMovies();
//         //   }, [category,page]);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.results.length === 0) {
//             setHasMore(false);
//           } else {
//             setMovies((prevMovies) => [...prevMovies, ...data.results]);
//             setLoading(false);
//           }
//         } else {
//           console.error("Failed to fetch movies from page", page);
//         }
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     if (loading) {
//       fetchMovies();
//     }
//   }, [category, page, loading, setLoading, setHasMore]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         loaderRef.current &&
//         window.innerHeight + window.scrollY >= loaderRef.current.offsetTop &&
//         !loading
//       ) {
//         setLoading(true);
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [loaderRef, loading]);

//   return (
//     <div>
//       {/* {loading ? (
//         <p>
//           <Loader2 />
//         </p>
//       ) : (
//         <> */}
//           <div className="fixed -z-10 opacity-90">
//             <img src={BACK_LOGO} alt="logo" />
//           </div>
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
//                 {loading && (
//                   <p ref={loaderRef}>
//                     <Loader2 />
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         {/* </>
//       )} */}
//     </div>
//   );
// };

// export default MovieFetcher;
