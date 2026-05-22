
import './App.css';
import Header from './components/header/Header';
import SearchContainer from './components/search/SearchContainer';

function App() {
  
  return (
    <div className="app">
      <div className="main">
        <Header />
        <SearchContainer />
        <h1>Media</h1>
      </div>
    </div>
  );
}

export default App;
