import React, { useState } from 'react';
import styles from "../css/Channel.module.css";

export default function Channel({ list = [] }) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openPopup = (user) => {
        if (user && user.profileName) {
            setSelectedUser(user);
            setPopupVisible(true);
        } else {
            console.error('유효하지 않은 사용자 데이터:', user);
        }
    }

    const closePopup = () => {
        setSelectedUser(null);
        setPopupVisible(false);
    }

    return (
        <div className={styles.channelDiv}>
            {list.length > 0 ? (
                list.map((user, index) => {
                    if (!user || !user.profileName) {
                        return null; // user 또는 profileName이 없으면 무시
                    }

                    const profilePictureUrl = user.profilePictureUrl || "https://via.placeholder.com/240x320/808080/FFFFFF/?text=Grey+Image";
                    const profileImgUrl = user.profilePictureUrl || "https://via.placeholder.com/50x50/808080/FFFFFF/?text=";
                    
                    return (
                        <div key={user.profileName} onClick={() => openPopup(user)} className={styles.profile}>
                            <div>
                                <img
                                    id={styles.channelImg}
                                    src={profilePictureUrl}
                                    alt={user.profileName}
                                />
                            </div>

                            <div className={styles.channelProfile} style={{ display: 'flex' }}>
                                <img
                                    id={styles.channelProfileImg}
                                    src={profileImgUrl}
                                    alt={user.profileName}
                                />

                                <div className={styles.channelProfileWord}>
                                    <p id={styles.channelId}>{user.profileName}</p>
                                </div>
                            </div>
                            {/* <div className={styles.widthPadding}></div> */}
                        </div>
                    );
                })
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}
