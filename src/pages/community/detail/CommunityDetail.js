import React, { useRef, useState, useEffect} from "react";
import { useCommunityDetail } from "../../../hooks/useCommunityDetail";
import { useMe } from "../../../hooks/useMe";
import styled from "styled-components";
import Comment from "./comment/Comment";
import { theme } from "../../../style/theme";
import { IoChatbox } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import Loading from '../../../Components/loading/loading';
import { DetailTime } from "../../../utils/DetailTime";
import { followUser, unfollowUser, checkFollowing } from "../../../api/follow";

export default function CommunityDetail() {
  const commentRef = useRef();
  const contentRef = useRef("");

  const {
    feedUrl,
    postCreatedAt,
    displayName,
    profilePictureUrl,
    postContent,
    comments,
    celebProfile,
    celebProfileUrl,
    loading,
    handleSubmit
  } = useCommunityDetail();

  //팔로잉 상태 
  const [isFollowing, setIsFollowing] = useState(true);
  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (celebProfile) {
        const followingStatus = await checkFollowing(celebProfile.profileName);
        setIsFollowing(followingStatus);
      }
    };
    console.log(isFollowing);
    fetchFollowingStatus();
  }, [celebProfile]);

  const handleToggleFollow = async () => {
    try {
      if (!isFollowing) {
        await unfollowUser(celebProfile.profileName);
      } else {
        await followUser(celebProfile.profileName);
      }
      setIsFollowing(!isFollowing); 
    } catch (error) {
      console.error(error);
    }
  };


  const { myProfilePictureUrl } = useMe();
  const [warning, setWarning] = useState("");

  //댓글
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
  const iconClick = (e) => {
    e.preventDefault();
    handleSubmit(e, contentRef.current);
    contentRef.current = "";
    commentRef.current.value = "";
  };

  //util
  //팔로워 숫자 포맷
  const formatFollowCount = (counter) => {
    if (counter >= 1000000) {
      return Math.floor(counter / 1000000) + "M";
    } else if (counter >= 1000) {
      return Math.floor(counter / 1000) + "K";
    } else {
      return counter.toString();
    }
  };
  //시간 n일전
  const dateObject = new Date(
    postCreatedAt[0],
    postCreatedAt[1] - 1,
    postCreatedAt[2],
    postCreatedAt[3],
    postCreatedAt[4],
    postCreatedAt[5]
  );
  const nowDate = DetailTime(dateObject);

  return (
    <div className="body">
      <div className="communityGrid">
        {/* post 그리드 */}
        <div className="flexColumnn borderRad ml1 mt1 mb1 p1">
          <div className="feedProfileDiv">
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
            <div className="left">
              <p className="boldContent mb05">@{displayName}</p>
              <p className="caption">{nowDate}</p>
            </div>
          </div>
          <img
            src={feedUrl}
            className="borderRad mb1 mt1"
            style={{ width: "20rem", height: "24rem" , objectFit:'cover'}}
          />
          <hr style={{ width: "100%", backgroundColor: theme.colors.gray }} />
          <ContentDiv className="content mt1">{postContent}</ContentDiv>
          <div className="feedProfileDiv mt1">
            <IoChatbox size={"1.5rem"} />
            <p className="content ml03">{comments.length}</p>
          </div>
        </div>
        {/* celeb 그리드 */}
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
                <div className="boldContent mb2">@{celebProfile.profileName}</div>
                <div className="mb2">
                  <button className="button" style={{ width: "5rem", height: "2rem", padding: 0,  backgroundColor: isFollowing ? theme.colors.black : theme.colors.gray,}} onClick={handleToggleFollow}>{!isFollowing ? '언팔로우' : '팔로우'}</button>
                </div>
                <div className="content">팔로워</div>
                <div className="content">팔로잉</div>
                <div className="boldContent">{formatFollowCount(celebProfile.profileFollowerCount)}</div>
                <div className="boldContent">{formatFollowCount(celebProfile.profileFollowingCount)}</div>
              </>
            ) : (
              <Loading />
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