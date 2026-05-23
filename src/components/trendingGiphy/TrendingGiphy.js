import React from "react";
import "./TrendingGiphy.css";

export default function TrendingGiphy({giphy}){
    
    return(
        <div className="trending-giphy" key={giphy.id}>
            <img src={giphy.images.downsized.url} alt={giphy.title}/>
        </div>
    )
}
