import React, { useState } from 'react';
import styles from '../css/ItemInfo.module.css'
import Button from './Button';

export default function ItemInfo({ image, name, index, price }) {
    const [imageSrc, setImageSrc] = useState(`img/heart.png`); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리
   
    const shoppingClick = () => {
        alert("shopping  link로 이동해야함")
     };
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
        <div className={styles.infoBox}>
            <div className={styles.infoMain}>
                <p>{`Item ${index}`}</p>
                <img className={styles.item} src="http://via.placeholder.com/180X240"></img>
                <div id={styles.itemHeart}>
                    <img src={imageSrc} onClick={handleClick}></img>
                </div>
            </div>

            <div className={styles.infoText}>
                {/* Gentle Monster */}
                <p id={styles.itemName}><b>{name}</b></p>
                <p id={styles.itemDetail}>Vonzo01 - Black</p>
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
    )

}