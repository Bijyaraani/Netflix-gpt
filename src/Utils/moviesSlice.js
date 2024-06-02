import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({

    name : "movies",

    initialState : {

        nowPlayingMovies : null ,
        trailerVideo : null,
        nowPopularMovies : null,
        nowTopratedMovies : null,
        nowUpcomingMovies : null,
    },

    reducers :{
      
        addnowPlayingMovies : (state , action) => {

            state.nowPlayingMovies = action.payload;

        },

        addTrailerVideo : (state , action) =>{

            state.trailerVideo = action.payload;
        },

        addnowPopularMovies : (state , action) => {

            state.nowPopularMovies = action.payload;


        },

        addnowTopRatedMovies : (state , action) => {

            state.nowTopratedMovies = action.payload;


        },

        addnowUpcomingMovies : (state , action) => {

            state.nowUpcomingMovies = action.payload;


        },

    },


}


);

export const {addnowPlayingMovies , addTrailerVideo, addnowPopularMovies,addnowTopRatedMovies ,addnowUpcomingMovies} = moviesSlice.actions;

export default moviesSlice.reducer;

