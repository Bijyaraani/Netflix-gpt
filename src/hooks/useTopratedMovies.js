import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addnowTopRatedMovies } from "../Utils/moviesSlice";

const useTopratedMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const nowTopratedMovies = useSelector(
    (store) => store.movies.nowTopratedMovies
  );

  const getTopratedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addnowTopRatedMovies(json.results));

  };

  useEffect(() => {
    !nowTopratedMovies && getTopratedMovies();
  }, []);
};

export default useTopratedMovies;