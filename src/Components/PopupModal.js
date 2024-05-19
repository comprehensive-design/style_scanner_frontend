import React, { useRef, useState } from "react";
import styles from "../css/PopupMadal.module.css";
import axios from "axios";
import Button from './Button';

export default function PopupModal({ onClose }) { 
  const [question, setQuestion] = useState("");
  const textarea = useRef();

  const handleSubmit = () => {
    if (!question.trim()) {
      console.error("질문을 입력하세요.");
      return;
    }
    axios
      .post("http://localhost:8080/CommunityWrite", {
        feedId: "hi_sseulgi",
        writerId: "nwbd_we",
        content: question,
      })
      .then(function (response) {
        console.log("성공", response);
        onClose(); // 데이터 전송 후 팝업창 닫기
      })
      .catch(function (error) {
        console.error("실패", error);
      })
      .then(function () {
        console.log("데이터 요청 완료");
      });
  };
  const okClick = () => {
    console.log("버튼 누름");
    handleSubmit(); // 작성 버튼 클릭 시 데이터 전송
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
              <Button onClick={okClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>작성</Button>
              </div>
        </div>
      </div>
    </div>
  );
}
