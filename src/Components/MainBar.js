import React, { useState, useCallback, useEffect } from 'react';
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
            // console.log('Full API response:', response); // 전체 응답 로그 추가
            // console.log('Response data:', response.data); // 응답 데이터 로그 추가

            // console.log('response data data : ', response.data.data);
            if (response.data ) {
                // console.log('Setting search results:', response.data);
                setSearchResults(response.data); // 상태 설정
            } else {
                setSearchResults(null); // 예외 상황 처리
                // console.log('Response data is null or does not contain data field');
            }
        } catch (error) {
            console.error('Error fetching search results: ', error);
            setSearchResults(null); // 에러 발생 시 결과 초기화
        }
    }, []);

    useEffect(() => {
        console.log('Updated search results in useEffect:', searchResults);
        if (searchResults !== null) {
            console.log('Navigating to Search with results:', searchResults);
            navigate(`/Search`, { state: { results: searchResults } }); // 검색 결과와 함께 Search 페이지로 이동
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

    return (
        <header className={styles.header}>
            <div style={{ display: 'flex' }} className={styles.parent}>
                <Link to="/">
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
                        <li className={styles.mainLists}><Link to="/MypageDefault">마이페이지</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default MainBar;
