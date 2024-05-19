import React, { useState, useEffect } from 'react';
import styles from '../css/FeedPopup.module.css';
import axios from "axios";
import Button from './Button';
import UserFeed from './UserFeed';

export default function FeedPopup({ onClose, children }) {
    const [feeds, setFeeds] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [follows, setFollows] = useState(0);
    const [totalFeeds, setTotalFeeds] = useState(0);


    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        // axios.get(" http://54.180.208.255:9000/swagger-ui/index.html")
            .then((response) => {
                setFeeds(response.data);
                setTotalFeeds(response.data.length);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);


    return (
        <div className={styles.totalWrap}>
            <div className={styles.popupContent}>
                <div className={styles.closeButtonDiv}>
                    <button className={styles.closeButton} onClick={onClose}>X</button>
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.userProfileImgDiv}>
                        <img
                            src='https://via.placeholder.com/200x200/808080/FFFFFF/?text=Grey+Image'
                            className={styles.userProfileImg}
                        />
                    </div>

                    <div className={styles.userInfoWord}>
                        <div className={styles.userFollow}>
                            <p className={styles.userId}>hi_sseulgi</p>
                            <div className={styles.FollowButton}>
                                <Button>팔로우</Button>
                            </div>
                        </div>

                        <div className={styles.followsInfo}>
                            <p>게시물</p>
                            <p>{totalFeeds}</p>

                            <p className={styles.followsInfoWord}>팔로워</p>
                            <p>{followers}</p>

                            <p className={styles.followsInfoWord}>팔로우</p>
                            <p>{follows}</p>
                        </div>

                        <div>
                            <p className={styles.userbio}>Love loves to love love</p>
                        </div>
                    </div>
                </div>
                <HorizonLine></HorizonLine>

                <div className={styles.feedGrid}>
                    {feeds.map(feed => (
                        <UserFeed key={feed.id} feed={feed} />
                    ))}
                </div>
            </div>
        </div>
    )
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
        >
        </div>
    );
};
