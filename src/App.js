import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GamesList from './components/GamesList';
import UserPage from './components/UserPage';


import React, {useState, createContext} from "react";
import {UserProvider} from "./components/context/user"


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="games" element={ <GamesList/> } />
          <Route path="userpage" element={ <UserPage/> } />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;