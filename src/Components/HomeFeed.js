import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; 
import styles from "../css/HomeFeed.module.css";
import axios from 'axios';
import SlideBtn from './SlideButton'; 
import FeedPopup from './FeedPopup';

export const getPosts = async () => {
  const response = await axios.get("http://54.180.208.255:9000/api/insta/home");
  return response.data;
};

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const feedListRef = useRef(); 
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const data = await getPosts();
              setFeeds(data);
              setLoading(false); 
            } catch (error) {
              setError('포스트를 가져오는 중 에러 발생');
              setLoading(false);
              console.error('Error fetching posts:', error);
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
            <div className={styles.feedList} ref={feedListRef}>
                {feeds.map(feed => (
                    <Feed 
                        key={feed.media_id} 
                        media_url_list={feed.media_url_list} 
                        profile_url={feed.profile_url} 
                        username={feed.username} 
                        media_id={feed.media_id} 
                    />
                ))}
                <div style={{height: '10px'}} />
            </div>
            <SlideBtn /> {/* SlideButton 렌더링 */}
        </div>
    );
}

export default FeedList;
