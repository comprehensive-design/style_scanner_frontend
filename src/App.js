import './App.css';
import React, {useState, useEffect} from 'react';
import MainBar from './Components/MainBar';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Register from './Components/Register';
import Login from './Components/Login';
import MypageDefault from './Components/MypageDefault';
import AccountManage from './Components/AccountManage';
import FollowingList from './Components/FollowingList';

const App = () => {
  return (
    <div>
      <MainBar/>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MypageDefault" element={<MypageDefault />} />
        <Route path="/AccountManage" element={<AccountManage />} />
        <Route path="/FollowingList" element={<FollowingList />} />
      </Routes> 
    </div>
  );
}

export default App;