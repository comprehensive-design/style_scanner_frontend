import React, { useEffect, useState } from 'react';
import styles from '../css/Search.module.css';
import Channel from '../Components/channel';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import FeedPopup from './FeedPopup';

export default function Search() {
    const location = useLocation();
    const searchResults = location.state?.results;
    const [isFollowing, setIsFollowing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const followeeId = searchResults?.profileName;
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [celebs, setCelebs] = useState([]);

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
                setIsFollowing(true);
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
                setIsFollowing(false);
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

        if (searchResults && searchResults.profileName) {
            axios.get(`/api/follow/checkFollowing?keyword=${searchResults.profileName}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setIsFollowing(response.data.isFollowing);
                })
                .catch(error => {
                    console.error('Error while checking follow status:', error);
                });
        }
    };

    useEffect(() => {
        axios.get(`/api/follow/ranking`)
            .then(response => {
                console.log('Ranking data:', response.data); // 추가된 콘솔 로그
                if (response.data) {
                    setCelebs(response.data); // 프로필 데이터 설정
                }
            })
            .catch(error => {
                console.error('Error while fetching ranking data:', error);
            });

        if (searchResults && searchResults.profileName) {
            checkFollowingStatus();
        }
    }, [searchResults]);

    useEffect(() => {
        console.log('Celebs updated:', celebs); // 추가된 콘솔 로그
    }, [celebs]);

    if (!searchResults || typeof searchResults !== 'object') {
        return <p>No results found</p>;
    }

    console.log('Celebs:', celebs); // 추가된 콘솔 로그

    return (
        <div>
            <div className={styles.profileBox}>
                <div style={{ display: 'flex' }}>
                    <p id={styles.Searchtotal}>검색 결과</p>
                </div>

                <div className={styles.SearchUserRes} style={{ display: 'flex' }} onClick={() => openPopup(searchResults)}>
                    <div className={styles.SearchprofileImg} >
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
                                <Button id={styles.buttonDelete} $BackColor="#d9d9d9" $txtColor="black" $hovColor="black" $hovTxtColor="white" onClick={handleUnfollow}>언팔로우</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.SearchRelRes}>
                    <p className={styles.RelResWord}>Top Followee</p>
                    <p className={styles.grayP}>인기 셀럽</p>

                    <div className={styles.SearchRelChannel}>
                        <div className={styles.channelCover}>
                            <Channel list={celebs} />
                            <div className={styles.paddingWidth}></div>
                        </div>
                    </div>
                    <div className={styles.paddingHeight}></div>
                </div>
            </div>
            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
            <Footer />
        </div>
    );
}
