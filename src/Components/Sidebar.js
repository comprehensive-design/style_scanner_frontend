import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const activeStyle = {
    textDecoration: "none",
    color: "black",
  };

  const unactiveStyle = {
    textDecoration: "none",
    color: "grey",
  };
  const pStyle = {
    margin: "0 auto",
    fontSize: "1.8rem",
  };
  const HorizonLine = () => {
    return (
      <div
        style={{
          borderBottom: "2px solid #aaa",
          lineHeight: "0.1rem",
          margin: "1rem 0 2rem",
        }}
      ></div>
    );
  };
  return (
    <>
      <div className="sidebarContent">
        <ul className="sidebarUl">
          <li className="sideList">
            <p style={pStyle}>마이페이지</p>
            <HorizonLine></HorizonLine>
          </li>

          <li className="sideList">
            <b className="boldContent">관심목록</b>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/FollowingList"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              팔로잉
            </NavLink>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/LikeList"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              좋아요
            </NavLink>
          </li>

          <br></br>
          <br></br>

          <li className="sideList">
            <b className="boldContent">커뮤니티</b>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/MyPost"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              내가 작성한 글
            </NavLink>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/MyComment"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              내가 작성한 댓글
            </NavLink>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/CommunityNoti"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              커뮤니티 알림
            </NavLink>
          </li>

          <br></br>
          <br></br>

          <li className="sideList">
            <b className="boldContent">나의 계정</b>
          </li>
          <li className="sideList">
            <NavLink
              exact="true"
              to="/AccountManage"
              style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}
            >
              계정 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
