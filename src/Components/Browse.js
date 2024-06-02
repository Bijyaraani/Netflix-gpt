
import Header from "./Header"; 
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import SecondryContainer from "./SecondryContainer";
import MainContainer from "./MainContainer";
import usePopularMovies from "../hooks/usePopularMovies.js";
import useTopratedMovies from "../hooks/useTopratedMovies.js";
import useUpcomingMovies from "../hooks/useUpcomingMovies.js";
import GPTsearch from "./GPTsearch.js";
import { useSelector } from "react-redux";




const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  useNowPlayingMovies();
  usePopularMovies();
  useTopratedMovies();
  useUpcomingMovies();
  
  return (
    <div>
      <Header  />

      {showGptSearch?(<GPTsearch/> ):(
      <>
      < MainContainer />
      <SecondryContainer /></>
      
 ) }
    </div>
  )
}

export default Browse
