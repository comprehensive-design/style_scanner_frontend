import React, { useState } from 'react';
import styles from "../css/feed.module.css";
import { useNavigate } from "react-router-dom";
import FeedPopup from './FeedPopup';

function Feed({ media_url_list, profile_url, username, media_id }) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [profileName, setProfileName] = useState(username);
    
    const images = media_url_list;

    const openPopup = () => {
        setIsPopupOpen(true); 
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // 이미지 클릭 시 좌표를 서버로 전송하는 함수
    const postCurrentImage = async (imageUrl, images, coords) => {
        console.log(`클릭된 이미지: ${imageUrl}`);
        console.log(`클릭된 좌표: X=${coords.x}, Y=${coords.y}`);

        navigate("/HomeInfo", {
            state: {
                mediaUrls: images,
                feedUrl: imageUrl,
                media_id: media_id,
                username: username,
                profile_url: profile_url,
                coords: coords,
            }
        });
    };

    const handleClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const coords = { x: offsetX, y: offsetY };
        postCurrentImage(images[currentImageIndex], images, coords);
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
            const nextIndex = prevIndex === 0 ? 0 : prevIndex - 1;
            console.log(`이전 이미지 index: ${nextIndex}`);
            return nextIndex;
        });
    };

    return (
        <div className={styles.completeFeed}>
            {/* header */}
            <div className={styles.profile} onClick={openPopup}>
                {isPopupOpen && <FeedPopup onClose={closePopup} user={{profileName}}/>} 

                <div className={styles.ImageBox}>
                    {profile_url ? (
                        <img className={styles.profileImage2} src={profile_url} alt="Profile" />
                    ) : <img id={styles.profileImage} src={`img/profile.png`} alt="Profile"></img>}
                </div>
                <p className={styles.profileId} id={styles.name}>{username}</p>
            </div>

            {/* carousel 구현 */}
            <div className={styles.feedMain}>
                <div className={styles.imageWrapper} onClick={handleClick}>
                    <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
                </div>
                <div className={styles.dirBtn}>
                    {images.length > 1 && (
                        <>
                            {currentImageIndex !== 0 && (
                                <button className={styles.prevBtn} onClick={goToPrevImage}>{'<'}</button>
                            )}
                            {currentImageIndex !== images.length - 1 && (
                                <button className={styles.nextBtn} onClick={goToNextImage}>{'>'}</button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;
