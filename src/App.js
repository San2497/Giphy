
import './App.css';
import Header from './components/header/Header';
import SearchContainer from './components/search/SearchContainer';
import Media from './components/media/Media';

function App() {
  
  return (
    <div className="app">
      <div className="main">
        <Header />
        <SearchContainer />
        <Media />
      </div>
    </div>
  );
}

export default App;
