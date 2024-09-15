import Sidebar from '../../../Components/Sidebar';
import { NavLink } from "react-router-dom"; 

function CelebrityInfo({ imgUrl, celebID }) {
    return (
        <div> 
            <img id='celebImg1' src={imgUrl} alt="Celebrity"/> 
            <p id='celebID1'>@{celebID}</p>
        </div>
    );
}

function LikeInfo({ imgUrl, brandName, itemName, itemOption, itemPrice, likeCount }) {
    return (
        <div>
            <div>
                <img id='itemImg' src={imgUrl}/>
            </div>
            <div className='mpdLikeInfo'>
                <p className='boldContent'>{brandName}</p>
                <div>
                    <p className='caption'>{itemName}</p>
                    {itemOption && (
                        <p>&nbsp;-&nbsp;{itemOption}</p>
                    )}
                </div>
                <div className='last'>
                    <p className='caption'>{itemPrice}원</p>
                    <div className='flex'>
                        <img src="img/fullHeart.png"/>
                        <p id='likeCount' className='caption'>&nbsp;{likeCount}</p></div>
                </div>
            </div>
        </div>
    );
}

export default function MypageDefaultForm({ displayName, bio, profilePictureUrl, followingNum, followingURLs = [], followingIDs = [], imgUrls = [], brandNames = [], itemNames = [], itemOptions = [], itemPrices = [], likeCounts = [] }) {

    if (profilePictureUrl == "")
        profilePictureUrl = "/img/whiteBox.png"
    return (
        <div className="mypageWrapper">
            <Sidebar />
            <div className="mypageMain">
                <div className="mpdprofileBox">
                    <img src={profilePictureUrl}></img>
                    <div>
                        <p className="content">@{displayName}</p>
                        <p className="caption grayText">{bio}</p>
                    </div>
                    <div>
                        <p id='followNum' className="content">{followingNum}</p>
                        <p className="caption grayText">팔로잉</p>
                    </div>
                    <div>
                        <input className="button mb05" type="submit" value="프로필 관리" 
                        style={{ backgroundColor: "white", border: "1px solid gray", color: "gray" }}></input>
                    </div>
                </div>

                    <div className="mpdtextBox content">
                        <p>팔로잉</p>
                        <NavLink exact="true" to="/FollowingList">더보기</NavLink>
                    </div>

                    <div className="mpdFollowing">
                        {followingURLs.map((url, index) => (
                            <CelebrityInfo
                                key={index}
                                imgUrl={url}
                                celebID={followingIDs[index]}
                            />
                        ))}
                    </div>

                    <div className="mpdtextBox content">
                        <p>좋아요</p>
                        <NavLink exact="true" to="/LikeList">더보기</NavLink>
                    </div>

                    <div className='mpdLike'>
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
                    </div>
                </div>
            </div> 
    );
}