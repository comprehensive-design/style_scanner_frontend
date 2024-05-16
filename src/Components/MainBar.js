import React, {Component} from 'react';
import { Link } from "react-router-dom";
import SearchBar from './SearchBar'
import styles from '../css/MainBar.module.css';


function MainBar(){
    const activeStyle = {
        color : 'black'
    };

    return(
        <header className = {styles.header}>
            <div style={{display:'flex'}} className ={styles.parent}>
                <Link to="">
                    <img
                    
                    src={`img/logo.png`}
                    width = '130'
                    height = '48.75'
                    alt = "Logo"
                    />
                </Link>
                <SearchBar></SearchBar>

                <nav className={styles.navigation}>
                    <ul className={styles.mainUl}>
                        <li className={styles.mainLists}><Link to="/HomeFeed">홈</Link></li>
                        <li className={styles.mainLists}><Link to="/Category">랭킹</Link></li>
                        <li className={styles.mainLists}><Link to="/CelebRecommend">추천</Link></li>
                        <li className={styles.mainLists}><Link to="/CommunityFeed">커뮤니티</Link></li>
                        <li className={styles.mainLists}><Link to="/MypageDefault">마이페이지</Link></li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default MainBar;