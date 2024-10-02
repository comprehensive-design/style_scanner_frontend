import { useEffect, useRef, useState } from 'react';
import api from '../api/axios';
import { fetchProxyImages } from '../utils/ConvertProxyImage';
import FeedStore from '../stores/FeedStore'; 

const useFeed = (page, size) => {
    const feedListRef = useRef();
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const [proxyProfileImageUrl, setProxyProfileImageUrl] = useState([]);

    const {
        feeds,        
        totalCount,  
        setFeeds,
        setTotalCount,
    } = FeedStore();

    const [error, setError] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const fetchFeeds = async () => {
        try {
            const response = await api.get(`/api/insta/home?page=${page}&size=${size}`);
            const newFeeds = response.data.homeFeedList;

            if (JSON.stringify(newFeeds) !== JSON.stringify(feeds)) {
                setFeeds(newFeeds);
                setTotalCount(response.data.total_count);
                console.log('피드 업데이트됨');
            } else {
                console.log('피드가 동일하여 업데이트하지 않음');
            }
        } catch (error) {
            setError('포스트를 가져오는 중 에러 발생');
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
            setImagesLoaded(false);
            if (feeds.length > 0) {
                try {
                    const thumbnailUrls = feeds.map(feed => feed.thumbnail_url);
                    const profileUrls = feeds.map(feed => feed.profile_url);

                    const urls = await fetchProxyImages(thumbnailUrls);
                    const pUrls = await fetchProxyImages(profileUrls);

                    setProxyImageUrls(urls);
                    setProxyProfileImageUrl(pUrls);
                    console.log(pUrls)
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
        error,
        feedListRef,
        proxyImageUrls,
        proxyProfileImageUrl,
        imagesLoaded,
        totalCount
    };
};

export default useFeed;
