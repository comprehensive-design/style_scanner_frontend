import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import api from '../api/axios';
import { fetchProxyImages } from '../utils/ConvertProxyImage'

export const useHomeItemLogic = () => {
    const location = useLocation();
    const { mediaUrls, feedCodes, username, profile_url, similarImages: initialSimilarImages } = location.state || {};
    const [items, setItems] = useState([]);
    const [proxyImageUrls, setProxyImageUrls] = useState(mediaUrls || []);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [itemLoading, setItemLoading] = useState(true);
    const [similarImages, setSimilarImages] = useState(initialSimilarImages || []); 

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

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const itemDataPromises = similarImages.map(async (item) => {
                    const id = item[0];
                    const response = await api.get(`/api/item/${id}`);
                    return { ...response.data, image: item[0] };
                });

                const itemData = await Promise.all(itemDataPromises);
                setItems(itemData);
                setItemLoading(false);
            } catch (error) {
                console.error('Error fetching item data:', error);
                setItemLoading(false);
            }
        };

        if (similarImages && similarImages.length > 0) {
            fetchItemData();
        }
    }, [similarImages]);

    return {
        mediaUrls,
        proxyImageUrls,
        imagesLoaded,
        feedCodes,
        username,
        profile_url,
        items,
        itemLoading,
        setSimilarImages
    };
};
