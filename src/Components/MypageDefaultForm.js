
import styles from "../css/MypageDefault.module.css";
import Sidebar from './Sidebar';
import { NavLink } from "react-router-dom";

function CelebrityInfo({ imgUrl, celebID }) {
    return (
        <div>
            <img id='celebImg1' src={imgUrl} alt="Celebrity" style={{ width: "100px", height: "100px" }} />
            <p id='celebID1'>@{celebID}</p>
        </div>
    );
}

function LikeInfo({ imgUrl, brandName, itemName, itemOption, itemPrice, likeCount }) {
    return (
        <div className={styles.likeComponent}>
            <img className={styles.likeComponent} id='itemImg' src={imgUrl} alt="상품" style={{ width: "100px", height: "100px" }} />
            <p className={styles.likeComponent} id={styles.brandName}>{brandName}</p>
            <div className={styles.item}>
                <p id={styles.itemName}>{itemName}</p> -
                <p id={styles.itemOption}>{itemOption}</p>
            </div>
            <p className={styles.likeComponent} id={styles.itemPrice}>{itemPrice}</p>
            <div className={styles.heartBox}>
                <img src="img/fullHeart.png" alt="하트 아이콘" />
                <p id='likeCount'>{likeCount}</p>
            </div>
        </div>
    );
}

export default function MypageDefaultForm({ displayName, bio, profilePictureUrl, followingNum, followingURLs = [], followingIDs = [], imgUrls = [], brandNames = [], itemNames = [], itemOptions = [], itemPrices = [], likeCounts = [] }) {

    if(profilePictureUrl=="")
        profilePictureUrl="/img/profile.png";
    return (
        <body>
            <div className={styles.wrap}>

                <Sidebar></Sidebar>

                <div className={styles.content}>
                    <div className={styles.profileBox}>
                        <img className={styles.profileImg} src={profilePictureUrl}></img>
                        <div className={styles.nameBox}>
                            <div style={{ display: "flex" }}>
                                <p className={styles.bigFont}>@&nbsp;</p>
                                <p className={styles.bigFont}>{displayName}</p>
                            </div>
                            <p style={{ marginTop:"3px",fontSize: "14px", color: "gray" }}>{bio}</p>
                        </div>
                        <div>
                            <p id='followNum' className={styles.bigFont}>{followingNum}</p>
                            <p style={{ fontSize: "14px", color: "gray" }}>팔로잉</p>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        <p>팔로잉</p>
                        <NavLink exact="true" to="/FollowingList">더보기</NavLink>
                    </div>

                    <div className={styles.following}>
                        {followingURLs.map((url, index) => (
                            <CelebrityInfo
                                key={index}
                                imgUrl={url}
                                celebID={followingIDs[index]}
                            />
                        ))}
                    </div>

                    <div className={styles.textBox}>
                        <p>좋아요</p>
                        <NavLink exact="true" to="/LikeList">더보기</NavLink>
                    </div>

                    <div className={styles.like}>
                        {imgUrls.map((url, index) => (
                            <LikeInfo
                                key={index}
                                imgUrl={url}
                                brandName={brandNames[index]}
                                itemName={itemNames[index]}
                                itemOption={itemOptions[index]}
                                itemPrice={itemPrices[index]}
                                likeCount={likeCounts[index]}
                            />
                        ))}

                        {/* <LikeInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            brandName="브랜드이름"
                            itemName="아이템이름"
                            itemOption="옵션명"
                            itemPrice="가격"
                            likeCount="좋아요수"
                        /> */}
                    </div>

                </div>
            </div></body>

    );
}