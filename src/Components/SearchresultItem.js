import React, { useState, useEffect } from 'react';
import { fetchProxyImages } from '../utils/ConvertProxyImage';

function SearchresultItem({ user }) {
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

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

    return (
        <li className='body flex'>
            {imagesLoaded ? (
                <img src={proxyImageUrls[0]} className='searchProfileImg'/>
            ) : (
                <p>Loading...</p> // 로딩 중 표시
            )}
            <p>{user.profileName}</p>
        </li>
    );
}

export default SearchresultItem;
