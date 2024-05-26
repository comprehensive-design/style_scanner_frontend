import CelebRecommendForm from "./CelebRecommendForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CelebRecommend() {

    const [celebs, setCelebs] = useState([]);


    const imgUrls = celebs.map(following => following.prifileImgUrl);
    const displayNames = celebs.map(following => following.displayName);
    const followers = celebs.map(following => following.followers);
    const picUrl1s = celebs.map(following => following.picUrl1);
    const picUrl2s = celebs.map(following => following.picUrl2);
    const picUrl3s = celebs.map(following => following.picUrl3);


    // get
    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     if (!accessToken) {
    //         console.error('Access token is missing');
    //         return;
    //     }

    //     axios.get("/api/", {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //         .then((response) => {
    //             const { celeb_list } = response.data;
    //             setCelebs(celeb_list.slice(0, 6));
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    //post
    // const handleFollow = (index) => {
    //     const celebToFollow = celebs[index];
    //     // 팔로우할 celeb에 대한 API 호출
    //     axios.post("/api/follow", celebToFollow)
    //         .then((response) => {
    //             // 성공 시 필요한 작업 수행
    //             console.log('Successfully followed:', celebToFollow);
    //         })
    //         .catch((error) => {
    //             console.error('Error following celeb:', error);
    //         });
    // };

    return (
        <CelebRecommendForm>
            imgUrls={imgUrls}
            displayNames={displayNames}
            followers={followers}
            picUrl1s={picUrl1s}
            picUrl2s={picUrl2s}
            picUrl3s={picUrl3s}
            {/* onSave={handleFollow} */}
        </CelebRecommendForm>
    );

}