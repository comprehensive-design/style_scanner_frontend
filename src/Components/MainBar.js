import React, { useState, useCallback, useEffect, Component } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import styles from '../css/MainBar.module.css';
import axios from 'axios';

function MainBar() {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const navigate = useNavigate();

    const fetchSearchResults = useCallback(async (keyword) => {
        console.log(`Fetching results for: ${keyword}`);

        try {
            const response = await axios.get(`/api/follow/search?keyword=${keyword}`);
            if (response.data) {
                setSearchResults(response.data);
                setSearchText("");
            } else {
                setSearchResults(null);
            }
        } catch (error) {
            console.error('Error fetching search results: ', error);
            setSearchResults(null);
        }
    }, []);

    useEffect(() => {
        console.log('Updated search results in useEffect:', searchResults);
        if (searchResults !== null) {
            console.log('Navigating to Search with results:', searchResults);
            navigate(`/Search`, { state: { results: searchResults } });
            setSearchResults(null);
        }
    }, [searchResults, navigate]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchSearchResults(searchText);
        }
    };

    const handleLogoClick = () => {
        setSearchText("");
    };

    const isLoggedIn = localStorage.getItem('accessToken') !== null;

    return (
        <header className={styles.header}>
            <div style={{ display: 'flex' }} className={styles.parent}>
                <Link to="">
                    <img
                        src={`img/logo.png`}
                        width='130'
                        height='48.75'
                        alt="Logo"
                    />
                </Link>
                <SearchBar value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
                <nav className={styles.navigation}>
                    <ul className={styles.mainUl}>
                        <li className={styles.mainLists}><Link to="/HomeFeed">홈</Link></li>
                        <li className={styles.mainLists}><Link to="/Category">랭킹</Link></li>
                        <li className={styles.mainLists}><Link to="/CelebRecommend">추천</Link></li>
                        <li className={styles.mainLists}><Link to="/CommunityFeed">커뮤니티</Link></li>
                        {isLoggedIn ? (
                            <li className={styles.mainLists}><Link to="/MypageDefault">마이페이지</Link></li>
                        ) : (
                            <li className={styles.mainLists}><Link to="/Login">로그인</Link></li>
                        )}
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default MainBar;
