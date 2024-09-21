import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../style/theme.js";
import CommunityDetail from "../../detail/CommunityDetail.js";
import FeedPopup from "../../../../Components/FeedPopup";

function ComFeed({
  postId,
  feedUrl,
  content,
  displayName,
  profilePictureUrl,
  username,
}) {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFeedPopupOpen, setIsFeedPopupOpen] = useState(false);

  const openFeedPopup = () => {
    setIsFeedPopupOpen(true);
  };

  const closeFeedPopup = () => {
    console.log("Closing FeedPopup");
    setIsFeedPopupOpen(false);
  };
  const handleClick = () => {
    navigate("/CommunityDetail", {
      state: {
        postId: postId,
        feedUrl: feedUrl,
        postContent: content,
        displayName: displayName,
        profilePictureUrl: profilePictureUrl,
        username: username,
      },
    });
  };

  return (
    <div className="communityPopupContent borderRad boxShadow m1">
      <img
        src={feedUrl}
        style={{ backgroundColor: theme.colors.white }}
        onClick={handleClick}
      />
      <div
        className="feedProfileDiv"
        style={{ position: "absolute", top: "1rem", left: "1.5rem" }}
        onClick={openFeedPopup}
      >
        {profilePictureUrl ? (
          <img className="feedProfile" src={profilePictureUrl} />
        ) : (
          <img className="feedProfile" src={`img/profile.png`} />
        )}
        <p
          className="boldContent textShadow"
          style={{ color: theme.colors.white }}
        >
          @{displayName}
        </p>
      </div>
      {isFeedPopupOpen && <FeedPopup onClose={closeFeedPopup} />}

      <QuestionWrapper className="borderRad boxShadow">
        <TextDiv className="p1">
          <p className="content">{content}</p>
        </TextDiv>
      </QuestionWrapper>
    </div>
  );
}
const QuestionWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black};
  width: 70%;
  height: 35%;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
`;

const TextDiv = styled.div`
  display: flex;
  width: 100%;
  height: 45%;
  overflow: hidden;
  min-height: 40%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;

  p {
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
`;
export default ComFeed;
