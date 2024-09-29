import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import 추가
import { useNavigate } from 'react-router-dom';

function SearchresultItem({ user, onClick }) { // onClick prop 추가
    const [proxyImageUrl, setProxyImageUrl] = useState(''); // 단일 이미지 URL로 변경
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadImage = async () => {
            if (user.profilePictureUrl) {
                try {
                    const cleanUrl = user.profilePictureUrl.replace(/^\[|\]$/g, ''); // 대괄호 제거
                    const response = await axios.get('/api/insta/proxyImage', {
                        params: { imageUrl: cleanUrl },
                        responseType: 'blob',
                    });
                    const url = URL.createObjectURL(response.data);
                    setProxyImageUrl(url);
                    setImagesLoaded(true);
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            }
        };
        loadImage();
    }, [user.profilePictureUrl]);

    const handleClick = () => {
        onClick(user); // 부모의 onClick 호출
        navigate('/search', { state: { results: user } });
        console.log(user);
    };

    return (
        <li className='' onClick={handleClick} style={{ zIndex: "99999" }}>
            {imagesLoaded ? (
                <img src={proxyImageUrl} className='searchProfileImg' />
            ) : (
                <p>로딩 중...</p>
            )}
            <p>{user.profileName}</p>
        </li>
    );
}

export default SearchresultItem;
