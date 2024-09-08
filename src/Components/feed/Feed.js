import React from 'react';
import styles from "./Feed.module.css";
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';
import { useFeedLogic } from '../../hooks/useFeedLogic';

function Feed({ media_url_list, profile_url, currentIndex, username, media_id, home }) {
    const feedLogic = useFeedLogic({ media_url_list, profile_url, currentIndex, username, media_id, home });

    return (
        <div className={styles.FeedDiv}>
            <div className={styles.profileDiv} onClick={feedLogic.openPopup}>
                {feedLogic.isPopupOpen && <FeedPopup onClose={feedLogic.closePopup} user={{ profileName: username }} />}
                {profile_url ? (
                    <img className={styles.profileEllipse} src={profile_url} alt="Profile" />
                ) : (
                    <img id={styles.profileEllipseDefault} src={`img/profile.png`} alt="Profile" />
                )}
                <p className={styles.profileUserName}>{username}</p>
            </div>

            <div className={styles.feedMain}>
                <div ref={feedLogic.imageWrapperRef} onClick={feedLogic.handleClick}>
                    <img src={media_url_list[currentIndex]} alt={`Feed ${currentIndex}`} />
                </div>
                <div className={styles.layerDiv}>
                    {media_url_list.length > 1 && home && (
                        <img className={styles.layer} src={`img/layer.png`} alt="layer" />
                    )}
                    {media_url_list.length > 1 && !home && (
                        <NumberLabel currentPage={currentIndex} pageLength={media_url_list.length} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;
