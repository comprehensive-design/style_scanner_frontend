import React, { useState} from 'react';
import styles from '../css/ItemInfo.module.css'

export default function HomeInfo(){
    const [imageSrc, setImageSrc] = useState(`img/heart.png`); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    const handleClick = () => {
        if (isClicked) {
            setImageSrc(`img/fullHeart.png`);
            setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
          } else {
            setImageSrc(`img/heart.png`);
            setIsClicked(true); // true일 땐 변경될 이미지 src
          }
      };
    return(
        <div className={styles.infoBox}>
            <img id={styles.item} src="http://via.placeholder.com/120X120"></img>
                <div className={styles.infoText}>
                    <p id={styles.itemName}><b>Gentle Monster</b></p>
                    <p id={styles.itemDetail}>Vonzo01 - Black</p>
                    <br></br>
                    <br></br>
                    <p id={styles.itemPrice}>320,000원</p>
                </div>
            {/* 하트 버튼 누르기 */}
            <div >
                <img id={styles.itemHeart} src={imageSrc} onClick={handleClick}></img>
            </div>
        </div>
    )

}