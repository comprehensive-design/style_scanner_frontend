import CelebRecommendForm from "./CelebRecommendForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CelebRecommend() {

    const [displayName, setDisplayName] = useState('');

    const [celebs, setCelebs] = useState([]);
    const accessToken = localStorage.getItem('accessToken');


    // get
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
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const imgUrls = celebs.map(celeb => celeb.profilePictureUrl);
    const displayNames = celebs.map(celeb => celeb.profileName);
    const followers = celebs.map(celeb => celeb.profileFollowerCount);
    const picUrl1s = celebs.map(celeb => celeb.feed_3_list[0]);
    const picUrl2s = celebs.map(celeb => celeb.feed_3_list[1]);
    const picUrl3s = celebs.map(celeb => celeb.feed_3_list[2]);

    const handleFollow = (index) => {
        const followeeId = celebs[index].profileName;
        console.log(followeeId);
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
            })
            .catch(error => {
                console.error('Error while following:', error);
            });
    };

    
    return (
        <CelebRecommendForm
            name={displayName} 
            imgUrls={imgUrls}
            displayNames={displayNames}
            followers={followers}
            picUrl1s={picUrl1s}
            picUrl2s={picUrl2s}
            picUrl3s={picUrl3s} 
    
           onSave={handleFollow}
            />
    );
}