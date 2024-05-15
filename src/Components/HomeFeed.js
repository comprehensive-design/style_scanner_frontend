import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; 
import styles from "../css/HomeFeed.module.css";
import axios from 'axios';

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
        //한 아이디에 사진 여러개면???
        <div className={styles.feedScroll}>
           
            <div className={styles.feedList} ref={feedListRef}>
                {feeds.map(feed => (
                    <Feed id={feed.id} image={feed.image} />
                ))}
                <div style={{height: '10px'}} />
            </div>
        </div>
    );
}

export default FeedList;
