// import styles from "../css/ItemLists.module.css";
import styles from '../css/ItemsList.module.css';
import React, { useState } from 'react';

export default function ItemsList({ list }) {
    const [imageSrc, setImageSrc] = useState(`img/heart.png`); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    const rows = [];
    for (let i = 0; i < list.length; i += 5) {
        rows.push(list.slice(i, i + 5));
    }

    const handleClick = () => {
        if (isClicked) {
            setImageSrc(`img/fullHeart.png`);
            setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
        } else {
            setImageSrc(`img/heart.png`);
            setIsClicked(true); // true일 땐 변경될 이미지 src
        }
    };

    return (
        <div>
            {rows.map((row, index) => (
                <div key={index} style={{ display: 'flex' }} >
                    {row.map(({ id, title, body }) => (
                        <div key={id} style={{ flex: 1, margin: '5px' }} className={styles.ItemDiv}>
                            <img
                                id={styles.LikeItemImg}
                                src="https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image"
                            >
                            </img>
                            <div className={styles.itemInfo}>
                                <p style={{ fontWeight: "bold" }} className={styles.storeName}>{title}</p>
                                <p className={styles.itemName}>{body}</p>
                            </div>
                            <p className={styles.itemPrice}>102,000</p>
                            <div className={styles.itemprofile} style={{ display: 'flex' }}>
                                <img
                                    src={`img/fullHeart.png`}
                                    width='14'
                                    height='13'
                                    style={{
                                        margin: 5,
                                    }}
                                />
                                <div className={styles.likeCountDiv}>
                                    <p className={styles.likeCount}>2233</p>
                                </div>

                                <div className={styles.linkImg}>
                                    <img
                                        src={`img/link.png`}
                                        width='13'
                                        height='13'
                                        className="link"
                                    />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}