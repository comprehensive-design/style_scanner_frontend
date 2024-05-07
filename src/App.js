<<<<<<< HEAD
import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './Components/MainBar';
import {Route, Routes} from 'react-router-dom';
import Box from '@mui/material/Box';

=======
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Register from './Components/Register';
import Login from './Components/Login';
import MypageDefault from './Components/MypageDefault';
>>>>>>> 342e3ef0fff4399519f032e62a2496c3b64229ce

const App = () => {
  return (
<<<<<<< HEAD
    <MainBar/>
    // <Routes>
    //   <Route path = "/" element = {<MainBar/>}></Route>
    // </Routes>
  );
}
=======
    <Routes>
    <Route path="/" element={<Main />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MypageDefault" element={<MypageDefault />} />
    </Routes>
  );
};

>>>>>>> 342e3ef0fff4399519f032e62a2496c3b64229ce
export default App;