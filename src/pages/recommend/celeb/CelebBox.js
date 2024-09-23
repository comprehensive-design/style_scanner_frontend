import React, { Component } from 'react';
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
        <div>
            <div className="crFirstLine mb1">
                <div className='flex'>
                    <img src={prifileImgUrl}></img>
                    <div>
                        <div className="boldContent" onClick={() => openPopup(user)}  >@{displayName}</div>
                        <div className="caption">{follower} follower</div>
                    </div>
                </div>
                {
                    isFollow
                        ? <button className="button" onClick={() => unfollow()}>팔로잉</button>
                        : <button className="button" onClick={() => follow()}>팔로우</button>
                }
            </div>

            <div className="crSecondLine">
                <img src={picUrl1} ></img>
                <img src={picUrl2} ></img>
                <img src={picUrl3} ></img>
            </div>
            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    )

}
export default CelebBox;