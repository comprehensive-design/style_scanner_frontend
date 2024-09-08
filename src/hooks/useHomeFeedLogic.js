import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useHomeFeedLogic = () => {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedListRef = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    navigate("/Login");
                    throw new Error("토큰이 없습니다.");
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get('/api/insta/home', config);
                setFeeds(response.data.feeds);
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
    }, [navigate]);

    return {
        feeds,
        loading,
        error,
        feedListRef,
    };
};

export default useHomeFeedLogic;
