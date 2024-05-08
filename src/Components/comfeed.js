import styles from "../css/comfeed.module.css";
import Feed from './feed'

function comFeed(){
    
    return(
        <div className={styles.comCompleteFeed}>
            <Feed></Feed>
            <div className={styles.writeBox}>
                <span className={styles.writeId} id="writerId"><b>useruser2</b></span>
                <div className={styles.writeTotal}>
                    <span className={styles.writeContent} id="writeContent">속눈썹 궁금해..&nbsp;</span>
                    <span className={styles.tag} id="tag">@noodle.zip</span>
                </div>
            </div>
        </div>
    );
}
export default comFeed;