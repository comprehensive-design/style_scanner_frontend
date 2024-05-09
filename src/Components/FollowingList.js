import styles from '../css/FollowingList.module.css';
import Sidebar from "./Sidebar"
import FollowingUser from './FollowingUser';

export default function FollowingList() {
    return(
        <body>
            <div style={{display:'flex'}}>
                <Sidebar></Sidebar>
                <div className={styles.wrap}>
                    <h2 className={styles.Following}>팔로잉</h2>
                    <HorizonLine></HorizonLine> 
                    <div className={styles.word}>
                        <p>전체</p>
                        <p>22</p>
                    </div>

                    <div>
                        <FollowingUser></FollowingUser>
                    </div>
                </div>
            </div>
        </body>
    )
}

const HorizonLine = () => {
    return (
      <div
        style={{
          width: "100%",
          borderBottom: "2px solid black",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };