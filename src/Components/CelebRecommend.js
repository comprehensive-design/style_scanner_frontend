import CelebRecommendForm from "./CelebRecommendForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CelebRecommend() {

    const [displayName, setDisplayName] = useState('');
    const [celebs, setCelebs] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState([]);

    useEffect(() => {
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }
        axios.get("/api/user/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setDisplayName(response.data.displayName);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });


        axios.get("/api/follow/recommend", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setCelebs(response.data.slice(0, 6));
                const length = response.data.length;
                setIsFollow(Array(length).fill(false));
                setLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const imgUrls = celebs.map(celeb => celeb.profilePictureUrl);
    const displayNames = celebs.map(celeb => celeb.profileName);
    const formatFollowerCount = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count;
        }
    };
    const followers = celebs.map(celeb => formatFollowerCount(celeb.profileFollowerCount));
    const picUrl1s = celebs.map(celeb => celeb.feed_3_list[0]);
    const picUrl2s = celebs.map(celeb => celeb.feed_3_list[1]);
    const picUrl3s = celebs.map(celeb => celeb.feed_3_list[2]);

    const handleFollow = (index) => {
        const followeeId = celebs[index].profileName;
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
                const newIsFollow = [...isFollow];
                newIsFollow[index] = true;
                setIsFollow(newIsFollow);
            })
            .catch(error => {
                console.error('Error while following:', error);
            });
    };

    const handleUnfollow = (index) => {
        const followeeId = celebs[index].profileName;

        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.post('/api/follow/unfollowing', { followeeId }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => {
                const newIsFollow = [...isFollow];
                newIsFollow[index] = false;
                setIsFollow(newIsFollow);
            }).catch(error => {
                // Handle error
                console.error('Error while unfollowing:', error);
            });
    };

    if (loading) {
        return (
            <CelebRecommendForm
                name={displayName}
                imgUrls={imgUrls}
                displayNames={displayNames}
                followers={followers}
                picUrl1s={picUrl1s}
                picUrl2s={picUrl2s}
                picUrl3s={picUrl3s}
                isFollow={isFollow}

                follow={handleFollow}
                unfollow={handleUnfollow}
            />
        );
    }
}