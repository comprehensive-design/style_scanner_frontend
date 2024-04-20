import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './components/MainBar';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';
import LikeList from './components/LikeList';


function App() {
  return (
    <Routes>
      {/* <Route path = "/" element = {<MainBar/>}></Route> */}
      <Route path = "/" element = {<LikeList/>}></Route>
    </Routes>
  );
}
export default App;