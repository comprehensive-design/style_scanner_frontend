import React, { Component } from 'react';
import styles from './CelebBox.module.css';
import Button from '../../../Components/Button';
import { useEffect, useState } from 'react';
import FeedPopup from "../../../Components/FeedPopup";

function CelebBox({ isFollow, prifileImgUrl = "/img/whiteBox.png", displayName, follower, picUrl1 = "/img/whiteBox.png", picUrl2 = "/img/whiteBox.png", picUrl3 = "/img/whiteBox.png", follow, unfollow }) {

    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const openPopup = (user) => {
        setSelectedUser(user);
        setPopupVisible(true);
    }

    const closePopup = () => {
        setSelectedUser(null);
        setPopupVisible(false);
    }

    const user = {
        profileName: displayName // 원하는 프로필 이름으로 설정
    };

    return (
        <div className={styles.box}>
            <div className={styles.pBox}>
                <img className={styles.profileImg} src={prifileImgUrl} ></img>
                <div className={styles.mPart}>
                    <div className={styles.uText} onClick={() => openPopup(user)}  >@{displayName}</div>
                    <div className={styles.fText}>{follower} follower</div>
                </div>
                <div className={styles.btn}>
                    {
                        isFollow
                            ? <Button $borderRad='20px' $BackColor='#d9d9d9' $txtColor='black' $hovColor='black' $hovTxtColor='white' onClick={() => unfollow()}>팔로잉</Button>
                            : <Button $borderRad='20px' onClick={() => follow()}>팔로우</Button>
                    }
                </div>
            </div>

            <div className={styles.iBox}>
                <img className={styles.fimage} src={picUrl1} ></img>
                <img className={styles.fimage} src={picUrl2} ></img>
                <img className={styles.fimage} src={picUrl3} ></img>
            </div>
            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    )

}
export default CelebBox;