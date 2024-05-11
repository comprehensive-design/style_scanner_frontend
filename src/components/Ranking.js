import Category from "./Category"
import styles from '../css/Ranking.module.css';
import { Link } from "react-router-dom";
import RankingFeed from "./RankingFeed";
import React, {useState} from 'react';

export default function Ranking(){
    const [bestFeeds, setBestFeeds] = useState([]); 

    const loadFeeds = () => {
        const newBestFeeds = [];
        for (let i=0; i< 4; i++){
            newBestFeeds.push({
                id : bestFeeds.length + i,
                image: `img/bestFeed${(bestFeeds.length+i)%4+1}.png`
            });
        }
        setBestFeeds([...bestFeeds, ...newBestFeeds]);
    };

    return(
        
        <div className={styles.totalWrap}>
            <div className={styles.RankingWord}>
                <h1 id={styles.rankingBest}>&nbsp;BEST</h1>
                <p id={styles.rankingPopular}>인기 있는 피드</p>
            </div>

            <div className={styles.ContentWrap} style={{display:'flex'}}>
                <Category></Category>
                <div className={styles.RankingContent}>
                    <div className={styles.RankingType}>
                        <ul className={styles.RankingUl}>
                            <li className={styles.RankingLists}><Link>실시간</Link></li>
                            <li className={styles.RankingLists}><Link>일간</Link></li>
                            <li className={styles.RankingLists}><Link>월간</Link></li>
                        </ul>
                    </div>

                    <div className={styles.RankingRow_1}>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        
                    </div>

                    <div className={styles.RankingRow_2}>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                    </div>

                    <div className={styles.RankingRow_3}>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                        <div className={styles.RankingPadding}></div>
                        <RankingFeed></RankingFeed>
                    </div>
                </div>
            </div>
        </div>
    )
}