import React, { useState } from 'react';
import styles from "../css/feed.module.css";
import { useNavigate } from "react-router-dom";

function Feed({ children }) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = [
        // "http://via.placeholder.com/370X465",
        // "http://via.placeholder.com/370X465",
        // "http://via.placeholder.com/370X465"
        'img/feed1.png',
        'img/feed2.png',
        'img/feed3.png'
    ];

    // 이미지 클릭 -> 아이템 정보창으로 이동
    const navigateToHomeInfo = () => {
        navigate("/HomeInfo");
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
            console.log(`다음 이미지 index: ${nextIndex}`);
            return nextIndex;
        });
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) => {
            //0번 인덱스에서 이전 x
            const nextIndex = prevIndex === 0 ? 0 : prevIndex - 1;
            console.log(`이전 이미지 index: ${nextIndex}`);
            return nextIndex;
        });
    };
    return (
        <div className={styles.completeFeed}>
            {/* header */}
            <div className={styles.profile}>
                <div className={styles.ImageBox}>
                    <img id={styles.profileImage} src={process.env.PUBLIC_URL + 'img/profile.png'} alt="Profile"></img>
                </div>
                <p className={styles.profileId} id={styles.name}>hi_sseulgi</p>
            </div>

            {/* 캐러셔 구현 */}
            <div className={styles.feedMain}>
                <div className={styles.imageWrapper} onClick={navigateToHomeInfo}>
                    <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
                </div>
            </div>

            {/* 사진 넘어가는 버튼 */}
            <button onClick={goToPrevImage}>Prev</button>
            <button onClick={goToNextImage}>Next</button>
        </div>
    );
}

export default Feed;
