import styles from '../css/CommunityNoti.module.css';
import Sidebar from './Sidebar';
import NotiBox from './NotiBox';
import Pagination from './Pagination';
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from './Footer';
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
    const response = await axios.get("/posts");
    return response.data;
};

export default function CommunityNoti() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = posts.slice(firstItemIndex, lastItemIndex);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts(currentPage, itemsPerPage);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage, itemsPerPage]);

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
                        <NotiBox key={item.id} />
                    ))}
                </div>
                <Pagination
                    itemsNum={posts.length}
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
