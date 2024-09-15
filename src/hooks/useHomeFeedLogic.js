import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/axios';

const useHomeFeedLogic = (page, size) => { 
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [proxyImageUrls, setProxyImageUrls] = useState([]);
    const feedListRef = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                //feed가져오기
                const response = await api.get(`/api/insta/home?page=${page}&size=${size}`);
                setFeeds(response.data);
                
                // 피드의 thumbnail_url만 추출
                const thumbnailUrls = response.data.map(feed => feed.thumbnail_url);

                const fetchProxyImages = async () => {
                    try {
                        const urls = await Promise.all(thumbnailUrls.map(async (thumbnail_url) => {
                            try {
                                const response = await api.get('/api/insta/proxyImage', {
                                    params: { imageUrl: thumbnail_url },
                                    responseType: 'arraybuffer' 
                                });
                                const blob = new Blob([response.data], { type: 'image/png' });
                                return URL.createObjectURL(blob);
                            } catch (error) {
                                console.error(error);
                                return thumbnail_url;
                            }
                        }));

                        setProxyImageUrls(urls);
                        setImagesLoaded(true); // 모든 이미지 로딩 완료
                    } catch (error) {
                        console.error( error);
                    }
                };

                fetchProxyImages();
                setLoading(false);
               
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    navigate("/Login");
                } else {
                    console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
                }
                setError('포스트를 가져오는 중 에러 발생');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, size]);

    return {
        feeds,
        loading,
        error,
        feedListRef,
        proxyImageUrls,
        imagesLoaded 
    };
};

export default useHomeFeedLogic;
