import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/langaugeConstants";
import openai from '../Utils/openAI';
import { API_OPTIONS } from "../Utils/constants";
import { addGptMovieResult } from "../Utils/gptSlice";


const GPTSearchbar =()=>{

    const dispatch = useDispatch();
    

    const langkey = useSelector((store) => store.config.lang);

    const searchText = useRef(null);

    const searchMoviesTMBD = async (movie) => {

    const data = await fetch("https://api.themoviedb.org/3/search/movie?query= " +
    movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);

    const json = data.json;
    
    return json.results;

    }

    const handleGPTbuttonclick = async ()=>{

        console.log(searchText.current.value);

        const gptquery = "Act as a movie recommendation system and select a movies for the query" +searchText.current.value+ 
        "only give me names of 5 movies comma separated lke the example result given ahead . Example : Gadar , Golmal , hum sath sath hai , koi mail gaya , "

        const gptSearchResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptquery}],
            model: 'gpt-3.5-turbo',
          });

          if(!gptSearchResult.choices){}

          console.log(gptSearchResult.choices?.[0]?.message?.content);
          
          //Andaaz Apna apna , Sholey etc , it will cntains movie name , it will be in the form of string , so to convert into array we need to give split
          const gptMovies = gptSearchResult.choices?.[0]?.message?.content.split(",");

          //after using split above string will become like ["padosan" ,"hera pheri" ,"sholey"]

          const promiseArray = gptMovies.map((movie)=> searchMoviesTMBD(movie));

          const tmdbresults = await Promise.all(promiseArray)  //Promise.all will first execute all promise inside array then only give result to tmdbresults

          console.log(tmdbresults)

          dispatch (addGptMovieResult({movieNames : gptMovies , movieResults : tmdbresults}));

    };

    return (
    
    <div className="pt-[10%] flex justify-center"> 
        <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
            <input 
            ref={searchText}
            
            type= "text" className="p-4 m-4 col-span-9" placeholder={lang[langkey].gptSearchPlaceholder}/>
            <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGPTbuttonclick}> {lang[langkey].search}</button>
        </form>
        
        GPTSearchbar</div>


)}

export default GPTSearchbar;