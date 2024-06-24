import React, { useState } from 'react';
import axios from 'axios';
import styles from "../css/feed.module.css";
import { useNavigate } from "react-router-dom";
import FeedPopup from './FeedPopup';

function Feed({ media_url_list, profile_url, username, media_id, close }) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const images = media_url_list;

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleClick = async (event) => {
        if (close) {
            navigate("/HomeInfo", {
                state: {
                    mediaUrls: images,
                    feedUrl: images[currentImageIndex],
                    media_id: media_id,
                    username: username,
                    profile_url: profile_url,
                }
            });
            return;
        }

        const { offsetX, offsetY } = event.nativeEvent;
        const coords = { x: offsetX, y: offsetY };
        const currentImageUrl = images[currentImageIndex];

        try {
            // 1. Segmentation 요청
            const segResponse = await axios.post('http://127.0.0.1:8000/seg', null, {
                params: {
                    x: coords.x,
                    y: coords.y,
                    img_url: currentImageUrl
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                responseType: 'blob'  // blob으로 응답 받기
            });

            const segmentedBlob = segResponse.data;
            const segmentedFile = new File([segmentedBlob], 'segmented_image.jpg', { type: segmentedBlob.type });

            // 2. Segmentation된 이미지 업로드
            const formData = new FormData();
            formData.append('image_file', segmentedFile);

            const uploadResponse = await axios.post('http://127.0.0.1:8000/uploadSegImg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const uploadedImageUrl = uploadResponse.data.image_url;

            // 3. 유사 이미지 검색
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const similarImagesResponse = await axios.get('http://127.0.0.1:8000/clip', {
                params: {
                    seg_img_url: uploadedImageUrl,
                    folder_name: 'items/'
                },
                ...config
            });

            const similarImages = similarImagesResponse.data.similar_images;
            console.log(similarImages);
            navigate("/HomeInfo", {
                state: {
                    mediaUrls: images,
                    feedUrl: currentImageUrl,
                    media_id: media_id,
                    username: username,
                    profile_url: profile_url,
                    coords: coords,
                    similarImages: similarImages
                }
            });
        } catch (error) {
            console.error('Error processing the image:', error);
        }
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.completeFeed}>
            <div className={styles.profile} onClick={openPopup}>
                {isPopupOpen && <FeedPopup onClose={closePopup} user={{ profileName: username }} />}
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
                            <button className={styles.prevBtn} onClick={goToPrevImage}>{'<'}</button>
                            <button className={styles.nextBtn} onClick={goToNextImage}>{'>'}</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;
