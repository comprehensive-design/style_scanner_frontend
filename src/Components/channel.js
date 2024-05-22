import styles from "../css/Channel.module.css";

function Channel(){
    return(
        <div className = {styles.channelDiv}>
            <div>
                {/* <img 
                    id = {styles.channelImg}
                    src = "https://via.placeholder.com/240x320/808080/FFFFFF/?text=Grey+Image"
                /> */}
            </div>

            <div className = {styles.channelProfile} style={{display : 'flex'}}>
                {/* <img
                    id={styles.channelProfileImg}
                    src = "https://via.placeholder.com/50x50/808080/FFFFFF/?text="
                /> */}

                <div className={styles.channelProfileWord}>
                    <p id={styles.channelId}>Aiggjo_32</p>
                </div>

            </div>
        </div>
    );
}

export default Channel;