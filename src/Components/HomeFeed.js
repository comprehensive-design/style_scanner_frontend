import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed'; // Feed 컴포넌트를 import 합니다.
import "../css/HomeFeed.css";

function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const observer = useRef();

    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, {
            root: null, // viewport를 기준으로 intersection을 계산합니다.
            rootMargin: '0px', // 뷰포트에 0px만큼만 올라와 있어도 intersection됩니다.
            threshold: 0.1 // target 요소가 10%만큼 보여도 intersection됩니다.
        });

        observer.current.observe(feedListRef.current); // feedList를 감시합니다.

        loadFeeds();

        // Observer를 해제합니다.
        return () => {
            observer.current.disconnect();
        };
    }, []);

    const feedListRef = useRef(); // feedList 요소를 참조하기 위한 useRef

    const loadFeeds = () => {
        const newFeeds = [];
        for (let i = 0; i < 5; i++) {
            newFeeds.push({
                id: feeds.length + i,
                image: `img/feed${(feeds.length + i) % 5 + 1}.png`
            });
        }
        setFeeds([...feeds, ...newFeeds]);
    };

    const handleObserver = (entries) => {
        // 감시 대상 요소의 상태가 변경되었을 때 호출되는 콜백 함수입니다.
        const target = entries[0];
        if (target.isIntersecting) {
            loadFeeds();
        }
    };
    const handleTouchMove = (e) => {
        const { scrollLeft, clientWidth, scrollWidth } = feedListRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
            loadFeeds();
        }
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
                {/* Intersection Observer의 대상이 되는 요소 */}
                <div style={{height: '10px'}} />
            </div>
        </body>
    );
}

export default FeedList;
