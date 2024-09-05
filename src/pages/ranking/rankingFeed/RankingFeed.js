import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RankingFeed.module.css';

export default function RankingFeed({ list = [] }) {
    const [likeStatuses, setLikeStatuses] = useState([]);

    useEffect(() => {
        const fetchLikeStatuses = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('Access token not found');
                    return;
                }

                const updatedLikeStatuses = await Promise.all(
                    list.map(async item => {
                        try {
                            const response = await axios.get(`/api/itemLike/${item.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            const isLiked = response.data === true; // Assuming server returns true/false
                            return {
                                id: item.id,
                                isLiked: isLiked,
                                likeCount: item.likeCount,
                                itemUrl: item.itemUrl,
                                username: item.name,
                                brand: item.brand,
                                price: item.price,
                            };
                        } catch (error) {
                            console.error(`Error fetching like status for item ${item.id}:`, error);
                            return {
                                id: item.id,
                                isLiked: false,
                                likeCount: item.likeCount,
                                itemUrl: item.itemUrl,
                                username: item.name,
                                brand: item.brand,
                                price: item.price,
                            };
                        }
                    })
                );

                setLikeStatuses(updatedLikeStatuses);
            } catch (error) {
                console.error('Error fetching like statuses:', error);
            }
        };

        fetchLikeStatuses();
    }, [list]);

    const handleClick = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('Access token not found');
                return;
            }

            const statusIndex = likeStatuses.findIndex(item => item.id === id);
            if (statusIndex === -1) {
                console.error(`Item with id ${id} not found in likeStatuses`);
                return;
            }

            const currentStatus = likeStatuses[statusIndex];
            const newIsLiked = !currentStatus.isLiked;
            const newLikeCount = newIsLiked ? currentStatus.likeCount + 1 : currentStatus.likeCount - 1;

            const response = newIsLiked
                ? await axios.post(`/api/itemLike/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
                : await axios.delete(`/api/itemLike/${id}`, { headers: { Authorization: `Bearer ${token}` } });

            if (response.status === 200) {
                setLikeStatuses(prevStatuses => {
                    const updatedStatuses = [...prevStatuses];
                    updatedStatuses[statusIndex] = { ...currentStatus, isLiked: newIsLiked, likeCount: newLikeCount };
                    return updatedStatuses;
                });
            } else {
                console.error(`Failed to update like status for item ${id}`);
            }
        } catch (error) {
            console.error(`Error toggling like status for item ${id}:`, error);
        }
    };

    const handleImageError = (e) => {
        console.error(`Error loading image: ${e.target.src}`);
        e.target.src = 'https://via.placeholder.com/240x240/808080/FFFFFF/?text=Image+not+found';
    };

    return (
        <div className={styles.RankingFeed}>
            {likeStatuses.map(item => (
                <div key={item.id} className={styles.gridItem}>
                    <img
                        className={styles.bestFeed}
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
                    </div>
                    <div className={styles.RankingUserHeart}>
                        <img
                            className={styles.rankingHeart}
                            src={item.isLiked ? '/img/fullHeart.png' : '/img/heart.png'}
                            alt="Heart Icon"
                            width="15px"
                            height="15px"
                            onClick={() => handleClick(item.id)}
                        />
                        <p className={styles.rankingHeartCount}>{item.likeCount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
