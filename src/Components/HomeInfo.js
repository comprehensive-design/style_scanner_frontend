import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import '../css/HomeInfo.css';

export default function HomeInfo(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemListRef = useRef(); 
   
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                if (loading) return;
                
                loadItems();
            });
        });
        observer.observe(itemListRef.current);

        return () => {
            observer.disconnect();
        };

    }, [loading]); 

    const loadItems = () => {
        setLoading(true); 
        const newItems = [];
        for (let i = 0; i < 3; i++) {
            newItems.push({
                id: items.length + i,
                image: ' '
            });
        }
        setItems([...items, ...newItems]);
        setLoading(false); 
    };

    return(
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className="contents">
                <Feed></Feed>
                <div className="totalItem" ref={itemListRef}>
                    {/* item 정보  */}
                    {items.map(feed => (
                    <ItemInfo key={feed.id} image={feed.image} />
                    ))}
                    <div style={{height: '10px'}} />
                </div>
                <div className="decoBox"></div>
               
            </div>
        </body>
    )
}