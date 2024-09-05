import styles from "./comfeed.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import CommunityInfo from '../../detail/CommunityInfo';
import FeedPopup from './FeedPopup';

function ComFeed({ postId, feedUrl,content, displayName, profilePictureUrl, goDir }) {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFeedPopupOpen, setIsFeedPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        console.log("Closing CommunityInfo popup");
        setIsPopupOpen(false);
    };

    const openFeedPopup = () => {
        setIsFeedPopupOpen(true);
    };

    const closeFeedPopup = () => {
        console.log("Closing FeedPopup");
        setIsFeedPopupOpen(false);
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className={styles.comCompleteFeed}>
                <div className={styles.comProfile} onClick={openFeedPopup}>
                    {profilePictureUrl ? (
                        <img className={styles.comProfileImage} src={profilePictureUrl} alt="Profile" />
                    ) : (
                        <img className={styles.comProfileImage} src={`img/profile.png`} alt="Profile" />
                    )}
                    <p className={styles.comProfileName} id={styles.name}>{displayName}</p>
                </div>

                {isFeedPopupOpen && <FeedPopup onClose={closeFeedPopup} />}

                <div className={styles.comFeedMain}>
                    <div className={styles.imageWrapper} onClick={goDir === "navigateToHomeInfo" ? () => navigateTo("/HomeInfo") : openPopup}>
                        <img src={feedUrl} alt="Feed" />
                    </div>
                </div>
                {isPopupOpen && <CommunityInfo onClose={closePopup} feedUrl={feedUrl} postId={postId} profilePictureUrl={profilePictureUrl} displayName={displayName} />}
            </div>

            <div className={styles.writeBox}>
                <span className={styles.writeId} id="writerId"><b>{displayName}</b></span>
                <div className={styles.writeTotal}>
                    <span className={styles.writeContent} id="writeContent">{content}&nbsp;</span>
                    {/* <span className={styles.tag} id="tag">@noodle.zip</span> */}
                </div>
            </div>
        </div>
    );
}

export default ComFeed;
