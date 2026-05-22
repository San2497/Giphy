import React from 'react';
import './SearchContainer.css';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchContainer() {
  return (
    <div className="search-container">
        <input type="text" placeholder="Search all GIFs and Stickers"/>
        <div className="search-icon">
            <SearchIcon />
        </div> 
    </div>
  );
}   