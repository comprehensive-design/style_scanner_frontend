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
import CommunityNoti from './Components/CommunityNoti';
import Ranking from './Components/Ranking';
import CelebRecommend from './Components/CelebRecommend';
import ManageBox from './Components/ManageBox';
import Search from './Components/Search';
import MyPageWritings from './Components/MyPageWritings.js';

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
        <Route path="/CommunityNoti" element={<CommunityNoti />} />
        <Route path="/CelebRecommend" element={<CelebRecommend />} />
        <Route path="/Ranking" element={<Ranking/>}/>
        <Route path="/Search" elemnt={<Search/>}/>
        <Route path="/FollowingList" element={<FollowingList/>}/>
        <Route path="/MyPageWritings" element={<MyPageWritings />} />
      </Routes> 
    </div>
  );
}

export default App;