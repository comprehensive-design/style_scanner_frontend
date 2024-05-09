import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../css/Sidebar.css";


const Side = styled.div`
  display: flex;
  flex-direction: column;
  // border-right: 1px solid #e0e0e0;
  align-items: left;
  justify-content: center;
  padding: 0 30px;
  width:20%
`
function Sidebar() {
    const activeStyle={
      textDecoration:"none",
      color: "black"
    };

    const unactiveStyle={
      textDecoration:"none",
      color: "grey"
    };
    const pStyle = {
      margin: "0 auto",
      fontSize:"25px"
  }
  const HorizonLine = () => {
    return (
      <div
        style={{
          width: "80%",
          borderBottom: "2px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };
    return(
        <Side>
          <div>
            <ul className="sideUl">
              <li className="sideList">
                <p style={pStyle}>마이페이지</p>
                <HorizonLine></HorizonLine>
                {/* <br></br> */}
              </li>
             
              <li className="sideList">
                <b>관심목록</b>
              </li>
              <li className="sideList">
                <NavLink exact to='/' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  팔로잉
                </NavLink>
              </li>
              <li className="sideList">
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  좋아요
                </NavLink>
              </li>
              
              <br></br>
              <br></br>

              <li className="sideList">
                <b>커뮤니티</b>
              </li>
              <li className="sideList">
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  내가 작성한 글
                </NavLink>
              </li>
              <li className="sideList">
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  내가 작성한 댓글
                </NavLink>
              </li>
              <li className="sideList">
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  커뮤니티 알림
                </NavLink>
              </li>

              <br></br>
              <br></br>

              <li className="sideList">
                <b>나의 계정</b>
              </li>
              <li className="sideList">
                <NavLink exact to='/AccountManage' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  프로필 관리
                </NavLink>
              </li>
            </ul>
          </div>
        </Side>
    );
   
  }
  
  export default Sidebar;