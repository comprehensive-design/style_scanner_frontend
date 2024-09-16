import axios from 'axios';
import styles from './ItemsList.module.css';
import React, { useState, useEffect } from 'react';

export default function ItemsList({ list = [] }) {
    const [likeStatuses, setLikeStatuses] = useState(
        list.map(item => ({ id: item.id, isLiked: true, likeCount: item.likeCount }))
    );

    useEffect(() => {
        setLikeStatuses(list.map(item => ({ id: item.id, isLiked: true, likeCount: item.likeCount })));
    }, [list]);

    const token = localStorage.getItem('accessToken');

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
        <div className="mplGrid">
            {list.map(item => {
                const { id, feedUrl, name, price, brand, itemOption, itemUrl } = item;
                const status = likeStatuses.find(status => status.id === id) || { isLiked: false, likeCount: 0 };

                return (
                    <div key={id} className={styles.gridItem}>
                        <img
                            id={styles.LikeItemImg}
                            src={itemUrl}
                            width="180px"
                            height="180px"
                            alt={name}
                            onError={handleImageError}
                        />
                        <div className={styles.itemInfo}>
                            <p style={{ fontWeight: "bold" }} className={styles.storeName}>{brand}</p>
                            <p className={styles.itemName}>{name}-{itemOption}</p>
                            <p className={styles.itemPrice}>{price}</p>

                        </div> 
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
            {/* Ensure the grid always has 5 columns by adding placeholders with display none */}
            {Array.from({ length: 3 - (list.length % 3) }).map((_, index) => (
                <div key={`placeholder-${index}`} className={styles.gridItem} style={{ display: 'none', border : 'none'}}></div>
            ))}
        </div>
    );
}
