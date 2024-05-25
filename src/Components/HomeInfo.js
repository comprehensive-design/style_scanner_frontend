import React, { useState, useEffect } from 'react';
import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
import styles from '../css/HomeInfo.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CommunityWrite from './CommunityWrite.js';


export const getItems = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("토큰이 없습니다.");
        throw new Error("토큰이 없습니다.");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    //아이템 정보 가져오기
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
            params: { id: id },
            ...config,
        });
        return response.data;

    } catch (error) {
        console.error('Error', error);
        throw error;
    }

};
//버튼 누른 피드 정보 가져오기
export const getFeedPost = async () => {
    try {
        //수정
        const response = await axios.get('/api/insta/?');
        return response.data;
    } catch (error) {
        console.error('피드 데이터 가져오기 오류:', error);
        throw error;
    }
};

//next버튼 누를 때마다 피드 정보 주기

export default function HomeInfo({mediaUrls, media_id, username, profile_url}) {
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
        setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(items.length / itemsPerPage));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(items.length / itemsPerPage)) % Math.ceil(items.length / itemsPerPage));
    };

    useEffect(() => {
        const fetchItems = async () => {
            const id = 1;
            try {
                const data = await getItems(id);
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
            {/* <Feed
                key={media_id}
                media_url_list={mediaUrls}
                profile_url={profile_url}
                username={username}
                media_id={media_id}
            /> */}
            <Feed media_url_list={[`img/feed1.png`]} profile_url={`img/profile.png`} username={"hi_sseulgi"}></Feed>
            <div>
                <p className={styles.product}>Product</p>
                <hr></hr>
                <div className={styles.totalItem}>
                    {currentItems.map((item, index) => (
                        <ItemInfo key={item.id} name={item.name} price={item.price} image={item.image} index={currentPage * itemsPerPage + index} />
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button className={styles.prevBtn} onClick={prevPage}>{'<'}</button>
                    <button className={styles.nextBtn} onClick={nextPage}>{'>'}</button>
                </div>
                <p className={styles.goComBtn} onClick={openPopup}>찾는 제품이 없으신가요?</p>
                {isPopupOpen && <CommunityWrite onClose={closePopup} />} {/* 팝업 모달 조건부 렌더링 */}
            </div>
        </div>
    );
}
