import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; 
import styles from "./HomeFeed.module.css";
import axios from 'axios';
import SlideBtn from '../../Components/SlideButton'; 
import { useNavigate } from 'react-router';

const getFeeds = async (navigate) => {
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

    console.log("Access Token:", token); // 토큰 값 확인

    try {
        const response = await axios.get('/api/insta/home', config);
        return response.data.feeds; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            navigate("/Login");
        } else {
            console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
        }
        throw error;
    }
};

function FeedList() {
    const navigate = useNavigate();

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedListRef = useRef(); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getFeeds(navigate);
                setFeeds(data);
                setLoading(false); 
            } catch (error) {
                setError('포스트를 가져오는 중 에러 발생');
                setLoading(false);
            }
        };
      
        fetchPosts();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // 고정된 첫 번째 피드
    const fixedFeed = {
        media_url_list: ["https://scontent-nrt1-2.cdninstagram.com/v/t51.29350-15/439848769_395624573344851_2731015584234275434_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=NI1rmZtDy2EQ7kNvgFSjxts&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AYCh6OhaOb57p5fQfpJl4ya2A__NwKcAFUL5wHmlMIGUaA&oe=6680402C"],
        media_id: "18000852455601872",
        profile_url: "https://scontent-nrt1-2.xx.fbcdn.net/v/t51.2885-15/449154288_437185985893633_5661753391460383776_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=7d201b&_nc_ohc=9PQmmf-wspsQ7kNvgFrW5qG&_nc_ht=scontent-nrt1-2.xx&edm=AL-3X8kEAAAA&oh=00_AYCMbP0fEGo-LK_pixpWojzvOMoUPu14_HeDyxpOel1MxQ&oe=668018ED",
        username: "hi_sseulgi"
    };

    return (
        <div className={styles.feedScroll}>
            <div className={styles.feedList} ref={feedListRef}>
                {feeds.length > 0 && (
                    <Feed 
                        key={fixedFeed.media_id} 
                        media_url_list={fixedFeed.media_url_list} 
                        profile_url={fixedFeed.profile_url} 
                        username={fixedFeed.username} 
                        media_id={fixedFeed.media_id} 
                        close={true}
                    />
                )}

                {/* 동적으로 받아온 피드들 */}
                {feeds
                    .filter(feed => feed.username !== 'hi_sseulgi')
                    .map(feed => {
                        const mediaUrls = Array.isArray(feed.media_url_list) ? feed.media_url_list : [];
                        
                        return (
                            <Feed 
                                key={feed.media_id} 
                                media_url_list={mediaUrls} 
                                profile_url={feed.profile_url} 
                                username={feed.username} 
                                media_id={feed.media_id} 
                                close={true}
                            />
                        );
                    })
                }
                <div style={{height: '10px'}} />
            </div>
            <SlideBtn/> {/* SlideButton 렌더링 */}
        </div>
    );
}

export default FeedList;
