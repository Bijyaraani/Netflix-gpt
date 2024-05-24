import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addnowPlayingMovies } from "../Utils/moviesSlice";

const useNowPlayingMovies = () =>{

// Fecting the movie from AAPI and update it in Redux  store
const dispatch = useDispatch();

  const getNowPlayingMovies = async () =>{

  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)

  const json = await data.json();


  dispatch (addnowPlayingMovies(json.results))

  };

  useEffect (()=>{getNowPlayingMovies()

  } ,[]);

};

export default useNowPlayingMovies;