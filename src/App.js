import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './components/MainBar';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';
import LikeList from './components/LikeList';


function App() {
  return (

    <div className="App">
      <MainBar/>
      <Routes>
        <Route path="/" element={<LikeList />} />
      </Routes>
    </div>

  );
}
export default App;