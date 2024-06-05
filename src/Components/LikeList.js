// https://codesandbox.io/p/sandbox/react-pagination-lcw6pw?file=%2Fsrc%2Fcomponents%2FFilterablePostList.jsx%3A18%2C9-18%2C23
import styles from '../css/LikeList.module.css';
import Sidebar from '../Components/Sidebar';
import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import Pagination from './Pagination';
import Footer from './Footer';
import axios from "axios";

export default function LikeList() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalLikes, setTotalLikes] = useState(0);
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.get("/api/itemLike/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response.data);
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

    // jsondata 쉽게 받아오려고 이렇게 해놨습니다 일부러 그랬습니다.. 
    return (

        <body>

            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>좋아요</h2>
                        <hr />
                        <div className={styles.word}>
                            <p>전체</p>
                            <p>&nbsp;{totalLikes}</p>
                        </div>

                        <div>
                            <ItemsList list={items} />
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.heightPadding}></div>
            <div className={styles.footerBox}>
                <div className={styles.leftBtween} />
                <div className={styles.footer}>
                    <Pagination
                        itemsNum={items.length}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <Footer></Footer>
        </body>
    );
}
const HorizonLine = () => {
    return (
        <div
            style={{
                width: "100%",
                borderBottom: "2px solid black",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        >
        </div>
    );
};
