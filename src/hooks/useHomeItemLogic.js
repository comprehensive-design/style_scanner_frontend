import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import api from '../utils/axios';
import { fetchProxyImages } from '../utils/ConvertProxyImage'

export const useHomeItemLogic = () => {
    const location = useLocation();
    const { mediaUrls, feed_code, username, profile_url, similarImages: initialSimilarImages } = location.state || {};
    const [items, setItems] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(0);
    const itemsPerPage = 4;
    const navigate = useNavigate();
    const [similarImages, setSimilarImages] = useState(initialSimilarImages || []);

    const [proxyImageUrls, setProxyImageUrls] = useState(mediaUrls || []);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 썸네일 이미지 변환
    useEffect(() => {
        const loadImages = async () => {
            if (mediaUrls.length > 0) {
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
                const itemDataPromises = initialSimilarImages.map(async (item) => {
                    const id = item[0];
                    const response = await api.get(`/api/item/${id}`);
                    return { ...response.data, image: item[0] };
                });

                const itemData = await Promise.all(itemDataPromises);
                setItems(itemData);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (initialSimilarImages) {
            fetchItemData();
        }
    }, [initialSimilarImages]);


    return {
        mediaUrls,
        proxyImageUrls,
        imagesLoaded,
        feed_code,
        username,
        profile_url,
        items,
        itemsToShow
    };
};
