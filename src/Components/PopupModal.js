import React, { useRef, useState } from "react";
import styles from "../css/PopupMadal.module.css";
import axios from "axios";
import Button from './Button';

export default function PopupModal({ onClose }) { // onClose 프로퍼티로 팝업창을 닫을 수 있는 함수를 전달합니다.
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

  const handleResizeHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.topDiv}>
            <p className={styles.title}>제품을 찾고 싶으신가요?</p>
            <p className={styles.closeButton} onClick={onClose}>×</p>
        </div>
        <div className={styles.decoBox}>
        <textarea 
            ref={textarea}
            onInput={handleResizeHeight}
            rows={1}
            className={styles.questionBox}
            placeholder="질문을 작성해주세요...(100자 이내)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
            <Button onClick={okClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>작성</Button>
        </div>
      </div>
    </div>
  );
}
