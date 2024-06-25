import React, { useState, useEffect } from 'react';
import styles from '../css/ItemInfo.module.css';
import axios from 'axios';

export default function ItemInfo({ key, itemId, brand, name, price, image, index }) {
    const [imageSrc, setImageSrc] = useState(image); // 초기 상태는 prop으로 받은 이미지로 설정
    const [heartSrc, setHeartSrc] = useState('img/heart.png'); // 하트 이미지 상태
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    const shoppingClick = () => {
        alert("shopping link로 이동해야함");
    };

    const handleHeartClick = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            if (!isClicked) {
                // 좋아요 요청
                const response = await axios.post(`/api/itemLike/${itemId}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    setHeartSrc('img/fullHeart.png');
                    setIsClicked(true);
                }
            } else {
                // 좋아요 취소
                const response = await axios.delete(`/api/itemLike/${itemId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    setHeartSrc('img/heart.png');
                    setIsClicked(false);
                }
            }
        } catch (error) {
            console.error('Error processing like/unlike:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        // 좋아요 상태를 확인하는 함수
        const checkLikeStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                return;
            }

            try {
                const response = await axios.get(`/api/itemLike/${itemId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200 && response.data.liked) {
                    setHeartSrc('img/fullHeart.png');
                    setIsClicked(true);
                }
            } catch (error) {
                console.error('Error fetching like status:', error.response ? error.response.data : error.message);
            }
        };

        checkLikeStatus();
    }, [itemId]);

    useEffect(() => {
        // image prop이 변경될 때마다 이미지 소스를 업데이트합니다.
        setImageSrc(image);
    }, [image]);

    return (
        <div className={styles.infoBox}>
            <div className={styles.infoMain}>
                <img className={styles.item} src={imageSrc} alt={name}></img>
                <div>
                    <img id={styles.itemHeart} src={heartSrc} onClick={handleHeartClick} alt="Like button"></img>
                </div>
            </div>

            <div className={styles.infoText}>
                <p id={styles.itemName}><b>{brand}</b></p>
                <p id={styles.itemDetail}>{name}</p>
            </div>
            <div className={styles.bottomCom}>
                <hr className={styles.line}></hr>
                &nbsp;
                <p id={styles.itemPrice}>{price}{'₩'}</p>
            </div>
            <div onClick={shoppingClick} className={styles.goBtn}>
                <span>&nbsp;SHOP</span>
                <span id={styles.arrow}>→&nbsp;</span>
            </div>
        </div>
    );
}
