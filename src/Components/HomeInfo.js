import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import styles from '../css/HomeInfo.module.css';
import { useNavigate } from "react-router-dom";

export default function HomeInfo() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemListRef = useRef();
    const navigate = useNavigate();
    const navigateToCommunity = () => {
        navigate("/CommunityWrite");
    };
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


    return (
        <div className={styles.contents}>
            <Feed></Feed>

            <div className={styles.totalItem} ref={itemListRef}>
                <p className={styles.product}>Product</p>
                {items.map(feed => (
                    <ItemInfo key={feed.id} image={feed.image} />
                ))}
                <div style={{ height: '10px' }} />
            </div>
            {/* <div>
                <input type="button" className={styles.writeButton} value="+" onClick={navigateToCommunity}></input>
            </div> */}

        </div>

    )
}