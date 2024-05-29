import React, { useState } from 'react';
import styles from '../css/CommentInfo.module.css'

export default function CommentInfo({ key,profilePictureUrl, displayName, content }) {
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
    return (
        <div className={styles.commentBox}>
            {profilePictureUrl ? (
                <img className={styles.writerProfile} src={profilePictureUrl} alt="Profile" />
            ) : (
                <img className={styles.writerProfile} src={`img/profile.png`} alt="Profile" />
            )}
            <div className={styles.contentDiv}>
                <span className={styles.commentWriterId} >{displayName}</span>
                <span className={styles.commentContents} >{content}</span>
            </div>
            <div className={styles.heartBox} >
                <img id={styles.commentHeart} src={imageSrc} onClick={handleClick}></img>
            </div>

        </div>
    )

}