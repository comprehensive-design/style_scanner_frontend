import Category from "./Category"
import '../css/Ranking.css';
import { Link } from "react-router-dom";

export default function Ranking(){
    return(
        
        <div className="totalWrap">
            <div className="RankingWord">
                <h1 id="rankingBest">&nbsp;BEST</h1>
                <p id="rankingPopular">인기 있는 피드</p>
            </div>

            <div className="ContentWrap" style={{display:'flex'}}>
                <Category></Category>
                <div className="RankingContent">
                    <ul className="RankingUl">
                        <li className="RankingLists"><Link>실시간</Link></li>
                        <li className="RankingLists"><Link>일간</Link></li>
                        <li className="RankingLists"><Link>월간</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}