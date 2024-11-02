import CelebBox from './celeb/CelebBox';

export default function CelebRecommendForm({ isFollow, name, imgUrls = [], displayNames = [], followers = [], picUrl1s = [], picUrl2s = [], picUrl3s = [], follow = () => { }, unfollow = () => { } }) {

    return (
        <div className='mainWrapper'>
            <div>
                <div className="title mb1">회원님을 위한 추천</div>
                <div className='subtitle mb5'>@{name} 님이 좋아하실만한 셀럽을 모아 봤어요!</div>
            </div>
            <div className="crCelebWrapper mb5">
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

    );
}
