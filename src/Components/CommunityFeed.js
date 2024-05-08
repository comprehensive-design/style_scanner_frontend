import styles from '../css/CommunityFeed.module.css'
import React, { useState, useEffect, useRef } from 'react';
import ComFeed from './comfeed'

export default function CommunityFeed() {

    const [comfeeds, setComFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const comfeedListRef = useRef(); 
   
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                if (loading) return;
                
                loadComFeeds();
            });
        });
        observer.observe(comfeedListRef.current);

        return () => {
            observer.disconnect();
        };
    }, [loading]); 

    const loadComFeeds = () => {
        setLoading(true); 
        const newComFeeds = [];
        for (let i = 0; i < 5; i++) {
            newComFeeds.push({
                id: comfeeds.length + i,
                image: `img/feed${(comfeeds.length + i) % 5 + 1}.png`
            });
        }
        setComFeeds([...comfeeds, ...newComFeeds]);
        setLoading(false); 
    };
    return(
        <body className={styles.ComFeedScroll}>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className={styles.ComFeedList} ref={comfeedListRef}>
                {comfeeds.map(comfeed => (
                    <ComFeed key={comfeed.id} image={comfeed.image} />
                ))}
                <div style={{height: '10px'}} />
            </div>
        </body>
    );
}