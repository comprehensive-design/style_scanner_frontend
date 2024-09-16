import axios from 'axios';
import { useEffect, useState } from 'react';
import FeedPopup from "../../../Components/FeedPopup";

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
        <div>
            <div style={{ height: '10px' }}></div>
            {list.map((user, index) => (
                <div key={user.profileName}> {/* 고유한 key prop 추가 */}
                    <div className="mpdprofileBox gridColumns3 mb1" style={{cursor:"pointer"}} onClick={() => openPopup(user)}>
                        <img src={user.profilePictureUrl}></img>
                        <div>
                            <p className="content mb05">@{user.profileName}</p>
                            <p id='followNum' className="caption">팔로워 {user.profileFollowerCount.toLocaleString()}</p>
                        </div>
                        <div>
                            <button className="whiteButton" onClick={() => handleUnfollow(user.profileName)}>삭제</button>
                        </div>
                    </div>
                </div>
            ))}
            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    );
} 
