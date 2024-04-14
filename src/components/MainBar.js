// import * as React from 'react'
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import SearchBar from './SearchBar'


class MainBar extends Component{
    render(){
        return(
            <div classname = "Mainbar">
                <div classname = "Mainbar-column">
                    {/* <NavLink to={}>

                    </NavLink> */}
                    {/* 누르면 홈 이동 */}
                    <img
                    src={`img/logo.png`}
                    width = '130'
                    height = '48.75'
                    alt = "Logo"
                
                    /> 
                </div>
                <div className="status-bar__column"> <SearchBar></SearchBar></div>

                <div className="status-bar__column"></div>
                <div className="status-bar__column"></div>
                <div className="status-bar__column"></div>

            </div>
        )
    }
}


export default MainBar;