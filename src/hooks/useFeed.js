import { useEffect, useRef, useState } from 'react';
import api from '../api/axios';
import { fetchProxyImages } from '../utils/ConvertProxyImage';
import FeedStore from '../stores/FeedStore'; 

const useFeed = (page, size) => {
    const feedListRef = useRef();
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [proxyProfileImageUrl, setProxyProfileImageUrl] = useState([]);

    // Zustand 상태 가져오기
    const {
        feeds,
        totalCount,
        setFeeds,
        setTotalCount,
    } = FeedStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const fetchFeeds = async () => {
        try {
            if (feeds.length > 0) {
                setLoading(false);
                return;
            }

            const response = await api.get(`/api/insta/home?page=${page}&size=${size}`);
            setFeeds(response.data.homeFeedList);
            setTotalCount(response.data.total_count);
            setLoading(false);
        } catch (error) {
            setError('포스트를 가져오는 중 에러 발생');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, [page]);

    useEffect(() => {
        const loadImages = async () => {
            if (proxyImageUrls.length > 0 && proxyProfileImageUrl.length > 0) {
                setImagesLoaded(true);
                return;
            }

            if (feeds.length > 0) {
                try {
                    const thumbnailUrls = feeds.map(feed => feed.thumbnail_url);
                    const profileUrls = feeds.map(feed => feed.profile_url);

                    const urls = await fetchProxyImages(thumbnailUrls);
                    const pUrls = await fetchProxyImages(profileUrls);

                    setProxyImageUrls(urls);
                    setProxyProfileImageUrl(pUrls);

                    setImagesLoaded(true);
                } catch (error) {
                    console.error('Error loading images:', error);
                }
            }
        };

        loadImages();
    }, [feeds]);

    return {
        feeds,
        loading,
        error,
        feedListRef,
        proxyImageUrls,
        proxyProfileImageUrl,
        imagesLoaded,
        totalCount
    };
};

export default useFeed;
