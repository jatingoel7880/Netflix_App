import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"
import moviesDataReducer from "./movieDataSlice"
import silimarMoviesReducer from "./similarMovieSlice"
import cardTrailerReducer from "./cardsTrailer";

const appStore=configureStore(
    {
        reducer:{
            user: userReducer,
            movies: moviesReducer,
            card: cardTrailerReducer,
            gpt:gptReducer,
            config:configReducer,
            moviesData: moviesDataReducer,
            similarMovies: silimarMoviesReducer,
        },
    }
);

export default appStore;