import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addnowPopularMovies } from "../Utils/moviesSlice";

const usePopularMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const nowPopularMovies = useSelector(
    (store) => store.movies.nowPopularMovies
  );

  const getNowPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );


    const json = await data.json();
    

    dispatch(addnowPopularMovies(json.results));

    


  };
  


  useEffect(() => {
    !nowPopularMovies && getNowPopularMovies();
  }, []);
};

export default usePopularMovies;