import React, { useRef, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";
import useWritePost from "../../../hooks/useWritePost";

export default function WritePopup({
  post,
  proxy_url,
  feed_code,
  username,
  onSave,
  onClose,
}) {
  const [question, setQuestion] = useState(post ? post.content : "");
  const { myProfilePictureUrl, handleSubmit } = useWritePost(
    post,
    feed_code,
    onSave,
    username
  );

  const textarea = useRef();

  const onSubmit = (e) => {
    handleSubmit(e, question);
    setQuestion("");
  };
  return (
    <div className="communityPopupWrapper">
      <div className="communityPopupContent boxShadow borderRad">
        <img src={proxy_url} />
        <div className="feedLayerDiv" style={{ left: "1rem" }}>
          <IoIosClose
            className="textShadow"
            size="2rem"
            color="white"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* 질문창 */}
        <WriteBoxWrapper className="borderRad">
          <ProfileWrapper>
            <img
              className="feedProfile"
              src={myProfilePictureUrl}
              style={{ width: "3rem", height: "3rem" }}
            />
          </ProfileWrapper>
          <WriteBoxTextArea
            ref={textarea}
            className="content mt1 p1 mb05"
            rows={1}
            placeholder="질문을 작성해주세요!"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="button mb1"
            type="submit"
            style={{ width: "90%", height: "30%" }}
            onClick={onSubmit}
          >
            제출하기
          </button>
        </WriteBoxWrapper>
      </div>
    </div>
  );
}
const WriteBoxWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  width: 70%;
  height: 30%;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  top: -1.25rem;

  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const WriteBoxTextArea = styled.textarea`
  width: 80%;
  height: 20%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  resize: none;
  outline: none;
`;
