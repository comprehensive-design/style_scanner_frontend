import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './Components/MainBar';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';


function App() {
  return (
    <MainBar/>
    // <Routes>
    //   <Route path = "/" element = {<MainBar/>}></Route>
    // </Routes>
  );
}
export default App;