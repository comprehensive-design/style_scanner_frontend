import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './components/MainBar';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';
import Search from './components/Search';
import Channel from './components/channel';

function App() {
  return (
    <div classNamme="App">
      {/* <MainBar/> */}
      <Routes>
        <Route path="/" element={<Channel />}/>
      </Routes>

    </div>
  );
}
export default App;