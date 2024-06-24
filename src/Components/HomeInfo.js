import React, { useState, useEffect } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import styles from '../css/HomeInfo.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import CommunityWrite from './CommunityWrite.js';

export default function HomeInfo() {
    const location = useLocation(); 
    const { mediaUrls, feedUrl, media_id, username, profile_url, similarImages: initialSimilarImages } = location.state || {};
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const navigate = useNavigate();
    const [similarImages, setSimilarImages] = useState(initialSimilarImages || []);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(similarImages.length / itemsPerPage));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(similarImages.length / itemsPerPage)) % Math.ceil(similarImages.length / itemsPerPage));
    };

    useEffect(() => {
        if (initialSimilarImages) {
            setSimilarImages(initialSimilarImages);
        }
    }, [initialSimilarImages]);

    const currentItems = similarImages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className={styles.contents}>
            {mediaUrls && profile_url && username && media_id && (
                <Feed
                    key={media_id}
                    media_url_list={mediaUrls}
                    profile_url={profile_url}
                    username={username}
                    media_id={media_id}
                    close={false}
                />
            )}
            <div>
                <p className={styles.product}>Product</p>
                <hr></hr>
                <div className={styles.totalItem}>
                    {currentItems.map((item, index) => (
                        <ItemInfo 
                            key={index} 
                            itemId={index} 
                            name={`Similar Image ${index + 1}`} 
                            price={0} 
                            image={item[0]}
                            index={currentPage * itemsPerPage + index} 
                        />
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button className={styles.prevBtn} onClick={prevPage}>{'<'}</button>
                    <button className={styles.nextBtn} onClick={nextPage}>{'>'}</button>
                </div>
                <p className={styles.goComBtn} onClick={openPopup}>찾는 제품이 없으신가요?</p>
                {isPopupOpen && <CommunityWrite feedUrl={feedUrl} onClose={closePopup} />} {/* 팝업 모달 조건부 렌더링 */}
            </div>
        </div>
    );
}
