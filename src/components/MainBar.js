import React, {Component} from 'react';
import { Link, NavLink} from "react-router-dom";
import SearchBar from './SearchBar'
import './MainBar.css';


function MainBar(){
    const activeStyle = {
        color : 'black'
    };

    return(
        <header className = "header">
            <div style={{display:'flex'}} className ="parent">
                <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = '' >
                <img
                    
                    src={`img/logo.png`}
                    width = '130'
                    height = '48.75'
                    alt = "Logo"
                    />
                </NavLink>
                <SearchBar></SearchBar>

                <nav className="navigation">
                    <p>
                        <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        홈
                        </NavLink >
                    </p>
                    <p>
                        <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        랭킹
                        </NavLink >
                    </p>
                    <p>
                        <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        추천
                        </NavLink >
                    </p>
                    <p>
                        <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        커뮤니티
                        </NavLink >
                    </p>
                    <p>
                        <NavLink style={({isActive}) => (isActive? activeStyle : {})} to = ''>
                        마이페이지
                        </NavLink >
                    </p>
                </nav>

            </div>
        </header>
    );
}



export default MainBar;