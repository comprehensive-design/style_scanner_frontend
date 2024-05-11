import styles from "../css/feed.module.css";
function Feed(){
    
    return(
        <div className={styles.completeFeed}>
            <div className={styles.profile}>
                <div className={styles.box}>
                    <img id={styles.profileImage} src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                </div>
                <p className={styles.profileId} id='name'>hi_sseulgi</p>
            </div>
            <div className={styles.feedMain}>
                <img id={styles.feedImage} src={process.env.PUBLIC_URL + 'img/feed1.png'}></img>
            </div>
        </div>
    );
}
export default Feed;