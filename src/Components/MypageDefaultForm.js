
import styles from "../css/MypageDefault.module.css";
import Sidebar from './Sidebar';
import { NavLink } from "react-router-dom";

function CelebrityInfo({ imgUrl, celebID }) {
    return (
        <div>
            <img id='celebImg1' src={imgUrl} alt="Celebrity" />
            <p id='celebID1'>@{celebID}</p>
        </div>
    );
}

function LikeInfo({ imgUrl, brandName, itemName, itemOption, itemPrice, likeCount }) {
    return (
        <div className={styles.likeComponent}>
            <img className={styles.likeComponent} id='itemImg' src={imgUrl} alt="상품" />
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

export default function MypageDefault({ displayName, bio, profilePictureUrl,}) {
    return (
        <body>
            <div className={styles.wrap}>

                <Sidebar></Sidebar>

                <div className={styles.content}>
                    <div className={styles.profileBox}>
                        <img className={styles.profileImg} src={profilePictureUrl} alt="사진없음"></img>
                        <div className={styles.nameBox}>
                            <div style={{ display: "flex" }}>
                                <p className={styles.bigFont}>@&nbsp;</p>
                                <p className={styles.bigFont}>{displayName}</p>
                            </div>
                            <p style={{ fontSize: "14px", color: "gray" }}>{bio}</p>
                        </div>
                        <div>
                            <p id='followNum' className={styles.bigFont}>256</p>
                            <p style={{ fontSize: "14px", color: "gray" }}>팔로잉</p>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        <p>팔로잉</p>
                        <NavLink exact to='/FollowingList'>더보기</NavLink>
                    </div>

                    <div className={styles.following}>
                        <CelebrityInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            celebID="celebID"
                        />
                        <CelebrityInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            celebID="celebID"
                        />
                        <CelebrityInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            celebID="celebID"
                        />
                        <CelebrityInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            celebID="celebID"
                        />
                        <CelebrityInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            celebID="celebID"
                        />
                    </div>

                    <div className={styles.textBox}>
                        <p>좋아요</p>
                        <NavLink exact to='/LikeList'>더보기</NavLink>
                    </div>

                    <div className={styles.like}>
                        <LikeInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            brandName="브랜드이름"
                            itemName="아이템이름"
                            itemOption="옵션명"
                            itemPrice="가격"
                            likeCount="좋아요수"
                        />

                        <LikeInfo
                            imgUrl="http://via.placeholder.com/100X100"
                            brandName="브랜드이름"
                            itemName="아이템이름"
                            itemOption="옵션명"
                            itemPrice="가격"
                            likeCount="좋아요수"
                        />
                    </div>

                </div>
            </div>
        </body>
    );
}