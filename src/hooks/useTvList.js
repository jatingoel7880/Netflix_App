// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import {  nowTvSeriesPopularList } from "../utils/moviesSlice";

// const useTvSeriesPopularList = () => {

//     const dispatch= useDispatch();

//   const getTvSeriesPopularList = async () => {
//     const data = await fetch(
//      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
//  API_OPTIONS
//     );  

//     const json=await data.json();
//     console.log(json.results);
//     dispatch(nowTvSeriesPopularList(json.results))
//   };

//   useEffect(() => {
//     getTvSeriesPopularList();
//   }, []);
// };

// export default useTvSeriesPopularList;
