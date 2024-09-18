import React , {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useComment } from '../../../hooks/useComment'; 
import Comment from "./comment/Comment"

export default function CommunityComment({ postId, feedUrl, displayName, profilePictureUrl }) {
  const navigate = useNavigate();
  const commentListRef = useRef();

  const { comments, content, handleSubmit } = useComment(postId);

  const iconClick = (e) => {
    e.preventDefault();
    handleSubmit(); 
  };

  return (
      <div>
        <div ref={commentListRef}>
            {/* {comments.map(comment => (
              <CommentInfo key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl} />
            ))} */}
            <Comment></Comment>
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
          //   {comments.map(comment => (
          //     <CommentInfo key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl} />
          //   ))}
          // </div>
    //       <div className={styles.bottomDiv}>
    //         <input 
    //           className={styles.comInput} 
    //           type="text" 
    //           placeholder="댓글을 입력하세요"
    //           value={content}
    //           onChange={(e) => setContent(e.target.value)}
    //         />
    //         <div className={styles.btn}>
    //           <Button onClick={okClick} $BackColor="#d9d9d9" $txtColor='black' $border='none' $hovColor='black' $hovTxtColor='white'>작성</Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
