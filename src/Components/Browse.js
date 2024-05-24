
import Header from "./Header"; 
import useNowPlayingMovies from "../hooks/nowPlayingMovies";
import SecondryContainer from "./SecondryContainer";
import MainContainer from "./MainContainer";


const Browse = () => {

  useNowPlayingMovies();

  
  return (
    <div>
      <Header  />
      < MainContainer />
      <SecondryContainer />
    </div>
  )
}

export default Browse
