import React, {Component} from 'react';
import { Link, NavLink} from "react-router-dom";
import SearchBar from './SearchBar'
import '../css/MainBar.css';


function MainBar(){
    const activeStyle = {
        color : 'black'
    };

    return(
        <header className = "header">
            <div style={{display:'flex'}} className ="parent">
                <Link to="">
                    <img
                    
                    src={`img/logo.png`}
                    width = '130'
                    height = '48.75'
                    alt = "Logo"
                    />
                </Link>
                <SearchBar></SearchBar>

                <nav className="navigation">
                    <ul className="mainUl">
                        <li className='mainLists'><Link to="/">홈</Link></li>
                        <li className='mainLists'><Link to="/Ranking">랭킹</Link></li>
                        <li className='mainLists'><Link to="/CelebRecommend">추천</Link></li>
                        <li className='mainLists'><Link to="">커뮤니티</Link></li>
                        <li className='mainLists'><Link to="/MypageDefault">마이페이지</Link></li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}



export default MainBar;