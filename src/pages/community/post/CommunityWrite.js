import React, { useRef, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import styled from 'styled-components'

const questionBoxWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction:  column;
  width: 50%;
  

`;
export default function CommunityWrite({ post, feedUrl, profileUrl, onSave, onClose }) {
  const [question, setQuestion] = useState(post ? post.content : "");
  const textarea = useRef();
  return (
    <div className="popupWrapper">
      <div className="popupContent boxShadow borderRad">
        <img src={`img/feed1.png`}></img>
        <div className='feedLayerDiv' style={{left:'1em'}}>
          <IoIosClose className='textShadow' size='2em' color='white' onClick={onClose} style={{cursor:'pointer'}}/>
        </div>
       <questionBoxWrapper>
       <img src={`img/profile.png`}></img>
       </questionBoxWrapper>
      
      </div> 
    </div>
    // <div className={styles.popup}>
    //   <div className={styles.popupContent}>
    //     <div className={styles.titleDiv}>
    //       <p className={styles.closeButton} onClick={onClose}>×</p>
    //       <p className={styles.title}>{post ? "수정하기" : "질문 글"}</p>
    //     </div>
    //     <div className={styles.comWriterBox}>
    //       <img
    //         id={styles.writerImage}
    //         src={profile.profilePictureUrl || process.env.PUBLIC_URL + "img/profile.png"}
    //         alt="Profile"
    //       />
    //       <p id={styles.writerId}>{profile.displayName || "Unknown User"}</p>
    //     </div>
    //     <div className={styles.decoBox}>
          // <textarea
          //   ref={textarea}
          //   rows={1}
          //   className={styles.questionBox}
          //   placeholder="질문을 작성해주세요..."
          //   value={question}
          //   onChange={(e) => setQuestion(e.target.value)}
          // ></textarea>
    //       <div className={styles.btn}>

    //         <Button BackColor="#d9d9d9" txtColor="black" border="none" hovColor="black" hovTxtColor="white">{post ? "수정" : "작성"}</Button>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
