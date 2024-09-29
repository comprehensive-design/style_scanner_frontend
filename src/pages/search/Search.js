import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FeedPopup from '../../Components/FeedPopup';
import Feed from '../../Components/feed/Feed';

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
        profiles: [],
        profileImage: ''
    });

    const loadImages = async (imageUrls) => {
        try {
            const urls = await Promise.all(
                imageUrls.map(async (imageUrl) => {
                    const cleanUrl = imageUrl.replace(/^\[|\]$/g, ''); // 대괄호 제거
                    const response = await axios.get("/api/insta/proxyImage", {
                        params: { imageUrl: cleanUrl }, // 수정된 URL 전달
                        responseType: "blob",
                    });
                    // console.log(cleanUrl);
                    return URL.createObjectURL(response.data);
                })
            );
            return urls;
        } catch (error) {
            console.error("Error loading images:", error);
            return [];
        }
    };

    const loadProfileImage = async (imageUrl) => {
        try {
            const cleanUrl = imageUrl.replace(/^\[|\]$/g, ''); // 대괄호 제거
            const encodedUrl = encodeURIComponent(cleanUrl);  // URL 인코딩
            console.log("Clean URL:", cleanUrl);
            console.log("Encoded profile image URL:", encodedUrl);
            const response = await axios.get("/api/insta/proxyImage", {
                params: { imageUrl: encodedUrl }, // 인코딩된 URL 전달
                responseType: "blob",
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error("Error loading profile image:", error);
            return '';
        }
    };
    
    


    useEffect(() => {
        const loadCelebImages = async () => {
            const thumbnailUrls = celebs.map(celeb => celeb.feed_url);
            const profileUrls = celebs.map(celeb => celeb.profilePictureUrl);

            const [thumbnails, profiles] = await Promise.all([
                loadImages(thumbnailUrls),
                loadImages(profileUrls)
            ]);

            // searchResults.profilePictureUrl 그대로 사용
            const profileImage = await loadProfileImage(searchResults.profilePictureUrl);

            setProxyImageUrls({
                thumbnails,
                profiles,
                profileImage // searchResults.profilePictureUrl로 가져온 이미지 사용
            });
            setImagesLoaded(true);
        };

        if (celebs.length > 0) {
            loadCelebImages();
        }
    }, [celebs, searchResults.profilePictureUrl]);


    const openPopup = (user) => {
        if (user && user.profileName) {
            setSelectedUser(user);
            setPopupVisible(true);
        } else {
            console.error('유효하지 않은 사용자 데이터:', user);
        }
    };

    const closePopup = () => {
        setSelectedUser(null);
        setPopupVisible(false);
    };

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
            .then(() => {
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
            .then(() => {
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
                    if (response.data.length > 0) {
                        // 프로필이 있을 경우 기존 사용자 정보를 가져옴
                        const existingUser = response.data[0]; // 첫 번째 사용자 데이터 가져오기
                        
                        // 기존 정보를 유지하면서 profilePictureUrl만 업데이트
                        const updatedUser = {
                            ...existingUser,
                            profilePictureUrl: searchResults.profilePictureUrl,
                        };
    
                        // 업데이트 요청
                        axios.put(`http://localhost:5000/searchUsers/${existingUser.id}`, updatedUser)
                            .then(() => {
                                // Handle put response if needed
                            })
                            .catch(updateError => {
                                console.error('Error updating profilePictureUrl:', updateError);
                            });
                    } else {
                        // 프로필이 없을 경우 새로 생성
                        axios.post('http://localhost:5000/searchUsers', searchResults)
                            .then(() => {
                                // Handle post response if needed
                            })
                            .catch(postError => {
                                console.error('Error posting search results:', postError);
                            });
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
                if (response.data) {
                    setCelebs(response.data.slice(0, 4)); // 결과를 4개로 잘라서 저장
                }
            })
            .catch(error => {
                console.error('Error while fetching ranking data:', error);
            });

        if (searchResults && searchResults.profileName) {
            checkFollowingStatus();
        }
    }, [searchResults]);


    if (!searchResults || typeof searchResults !== 'object') {
        return <p>No results found</p>;
    }

    return (
        <div>
            <div className='profileBox'>
                <div style={{ display: 'flex' }}>
                    <p className='boldSubTitle'>검색 결과</p>
                </div>

                <div className='SearchUserRes' onClick={() => openPopup(searchResults)}>
                    <div className='ml3 SearchprofileImg'>
                        <img
                            src={proxyImageUrls.profileImage}
                            style={{ borderRadius: "50%" }}
                        // alt="Profile"
                        />
                    </div>

                    <div className='ml3'>
                        <p className='left boldContent'>{searchResults.profileName}</p>
                        <p className='left content'>{searchResults.profileBio}</p>
                        <div className='zero flex'>
                            <p className='zero'>팔로워</p>
                            <p className='zero'>&nbsp;{formatFollowerCount(searchResults.profileFollowerCount)}</p>
                        </div>
                    </div>
                    <div className='SearchFollow'>
                        {!isFollowing ? (
                            <div>
                                <Button onClick={handleFollow}>팔로우</Button>
                            </div>
                        ) : (
                            <div>
                                <Button $BackColor="#d9d9d9" $txtColor="black" $hovColor="black" $hovTxtColor="white" onClick={handleUnfollow}>언팔로우</Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className='SearchRelRes'>
                    <p className='left boldSubTitle zero'>Top Followee</p>
                    <p className='left grayText content mt05'>인기 셀럽</p>


                    <div className='SearchRelChannel'>
                        <div className='flex'>
                            {imagesLoaded ? (
                                <div className='flex'>
                                    {celebs.map((celeb, index) => (
                                        <div key={index} style={{ margin: '0 1rem' }}> {/* 좌우 margin 설정 */}
                                            <Feed
                                                thumbnail_url={proxyImageUrls.thumbnails[index]}
                                                profile_url={proxyImageUrls.profiles[index]}
                                                username={celeb.profileName}
                                                width="20rem"
                                                height="25rem"
                                                className="mr1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>로딩 중...</p>
                            )}

                        </div>
                    </div>

                    <div style={{ height: "5rem" }}></div>
                </div>
            </div>

            {popupVisible && selectedUser && (
                <FeedPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    );
}
