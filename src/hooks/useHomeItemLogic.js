import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export const useHomeItemLogic = () => {
    const location = useLocation();
    const { mediaUrls, feedUrl, media_id, username, profile_url, similarImages: initialSimilarImages } = location.state || {};
    const [items, setItems] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(0);
    const itemsPerPage = 4;
    const navigate = useNavigate();
    const [similarImages, setSimilarImages] = useState(initialSimilarImages || []);

    const [startIndex, setStartIndex] = useState(0);
    const thumbnailsToShow = 4;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const thumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const nextBtn = () => {
        if (startIndex + thumbnailsToShow < mediaUrls.length - 1) {
            setStartIndex((prevIndex) => prevIndex + 1);
        }
    };

    const morePage = () => {
        setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerPage);
    };

    useEffect(() => {
        const fetchItemData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const itemDataPromises = initialSimilarImages.map(async (item) => {
                    const id = item[0];
                    const response = await axios.get(`/api/item/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
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
        feedUrl,
        media_id,
        username,
        profile_url,
        currentImageIndex,
        isPopupOpen,
        items,
        itemsToShow,
        startIndex,
        openPopup,
        closePopup,
        thumbnailClick,
        nextBtn,
        morePage,
    };
};
