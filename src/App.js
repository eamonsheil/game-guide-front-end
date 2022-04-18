import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import GamesList from './components/GamesList';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="games" element={ <GamesList/> } />
        <Route path="userpage" element={ <UserPage/> } />
      </Routes>
    </div>
  );
}

export default App;