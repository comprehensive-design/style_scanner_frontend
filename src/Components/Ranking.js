import Category from "./Category"
import '../css/Ranking.css';
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
        
        <div className="totalWrap">
            <div className="RankingWord">
                <h1 id="rankingBest">&nbsp;BEST</h1>
                <p id="rankingPopular">인기 있는 피드</p>
            </div>

            <div className="ContentWrap" style={{display:'flex'}}>
                <Category></Category>
                <div className="RankingContent">
                    <div className="RankingType">
                        <ul className="RankingUl">
                            <li className="RankingLists"><Link>실시간</Link></li>
                            <li className="RankingLists"><Link>일간</Link></li>
                            <li className="RankingLists"><Link>월간</Link></li>
                        </ul>
                    </div>

                    <div className="RankingRow_1">
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        
                    </div>

                    <div className="RankingRow_2">
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                    </div>

                    <div className="RankingRow_3">
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                        <div className="RankingPadding"></div>
                        <RankingFeed></RankingFeed>
                    </div>
                </div>
            </div>
        </div>
    )
}