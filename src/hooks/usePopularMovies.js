// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { nowPopularMovies } from "../utils/moviesSlice";

// const usePopularMovies = () => {

//     const dispatch= useDispatch();

//   const getPopularMovies = async (page) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
//       API_OPTIONS
//     );
//     const json=await data.json();
//      console.log(json.results);
//     return json.results;

//     // dispatch(nowPopularMovies(json.results))
//   };

//   // useEffect(() => { 
//   //   getPopularMovies();
//   // }, []);
//   useEffect(()=>{
//     const loadMovies= async()=>{
//       const totalPages=5;
//       const movies=[];
//       for(let page=0;page<=totalPages;page++){
//         const results=await getPopularMovies(page);
//         if (results && results.length > 0) {
//           movies.push(...results);
//         } 
//       }   
//       dispatch(nowPopularMovies(movies));
//      }
//      loadMovies();
//   }, [dispatch]);
// };

// export default usePopularMovies;


import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { nowPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Track current page

    const getPopularMovies = async (page) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
            API_OPTIONS
        );
        const json = await data.json();
        console.log(json)
        return json.results;
    };

    const loadMoreMovies = async () => {
        try {
            setLoading(true);
            const nextPageResults = await getPopularMovies(page + 1); // Fetch next page
            dispatch(nowPopularMovies(nextPageResults));
            setPage(page + 1); // Update current page
            setLoading(false);
        } catch (error) {
            console.error("Error loading more popular movies:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadFirstPage = async () => {
            try {
                const firstPageResults = await getPopularMovies(1);
                dispatch(nowPopularMovies(firstPageResults));
                setLoading(false);
            } catch (error) {
                console.error("Error loading popular movies:", error);
                setLoading(false);
            }
        };

        loadFirstPage();
    }, [dispatch]);

    return { loading, loadMoreMovies };
};

export default usePopularMovies;