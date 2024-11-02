import CelebRecommendForm from "./CelebRecommendForm";
import React, { useState, useEffect } from 'react';
import Loading from "../../Components/loading/loading";
import api from "../../api/axios.jsx";

export default function CelebRecommend() {
    const [displayName, setDisplayName] = useState('');
    const [celebs, setCelebs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollow, setIsFollow] = useState([]);
    const [celebsWithProxiedImages, setCelebsWithProxiedImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const userResponse = await api.get("/api/user/me");
                setDisplayName(userResponse.data.displayName);

                const celebsResponse = await api.get("/api/follow/recommend");
                setCelebs(celebsResponse.data.slice(0, 6));
                const length = celebsResponse.data.length;
                setIsFollow(Array(length).fill(false));

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
    }, []);

    const proxyImage = async (imageUrl) => {
        try {
            const proxyResponse = await api.get("/api/insta/proxyImage", {
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

        api.post('/api/follow/following', { followeeId })
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

        api.post('/api/follow/unfollowing', { followeeId }).then(response => {
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
