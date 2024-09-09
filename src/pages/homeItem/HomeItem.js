import React, { useState, useEffect } from 'react';
import Feed from '../../Components/feed/Feed.js';
import Item from '../../Components/item/Item.js';
import styles from './HomeItem.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import CommunityWrite from '../community/post/CommunityWrite.js';

export default function HomeItem() {
    const location = useLocation();
    const { mediaUrls, feedUrl, media_id, username, profile_url, similarImages: initialSimilarImages } = location.state || {};
    const [items, setItems] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();
    const [similarImages, setSimilarImages] = useState(initialSimilarImages || []);

    const [startIndex, setStartIndex] = useState(0);
    const thumbnailsToShow = 4;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    //썸네일 클릭
    const thumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };
    //다음 썸네일 사진 버튼
    const nextBtn = () => {
        if (startIndex + thumbnailsToShow < mediaUrls.length - 1) {
            setStartIndex((prevIndex) => prevIndex + 1);
        }
    };
    //아이템 더보기 버튼
    const morePage = () => {
        setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerPage);
    };

    useEffect(() => {
        const fetchItemData = async () => {

            const token = localStorage.getItem('accessToken');
            if (!token) {
                return;
            }

            try {
                const itemDataPromises = initialSimilarImages.map(async (item) => {
                    const id = item[0]; // 첫 번째 요소로부터 id를 추출
                    const response = await axios.get(`/api/item/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }

                    );
                    return { ...response.data, image: item[0] };
                });
                const itemData = await Promise.all(itemDataPromises);
                setItems(itemData);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (initialSimilarImages) {
            fetchItemData();
        }
    }, [initialSimilarImages]);


    const currentItems = items.slice(0, itemsToShow);


    return (
        <div>
            <div className={styles.top}>
                <div className={styles.feedContainer}>
                    <div className={styles.feedMain}>
                        {mediaUrls && profile_url && username && media_id && (
                            <Feed
                                key={media_id}
                                media_url_list={mediaUrls}
                                profile_url={profile_url}
                                username={username}
                                media_id={media_id}
                                home={false}
                                currentIndex={currentImageIndex}
                            />
                        )}
                    </div>
                    {mediaUrls.length > 1 && (
                        <div className={styles.feedSub}>

                            {mediaUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={styles.thumbnail}
                                    onClick={() => thumbnailClick(index)}
                                />
                            ))}
                            {startIndex + thumbnailsToShow < mediaUrls.length - 1 && (
                                <button onClick={nextBtn} className={styles.arrowButton}>
                                    ▾
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.contents}>
                <div>
                    <div className={styles.itemTitleDiv}>
                        <img className={styles.boxIcon} src={`img/boxIcon.png`} />
                        <div className={styles.itemTitle}>아이템 정보</div>
                    </div>
                    <div className={styles.totalItem}>
                        {/* {currentItems.map((item, index) => (
                            <Item
                                key={item.id}
                                itemId={item.id}
                                brand={item.brand}
                                name={item.name || `Similar Image ${index + 1}`}
                                price={item.price || 0}
                                image={item.itemUrl}
                                shoppingLink={item.shoppingLink}
                                index={index}
                            />
                        ))} */}

                        <Item
                            key={0}
                            itemId={0}
                            brand={"wow"}
                            name={"wow"}
                            price={100000000}
                            image={"https://via.placeholder.com/200"}
                            shoppingLink={""}
                            index={0}
                        />
                         {/* <Item
                            key={0}
                            itemId={0}
                            brand={"wow"}
                            name={"wow"}
                            price={100000000}
                            image={"https://via.placeholder.com/200"}
                            shoppingLink={""}
                            index={0}
                        />
                         <Item
                            key={0}
                            itemId={0}
                            brand={"wow"}
                            name={"wow"}
                            price={100000000}
                            image={"https://via.placeholder.com/200"}
                            shoppingLink={""}
                            index={0}
                        />
                         <Item
                            key={0}
                            itemId={0}
                            brand={"wow"}
                            name={"wow"}
                            price={100000000}
                            image={"https://via.placeholder.com/200"}
                            shoppingLink={""}
                            index={0}
                        /> */}


                    </div>
                    <div className={styles.btnDiv}>
                        <button className={styles.moreBtn} onClick={morePage}>더보기</button>
                        <p className={styles.goComBtn} onClick={openPopup}>찾는 제품이 없으신가요?</p>
                    </div>
                    {isPopupOpen && <CommunityWrite feedUrl={feedUrl} onClose={closePopup} />} {/* 팝업 모달 조건부 렌더링 */}
                </div>
            </div>
        </div>
    );
}
