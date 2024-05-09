import "../css/RankingFeed.css";

export default function RankingFeed(){
    return(
        <div className="RankingFeed">
            <div>
                <img 
                    id='bestFeed' src={process.env.PUBLIC_URL + 'img/best.png'}
                    width = "210px"
                    height = "280px"
                >
                </img>

                <div className="RankingUserInfo">
                    <p className="rankingId">hi_sseulgi</p>

                    <div style={{display:'flex'}} className="RankingUserHeart">
                        <img
                            id="rankingHeart"
                            src={`img/heart.png`}
                        >
                        </img>
                        <p className="rankingHeartCount">165</p>
                    </div>
                </div>

            </div>
        </div>
    )
}