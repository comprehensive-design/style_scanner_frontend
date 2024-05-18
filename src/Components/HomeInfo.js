import React, { useState, useEffect } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import styles from '../css/HomeInfo.module.css';
import PopupModal from './PopupModal'; // 팝업 모달 컴포넌트 import
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
    const response = await axios.get("/posts");
    return response.data;
};

export default function HomeInfo() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4; 
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림/닫힘 상태를 관리하는 상태 추가

    const openPopup = () => {
        setIsPopupOpen(true); // 팝업 열기
    };

    const closePopup = () => {
        setIsPopupOpen(false); // 팝업 닫기
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage+1) % Math.ceil(items.length / itemsPerPage));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage-1 + Math.ceil(items.length / itemsPerPage)) % Math.ceil(items.length / itemsPerPage));
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
    }, []);

    const currentItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className={styles.contents}>
            <Feed/>
            <div>
                <p className={styles.product}>Product</p>
                <hr></hr>
                <div className={styles.totalItem}>
                    {currentItems.map((feed, index) => (
                        <ItemInfo key={feed.id} image={feed.image} index={currentPage * itemsPerPage + index} />
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button className={styles.prevBtn} onClick={prevPage}>{'<'}</button>
                    <button className={styles.nextBtn} onClick={nextPage}>{'>'}</button>
                </div>
                <p className={styles.goComBtn} onClick={openPopup}>찾는 제품이 없으신가요?</p>
                {isPopupOpen && <PopupModal onClose={closePopup} />} {/* 팝업 모달 조건부 렌더링 */}
            </div>
        </div>
    );
}
