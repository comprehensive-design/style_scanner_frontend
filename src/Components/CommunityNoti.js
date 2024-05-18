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
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setItems(response.data);
                setTotalLikes(response.data.length);
            })
            .catch((error) => {
                // Error handling
                console.error('An error occurred while fetching data:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex);

    return (
        <div>
            <Sidebar />
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>알림</h2>
                    <div className={styles.horizon}></div>
                </div>
                <div className={styles.wrap}>
                    {currentItems.map(item => (
                        <NotiBox key={item.id} item={item} />
                    ))}
                </div>
                <Pagination
                    itemsNum={items.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
