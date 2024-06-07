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
        console.log("Fetching data from API...");
        axios.get("/api/item/ranking")
            .then(async (response) => {
                console.log("Data fetched successfully:", response.data);
                const items = response.data;
                
                // Like status를 병렬로 가져오기
                const likeStatusPromises = items.map(item => 
                    axios.get(`/api/itemLike/${item.id}`)
                        .then(response => ({ id: item.id, isLiked: response.data.isLiked }))
                        .catch(() => ({ id: item.id, isLiked: false }))
                );
                
                const likeStatuses = await Promise.all(likeStatusPromises);
                
                const itemsWithLikes = items.map(item => {
                    const likeStatus = likeStatuses.find(status => status.id === item.id);
                    return { ...item, isLiked: likeStatus ? likeStatus.isLiked : false };
                });

                setItems(itemsWithLikes);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    // const renderItems = () => {
    //     const items = [];
    //     for (let i=0; i<4; i++){
    //         items.push(
    //             <RankingFeed key = {`feed${i}`}/>
    //         );
    //         items.push(<div key={`padding${i}`} className={styles.RankingPadding}></div>);
    //     }
    //     return items;
    // }

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
                        <RankingFeed list={items}/>
                        <div style={{height:"30px"}}></div>
                    </div>
                    
                    {/*<div className={styles.RankingItems} style={{display:'flex'}}>
                        {renderItems()}
                        <div style={{height:"30px"}}></div>
                    </div>
                    
                    <div className={styles.RankingItems} style={{display:'flex'}}>
                        {renderItems()}
                        <div style={{height:"30px"}}></div>
                    </div>

                    <div className={styles.RankingItems} style={{display:'flex'}}>
                        {renderItems()}
                        <div style={{height:"30px"}}></div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}