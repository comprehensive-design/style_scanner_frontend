import styles from"../css/FollowingUser.module.css";

function FollowingUser(){
    return(
        <body>
            <div style={{height : '12px'}}></div>

            <div class={styles.userInfo}>
                <img
                    id={styles.profileImage}
                    // src={process.env.PUBLIC_URL + 'img/profile.png'}
                    src=" http://via.placeholder.com/180x180"
                    width={180}
                    height={180}
                >
                </img>

                <div className={styles.userInfoWord}>
                    <h4 className={styles.FollowigId}>hi_sseulgi</h4>
                    <div style={{display:"flex"}} className={styles.userFollowerInfo}>
                        <p id={styles.FollowerWord}>팔로워</p>
                        <p id={styles.FollowerCountWord}>434</p>
                    </div>
                </div>

                <div style={{display:'flex'}}className={styles.FollowingDelete}>
                    <button id={styles.buttonDelete}>삭제</button>
                </div>
            </div>

            <div style={{height : '12px'}}></div>
            <hr></hr>
        </body>
    )
}

export default FollowingUser;