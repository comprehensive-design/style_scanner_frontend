import styles from "../css/RankingFeed.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RankingFeed({ list = [] }) {
    const [likeStatuses, setLikeStatuses] = useState(
        list.map(item => ({ 
            id: item.id, 
            isLiked: item.isLiked, 
            likeCount: item.likeCount,
            itemUrl: item.itemUrl,
            username: item.name,
            brand: item.brand,
            price: item.price
        }))
    );

    useEffect(() => {
        setLikeStatuses(list.map(item => ({ 
            id: item.id, 
            isLiked: item.isLiked, 
            likeCount: item.likeCount,
            itemUrl: item.itemUrl,
            username: item.name,
            brand: item.brand,
            price: item.price
        })));
    }, [list]);

    const token = localStorage.getItem('accessToken'); // LocalStorage에서 토큰 가져오기

    const handleClick = (id) => {
        setLikeStatuses(prevStatuses => 
            prevStatuses.map(status => {
                if (status.id === id) {
                    const newIsLiked = !status.isLiked;
                    const newLikeCount = newIsLiked ? status.likeCount + 1 : status.likeCount - 1;

                    if (newIsLiked) {
                        axios.post(`/api/itemLike/${id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        .then(response => {
                            console.log(`Liked item ${id}`);
                        })
                        .catch(error => {
                            console.error(`Error liking item ${id}:`, error);
                        });
                    } else {
                        axios.delete(`/api/itemLike/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        .then(response => {
                            console.log(`Unliked item ${id}`);
                        })
                        .catch(error => {
                            console.error(`Error unliking item ${id}:`, error);
                        });
                    }

                    return { ...status, isLiked: newIsLiked, likeCount: newLikeCount };
                }
                return status;
            })
        );
    };

    const handleImageError = (e) => {
        console.error(`Error loading image: ${e.target.src}`);
        e.target.src = "https://via.placeholder.com/240x240/808080/FFFFFF/?text=";
    };

    return (
        <div className={styles.RankingFeed}>
            {likeStatuses.length > 0 ? (
                likeStatuses.map((item) => (
                    <div key={item.id} className={styles.gridItem}>
                        <img
                            id={styles.bestFeed} 
                            src={item.itemUrl}
                            width="200px"
                            height="200px"
                            alt="Best Feed"
                            onError={handleImageError}
                        />

                        <div className={styles.RankingUserInfo}>
                            <p className={styles.brandName}>{item.brand}</p>
                            <p className={styles.rankingId}>{item.username}</p>
                            <p className={styles.itemPrice}>{item.price}</p>
                            <div className={styles.RankingUserHeart}>
                                <img
                                    id={styles.rankingHeart}
                                    src={item.isLiked ? 'img/fullHeart.png' : 'img/heart.png'}
                                    alt="Heart Icon"
                                    onClick={() => handleClick(item.id)}
                                />
                                <p className={styles.rankingHeartCount}>{item.likeCount}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No items to display</p>
            )}
            <div className={styles.RankingFeedPadding}></div>
        </div>
    );
}
