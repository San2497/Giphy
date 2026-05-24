import React, { useState } from 'react';
import './SearchContainer.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchContainer({ onSearch, onClear }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search all GIFs and Stickers"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
        <div className="clear-icon" onClick={handleClear}>
          <CloseIcon />
        </div>
      )}
      <div className="search-icon" onClick={handleSearchClick}>
        <SearchIcon />
      </div>
    </div>
  );
}
