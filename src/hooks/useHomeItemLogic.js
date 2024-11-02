import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { fetchProxyImages } from '../utils/ConvertProxyImage'

export const useHomeItemLogic = () => {
    const location = useLocation();
    const { mediaUrls, feedCodes, username, profile_url } = location.state || {};
    
    // 필요한 상태 정의
    const [proxyImageUrls, setProxyImageUrls] = useState(mediaUrls || []);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [itemLoading, setItemLoading] = useState(true);
    const [item, setItem] = useState(null); 

    // 썸네일 이미지 변환
    useEffect(() => {
        const loadImages = async () => {
            if (mediaUrls && mediaUrls.length > 0) {
                try {
                    const urls = await fetchProxyImages(mediaUrls);
                    setProxyImageUrls(urls);
                    setImagesLoaded(true);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        loadImages();
    }, [mediaUrls]);

    return {
        mediaUrls,
        proxyImageUrls,
        imagesLoaded,
        feedCodes,
        username,
        profile_url,
        itemLoading,
        setItemLoading,
        item,        
        setItem 
    };
};
