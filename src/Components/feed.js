import React, { useState } from 'react';
import axios from 'axios';
import styles from "../css/feed.module.css";
import { useNavigate } from "react-router-dom";
import FeedPopup from './FeedPopup';

function Feed({ media_url_list, profile_url, username, media_id, close }) {
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

    const postCurrentImage = async (imageUrl, images, coords = { x: 0, y: 0 }, close) => {
        if (!close) {
            console.log(close);
            console.log(`클릭된 이미지: ${imageUrl}`);
            console.log(`클릭된 좌표: X=${coords.x}, Y=${coords.y}`);

            try {
                const response = await axios.post(`http://127.0.0.1:8000/seg`, null, {
                    params: {
                        x: coords.x,
                        y: coords.y,
                        img_url: imageUrl
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                console.log('서버 응답:', response.data);
            } catch (error) {
                console.error('이미지 전송 중 오류 발생:', error);
            }
        } else {
            navigate("/HomeInfo", {
                state: {
                    mediaUrls: images,
                    feedUrl: imageUrl,
                    media_id: media_id,
                    username: username,
                    profile_url: profile_url,
                }
            });
        }
    };

    const handleClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent;
        const coords = { x: offsetX, y: offsetY };
        postCurrentImage(images[currentImageIndex], images, coords, close);
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
                {isPopupOpen && <FeedPopup onClose={closePopup} user={{ profileName }} />}

                <div className={styles.ImageBox}>
                    {profile_url ? (
                        <img className={styles.profileImage2} src={profile_url} alt="Profile" />
                    ) : (
                        <img id={styles.profileImage} src={`img/profile.png`} alt="Profile" />
                    )}
                </div>
                <p className={styles.profileId} id={styles.name}>{username}</p>
            </div>

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
