import React, { useRef, useState, useEffect } from "react";
import styles from "../css/CommunityWrite.module.css";
import axios from "axios";
import Button from './Button';

const getProfile = async () => {
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
    const profileResponse = await axios.get('/api/user/me', config);
    return profileResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러: 프로필 가져오기 실패:', error.response?.data || error.message);
    } else {
      console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
    }
    throw error;
  }
};

export default function CommunityWrite({ post, feedUrl, onSave, onClose }) {
  const [question, setQuestion] = useState(post ? post.content : "");
  const [profile, setProfile] = useState({ profilePictureUrl: "", displayName: "" });
  const textarea = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile({ profilePictureUrl: data.profilePictureUrl, displayName: data.displayName });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      let response;
      if (post && post.id) {
        response = await axios.post(
          `/api/post/update/${post.id}`,
          { content: question },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
        );
      } else {
        response = await axios.post(
          '/api/post/create',
          { feedUrl: feedUrl, content: question },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        alert(post ? "수정되었습니다." : "등록되었습니다.");
        setQuestion("");
        if(post? onSave(response.data): "");
      } else {
        alert('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('서버 오류가 발생했습니다. 관리자에게 문의하세요.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const okClick = (e) => {
    handleSubmit(e);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.titleDiv}>
          <p className={styles.closeButton} onClick={onClose}>×</p>
          <p className={styles.title}>{post ? "수정하기" : "질문 글"}</p>
        </div>
        <div className={styles.comWriterBox}>
          <img
            id={styles.writerImage}
            src={profile.profilePictureUrl || process.env.PUBLIC_URL + "img/profile.png"}
            alt="Profile"
          />
          <p id={styles.writerId}>{profile.displayName || "Unknown User"}</p>
        </div>
        <div className={styles.decoBox}>
          <textarea
            ref={textarea}
            rows={1}
            className={styles.questionBox}
            placeholder="질문을 작성해주세요..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <div className={styles.btn}>

            <Button onClick={okClick} BackColor="#d9d9d9" txtColor="black" border="none" hovColor="black" hovTxtColor="white">{post ? "수정" : "작성"}</Button>

          </div>
        </div>
      </div>
    </div>
  );
}
