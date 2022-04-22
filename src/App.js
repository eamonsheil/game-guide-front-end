import './App.css';
import { Routes, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GamePage from './components/GamePage';
import UserPage from './components/UserPage';
import React from "react";
import {UserProvider} from "./components/context/user"


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="games" element={ <GamePage/> } />
          <Route path="userpage" element={ <UserPage/> } />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;