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
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4; 
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
                console.error(error);
            }
        };

        fetchItems();

    }, [loading]);

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage+1) % Math.ceil(items.length / itemsPerPage));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage-1 + Math.ceil(items.length / itemsPerPage)) % Math.ceil(items.length / itemsPerPage));
    };

    const currentItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className={styles.contents}>
            <Feed />
            <div>
                <p className={styles.product}>Product</p>
                <HorizonLine />
                <div className={styles.totalItem}>
                    {currentItems.map((feed, index) => (
                        <ItemInfo key={feed.id} image={feed.image} index={currentPage * itemsPerPage + index} />
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button className={styles.prevBtn} onClick={prevPage}>{'<'}</button>
                    <button className={styles.nextBtn} onClick={nextPage}>{'>'}</button>
                </div>
                <p className={styles.goComBtn} onClick={navigateToCommunity}>찾는 제품이 없으신가요?</p>
            </div>
        </div>
    );
}

const HorizonLine = () => {
    return (
        <div
            style={{
                width: '1000px',
                borderBottom: "2px solid black",
                lineHeight: "0.1em",
                margin: "10px 0 0 30px",
            }}
        />
    );
};
