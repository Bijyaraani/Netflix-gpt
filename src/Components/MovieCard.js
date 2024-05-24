import React from "react";
import { IMAG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterpath }) => {

    return (

        <div className=" w-48 pr-4">

            <img alt="Movie Card" src ={IMAG_CDN_URL + posterpath}/>

        </div>
    )
}

export default MovieCard;