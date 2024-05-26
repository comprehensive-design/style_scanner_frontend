import React, { Component } from 'react';
import styles from '../css/CelebBox.module.css';
import Button from './Button';

function CelebBox({prifileImgUrl="/img/whiteBox.png", displayName, follower, picUrl1="/img/whiteBox.png", picUrl2="/img/whiteBox.png", picUrl3="/img/whiteBox.png", onSave}) {

    return (
        <div className={styles.box}>
            <div className={styles.pBox}>
                <img className={styles.profileImg} src={prifileImgUrl} ></img>
                <div className={styles.mPart}>
                    <div className={styles.uText} >@{displayName}</div>
                    <div className={styles.fText}>{follower} follower</div>
                </div>
                <div className={styles.btn}>
                    <Button borderRad ='20px' onClick={() => onSave()}>팔로우</Button>
                </div>
            </div>

            <div className={styles.iBox}>
                <img className={styles.fimage} src={picUrl1} ></img>
                <img className={styles.fimage} src={picUrl2} ></img>
                <img className={styles.fimage} src={picUrl3} ></img>
            </div>
        </div>
    )

}
export default CelebBox;