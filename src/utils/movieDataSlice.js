import { createSlice } from "@reduxjs/toolkit";

const movieDataSlice=createSlice({
    name: "moviesData",
    initialState: {
        movieData:null,
        movieReview:null,
        movieCast:null,
        movieImage:[],
    },
    reducers:{
        addMovieData:(state,action)=>{
            state.movieData= action.payload;
            // return action.payload;
        },
        addMovieReview:(state, action)=>{
            state.movieReview= action.payload; 
        },
        addMovieCast:(state, action)=>{
            state.movieCast=action.payload;
        },
        addMovieImage:(state, action)=>{
            state.movieImage=action.payload;
        },
        clearMovieData: (state) => {
            state.movieData = null;
            state.movieReview = null;
            state.movieCast= null;
            state.movieImage = [];
            // Clear any other state properties if needed
          },
    }
})

export const {addMovieData,addMovieReview,addMovieImage,addMovieCast,clearMovieData}= movieDataSlice.actions;
export default movieDataSlice.reducer;