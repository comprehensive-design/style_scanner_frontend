import styles from "../css/comfeed.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import CommentTmp from './CommentTmp';

function ComFeed({ list, goDir }) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    //하드코딩..
    const images = [
        // "http://via.placeholder.com/370X465",
        // "http://via.placeholder.com/370X465",
        // "http://via.placeholder.com/370X465"
        'img/feed1.png',
        'img/feed2.png',
        'img/feed3.png'
    ];
    const openPopup = () => {
        setIsPopupOpen(true); 
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const navigateToCommunityComment = () => {
        navigate("/CommunityInfo");
    };
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

        <div>
            <div className={styles.comCompleteFeed}>
                {/* header */}
                <div className={styles.comProfile}>
                    <div className={styles.comProfileBox}>
                        <img id='comProfileImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                    </div>
                    <p className={styles.comProfileName} id='comProfileName'>hi_sseulgi</p>
                    <input type="button" className={styles.comGoButton} value="→" onClick={openPopup}></input>
                    {isPopupOpen && <CommentTmp onClose={closePopup} />} 
                </div>

                <div className={styles.comFeedMain}>
                    {goDir !== "navigateToHomeInfo" ?
                        <div className={styles.imageWrapper} onClick={openPopup}>
                            <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
                        </div> :
                        <div className={styles.imageWrapper} onClick={navigateToHomeInfo}>
                            <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
                        </div>
                    }


                    <div className={styles.dirBtn}>
                        {/* 사진 넘어가는 버튼 */}
                        {images.length > 1 && ( // 이미지가 2개 이상 일 때만 버튼 표시
                            <>
                                {currentImageIndex !== 0 && ( // 첫 번째 사진이 아닐 때만 왼쪽 버튼 표시
                                    <button className={styles.prevBtn} onClick={goToPrevImage}>{'<'}</button>
                                )}
                                {currentImageIndex !== images.length - 1 && ( // 마지막 사진이 아닐 때만 오른쪽 버튼 표시
                                    <button className={styles.nextBtn} onClick={goToNextImage}>{'>'}</button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.writeBox}>
                <span className={styles.writeId} id="writerId"><b>useruser2</b></span>
                <div className={styles.writeTotal}>
                    {/* 내용 /태그 포함 25자 보여주기..*/}
                    <span className={styles.writeContent} id="writeContent">속눈썹 궁금해요요요요요요요&nbsp;</span>
                    <span className={styles.tag} id="tag">@noodle.zip</span>
                </div>
            </div>
        </div>

    );
}
export default ComFeed;