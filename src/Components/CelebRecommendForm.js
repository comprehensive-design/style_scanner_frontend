import styles from '../css/CelebRecommend.module.css';
import CelebBox from './CelebBox';
import Footer from './Footer';

export default function CelebRecommendForm({ isFollow, name, imgUrls = [], displayNames = [], followers = [], picUrl1s = [], picUrl2s = [], picUrl3s = [], follow = () => { }, unfollow = () => { } }) {

    return (
        <div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>회원님을 위한 추천</h2>
                    <p>@{name}님이 좋아하실만한 셀럽을 모아 봤어요!</p>
                </div>
                <div className={styles.boxwrap}>
                    {imgUrls.map((url, index) => (
                        <CelebBox
                            key={index}
                            prifileImgUrl={url}
                            displayName={displayNames[index]}
                            follower={followers[index]}
                            picUrl1={picUrl1s[index]}
                            picUrl2={picUrl2s[index]}
                            picUrl3={picUrl3s[index]}
                            isFollow={isFollow[index]}
                            follow={() => follow(index)}
                            unfollow={() => unfollow(index)}
                        />
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>

    );
}
