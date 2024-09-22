import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { theme } from "../../../../style/theme";
import { DetailTime } from "../../../../utils/DetailTime";


export default function CommentInfo({
  profilePictureUrl,
  displayName,
  content,
  commentCreatedAt,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  const dateObject = new Date(commentCreatedAt); 
  const nowDate = DetailTime(dateObject); 

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
          <p className="caption ml05">{nowDate}</p>
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

