import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from "./Feed.module.css";
import { useNavigate } from "react-router-dom";
import FeedPopup from '../../../Components/FeedPopup';

function Feed({ media_url_list, profile_url, username, media_id, close }) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const images = media_url_list;
    const imageWrapperRef = useRef(null);
    
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
        
        const imageElement = imageWrapperRef.current.querySelector('img');
        const imageRect = imageElement.getBoundingClientRect();
        
        const offsetX = event.clientX - imageRect.left;
        const offsetY = event.clientY - imageRect.top;

        // 이미지의 실제 크기와 현재 디스플레이 크기를 비교하여 좌표 변환
        const xRatio = imageElement.naturalWidth / imageRect.width;
        const yRatio = imageElement.naturalHeight / imageRect.height;

        let coords = { x: offsetX * xRatio, y: offsetY * yRatio };

        // 리사이즈된 이미지의 크기(465, 370)에 맞게 좌표 변환
        const resizedWidth = 465;
        const resizedHeight = 370;
        coords = {
            x: Math.floor(coords.x * (resizedWidth / imageElement.naturalWidth)),
            y: Math.floor(coords.y * (resizedHeight / imageElement.naturalHeight))
        };

        // 좌표가 이미지의 실제 크기 내에 있는지 확인
        if (coords.x < 0 || coords.y < 0 || coords.x > resizedWidth || coords.y > resizedHeight) {
            console.error('Invalid coordinates:', coords);
            return;
        }

        const currentImageUrl = images[currentImageIndex];
        console.log(coords.x, coords.y);  // 좌표 확인
        alert("click!");
        try {
            // 1. Segmentation 요청
            const segResponse = await axios.post('http://127.0.0.1:8000/seg', null, {
                params: {
                    x: coords.x,
                    y: coords.y,
                    img_url: currentImageUrl // 인코딩 하지 않음
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
        <div className={styles.FeedDiv}>
            <div className={styles.profileDiv} onClick={openPopup}>
                {/* 셀럽 피드 팝업 */}
                {isPopupOpen && <FeedPopup onClose={closePopup} user={{ profileName: username }} />}
                
                {profile_url ? (
                        <img className={styles.profileEllipse} src={profile_url} alt="Profile" />
                    ) : (
                        <img id={styles.profileEllipseDefault} src={`img/profile.png`} alt="Profile" />
                    )}
                
                <p className={styles.profileUserName}>{username}</p>
            </div>

            <div className={styles.feedMain}>
                <div ref={imageWrapperRef} onClick={handleClick}>
                    <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
                </div>
                <div className={styles.layerDiv}>
                    {images.length > 1 && (
                        <>
                            {/* 한장 이상일때 layer 아이콘 첨부*/}
                            <img className={styles.layer} src={`img/layer.png`} alt="layer"></img>
                            {/* <button className={styles.prevBtn} onClick={goToPrevImage}>{'<'}</button>
                            <button className={styles.nextBtn} onClick={goToNextImage}>{'>'}</button> */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;
