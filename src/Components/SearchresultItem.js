import React, { useState, useEffect } from 'react';
import { fetchProxyImages } from '../utils/ConvertProxyImage';
import { useNavigate } from 'react-router-dom';

function SearchresultItem({ user, onClick }) { // onClick prop 추가
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadImages = async () => {
            if (user.profilePictureUrl) {
                try {
                    const urls = await fetchProxyImages([user.profilePictureUrl]);
                    setProxyImageUrls(urls);
                    setImagesLoaded(true);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        loadImages();
    }, [user.profilePictureUrl]);

    const handleClick = () => {
        onClick(user); // 부모의 onClick 호출
        navigate('/search', { state: { results: user } });
    };

    return (
        <li className='' onClick={handleClick} style={{zIndex : "99999"}}>
            {imagesLoaded ? (
                <img src={proxyImageUrls[0]} className='searchProfileImg' />
            ) : (
                <p>로딩 중...</p>
            )}
            <p>{user.profileName}</p>
        </li>
    );
}

export default SearchresultItem;
