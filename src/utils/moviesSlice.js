import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
  },

  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    nowPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    nowTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    nowTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    nowUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    // clearTrailerVideo:(state)=>{ 
    //   state.trailerVideo=null;
    // }
    // nowTvSeriesPopularList: (state, action) => {
    //   state.tvSeriesPopularList = action.payload;
    // },
  },
});

export default moviesSlice.reducer;
export const {
  addNowPlayingMovies,
  addTrailerVideo,
  nowPopularMovies,
  nowTopRatedMovies,
  nowUpcomingMovies,
  // nowTvSeriesPopularList,
  nowTrendingMovies,
  // clearTrailerVideo,
} = moviesSlice.actions;
