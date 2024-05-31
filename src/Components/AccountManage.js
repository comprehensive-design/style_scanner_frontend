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
    const [loading, setLoading] = useState(false);

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
                setEmail(response.data.email);
                setBirthdate(response.data.birthdate);
                setPassword(response.data.password);
                if ((response.data.gender) == 0)
                    setGender("여성");
                else
                    setGender("남성");
                setLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    if(loading){
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
        );}
}
