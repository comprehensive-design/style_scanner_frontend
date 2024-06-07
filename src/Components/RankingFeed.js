import styles from "../css/RankingFeed.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RankingFeed({ list = [] }) {
    const [likeStatuses, setLikeStatuses] = useState(
        list.map(item => ({ id: item.id, isLiked: item.isLiked, likeCount: item.likeCount }))
    );

    useEffect(() => {
        setLikeStatuses(list.map(item => ({ id: item.id, isLiked: item.isLiked, likeCount: item.likeCount })));
    }, [list]);

    const handleClick = (id) => {
        setLikeStatuses(prevStatuses => 
            prevStatuses.map(status => {
                if (status.id === id) {
                    const newIsLiked = !status.isLiked;
                    const newLikeCount = newIsLiked ? status.likeCount + 1 : status.likeCount - 1;

                    // 좋아요 상태가 변경될 때 API 호출
                    if (newIsLiked) {
                        axios.post(`/api/itemLike/${id}`, {}, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                            console.log(`Liked item ${id}`);
                        })
                        .catch(error => {
                            console.error(`Error liking item ${id}:`, error);
                        });
                    } else {
                        // 좋아요 취소 API 호출 (필요한 경우)
                        axios.delete(`/api/itemLike/${id}`, {
                            headers: {
                                'Content-Type': 'application/json'
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

    return (
        <div className={styles.RankingFeed}>
            {likeStatuses.length > 0 ? (
                likeStatuses.map((item, index) => (
                    <div key={index}>
                        <img
                            id={styles.bestFeed} src={item.feedUrl}
                            width="240px"
                            height="320px"
                            alt="Best Feed"
                        />

                        <div className={styles.RankingUserInfo}>
                            <p className={styles.rankingId}>{item.username}</p>

                            <div style={{ display: 'flex' }} className={styles.RankingUserHeart}>
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
        </div>
    )
}
