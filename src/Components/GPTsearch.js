import React from "react";
import GPTSearchbar from "./GPTSearchbar";
import GPTMoviesuggestions from "./GPTMoviesuggestions";
import { Netflix_page } from "../Utils/constants";


const GPTsearch =()=>{

return (
<div>
<div className="absolute -z-10">
        <img
          src={Netflix_page}
          alt="logo"
        />
      </div>
<GPTSearchbar/>
<GPTMoviesuggestions/>

</div>

     
)}

    export default GPTsearch;
    
    