import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import styled from "styled-components";
import { theme } from "../../../../style/theme";

export default function CommentInfo({
  profilePictureUrl,
  displayName,
  content,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  return (
    <div
      className="feedProfileDiv"
      style={{ width: "100%", position: "relative" }}
    >
      {profilePictureUrl ? (
        <img className="feedProfile" src={profilePictureUrl} alt="Profile" />
      ) : (
        <img className="feedProfile" src={`img/profile.png`} alt="Profile" />
      )}
      <div className="flexColumnn left">
        <div className="feedProfileDiv mb05">
          <p className="boldContent">@{displayName}</p>
          <p className="caption ml05">1분 전</p>
        </div>
        <p className="content ellipsis">{content}</p>
      </div>
      <FaHeart
        size="1.5rem"
        style={{
          position: "absolute",
          right: "1rem",
          cursor: "pointer",
          color: isClicked ? theme.colors.red : theme.colors.black,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

const CommentWrapper = styled.div``;
