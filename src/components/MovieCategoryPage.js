import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoaderNetflix from "./loader/LoaderNetflix";
import { API_OPTIONS, BACK_LOGO, IMG_CDN_URL } from "../utils/constants";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Skeleton from "./loader/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MovieCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
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

  function formatCategory(category) {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Cinematic section title
  const renderCategoryTitle = (cat) => (
    <div className="relative flex items-center mb-8 mt-4 w-full mx-auto px-2 md:px-8" style={{ minHeight: '56px' }}>
      {/* Back button at extreme left */}
      <button
        onClick={() => navigate("/browse")}
        className="flex items-center gap-2 px-4 py-2 bg-black/80 hover:bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 focus:outline-none absolute left-0 top-1/2 -translate-y-1/2"
        style={{ zIndex: 2 }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </button>
      {/* Centered category title */}
      <div className="mx-auto flex items-center relative select-none">
        <span className="w-3 h-3 mr-3 rounded-full bg-red-600 shadow-lg shadow-red-500/50 animate-pulse group-hover:scale-125 transition-transform duration-300"></span>
        <span className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-red-400">
          {formatCategory(cat)}
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full group-hover:w-3/4 transition-all duration-500"></span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#141414] bg-[length:400%_400%] opacity-95"
        style={{ animation: "gradientBG 15s ease infinite" }}
      />
      <style>{`
        @keyframes gradientBG {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <Header isCategory={true} />
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoaderNetflix />
        </div>
      ) : (
        <>
          {/* Fixed logo with less dark overlay for readability and more visible logo */}
          <div className="fixed -z-10 w-full h-full top-0 left-0">
            <img
              src={BACK_LOGO}
              alt="logo"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          </div>
          <div className="container mx-auto px-2 md:px-8 py-8">
            {renderCategoryTitle(category)}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
              {movies.map((movie, index) =>
                movie.poster_path ? (
                  <div
                    className="relative group m-2 w-[160px] sm:w-[180px] md:w-[200px] h-[240px] sm:h-[270px] md:h-[300px] rounded-xl overflow-hidden shadow-lg bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-red-600/40 border border-transparent hover:border-red-600"
                    key={index}
                  >
                    <Link
                      to={`/play/${movie.id}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={`${IMG_CDN_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="text-white text-4xl drop-shadow-lg animate-pulse"
                        />
                      </div>
                    </Link>
                  </div>
                ) : null
              )}
            </div>
            {loading && (
              <p className="text-white text-center mt-4">Loading...</p>
            )}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default MovieCategoryPage;
