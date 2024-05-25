import styles from "../css/comfeed.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import CommunityInfo from './CommunityInfo';
import FeedPopup from './FeedPopup';

function ComFeed({ feedUrl, userId, content, displayName, profilePictureUrl, goDir }) {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFeedPopupOpen, setIsFeedPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openFeedPopup = () => {
        setIsFeedPopupOpen(true);
    };

    const closeFeedPopup = () => {
        setIsFeedPopupOpen(false);
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className={styles.comCompleteFeed}>
                {/* Header */}
                <div className={styles.comProfile}>
                    <div className={styles.comProfileBox} onClick={openFeedPopup}>
                        <img id='comProfileImage' src={profilePictureUrl} alt="Profile" />
                    </div>
                    <p className={styles.comProfileName} id='comProfileName' onClick={openFeedPopup}>
                        {displayName}
                    </p>
                    <input type="button" className={styles.comGoButton} value="→" onClick={openPopup} />
                    {isFeedPopupOpen && <FeedPopup onClose={closeFeedPopup} />}
                    {isPopupOpen && <CommunityInfo onClose={closePopup} />}
                </div>

                <div className={styles.comFeedMain}>
                    <div className={styles.imageWrapper} onClick={goDir === "navigateToHomeInfo" ? () => navigateTo("/HomeInfo") : openPopup}>
                        <img src={feedUrl} alt="Feed" />
                    </div>
                </div>
            </div>

            <div className={styles.writeBox}>
                <span className={styles.writeId} id="writerId"><b>useruser2</b></span>
                <div className={styles.writeTotal}>
                    <span className={styles.writeContent} id="writeContent">{content}&nbsp;</span>
                    <span className={styles.tag} id="tag">@noodle.zip</span>
                </div>
            </div>
        </div>
    );
}

export default ComFeed;
