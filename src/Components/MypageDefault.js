import MypageDefaultForm from "./MypageDefaultForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function MypageDefault() {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
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
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    })


    return (
        <MypageDefaultForm
            displayName={displayName}
            bio={bio}
            profilePictureUrl={profilePictureUrl}

        />
    );
}