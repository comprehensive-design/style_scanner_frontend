import styles from "../css/comfeed.module.css";
import { useNavigate } from "react-router-dom";

function ComFeed(){
    const navigate = useNavigate();
    const navigateToCommunityComment = () => {
        navigate("/CommunityWrite");
        console.log("버튼!!");
      };
    return(
       
        <div className={styles.comCompleteFeed}>
            <div className={styles.comCompleteFeed}>
                <div className={styles.comProfile}>
                    <div className={styles.comProfileBox}>
                        <img id='comProfileImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                    </div>
                    <p className={styles.comProfileName} id='comProfileName'>hi_sseulgi</p>
                    <input type="button" className={styles.comGoButton} value="→" onClick={navigateToCommunityComment}></input>
                </div>
                <div className={styles.comFeedMain}>
                    <img id='comFeedImage' src={process.env.PUBLIC_URL + 'img/feed1.png'}></img>
                </div>
            </div>
            {/* <Feed></Feed> */}
            
            <div className={styles.writeBox}>
                <span className={styles.writeId} id="writerId"><b>useruser2</b></span>
                <div className={styles.writeTotal}>
                    {/* 내용 /태그 포함 25자 보여주기..*/}
                    <span className={styles.writeContent} id="writeContent">속눈썹 궁금해요요요요요요요&nbsp;</span>
                    <span className={styles.tag} id="tag">@noodle.zip</span>
                </div>
            </div>
        </div>
       
    );
}
export default ComFeed;