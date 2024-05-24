import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondryContainer =() => {

    const movies = useSelector((store)=> store.movies);

    return (

        movies.nowPlayingMovies && (
    <div className=" bg-black">  
    <div className="-mt-52 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Popular"} movies={movies.nowPopularMovies}/>
        <MovieList title={"Top Rated"} movies={movies.nowTopratedMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies.nowUpcomingMovies}/>
        </div>
        </div>
        )
    );
    
};

export default SecondryContainer;