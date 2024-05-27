import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "../css/CommunityInfo.module.css";
import axios from "axios";
import Button from './Button';
import CommentInfo from "./CommentInfo";


//댓글 get
export const getComments = async (postId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
      console.error("토큰이 없습니다.");
      throw new Error("토큰이 없습니다.");
  }
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  try {
      const response = await axios.get('/api/comment/', {
          params: { postId: postId },
          ...config,
      });
      return response.data || [];
  }
  catch (error) {
      console.log(error);
      throw error;
  }
};

export default function CommunityInfo({ onClose, goDir, feedUrl, postId, displayName, profilePictureUrl }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  //댓글 get
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const commentListRef = useRef();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchComments();

  }, [loading]);

  //댓글 post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      if (content.trim()) {
        const response = await axios.post(
          '/api/comment/create',
          {
            postId: postId,
            content: content
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Proper token format
            }
          }
        );

        console.log(response.data);

        if (response.status === 200) {
          alert("등록되었습니다.");
          setComments(""); // Clear the input field after submission
        } else {
          console.error('Error:', response.status, response.statusText);
          alert('서버 오류가 발생했습니다.');
        }
      } else {
        alert('댓글을 작성해주세요.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);

      if (error.response) {
        alert(`서버 오류: ${error.response.data.message}`);
      } else {
        alert('서버 오류가 발생했습니다. 관리자에게 문의하세요.');
      }
    }
  };
  const navigateTo = (path) => {
    navigate(path);
  };
  const okClick = () => {
    handleSubmit(); 
  };

  return (
    <div className={styles.popup}>
      <div className={styles.feedDiv}>

        <div className={styles.feedImg}>
          <div className={styles.imageWrapper} onClick={goDir === "navigateToHomeInfo" ? () => navigateTo("/HomeInfo") :""}>
            <img src={feedUrl} alt={"feed"} />
          </div>

        </div>
      </div>
      <div className={styles.popupContent}>


        <div className={styles.titleDiv}>
          <p className={styles.closeButton} onClick={onClose}>×</p>
          <p className={styles.title}>댓글</p>
        </div>

        <div className={styles.comWriterBox}>

          {profilePictureUrl ? (
            <img className={styles.writerProfile} src={profilePictureUrl} alt="Profile" />
          ) : (
            <img className={styles.writerProfile} src={`img/profile.png`} alt="Profile" />
          )}
          <p id={styles.writerId}>{displayName}</p>
        </div>

        <div className={styles.mainDiv}>
          <div className={styles.totalItem} ref={commentListRef}>
            {comments.map(comment => (
              <CommentInfo key={comment.id} displayName={comment.displayName} content={comment.content} profilePictureUrl={comment.profilePictureUrl}/>
            ))}
            <CommentInfo key={0} displayName={"nwbd_we"} content={"하파크리스틴 찾아보세요"} profilePictureUrl={""}/>
          </div>
          <div className={styles.bottomDiv}>
            <input className={styles.comInput} type="text" placeholder="댓글을 입력하세요"></input>
            <div className={styles.btn}>
              <Button onClick={okClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>작성</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
