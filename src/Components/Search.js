import styles from '../css/Search.module.css';
import Channel from '../Components/channel';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Search() {
    const location = useLocation();
    const searchResults = location.state?.results;
    const [isFollowing, setIsFollowing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const followeeId = searchResults?.profileName;

    const formatFollowerCount = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count;
        }
    };

    const handleFollow = () => {
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.post('/api/follow/following', { followeeId }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log('Followed successfully');
                setIsFollowing(true); // 팔로우 상태 업데이트

                console.log(isFollowing);
                console.log(response)
            })
            .catch(error => {
                console.error('Error while following:', error);
            });
    };

    const handleUnfollow = () => {
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
                setIsFollowing(false); // 언팔로우 상태 업데이트
                
            })
            .catch(error => {
                console.error('Error while unfollowing:', error);
            });
    };

    const checkFollowingStatus = () => {
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.get(`/api/follow/checkFollowing?keyword=${searchResults.profileName}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log(response.data);
                setIsFollowing(!response.data); // 올바르게 상태 설정
            })
            .catch(error => {
                console.error('Error while checking follow status:', error);
            });
    };

    useEffect(() => {
        if (searchResults && searchResults.profileName) {
            checkFollowingStatus();
        }
    }, [searchResults]);

    if (!searchResults || typeof searchResults !== 'object') {
        return <p>No results found</p>;
    }

    return (
        <div className={styles.profileBox}>
            <div style={{ display: 'flex' }}>
                <p id={styles.Searchtotal}>전체</p>
            </div>

            <div className={styles.SearchUserRes} style={{ display: 'flex' }}>
                <div className={styles.SearchprofileImg}>
                    <img
                        id={styles.SearchUserImg}
                        src={searchResults.profilePictureUrl}
                        alt="Profile"
                    />
                </div>

                <div className={styles.userInfoWord}>
                    <p id={styles.SearchUserid}>{searchResults.profileName}</p>
                    <p id={styles.profileBio}>{searchResults.profileBio}</p>
                    <div style={{ display: 'flex' }} className={styles.userFollowerInfo}>
                        <p id={styles.FollowerWord}>팔로워</p>
                        <p id={styles.FollowerCountWord}>&nbsp;{formatFollowerCount(searchResults.profileFollowerCount)}</p>
                    </div>
                </div>
                <div className={styles.SearchFollow}>
                    {!isFollowing ? (
                        <div className={styles.FollowButton}>
                            <Button onClick={handleFollow}>팔로우</Button>
                        </div>
                    ) : (
                        <div className={styles.FollowButton}>
                            <Button id={styles.buttonDelete} BackColor="#d9d9d9" txtColor="black" hovColor="black" hovTxtColor="white" onClick={handleUnfollow}>언팔로우</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.SearchRelRes}>
                <p className={styles.RelResWord}>연관 검색 결과</p>

                <div className={styles.SearchRelChannel}>
                    <Channel />
                    {/* <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel /> */}
                </div>
                <div className={styles.paddingHeight}></div>

                {/* <div className={styles.SearchRelChannel}>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                    <div className={styles.paddingWidth}></div>
                    <Channel />
                </div> */}
            </div>
        </div>
    );
}
