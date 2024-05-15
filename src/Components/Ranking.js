import styles from '../css/Ranking.module.css';
import { Link } from "react-router-dom";
import RankingFeed from "./RankingFeed";
import React, {useEffect, useState} from 'react';
import axios from "axios";

// https://leedaeho1188.tistory.com/55

export default function Ranking({selectedCategory, selectedSubcategory}){
    const [items, setItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(40); 

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

    const renderItems = () => {
        const items = [];
        for (let i=0; i<4; i++){
            items.push(
                <RankingFeed key = {`feed${i}`}/>
            );
            items.push(<div key={`padding${i}`} className={styles.RankingPadding}></div>);
        }
        return items;
    }

    return(
        <div className={styles.totalWrap}>
            <div className={styles.RankingWord}>
                <h1 id={styles.rankingBest}>BEST</h1>
                <p id={styles.rankingPopular}>인기 있는 피드</p>
            </div>

            <div className={styles.ContentWrap} >
                <div className={styles.RankingContent}>
                    <div className={styles.RankingType}>
                        <ul className={styles.RankingUl}>
                            <li className={styles.RankingLists}><Link>실시간</Link></li>
                            <li className={styles.RankingLists}><Link>일간</Link></li>
                            <li className={styles.RankingLists}><Link>월간</Link></li>
                        </ul>
                    </div>

                    <div className={styles.RankingItems} style={{display:'flex'}}>
                        {renderItems()}
                        <div style={{height:"30px"}}></div>
                    </div>
                    
                    <div className={styles.RankingItems} style={{display:'flex'}}>
                        {renderItems()}
                        <div style={{height:"30px"}}></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}