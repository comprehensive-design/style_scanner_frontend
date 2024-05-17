import React, { useState, useEffect, useRef } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import styles from '../css/HomeInfo.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};
export default function HomeInfo() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemListRef = useRef();
    const navigate = useNavigate();

    const navigateToCommunity = () => {
        navigate("/CommunityWrite");
    };
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
              const data = await getPosts();
              setItems(data);
            } catch (error) {
              console.error('Error fetching items:', error);
            }
          };
      
        fetchItems();

    }, [loading]); 

    // const goToPrevImage = () => {
    //     setCurrentImageIndex((prevIndex) => {
    //         //0번 인덱스에서 이전 x
    //         const nextIndex = prevIndex === 0 ? 0 : prevIndex - 1;
    //         console.log(`이전 이미지 index: ${nextIndex}`);
    //         return nextIndex;
    //     });
    // };

    return (
        <div className={styles.contents}>
            <Feed></Feed>

            <div className={styles.totalItem} ref={itemListRef}>
                <p className={styles.product}>Product</p>
                {items.map(feed => (
                    //배열 보내겟지
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