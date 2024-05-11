
import styles from "../css/MypageDefault.module.css";
import Sidebar from './Sidebar';

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

export default function MypageDefault() {
    return (
        <body>
            <div className={styles.wrap}>

                <Sidebar></Sidebar>

                <div className={styles.content}>
                    <div className={styles.profileBox}>
                        <img className={styles.profileImg} src="http://via.placeholder.com/100X100"></img>
                        <div className={styles.nameBox}>
                            <div style={{ display: "flex" }}>
                                <p className={styles.bigFont}>@&nbsp;</p>
                                <p id='userName' className={styles.bigFont}>username</p>
                            </div>
                            <p id='userId' style={{ fontSize: "14px", color: "gray" }}>소개소개소개한줄소개라리루레로</p>
                        </div>
                        <div>
                            <p id='followNum' className={styles.bigFont}>256</p>
                            <p style={{ fontSize: "14px", color: "gray" }}>팔로잉</p>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        <p>팔로잉</p>
                        <p>더보기</p>
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
                        <p>더보기</p>
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