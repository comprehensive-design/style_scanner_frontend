import axios from 'axios';
import styles from '../css/ItemsList.module.css';
import React, { useState, useEffect } from 'react';

export default function ItemsList({ list = [] }) {
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
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {list.map(item => {
                    const { id, feedUrl, name, price, brand, itemOption } = item;
                    const status = likeStatuses.find(status => status.id === id) || { isLiked: false, likeCount: 0 };

                    return (
                        <div key={id} style={{ flex: 1, margin: '5px' }} className={styles.ItemDiv}>
                            <img
                                id={styles.LikeItemImg}
                                src={feedUrl || "https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"}
                                alt={name}
                            />
                            <div className={styles.itemInfo}>
                                <p style={{ fontWeight: "bold" }} className={styles.storeName}>{brand}</p>
                                <p className={styles.itemName}>{name}-{itemOption}</p>
                            </div>
                            <p className={styles.itemPrice}>{price}</p>
                            <div className={styles.itemProfile} style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    id={styles.rankingHeart}
                                    src={status.isLiked ? 'img/fullHeart.png' : 'img/heart.png'}
                                    alt="Heart Icon"
                                    onClick={() => handleClick(id)}
                                    style={{
                                        margin: 5,
                                        cursor: 'pointer'
                                    }}
                                />
                                <div className={styles.likeCountDiv}>
                                    <p className={styles.likeCount}>{status.likeCount}</p>
                                </div>
                                <div className={styles.linkImg}>
                                    <img
                                        src={`img/link.png`}
                                        width='13'
                                        height='13'
                                        className="link"
                                        alt="Link Icon"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
