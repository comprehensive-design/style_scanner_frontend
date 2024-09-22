import React, { useRef, useState } from "react";
import { useComment } from "../../../hooks/useComment";
import { useMe } from "../../../hooks/useMe";
import styled from "styled-components";
import Comment from "./comment/Comment";
import { theme } from "../../../style/theme";
import { IoChatbox } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import Loading from '../../../Components/loading/loading';
import { DetailTime } from "../../../utils/DetailTime";

export default function CommunityDetail() {
  const commentRef = useRef();
  const contentRef = useRef("");

  const {
    feedUrl,
    displayName,
    profilePictureUrl,
    comments,
    postContent,
    celebProfile,
    celebProfileUrl,
    postCreatedAt,
    handleSubmit,
  } = useComment();

  const { myProfilePictureUrl } = useMe();
  const [warning, setWarning] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    contentRef.current = value;

    const maxChars = 100;
    if (value.length > maxChars) {
      setWarning("100자 이하로 입력해주세요.");
    } else {
      setWarning("");
    }
  };
  const formatFollowCount = (counter) => {
    if (counter >= 1000000) {
      return Math.floor(counter / 1000000) + "M";
    } else if (counter >= 1000) {
      return Math.floor(counter / 1000) + "K";
    } else {
      return counter.toString();
    }
  };
  const dateObject = new Date(
    postCreatedAt[0], 
    postCreatedAt[1] - 1,
    postCreatedAt[2], 
    postCreatedAt[3], 
    postCreatedAt[4], 
    postCreatedAt[5] 
  );
  const nowDate = DetailTime(dateObject);

  const iconClick = (e) => {
    e.preventDefault();
    handleSubmit(e, contentRef.current);
    contentRef.current = "";
    commentRef.current.value = "";
  };

  return (
    <div className="body">
      <div className="communityGrid">
        <div className="flexColumnn borderRad ml1 mt1 mb1 p1">
          <div className="feedProfileDiv mt05">
            {profilePictureUrl ? (
              <img
                className="feedProfile"
                src={profilePictureUrl}
                alt="Profile"
              />
            ) : (
              <img
                className="feedProfile"
                src={`img/profile.png`}
                alt="Profile"
              />
            )}
            <div className="flexColumnn left">
              <p className="boldContent mb05">@{displayName}</p>
              <p className="caption">{nowDate}</p>
            </div>
          </div>
          <img
            src={feedUrl}
            className="borderRad mb1"
            style={{ width: "20rem", height: "24rem" }}
          />
          <hr style={{ width: "100%", backgroundColor: theme.colors.gray }} />
          <ContentDiv className="content mt1">{postContent}</ContentDiv>
          <BottomDiv className="feedProfileDiv mt1">
            <IoChatbox size={"1.5rem"} />
            <p className="content ml03">{comments.length}</p>
          </BottomDiv>
        </div>

        <div className="feedProfileDiv borderRad mr1 mt1">
          {celebProfileUrl ? (
            <img
              className="feedProfile"
              src={celebProfileUrl}
              alt="celeb"
              style={{ width: "10rem", height: "10rem", borderRadius: "2rem" }}
            />
          ) : (
            <img
              className="feedProfile"
              src={`img/profile.png`}
              alt="celeb"
              style={{ width: "10rem", height: "10rem", borderRadius: "2rem" }}
            />
          )}

          <div className="communityCelebGrid">
            {celebProfile ? (
              <>
                <p className="boldContent mb1">@{celebProfile.profileName}</p>
                <button
                  className="button mb1"
                  style={{ width: "5rem", height: "2rem", padding: 0 }}
                >
                  팔로우
                </button>
                <p className="content">팔로워</p>
                <p className="content">팔로잉</p>
                <p className="boldContent">{formatFollowCount(celebProfile.profileFollowerCount)}</p>
                <p className="boldContent">{formatFollowCount(celebProfile.profileFollowingCount)}</p>
              </>
            ) : (
              <Loading/>
            )}
          </div>
        </div>

        {/* comments 그리드*/}
        <div className=" flexColumnn borderRad mr1 mb1 p1">
          <p className="boldSubTitle left mb05">Comments</p>
          <CommentDiv className="p1" style={{ overflowY: "scroll" }}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  displayName={comment.displayName}
                  content={comment.content}
                  profilePictureUrl={comment.profilePictureUrl}
                  commentCreatedAt={comment.createdAt}
                />
              ))
            ) : (
              <p className="content">댓글을 작성해 보세요!</p>
            )}
          </CommentDiv>
          <div className="commentGrid mt05 mb05" style={{ height: "20%" }}>
            {myProfilePictureUrl ? (
              <img
                className="feedProfile"
                src={myProfilePictureUrl}
                alt="myprofile"
              />
            ) : (
              <img
                className="feedProfile"
                src={myProfilePictureUrl}
                alt="myprofile"
              />
            )}
            <CommentTextArea
              ref={commentRef}
              className="content borderRad p1"
              rows={1}
              onChange={handleInputChange}
            />
            <div>
              <div
                className="carousel boxShadow ml05 mb05"
                style={{ cursor: "pointer" }}
              >
                <FiSend onClick={iconClick} color={theme.colors.gray} />
              </div>
            </div>
            {warning && (
              <p
                style={{ color: theme.colors.red }}
                className="caption left ml1"
              >
                {warning}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomDiv = styled.div`
  align-items: flex-start;
  justify-content: flex-start;
`;
// 질문글 그리드
const ContentDiv = styled.div`
  width: 95%;
  text-align: left;
  text-overflow: ellipsis;
  overflow-y: scroll;
  word-break: break-word;
  white-space: pre-wrap;
`;

// 댓글 그리드
const CommentDiv = styled.div`
  width: 100%;
  height: 70%;
  align-self: center;
`;
const CommentTextArea = styled.textarea`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  resize: none;
  outline: none;
  line-height: 1.1rem;
  max-height: 4.4rem;
  overflow-y: auto;
`;