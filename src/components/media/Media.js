import React, { useEffect, useState } from 'react';
import './Media.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import SearchIcon from '@mui/icons-material/Search';
import { fetchTrendingGiphys, fetchArtistGiphys, fetchClipsGiphys, fetchStoriesGiphys } from '../../api/giphyApi';
import TrendingGiphy from '../trendingGiphy/TrendingGiphy';
import giphyArtists from '../../artists';

const randomizeData = (content) => {
    return content.sort(() => Math.random() - 0.5);
}

export default function Media({ searchQuery, searchResults, isSearching }) {
    const [trending, setTrending] = useState([]);
    const [artists, setArtists] = useState({});
    const [clips, setClips] = useState([]);
    const [stories, setStories] = useState([]);

    const getTrendingGiphys = async () => {
        const response = await fetchTrendingGiphys();
        setTrending(randomizeData(response.data.data));
    }

    const getArtistGiphys = async () => {
        const artistData = {};
        for (const artist of giphyArtists) {
            try {
                const response = await fetchArtistGiphys(artist);
                artistData[artist] = response.data.data.slice(0, 5);
            } catch (error) {
                console.error(`Failed to fetch for artist ${artist}:`, error);
                artistData[artist] = [];
            }
        }
        setArtists(artistData);
    }

    const getClipsGiphys = async () => {
        try {
            const response = await fetchClipsGiphys();
            setClips(response.data.data);
        } catch (error) {
            console.error('Failed to fetch clips:', error);
        }
    }

    const getStoriesGiphys = async () => {
        try {
            const response = await fetchStoriesGiphys();
            setStories(response.data.data);
        } catch (error) {
            console.error('Failed to fetch stories:', error);
        }
    }

    useEffect(() => {
        getTrendingGiphys();
        getArtistGiphys();
        getClipsGiphys();
        getStoriesGiphys();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Search results view
    if (searchQuery) {
        return (
            <div className="media">
                <div className="row">
                    <div className="row-header search-results-icon">
                        <SearchIcon />
                        <h1>Results for "{searchQuery}"</h1>
                    </div>
                    {isSearching ? (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                            <p>Searching...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="search-results-grid">
                            {searchResults.map((gif, index) => (
                                <TrendingGiphy giphy={gif} key={gif.id || index} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No GIFs found for "{searchQuery}". Try a different search!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default homepage view
    return (
        <div className="media">
            {/* Trending Row */}
            <div className="row">
                <div className="row-header trending-icon">
                    <TrendingUpIcon />
                    <h1>Trending</h1>
                </div>
                <div className="trending-container">
                    {trending?.map((gif, index) => {
                        return <TrendingGiphy giphy={gif} key={gif.id || index} />
                    })}
                </div>
            </div>

            {/* Artists Row */}
            <div className="row">
                <div className="row-header artists-icon">
                    <FlashOnOutlinedIcon />
                    <h1>Artists</h1>
                </div>
                <div className="artists-container">
                    {giphyArtists.map((artist) => (
                        <div className="artist-card" key={artist}>
                            <h3 className="artist-name">{artist.replace(/\+/g, ' ')}</h3>
                            <div className="artist-gifs">
                                {artists[artist]?.map((gif, index) => (
                                    <div className="artist-gif" key={gif.id || index}>
                                        <img src={gif.images.downsized.url} alt={gif.title} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clips Row */}
            <div className="row">
                <div className="row-header clips-icon">
                    <VolumeUpIcon />
                    <h1>Clips</h1>
                </div>
                <div className="clips-container">
                    {clips?.map((gif, index) => (
                        <div className="clip-card" key={gif.id || index}>
                            <img src={gif.images.downsized.url} alt={gif.title} />
                            <div className="clip-overlay">
                                <VolumeUpIcon className="clip-sound-icon" />
                                <p className="clip-title">{gif.title || 'Untitled Clip'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stories Row */}
            <div className="row">
                <div className="row-header stories-icon">
                    <PersonalVideoIcon />
                    <h1>Stories</h1>
                </div>
                <div className="stories-container">
                    {stories?.map((gif, index) => (
                        <div className="story-card" key={gif.id || index}>
                            <img src={gif.images.downsized.url} alt={gif.title} />
                            <div className="story-overlay">
                                <p className="story-title">{gif.title || 'Story'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
