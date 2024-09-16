import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import Channel from './channel/channel';
import Button from '../../Components/Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/Footer';
import FeedPopup from '../../Components/FeedPopup';

export default function Search() {
    const location = useLocation();
    const searchResults = location.state?.results;
    const [isFollowing, setIsFollowing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const followeeId = searchResults?.profileName;
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [celebs, setCelebs] = useState([]);
    const [userDatas, setUserDatas] = useState(null);

    console.log("searchResults : ", searchResults);

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

    // JSON 서버에 searchResults를 중복 확인 후 POST하는 useEffect
    useEffect(() => {
        if (searchResults && typeof searchResults === 'object') {
            // JSON 서버에서 profileName 중복 확인
            axios.get(`http://localhost:3000/searchUsers?profileName=${searchResults.profileName}`)
                .then(response => {
                    if (response.data.length === 0) {
                        // 데이터가 없으면 POST 요청
                        axios.post('http://localhost:3000/searchUsers', searchResults)
                            .then(postResponse => {
                                console.log('Search results posted to JSON server:', postResponse.data);
                            })
                            .catch(postError => {
                                console.error('Error posting search results:', postError);
                            });
                    } else {
                        console.log('Profile already exists in JSON server:', searchResults.profileName);
                    }
                })
                .catch(error => {
                    console.error('Error checking profile existence:', error);
                });
        }
    }, [searchResults]);

    useEffect(() => {
        axios.get(`/api/follow/ranking`)
            .then(response => {
                console.log('Ranking data:', response.data);
                if (response.data) {
                    setCelebs(response.data);
                }
            })
            .catch(error => {
                console.error('Error while fetching ranking data:', error);
            });

        if (searchResults && searchResults.profileName) {
            checkFollowingStatus();
        }
    }, [searchResults]);

    // 검색 결과가 없는 경우 조기 반환
    if (!searchResults || typeof searchResults !== 'object') {
        return <p>No results found</p>;
    }

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
