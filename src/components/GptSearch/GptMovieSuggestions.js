import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../../utils/constants";

const GptMovieSuggestions = () => {
  // const gpt=useSelector(store=>store.gpt);
  // const{movieNames,movieResults}=gpt;

  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults || movieResults.flat().length === 0) {
    return (
      <div className="container p-4 m-4 flex justify-center items-center text-3xl text-white font-bold ">
        <p className="text-center">Sorry, No movies Found!</p>
      </div>
    );
  }
  // console.log(movieNames[0])
  const allMovies = movieResults.flat();
  // console.log(allMovies)

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-wrap justify-start">
        {allMovies.map(
          (movie, index) =>
            movie.poster_path && (
              <div
                className="relative group m-5 w-[200px] h-[300px]"
                key={index}
              >
                <Link to={`/play/${movie.id}`}>
                {/* <Link to="/play"> */}
                  <img
                    src={`${IMG_CDN_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-x-105"
                    // style={{ width: "150px", height: "225px" }}
                  />

                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity rounded-lg flex items-center justify-center">
                    {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
                    <h3 className="text-white text-md font-semibold text-center">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;

