import React, { useState} from 'react';
import styles from '../css/CommentInfo.module.css'

export default function CommentInfo(){
    const [imageSrc, setImageSrc] = useState(`img/heart.png`); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    const handleClick = () => {
        if (isClicked) {
            setImageSrc(`img/fullHeart.png`);
            setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
          } else {
            setImageSrc(`img/heart.png`);
            setIsClicked(true); // true일 땐 변경될 이미지 src
          }
      };
    return(
        <div className={styles.commentBox}>
            <div className={styles.commentWriterprofile}>
                <div className={styles.fakeBox}>
                    <div className={styles.commentProfileBox}>
                        <img id='commentWriterImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                    </div>
                </div>
                <div className={styles.fakeBox3}>
                    <span className={styles.commentWriterId} id='commentWriterName'>nwbd_we</span>
                    <span className={styles.commentContents} id="commentContents">하파 크리스틴 찾아보세요</span>
                </div>
                <div className={styles.heartBox} >
                    <img id={styles.commentHeart} src={imageSrc} onClick={handleClick}></img>
                </div>
                
              
            </div>
            
        </div>
    )

}