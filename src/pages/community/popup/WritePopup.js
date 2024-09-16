import React, { useRef, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import styled from 'styled-components'

export default function WritePopup({ post, feedUrl, profile_url, onSave, onClose }) {
  const [question, setQuestion] = useState(post ? post.content : "");
  const textarea = useRef();
  return (
    <div className="communityPopupWrapper">
      <div className="communityPopupContent boxShadow borderRad">
        <img src={`img/feed1.png`}/>
        <div className='feedLayerDiv' style={{ left: '1em' }}>
          <IoIosClose className='textShadow' size='2em' color='white' onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
        {/* 질문창 */}
        <WriteBoxWrapper className="borderRad">
          <ProfileWrapper>
            <img className='feedProfile' src={`img/profile.png`} style={{ width: '3em', height: '3em'}} />
          </ProfileWrapper>
          <WriteBoxTextArea
            ref={textarea}
            className="content p1 mb05"
            rows={1}
            placeholder="질문을 작성해주세요!"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="button" style={{width: '90%', height: '30%' , marginBottom:'1em'}}>제출하기</button>
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
  width: 3.5em;
  height: 3.5em;
  top: -1.25em; 
  
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;

const WriteBoxTextArea = styled.textarea`
  width: 80%;
  height: 20%;
  margin-top: 2em;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  resize: none;
  outline: none;
`;