import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Channel from './Components/Channel';
import Search from './Components/Search';
import MainBar from './Components/MainBar';

function App() {
  return (
    <div classNamme="App">
      <MainBar/>
      <Routes>
        <Route path="/" element={<Search />}/>
      </Routes>

    </div>
  );
}
export default App;