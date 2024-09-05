import styles from './FollowingList.module.css';
import Sidebar from "../../../Components/Sidebar"
import React, { useState, useEffect, useRef } from 'react';
import Pagination from '../../../Components/Pagination';
import axios from "axios";
import UsersList from './user/UsersList';
import Footer from '../../../Components/Footer';

export default function FollowingList() {
    const [followings, setFollowings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalFollowings, setTotalFollowings] = useState(0);

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        if (!accessToken) {
            console.error('Access token is missing');
            return;
        }

        axios.get("/api/follow/followingList", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response.data);
                const { following_list } = response.data;
                setTotalFollowings(following_list.length);
                setFollowings(following_list);

                console.log(following_list);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    const firstItemIndex = (currentPage - 1) * itemsPerPage;
    const lastItemIndex = firstItemIndex + itemsPerPage;
    const currentItems = followings.slice(firstItemIndex, lastItemIndex);

    return (

        <body>

            <div className={styles.total}>
                <Sidebar />
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h2>팔로잉</h2>
                        <hr /></div>
                    <div className={styles.word}>
                        <p>전체</p>
                        <p>&nbsp;{totalFollowings}</p>
                    </div>

                    <div>
                        <UsersList list={followings} />
                    </div>

                </div>
            </div>
            <div className={styles.heightPadding}></div>
            <div className={styles.footerBox}>
                <div className={styles.leftBtween} />
                <div className={styles.footer}>
                    <Pagination
                        itemsNum={followings.length}
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
