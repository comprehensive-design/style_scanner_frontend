import styles from "./UsersList.module.css";
import Button from '../../../../Components/Button';
import axios from 'axios';
import {useEffect, useState} from 'react';
import FeedPopup from "../../../../Components/FeedPopup";

export default function UsersList({ list }) {
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
 
    const formatFollowerCount = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count;
        }
    };

    const handleUnfollow = (followeeId) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.post('/api/follow/unfollowing', { followeeId }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log('Unfollowed successfully');
                window.location.reload(); // 페이지 새로고침
            })
            .catch(error => {
                console.error('Error while unfollowing:', error);
            });
    };

    return (
        <div className={styles.usersListContainer}>
            <div style={{ height: '10px' }}></div>
            {list.map((user, index) => (
                <div key={user.profileName}> {/* 고유한 key prop 추가 */}
                    <div className={styles.userInfo} >
                        <img
                            id={styles.profileImage}
                            src={user.profilePictureUrl}
                            width={120}
                            height={120}
                            alt={`${user.profileName}의 프로필 사진`}
                        />
                        <div className={styles.userInfoWord} onClick={() => openPopup(user)}>
                            <h4 className={styles.FollowigId}>{user.profileName}</h4>
                            <div style={{ display: "flex" }} className={styles.userFollowerInfo}>
                                <p id={styles.FollowerWord}>팔로워</p>
                                <p id={styles.FollowerCountWord}>&nbsp;{formatFollowerCount(user.profileFollowerCount)}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }} className={styles.FollowingDelete}>
                            <Button id={styles.buttonDelete} $BackColor="#d9d9d9" $txtColor="black" $hovColor="black" $hovTxtColor="white" onClick={() => handleUnfollow(user.profileName)}>언팔로우</Button>
                        </div>
                    </div>
                    {index < list.length - 1 && <HorizonLine key={`hline-${user.profileName}`}/>} {/* 고유한 key prop 추가 */}
                    <div style={{ height: '10px' }}></div>
                </div>
            ))}
            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup}/>
            )}
        </div>
    );
}

const HorizonLine = () => {
    return (
        <div
            style={{
                width: "100%",
                borderBottom: "2px solid #DEDEDE",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        />
    );
};
