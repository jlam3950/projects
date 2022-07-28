// import logo from './logo.svg';
import './App.css';
import MemoryCard from './components/MemoryCard'

function App() {

  const memCards = [];
  const total = 16;

  for(let index = 0; index < total; index++){
    memCards.push(<MemoryCard key ={index} />)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Memory Game</h1>
        <h3 className = 'App-subheader'>Match Cards to Win</h3>
      </header>
      <div className = 'cardContainer'>
        <div className = 'grid'>{ memCards }</div>
      </div>
    </div>
  );
}

export default App;
