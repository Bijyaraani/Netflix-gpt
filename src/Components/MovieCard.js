import React from "react";
import { IMAG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterpath }) => {

    if(!posterpath) return null;

    return (

        <div className=" w-48 pr-4">

            <img alt="Movie Card" src ={IMAG_CDN_URL + posterpath}/>

        </div>
    )
}

export default MovieCard;