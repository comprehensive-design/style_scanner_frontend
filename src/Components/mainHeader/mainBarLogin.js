// src/components/mainHeader/MainBarLogin.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar'; // 상대 경로 수정


function MainBarLogin({ searchText, handleSearchChange, handleKeyPress }) {
    return (
        <div className='flex itemLikeWrapper'>
            <ul className='mainUl'>
                <li className='ml3 boldSubTitle mainNav'><Link to="/Ranking">Ranking</Link></li>
                <li className='ml1 boldSubTitle mainNav'><Link to="/Recommend">Recommend</Link></li>
                <li className='ml1 boldSubTitle mainNav'><Link to="/Community">Community</Link></li>
            </ul>
            <SearchBar className='ml3'value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
        </div>
    );
}

export default MainBarLogin;
