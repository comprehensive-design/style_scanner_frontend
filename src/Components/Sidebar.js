import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "../css/Sidebar.module.css";

function Sidebar() {
  const activeStyle = {
    textDecoration: "none",
    color: "black"
  };

  const unactiveStyle = {
    textDecoration: "none",
    color: "grey"
  };
  const pStyle = {
    margin: "0 auto",
    fontSize: "25px"
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
  return (
    <>
      <div className={styles.content}>
        <ul className={styles.sideUl}>
          <li className={styles.sideList}>
            <p style={pStyle}>마이페이지</p>
            <HorizonLine></HorizonLine>
          </li>

          <li className={styles.sideList}>
            <b>관심목록</b>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/FollowingList' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              팔로잉
            </NavLink>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/LikeList' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              좋아요
            </NavLink>
          </li>

          <br></br>
          <br></br>

          <li className={styles.sideList}>
            <b>커뮤니티</b>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/MyPost' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              내가 작성한 글
            </NavLink>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/MyComment' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              내가 작성한 댓글
            </NavLink>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/CommunityNoti' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              커뮤니티 알림
            </NavLink>
          </li>

          <br></br>
          <br></br>

          <li className={styles.sideList}>
            <b>나의 계정</b>
          </li>
          <li className={styles.sideList}>
            <NavLink exact="true" to='/AccountManage' style={({ isActive }) => (isActive ? activeStyle : unactiveStyle)}>
              계정 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );

}

export default Sidebar;
