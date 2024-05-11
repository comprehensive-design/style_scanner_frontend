import styles from '../css/CommunityWrite.module.css';
import {  useRef } from "react";
import Feed from './feed.js';
import { useNavigate } from "react-router-dom";

export default function MypageDefault(){
    const textarea = useRef();
    //textarea 가변길이
    const handleResizeHeight = () => {
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
    };
    //작성 버튼 이벤트
    const navigate = useNavigate();
    const navigateToCommunity = () => {
        console.log("버튼 누름");
      };
    return(
        <div className={styles.writeContents}>
                <Feed></Feed>
                <div className={styles.comDecoBox}>
                    <div className={styles.comWriterBox}>
                        <div className={styles.writerProfile}>
                            <img id={styles.writerImage} src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                        </div>
                        <p  id={styles.writerId}><b>nwbd_we</b></p>
                    </div>
                    <textarea ref={textarea} onInput={handleResizeHeight} rows={1} className={styles.questionBox} placeholder='질문을 작성해주세요...(100자 이내)'></textarea>
                    <div className={styles.comButtonBox}>
                    <input type="button" className={styles.comWriteButton} value="작성" onClick={navigateToCommunity}></input>
                    </div>
                </div>
                
            </div>
        
    )
    
}