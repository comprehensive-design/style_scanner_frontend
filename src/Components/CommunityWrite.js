import React, { useRef, useState } from "react";
import styles from "../css/CommunityWrite.module.css";
import Feed from "./feed.js";
import axios from "axios";

export default function MypageDefault() {
  const [content, setContent] = useState("");
  const handleContentChange = (e) => setContent(e.target.value);
  const textarea = useRef();

  const handleSubmit = () => {
    // 데이터 유효성 검사 - 내용이 비어있는지 확인
    if (!content.trim()) {
      console.error("내용을 입력하세요.");
      return;
    }

    // 데이터 전송
    axios
      .post("http://localhost:8080/CommunityWrite", {
        feedId: "hi_sseulgi",
        writerId: "nwbd_we",
        content: content,
      })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })

      .then(function (response) {
        console.log("성공", response);
        // 서버로부터의 응답 처리
      })
      .catch(function (error) {
        console.error("실패", error);
        // 오류 발생시 처리
      })
      .then(function () {
        console.log("데이터 요청 완료");
        // 요청 완료 후 실행할 작업
      });
  };

  // Textarea의 높이 자동 조정
  const handleResizeHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  // 작성 버튼 클릭 이벤트
  const navigateToCommunity = () => {
    console.log("버튼 누름");
    handleSubmit(); // 작성 버튼 클릭 시 데이터 전송
  };

  return (
    <div className={styles.writeContents}>
      <div className={styles.comDecoBox}>
        <div className={styles.comWriterBox}>
          <div className={styles.writerProfile}>
            <img
              id={styles.writerImage}
              src={process.env.PUBLIC_URL + "img/profile.png"}
              alt="Profile"
            />
          </div>
          <p id={styles.writerId}>
            <b>nwbd_we</b>
          </p>
        </div>
        <textarea
          ref={textarea}
          onInput={handleResizeHeight}
          rows={1}
          className={styles.questionBox}
          placeholder="질문을 작성해주세요...(100자 이내)"
          onChange={handleContentChange}
        ></textarea>

        <div className={styles.comButtonBox}>
          <input
            type="button"
            className={styles.comWriteButton}
            value="작성"
            onClick={navigateToCommunity}
          />
        </div>
      </div>
    </div>
  );
}
