import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addnowUpcomingMovies } from "../Utils/moviesSlice";

const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const nowUpcomingMovies = useSelector(
    (store) => store.movies.nowUpcomingMovies
  );

  const getNowUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addnowUpcomingMovies(json.results));
  };

  useEffect(() => {
    !nowUpcomingMovies && getNowUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;