import React, { useRef, useState } from "react";
import styles from "../css/CommunityWrite.module.css";
import axios from "axios";
import Button from './Button';

export default function CommunityWrite({ onClose }) {
  const [question, setQuestion] = useState("");
  const textarea = useRef();

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
            feedUrl: "wow",
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
    } catch (error) {

      console.error('Error:', error.response ? error.response.data : error.message);

      if (error.response) {
        alert(`서버 오류: ${error.response.data.message}`);
      } 
      else {
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
              src={process.env.PUBLIC_URL + "img/profile.png"}
              alt="Profile"
            />
          </div>
          <p id={styles.writerId}>nwbd_we</p>
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
