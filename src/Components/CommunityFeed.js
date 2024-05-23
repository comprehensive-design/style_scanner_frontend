import styles from '../css/CommunityFeed.module.css'
import React, { useState, useEffect, useRef } from 'react';
import ComFeed from './comfeed'
import axios from 'axios';
import SlideBtn from './SlideButton';


export const getPosts = async () => {
  const response = await axios.get("http://54.180.208.255:9000/api/posts");
  return response.data;
};
export default function CommunityFeed() {
    const [comfeeds, setComFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const comfeedListRef = useRef(); 
   
    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const data = await getPosts();
              setComFeeds(data);
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
      
        fetchPosts();

    }, [loading]);

    return(
        <div className={styles.ComFeedScroll}>
            <div className={styles.ComFeedList} ref={comfeedListRef}>
                {comfeeds.map(comfeed => (
                    <ComFeed key={comfeed.id} id={comfeed.id} image={comfeed.image} goDir={"navigateToCommunityComment"} />
                ))}
                <div style={{height: '10px'}} />
            </div>
            <SlideBtn/>
        </div>
    );
}