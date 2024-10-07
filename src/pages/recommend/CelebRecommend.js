import CelebRecommendForm from "./CelebRecommendForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from "../../Components/loading/loading";

export default function CelebRecommend() {
    const [displayName, setDisplayName] = useState('');
    const [celebs, setCelebs] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);
    const [isFollow, setIsFollow] = useState([]);
    const [celebsWithProxiedImages, setCelebsWithProxiedImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) {
                console.error('Access token is missing');
                return;
            }

            try {
                const userResponse = await axios.get("/api/user/me", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setDisplayName(userResponse.data.displayName);

                const celebsResponse = await axios.get("/api/follow/recommend", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setCelebs(celebsResponse.data.slice(0, 6));
                const length = celebsResponse.data.length;
                setIsFollow(Array(length).fill(false));

                // celebsWithProxiedImages를 여기서 처리
                const proxiedCelebs = await Promise.all(
                    celebsResponse.data.slice(0, 6).map(async (celeb) => {
                        celeb.profilePictureUrl = await proxyImage(celeb.profilePictureUrl);
                        celeb.feed_3_list[0] = await proxyImage(celeb.feed_3_list[0]);
                        celeb.feed_3_list[1] = await proxyImage(celeb.feed_3_list[1]);
                        celeb.feed_3_list[2] = await proxyImage(celeb.feed_3_list[2]);
                        return celeb;
                    })
                );
                setCelebsWithProxiedImages(proxiedCelebs);
                setLoading(false);
            } catch (error) {
                alert(error.response.data.message);
            }
        };

        fetchData();
    }, [accessToken]);

    const proxyImage = async (imageUrl) => {
        try {
            const proxyResponse = await axios.get("/api/insta/proxyImage", {
                params: { imageUrl },
                responseType: "blob",
            });
            return URL.createObjectURL(proxyResponse.data);
        } catch (error) {
            console.error("Error proxying image:", error);
            return imageUrl;
        }
    };

    const imgUrls = celebsWithProxiedImages.map(celeb => celeb.profilePictureUrl);
    const displayNames = celebsWithProxiedImages.map(celeb => celeb.profileName);
    const formatFollowerCount = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count;
        }
    };
    const followers = celebsWithProxiedImages.map(celeb => formatFollowerCount(celeb.profileFollowerCount));
    const picUrl1s = celebsWithProxiedImages.map(celeb => celeb.feed_3_list[0]);
    const picUrl2s = celebsWithProxiedImages.map(celeb => celeb.feed_3_list[1]);
    const picUrl3s = celebsWithProxiedImages.map(celeb => celeb.feed_3_list[2]);

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
            console.error('Error while unfollowing:', error);
        });
    };

    if (loading) {
        return <Loading />;
    }
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
