import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        movieNames: null,
         movieResults:null,
    },
    reducers:{
        toogleGptsearchView:(state,action)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addGptMovieResult:(state,action)=>{
            const{movieNames, movieResults}=action.payload
            state.movieNames=movieNames;
            state.movieResults=movieResults;
        },
        clearGptMovieResult: (state) => {
            state.movieResults = null;
            state.movieNames = null;
            // Clear any other state properties if needed
          },
    }
})

export const {toogleGptsearchView,addGptMovieResult,clearGptMovieResult}=gptSlice.actions;
export default gptSlice.reducer;