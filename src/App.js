import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './components/MainBar';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';


function App() {
  return (
    <Routes>
      <Route path = "/" element = {<MainBar/>}></Route>
    </Routes>
  );
}
export default App;