import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar'; // 상대 경로 수정

function MainBarDefault({ searchText, handleSearchChange, handleKeyPress }) {
    return (
        <div className='flex itemLikeWrapper' style={{ width: '100%', justifyContent: 'center' }}>
            <div className='headerWrapper'>
                <div id='navLink' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {/* Navigation Links can be uncommented if needed */}
                </div>
                <div className='mainUl headerRight'>
                    <div className='mr3'>
                        <ul className='mainUl'>
                            <li className='ml3 boldSubTitle mainNav'><Link to="/Category">Ranking</Link></li>
                            <li className='ml1 boldSubTitle mainNav'><Link to="/Login">Recommend</Link></li>
                            <li className='ml1 boldSubTitle mainNav'><Link to="/Community">Community</Link></li>
                        </ul>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <SearchBar value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
                        {/* 검색어가 있을 때 결과를 아래에 표시하는 부분은 SearchBar 내에서 처리됨 */}
                    </div>

                    <li className='ml1 boldSubTitle mainNav'>
                        <button className="button mb05" style={{ backgroundColor: "white", border: "0px solid gray", color: "black" }} onClick={() => window.location.href = '/Login'}>
                            Log In
                        </button>
                    </li>
                    <li className='boldSubTitle'>
                        <button className="button mb05" style={{ backgroundColor: "black", border: "0px solid gray", color: "white" }} onClick={() => window.location.href = '/Register'}>
                            Sign Up
                        </button>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default MainBarDefault;
