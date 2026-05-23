import React, { useEffect, useState } from 'react';
import './Media.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined'; 
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';  
import VolumeUpIcon from '@mui/icons-material/VolumeUp';             
import { fetchTrendingGiphys } from '../../api/giphyApi';
import TrendingGiphy from '../trendingGiphy/TrendingGiphy';

const randomizeData = (content) => {
    return content.sort(() => Math.random() - 0.5);
}

export default function Media() {
    const [trending, setTrending] = useState([]);

    const getTrendingGiphys = async () => {
            const response = await fetchTrendingGiphys();
            setTrending(randomizeData(response.data.data));
        }

    useEffect(() => { 

        getTrendingGiphys();
    }, [])

    return (
        <div className="media">
            <div className="row">
                <div className="row-header trending-icon">
                <TrendingUpIcon />
                <h1>Trending</h1>
                </div>
                <div className="trending-container">
                        {trending?.map((gif, index) => {
                            return <TrendingGiphy giphy={gif} key={index}/>
                        })}
                    
                </div>
            </div>

            <div className="row">
                <div className="row-header artists-icon">
                <FlashOnOutlinedIcon /> 
                <h1>Artists</h1>
                </div>
                <div className="artists-container">
                    <p>Featured Artists</p>
                </div>
            </div>
            <div className="row">
                <div className="row-header clips-icon">
                <VolumeUpIcon />
                <h1>Clips</h1>
                </div>
                <div className="clips-container">
                    <p>Trending Clips</p>
                </div>
            </div>
            <div className="row">
                <div className="row-header stories-icon">
                <PersonalVideoIcon />
                <h1>Stories</h1>
                </div>
                <div className="stories-container">
                    <p>Trending Stories</p>
                </div>
            </div>
        </div>
    )
};
