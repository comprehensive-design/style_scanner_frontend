import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar'; // 상대 경로 수정

function MainBarDefault({ searchText, handleSearchChange, handleKeyPress }) {
    return (
        <div className='flex itemLikeWrapper' style={{ width: '100%', justifyContent: 'center' }}>
            <div className='headerWrapper'>
                <div id='navLink' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    {/* <ul className='mainUl'>
                        <li className='ml3 boldSubTitle mainNav'><Link to="/Ranking">Ranking</Link></li>
                        <li className='ml1 boldSubTitle mainNav'><Link to="/Login">Recommend</Link></li>
                        <li className='ml1 boldSubTitle mainNav'><Link to="/Community">Community</Link></li>
                    </ul> */}
                </div>
                <div className='mainUl headerRight'>
                    <div className='mr3'> 
                        <ul className='mainUl'>
                            <li className='ml3 boldSubTitle mainNav'><Link to="/Ranking">Ranking</Link></li>
                            <li className='ml1 boldSubTitle mainNav'><Link to="/Login">Recommend</Link></li>
                            <li className='ml1 boldSubTitle mainNav'><Link to="/Community">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <SearchBar className='' value={searchText} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
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