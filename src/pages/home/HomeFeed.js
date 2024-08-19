import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed/Feed'; 
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

    return (
        <div className={styles.feedScroll}>
            <div className={styles.homeFeedTitle}>
                <div className={styles.homeTitle}>팔로잉 스타일 모아보기</div>
                <div className={styles.homeSubTitle}>팔로우한 사람들의 최신 스타일을 확인하세요.<br/>
                    마음에 드는 스타일을 클릭해 아이템 정보를 확인해보세요!</div>
            </div>
            <div className={styles.feedList} ref={feedListRef}>
                {feeds
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
                <div style={{ height: '10px' }} />
            </div>
            <SlideBtn /> {/* SlideButton 렌더링 */}
        </div>
    );
}

export default FeedList;
