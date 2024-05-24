
import Header from "./Header"; 
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import SecondryContainer from "./SecondryContainer";
import MainContainer from "./MainContainer";
import usePopularMovies from "../hooks/usePopularMovies.js";
import useTopratedMovies from "../hooks/useTopratedMovies.js";
import useUpcomingMovies from "../hooks/useUpcomingMovies.js";




const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopratedMovies();
  useUpcomingMovies();
  
  return (
    <div>
      <Header  />
      < MainContainer />
      <SecondryContainer />
    </div>
  )
}

export default Browse
