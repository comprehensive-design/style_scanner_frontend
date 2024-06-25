import styles from "../css/RankingFeed.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RankingFeed({ list = [] }) {
    const [likeStatuses, setLikeStatuses] = useState([]);

    useEffect(() => {
        // Initialize like statuses based on list prop
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

    useEffect(() => {
        // Check like status for each item
        const checkLikeStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return;
            }

            try {
                const updatedLikeStatuses = await Promise.all(
                    likeStatuses.map(async item => {
                        const response = await axios.get(`/api/itemLike/${item.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        });

                        return {
                            ...item,
                            isLiked: response.data
                        };
                    })
                );

                setLikeStatuses(updatedLikeStatuses);
            } catch (error) {
                console.error('Error checking like status:', error);
            }
        };

        checkLikeStatus();
    }, [likeStatuses]);

    const token = localStorage.getItem('accessToken'); // LocalStorage에서 토큰 가져오기

    const handleClick = (id) => {
        setLikeStatuses(prevStatuses => 
            prevStatuses.map(status => {
                if (status.id === id) {
                    const newIsLiked = !status.isLiked;
                    const newLikeCount = newIsLiked ? status.likeCount + 1 : status.likeCount - 1;

                    // Update like status on the server
                    if (newIsLiked) {
                        axios.post(`/api/itemLike/${id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        .then(response => {
                            console.log(`Liked item ${id}`);
                            // Update local state after successful like
                            setLikeStatuses(prevStatuses =>
                                prevStatuses.map(item => item.id === id ? { ...item, isLiked: true, likeCount: newLikeCount } : item)
                            );
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
                            // Update local state after successful unlike
                            setLikeStatuses(prevStatuses =>
                                prevStatuses.map(item => item.id === id ? { ...item, isLiked: false, likeCount: newLikeCount } : item)
                            );
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
                                    src={item.isLiked ? '/img/fullHeart.png' : '/img/heart.png'}
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
