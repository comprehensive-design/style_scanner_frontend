import styles from '../css/CommunityNoti.module.css';
import Sidebar from './Sidebar';
import NotiBox from './NotiBox';
import Pagination from './Pagination';
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from './Footer';

export default function CommunityNoti() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30);
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setItems(response.data);
                setTotalLikes(response.data.length);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex);
    return (
        <body>
            <Sidebar></Sidebar>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>알림</h2>
                <div className={styles.horizon}></div>
                </div>
                <div className={styles.wrap}>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                    <NotiBox></NotiBox>
                </div>
            <Pagination
                itemsNum={items.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            </div>
            <div className={styles.footer}>
            <Footer></Footer>
            </div>
        </body>
    );
}