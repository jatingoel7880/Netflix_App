import { createSlice } from "@reduxjs/toolkit";

const similarMoviesSlice=createSlice({
    name: "similarMovies",
    initialState: null,
    reducers:{
        addSimilarMovie:(state,action)=>{
            return action.payload;
        },
    
    }
})

export const {addSimilarMovie}= similarMoviesSlice.actions;
export default similarMoviesSlice.reducer;