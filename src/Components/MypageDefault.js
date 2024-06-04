import MypageDefaultForm from "./MypageDefaultForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function MypageDefault() {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [totalFollowings, setTotalFollowings] = useState(0);

    const [followings, setFollowings] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
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
                setBio(response.data.bio);
                setProfilePictureUrl(response.data.profilePictureUrl);
                if (response.data.profilePictureUrl == null)
                    setProfilePictureUrl("/img/profile.png");
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios.get("/api/follow/followingList", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                const { following_list } = response.data;
                setTotalFollowings(following_list.length);
                setFollowings(following_list.slice(0, 5));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


        axios.get("/api/itemLike/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                setLikes(response.data.slice(0, 2));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const followingURLs = followings.map(following => following.profilePictureUrl);
    const followingIDs = followings.map(following => following.profileName);


    // Back 다 되면 해야함 followings, request
    const likeURLs = likes.map(like => like.itemUrl);
    // const brandNames = likes.map(like => like.brandName);
    const itemNames = likes.map(like => like.name);
    // const itemOptions = likes.map(like => like.itemOption);
    const itemPrices = likes.map(like => like.price);
    const likeCounts = likes.map(like => like.likeCount);

    return (
        <MypageDefaultForm
            displayName={displayName}
            bio={bio}
            profilePictureUrl={profilePictureUrl}


            followingNum={totalFollowings}
            followingURLs={followingURLs}
            followingIDs={followingIDs}

            // Back 다 되면 해야함
            imgUrls={likeURLs}
            // brandNames={brandNames}
            brandNames={"dkdkdk"}
            itemNames={itemNames}
            // itemOptions={itemOptions}
            itemOptions={"black"}
            itemPrices={itemPrices}
            likeCounts={likeCounts}

        />
    );
}
