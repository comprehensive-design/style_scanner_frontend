import styles from '../css/FollowingList.module.css';
import Sidebar from "./Sidebar"
import FollowingUser from "./FollowingUser";
import React, {useState, useEffect, useRef} from 'react';

export default function FollowingList() {
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(false);
    const followingListRef = useRef(); 
   
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                if (loading) return;
                
                loadFeeds();
            });
        });
        observer.observe(followingListRef.current);

        return () => {
            observer.disconnect();
        };
    }, [loading]); 
    const loadFeeds = () => {
        setLoading(true); 
        const newFollowings = [];
        for (let i = 0; i < 5; i++) {
            newFollowings.push({
                id: followings.length + i,
                image: `img/following${(followings.length + i) % 5 + 1}.png`
            });
        }
        setFollowings([...followings, ...newFollowings]);
        setLoading(false); 
    };

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

                    <div className="feedList" ref={followingListRef}>
                        {followings.map(feed => (
                            <FollowingUser key={followings.id} image={FollowingUser.image} />
                         ))}
                    </div>
                </div>
            </div>
        </body>
    );
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