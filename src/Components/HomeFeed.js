import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; 
import "../css/HomeFeed.css";

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const feedListRef = useRef(); 
   
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                if (loading) return;
                
                loadFeeds();
            });
        });
        observer.observe(feedListRef.current);

        return () => {
            observer.disconnect();
        };
    }, [loading]); 
    const loadFeeds = () => {
        setLoading(true); 
        const newFeeds = [];
        for (let i = 0; i < 5; i++) {
            newFeeds.push({
                id: feeds.length + i,
                image: `img/feed${(feeds.length + i) % 5 + 1}.png`
            });
        }
        setFeeds([...feeds, ...newFeeds]);
        setLoading(false); 
    };
    
    return (
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>
            <div className="feedList" ref={feedListRef}>
                {feeds.map(feed => (
                    <Feed key={feed.id} image={feed.image} />
                ))}
                <div style={{height: '10px'}} />
            </div>
        </body>
    );
}

export default FeedList;
