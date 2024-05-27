import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "../css/CommunityInfo.module.css";
import axios from "axios";
import Button from './Button';
import CommentInfo from "./CommentInfo";


export const getComments = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function CommunityInfo({ onClose, goDir, feedUrl, postId, displayName, profilePictureUrl }) {
  const navigate = useNavigate();
  //댓글 post
  const [content, setContent] = useState("");
  const textarea = useRef();

  //댓글 get
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const commentListRef = useRef();

  //사진
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    alert("버튼 누름");
    // handleSubmit(); // 작성 버튼 클릭 시 데이터 전송
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
              <CommentInfo key={comment.id} image={comment.image} />
            ))}
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
