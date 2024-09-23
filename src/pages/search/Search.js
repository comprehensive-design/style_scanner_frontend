import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import Button from '../../Components/Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FeedPopup from '../../Components/FeedPopup';
import Feed from '../../Components/feed/Feed';
import { fetchProxyImages } from '../../utils/ConvertProxyImage';

export default function Search() {
    const location = useLocation();
    const searchResults = location.state?.results;
    const [isFollowing, setIsFollowing] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const followeeId = searchResults?.profileName;
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const [celebs, setCelebs] = useState([]);
    const [proxyImageUrls, setProxyImageUrls] = useState({
        thumbnails: [],
        profiles: []
    });
    const loadImages = async () => {
        try {
            const thumbnailUrls = await fetchProxyImages(celebs.map(celeb => celeb.feed_url));
            const profileUrls = await fetchProxyImages(celebs.map(celeb => celeb.profilePictureUrl));
    
            setProxyImageUrls({
                thumbnails: thumbnailUrls,
                profiles: profileUrls
            });
            setImagesLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };
    
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

    useEffect(() => {
        if (searchResults && typeof searchResults === 'object') {
            axios.get(`http://localhost:5000/searchUsers?profileName=${searchResults.profileName}`)
                .then(response => {
                    if (response.data.length === 0) {
                        axios.post('http://localhost:5000/searchUsers', searchResults)
                            .then(postResponse => {
                                // console.log('Search results posted to JSON server:', postResponse.data);
                            })
                            .catch(postError => {
                                // console.error('Error posting search results:', postError);
                            });
                    } else {
                        // console.log('Profile already exists in JSON server:', searchResults.profileName);
                    }
                })
                .catch(error => {
                    // console.error('Error checking profile existence:', error);
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
                // console.error('Error while fetching ranking data:', error);
            });

        if (searchResults && searchResults.profileName) {
            checkFollowingStatus();
        }
    }, [searchResults]);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const thumbnailUrls = await fetchProxyImages(celebs.map(celeb => celeb.feed_url));
                const profileUrls = await fetchProxyImages(celebs.map(celeb => celeb.profilePictureUrl));
    
                if (thumbnailUrls.length === celebs.length && profileUrls.length === celebs.length) {
                    setProxyImageUrls({
                        thumbnails: thumbnailUrls,
                        profiles: profileUrls
                    });
                    setImagesLoaded(true);
                } else {
                    console.error("Image loading error: Length mismatch between celebs and image URLs");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        if (celebs.length > 0) {
            loadImages();
        }
    }, [celebs]);
    


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
                                <Button id={styles.buttonDelete} $BackColor="#d9d9d9" $txtColor="black" $hovColor="black" $hovTxtColor="white" onClick={handleUnfollow}>언팔로우</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.SearchRelRes}>
                    <p className={styles.RelResWord}>Top Followee</p>
                    <p className={styles.grayP}>인기 셀럽</p>

                    <div className={styles.SearchRelChannel}>
                        <div style={{ display: 'flex' }}>
                            {imagesLoaded ? (
                                celebs.map((celeb, index) => (
                                    <Feed
                                        key={index}
                                        thumbnail_url={proxyImageUrls.thumbnails[index]}
                                        profile_url={proxyImageUrls.profiles[index]}
                                        username={celeb.profileName}
                                        width="13rem"
                                        height="16rem"
                                    />
                                ))
                            ) : (
                                <p>로딩 중...</p>
                            )}
                            <div className={styles.paddingWidth}></div>
                        </div>
                    </div>
                    <div className={styles.paddingHeight}></div>
                </div>
            </div>

            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    );
}
