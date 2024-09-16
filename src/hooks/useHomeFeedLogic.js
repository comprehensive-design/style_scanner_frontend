import { useState, useEffect, useRef } from 'react';
import api from '../utils/axios';
import {fetchProxyImages} from '../utils/ConvertProxyImage'

const useHomeFeedLogic = (page, size) => { 
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedListRef = useRef();

    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [proxyProfileImageUrl, setProxyProfileImageUrl] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/api/insta/home?page=${page}&size=${size}`);
                setFeeds(response.data);
                setLoading(false);
            } catch (error) {
                setError('포스트를 가져오는 중 에러 발생');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, size]);

    useEffect(() => {
        const loadImages = async () => {
            if (feeds.length > 0) {
                try {
                    const thumbnailUrls = feeds.map(feed => feed.thumbnail_url);
                    const profileUrls = feeds.map(feed => feed.profile_url);

                    const urls = await fetchProxyImages(thumbnailUrls);
                    const pUrls= await fetchProxyImages(profileUrls);
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
        imagesLoaded
    };
};

export default useHomeFeedLogic;
