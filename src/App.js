import './App.css';
import React from 'react';
import MainBar from './Components/MainBar';
import { Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import MypageDefault from './Components/MypageDefault';
import AccountManage from './Components/AccountManage';
import FollowingList from './Components/FollowingList';
import CommunityNoti from './Components/CommunityNoti';
import Ranking from './pages/ranking/Ranking';
import CelebRecommend from './Components/CelebRecommend';
import Search from './Components/Search';
import MyPageWritings from './Components/MyPageWritings';
import MyPageComments from './Components/MyPageComments';
import HomeFeed from './pages/home/HomeFeed';
import HomeInfo from './Components/HomeInfo';
import CommunityFeed from './Components/CommunityFeed';
import CommunityWrite from './Components/CommunityWrite';
import LikeList from './Components/LikeList';
import Category from './Components/Category';
import CommunityInfo from './Components/CommunityInfo';

const App = () => {
  return (
    <div>
      <header>
      <MainBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/MypageDefault" element={<MypageDefault />} />
          <Route path="/AccountManage" element={<AccountManage />} />
          <Route path="/CommunityNoti" element={<CommunityNoti />} />
          <Route path="/CelebRecommend" element={<CelebRecommend />} />
          <Route path="/Ranking" element={<Ranking />} />
          <Route path="/FollowingList" element={<FollowingList />} />
          <Route path="/MyPageWritings" element={<MyPageWritings />} />
          <Route path="/MyPageComments" element={<MyPageComments />} />
          <Route path="/HomeFeed" element={<HomeFeed />} />
          <Route path="/HomeInfo" element={<HomeInfo />} />
          <Route path="/CommunityFeed" element={<CommunityFeed />} />
          <Route path="/CommunityWrite" element={<CommunityWrite />} />
          <Route path="/CommunityInfo" element={<CommunityInfo />} />
          <Route path="/LikeList" element={<LikeList />} />
          <Route path="/Category" element={<Category />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
