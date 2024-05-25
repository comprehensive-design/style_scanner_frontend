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
      console.error('응답 상태:', error.response?.status); // 상태 코드 로그
      console.error('응답 헤더:', error.response?.headers); // 헤더 로그
    } else {
      console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
    }
    throw error;
  }
};

export default function CommunityWrite({ feedUrl, onClose }) {
  const [question, setQuestion] = useState("");
  const [profile, setProfile] = useState({ profilePictureUrl: "", displayName: "" });
  const textarea = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data);
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
      if (question.trim()) {
        const response = await axios.post(
          '/api/post/create',
          {
            feedUrl: feedUrl,
            content: question
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
          setQuestion(""); // Clear the input field after submission
        } else {
          console.error('Error:', response.status, response.statusText);
          alert('서버 오류가 발생했습니다.');
        }
      } else {
        alert('질문을 작성해주세요.');
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

  const okClick = (e) => {
    handleSubmit(e);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.titleDiv}>
          <p className={styles.closeButton} onClick={onClose}>×</p>
          <p className={styles.title}>질문 글</p>
        </div>
        <div className={styles.comWriterBox}>
          <div className={styles.writerProfile}>
            <img
              id={styles.writerImage}
              src={profile.profilePictureUrl || process.env.PUBLIC_URL + "img/profile.png"}
              alt="Profile"
            />
          </div>
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
            <Button onClick={okClick} BackColor="#d9d9d9" txtColor="black" border="none" hovColor="black" hovTxtColor="white">작성</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
