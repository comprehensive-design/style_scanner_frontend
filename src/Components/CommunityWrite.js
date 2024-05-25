import React, { useRef, useState } from "react";
import styles from "../css/CommunityWrite.module.css";
import axios from "axios";
import Button from './Button';

export const getProfile = async () => {
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
    const profileResponse = await axios.get('/api/user', config);
    return profileResponse.data;
  }
  catch (error) {

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
  const [profiles, setProfiles] = useState([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [error, setError] = useState(null);
  const profileListRef = useRef();
  const textarea = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      //질문 글 post
      if (question.trim()) {
        alert(feedUrl);
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
          const accessToken = response.data.access_token;
          localStorage.setItem("accessToken", accessToken);
          alert("등록되었습니다.");
        } else {
          console.error('Error:', response.status, response.statusText);
          alert('서버 오류가 발생했습니다.');
        }
      } else {
        alert('질문을 작성해주세요.');
      }
    } catch (error) { }
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

          {Array.isArray(profiles) && profiles.length > 0 ? (
            profiles.map(profile => (
              <div className={styles.writerProfile} ref={profileListRef}>
                <img
                  id={styles.writerImage}
                  src={profile.profilePictureUrl}
                  alt="Profile"
                />
                <p id={styles.writerId}>{profile.displayName}</p>
              </div>
            ))
          ) : (
            <div>니 누구?</div>
          )}

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
      </div>
      );
}
