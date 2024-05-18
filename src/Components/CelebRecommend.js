import styles from '../css/CelebRecommend.module.css';
import Sidebar from './Sidebar';
import CelebBox from './CelebBox';
import Footer from './Footer';
import axios from 'axios';
import { useEffect, useState } from "react";


export default function CelebRecommend() {
    const [celebs, setCelebs] = useState([]);
    const [celebPerPage, setCelebsPerPage] = useState(6);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setCelebs(response.data);
            })
            .catch((error) => {
                // 에러 처리
                console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
            });
    }, []);

    return (
        <body>
            <div style={{ display: 'flex' }} className={styles.total}>
                <Sidebar></Sidebar>
                <div className={styles.content}>
                    <h3 className={styles.title}>추천 셀럽</h3>
                    <div className={styles.horizon}></div>
                    <div className={styles.boxwrap}>
                        <CelebBox></CelebBox>
                        {/* <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox>
                        <CelebBox></CelebBox> */}
                    </div>
                    {/* <Footer></Footer> Footer가 total 안에 위치 */}
                </div>
            </div>
            <Footer></Footer> {/* Footer가 total 안에 위치 */}
        </body>

    );
}
