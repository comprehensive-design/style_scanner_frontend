import styles from"../css/FollowingUser.module.css";

export default function FollowingUser(){
    return(
        <body>
            <div class={styles.userInfo}>
                <img
                    id='FollowingUserImg'
                    src={process.env.PUBLIC_URL + 'img/profileimg.png'}
                >
                </img>

                <div className={styles.userInfoWord}>
                    <h4>hi_sseulgi</h4>
                    <div style={{display:"flex"}} className={styles.userFollowerInfo}>
                        <p id="FollowerWord">팔로워</p>
                        <p id="FollowerCountWord">434</p>
                    </div>
                </div>
            </div>
        </body>
    )
}