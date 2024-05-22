import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed';
import styles from "../css/HomeFeed.module.css";
import axios from 'axios';
import SlideBtn from './SlideButton'; 

const getPosts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("토큰이 없습니다.");
        throw new Error("토큰이 없습니다.");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    console.log("Access Token:", token); // 토큰 값 확인

    try {
        const response = await axios.get('/api/insta/home', config);
        return response.data.feeds; // feeds 배열을 직접 반환
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios 에러: 게시물 가져오기 실패:', error.response?.data || error.message);
            console.error('응답 상태:', error.response?.status); // 상태 코드 로그
            console.error('응답 헤더:', error.response?.headers); // 헤더 로그
        } else {
            console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
        }
        throw error;
    }
};

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedListRef = useRef(null);
    
    const fetchData = async () => {
        try {
            const data = await getPosts();
            setFeeds((prevFeeds) => [...prevFeeds, ...data]); // 이전 피드와 새로운 피드를 합침
            setLoading(false);
        } catch (error) {
            setError('게시물을 불러오는 중 에러 발생');
            setLoading(false);
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    fetchData(); // Intersection Observer가 페이지 하단에 도달하면 데이터를 추가로 가져옴
                }
            });
        }, options);

        if (feedListRef.current) {
            observer.observe(feedListRef.current);
        }

        return () => {
            if (feedListRef.current) {
                observer.unobserve(feedListRef.current);
            }
        };
    }, [feedListRef]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.feedScroll}>
            <div className={styles.feedList} ref={feedListRef}>
                {feeds.map((feed) => (
                    <Feed
                        key={feed.media_id}
                        media_url_list={feed.media_url_list}
                        profile_url={feed.profile_url}
                        username={feed.username}
                        media_id={feed.media_id}
                    />
                ))}
            </div>
            <SlideBtn />
        </div>
    );
}

export default FeedList;
