
import './App.css';
import React, { useState } from 'react';
import Header from './components/header/Header';
import SearchContainer from './components/search/SearchContainer';
import Media from './components/media/Media';
import { fetchSearchGiphys } from './api/giphyApi';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setSearchQuery(query);
    setIsSearching(true);
    try {
      const response = await fetchSearchGiphys(query);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="app">
      <div className="main">
        <Header />
        <SearchContainer onSearch={handleSearch} onClear={clearSearch} />
        <Media
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
}

export default App;
