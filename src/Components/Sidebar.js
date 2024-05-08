import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../css/Sidebar.css";
// 로고 320*120
// https://velog.io/@dazzlynn/React-%EB%A7%9B%EC%A7%91%EC%A0%84%EA%B3%B5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%94-%EA%B5%AC%ED%98%8
// https://hello-yeond.tistory.com/154

const Side = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  align-items: left;
  justify-content: center;
  margin: 0 0 0 10px;
  width:20%
  z-index: 0;
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
   
    return(
        <Side>
          <div>
            <ul>
              <li>
                <p style={pStyle}>마이페이지</p>
              </li>
             
              <li>
                <b>관심목록</b>
              </li>
              <li>
                <NavLink exact to='/' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  팔로잉
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  좋아요
                </NavLink>
              </li>
              
              <br></br>
              <br></br>

              <li >
                <b>커뮤니티</b>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  내가 작성한 글
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  내가 작성한 댓글
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  커뮤니티 알림
                </NavLink>
              </li>

              <br></br>
              <br></br>

              <li >
                <b>나의 계정</b>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  로그인 정보
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  SNS 연결
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  프로필 관리
                </NavLink>
              </li>
              <li>
                <NavLink exact to='/xxx' style={({isActive}) => (isActive? activeStyle : unactiveStyle)}>
                  로그아웃
                </NavLink>
              </li>
            </ul>
          </div>
        </Side>
    );
   
  }
  
  export default Sidebar;