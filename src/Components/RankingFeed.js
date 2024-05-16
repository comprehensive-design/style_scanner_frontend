import styles from "../css/RankingFeed.module.css";

export default function RankingFeed(){
    return(
        <div className={styles.RankingFeed}>
            <div>
                <img 
                    id={styles.bestFeed} src={process.env.PUBLIC_URL + 'img/best.png'}
                    width = "240px"
                    height = "320px"
                >
                </img>

                <div className={styles.RankingUserInfo}>
                    <p className={styles.rankingId}>hi_sseulgi</p>

                    <div style={{display:'flex'}} className={styles.RankingUserHeart}>
                        <img
                            id={styles.rankingHeart}
                            src={`img/heart.png`}
                        >
                        </img>
                        <p className={styles.rankingHeartCount}>165</p>
                    </div>
                </div>

            </div>
        </div>
    )
}