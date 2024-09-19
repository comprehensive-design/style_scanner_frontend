import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useComment } from '../../../hooks/useComment';
import styled from 'styled-components';
import Comment from "./comment/Comment"
import { theme } from '../../../style/theme'
import { IoChatbox } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

export default function CommunityDetail() {
  const commentRef = useRef();

  const { proxyUrl, displayName, profilePictureUrl, comments, postContent, content, handleSubmit, setContent} = useComment();
  const [warning, setWarning] = useState("");

  const iconClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleInputChange = (e) => {
    const textarea = e.target;
    const maxChars = 100;

    if (textarea.value.length > maxChars) {
      setWarning("100자 이하로 입력해주세요.");
    } else {
      setWarning("");
      setContent(e.target.value);
    }
  };

  return (
    <div className='body'>
      <div className='communityGrid' >
        <div className='flexColumnn borderRad ml1 mt1 mb1 p1'>
          <div className='feedProfileDiv mt05'>
            {profilePictureUrl ? (
              <img className='feedProfile' src={profilePictureUrl} alt="Profile" />
            ) : (
              <img className='feedProfile' src={`img/profile.png`} alt="Profile" />
            )}
            <div className='flexColumnn left'>
              <p className='boldContent mb05'>@{displayName}</p>
              <p className='caption'>1분 전</p>
            </div>
          </div>
          <img src={proxyUrl} className='borderRad mb1' style={{ width: '20em', height: "24em" }} />
          <hr style={{ width: '100%', backgroundColor: theme.colors.gray }} />
          <ContentDiv className='content mt1'>{postContent}</ContentDiv>
          <BottomDiv className='feedProfileDiv mt1'>
            <IoChatbox size={'1.5em'} />
            <p className='content ml03'>{comments.length}</p>
          </BottomDiv>
        </div>

        {/* 셀럽 프로필 */}
        <div className='feedProfileDiv borderRad mr1 mt1'>
          {/* 셀럽사진으로 바꿔야함 */}
          {profilePictureUrl ? (
            <img className='feedProfile' src={profilePictureUrl} alt="celeb" style={{ width: '10em', height: '10em', borderRadius: '2em' }} />
          ) : (
            <img className='feedProfile' src={`img/profile.png`} alt="celeb" style={{ width: '10em', height: '10em', borderRadius: '2em' }} />
          )}

          <div className='communityCelebGrid'>
            <p className='boldContent mb1'>@{displayName}</p>
            <button className='button mb1' style={{ width: '5rem', height: '2rem', padding: 0 }}>팔로우</button>
            <p className='content'>게시물</p>
            <p className='content'>팔로워</p>
            <p className='boldContent'>229</p>
            <p className='boldContent'>1299M</p>
          </div>
        </div>

        {/* comments 그리드*/}
        <div className=' flexColumnn borderRad mr1 mb1 p1'>
          <p className='boldSubTitle left mb05'>Comments</p>
          <CommentDiv className='p1' style={{ overflowY: 'scroll' }}>
           
            {comments.length > 0 ? (
              comments.map(comment => (
                <Comment key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl} />
              ))

            ) : (
              <p className='content'>댓글을 작성해 보세요!</p>
            )}
          </CommentDiv>
          <div className='commentGrid mt05 mb05' style={{ height: '20%' }}>
            <div><img className='feedProfile' src={`img/profile.png`} /></div>
            <CommentTextArea
                ref={commentRef}
                className='content borderRad p1'
                rows={1}
                value={content}
                onChange={handleInputChange}
              />
            <div>
              <div className="carousel boxShadow ml05 mb05" style={{ cursor: 'pointer' }}>
                <FiSend onClick={iconClick} color={theme.colors.gray} />
              </div>
            </div>
            {warning && (
              <p style={{ color: theme.colors.red }} className='caption left ml1'>{warning}</p>
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
  line-height: 1.1em;
  max-height: 4.4em;
  overflow-y: auto;
`