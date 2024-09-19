import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useComment } from '../../../hooks/useComment';
import styled from 'styled-components';
import Comment from "./comment/Comment"
import { theme } from '../../../style/theme'

export default function CommunityDetail() {
  const navigate = useNavigate();
  const commentRef = useRef();

  const { postId, feedUrl, displayName, profilePictureUrl, comments, content, handleSubmit, setContent } = useComment();
  const [warning, setWarning] = useState("");

  const iconClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleInputChange = (e) => {
    const textarea = e.target;
    const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight); // 줄 높이 계산
    const maxLines = 4;
    const maxChars = 100;

    const currentLines = Math.floor(textarea.scrollHeight / lineHeight);

    if (currentLines > maxLines || textarea.value.length > maxChars) {
      setWarning("100자 이하로 입력해주세요.");
    } else {
      setWarning("");
      setContent(e.target.value);
    }
  };

  return (
    <div className='body' style={{ backgroundColor: theme.colors.gray }}>
      <div className='communityGrid' >
        {/* 댓글 작성자 + 내용 */}
        <div className='borderRad ml1 mt1 mb1'>

        </div>
        <div className='borderRad mr1 mt1'>wow</div>

        {/* comments 그리드*/}
        <CommentWrapper className=' flexColumnn borderRad mr1 mb1 p1'>
          <p className='boldSubTitle left mb05' style={{ width: '95%' }}>Comments</p>
          <CommentDiv className='p1' style={{ overflowY: 'scroll' }}>
            {comments.length > 0 ? (
              comments.map(comment => (
                <Comment key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl} />
              ))
            ) : (
              <p className='content'>댓글을 작성해 보세요!</p>
            )}
          </CommentDiv>
          <BottomDiv className='feedProfileDiv mt05'>
            <img className='feedProfile' src={`img/profile.png`} />
            <div className='flexColumn' style={{ width: '75%', height: '70%' }}>
              <CommentTextArea
                ref={commentRef}
                className='content borderRad p1 mb05'
                rows={1}
                value={content}
                onChange={handleInputChange}
              />
              {warning && (
                <p style={{ color: theme.colors.red }} className='caption left ml1 mb05'>{warning}</p>
              )}
            </div>
          </BottomDiv>
        </CommentWrapper>
      </div>
    </div>
    // <div className={styles.popup}>
    //   <div className={styles.feedDiv}>
    //     <div className={styles.feedImg}>
    //       <div className={styles.imageWrapper} onClick={goDir === "navigateToHomeInfo" ? () => navigateTo("/HomeInfo") : ""}>
    //         <img src={feedUrl} alt={"feed"} />
    //       </div>
    //     </div>
    //   </div>
    //   <div className={styles.popupContent}>
    //     <div className={styles.titleDiv}>
    //       <p className={styles.closeButton} onClick={onClose}>×</p>
    //       <p className={styles.title}>댓글</p>
    //     </div>

    //     <div className={styles.comWriterBox}>
    //       {profilePictureUrl ? (
    //         <img className={styles.writerProfile} src={profilePictureUrl} alt="Profile" />
    //       ) : (
    //         <img className={styles.writerProfile} src={`img/profile.png`} alt="Profile" />
    //       )}
    //       <p id={styles.writerId}>{displayName}</p>
    //     </div>

    //     <div className={styles.mainDiv}>
    // <div className={styles.totalItem} ref={commentListRef}>
    // {comments.map(comment => (
    //   <CommentInfo key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl} />
    // ))}
    // </div>
    //       <div className={styles.bottomDiv}>
    // <input 
    //   className={styles.comInput} 
    //   type="text" 
    //   placeholder="댓글을 입력하세요"
    //   value={content}
    //   onChange={(e) => setContent(e.target.value)}
    // />
    //         <div className={styles.btn}>
    //           <Button onClick={okClick} $BackColor="#d9d9d9" $txtColor='black' $border='none' $hovColor='black' $hovTxtColor='white'>작성</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
const CommentWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;
const CommentDiv = styled.div`
    width: 90%;
    height: 70%;
    align-items: flex-start;
   
`;
const BottomDiv = styled.div`
  width: 95%;
  height: 30%;
  align-items: flex-start;
`;
const CommentTextArea = styled.textarea`
  width: 100%;
  height: 70%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  resize: none;
  outline: none;

  line-height: 1.1em;
  max-height: 4.4em;
  overflow-y: auto;
`