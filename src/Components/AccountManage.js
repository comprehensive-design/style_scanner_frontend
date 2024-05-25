import AccountManageForm from "./AccountManageForm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function MypageDefault() {
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');

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
                console.log(profilePictureUrl);
                if(profilePictureUrl=="")
                    setProfilePictureUrl("/img/profile.png");
                    console.log(profilePictureUrl);
                setEmail(response.data.email);
                setBirthdate(response.data.birthdate);
                setPassword(response.data.password);
                setGender(response.data.gender);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <AccountManageForm
            displayName={displayName}
            bio={bio}
            profilePictureUrl={profilePictureUrl}
            email={email}
            birthdate={birthdate}
            gender={gender}
            password={password}
        />
    );
}
