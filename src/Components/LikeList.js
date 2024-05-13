// https://codesandbox.io/p/sandbox/react-pagination-lcw6pw?file=%2Fsrc%2Fcomponents%2FFilterablePostList.jsx%3A18%2C9-18%2C23
import styles from '../css/LikeList.module.css';
import Sidebar from '../Components/Sidebar';
import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import Pagination from './Pagination';
import axios from "axios";

export default function LikeList() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30); 
    // 30개로 설정

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = items.slice(firstItemIndex, lastItemIndex);

    // jsondata 쉽게 받아오려고 이렇게 해놨습니다 일부러 그랬습니다.. 
    return (
        <body className={styles.wrap}>
            <Sidebar></Sidebar>

            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>좋아요</h2>
                    <div className={styles.horizon}></div>
                </div>

                <main>
                    <ItemsList list={currentItems} />
                </main>

                <footer>
                    <div style={{height:"50px"}}></div>
                    <Pagination
                        itemsNum={items.length}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </footer>
            </div>
        </body>
    );
}