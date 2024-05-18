import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; 
import styles from "../css/HomeFeed.module.css";
import axios from 'axios';
import SlideBtn from './SlideButton'; // SlideButton 가져오기
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const feedListRef = useRef(); 
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const data = await getPosts();
              setFeeds(data);
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
      
        fetchPosts();

    }, [loading]); 

    return (
        <div className={styles.feedScroll}>
            <div className={styles.feedList} ref={feedListRef}>
                {feeds.map(feed => (
                    <Feed key={feed.id} id={feed.id} image={feed.image} />
                ))}
                <div style={{height: '10px'}} />
            </div>
            <SlideBtn /> {/* SlideButton 렌더링 */}
        </div>
    );
}

export default FeedList;
