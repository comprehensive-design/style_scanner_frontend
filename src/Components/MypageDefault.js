
import '../css/MypageDefault.css';


export default function MypageDefault() {
    return (
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className='wrap'>
                
                <div className='sideBar'>사이드바입니다</div>

                <div className='content'>
                    <div className='profileBox'>
                        <img className='profileImg' src="http://via.placeholder.com/100X100"></img>
                        <div className='left'>
                            <p id='userName'>username</p>
                            <small id='userId'>userid</small>
                        </div>
                        <div className='right' id='followNum'>
                            <p>followNum</p>
                            <small>팔로잉</small>
                        </div>
                    </div>

                    <div className='textBox'>
                        <p>팔로잉</p>
                        <p>더보기</p>
                    </div>

                    <div className='followingBox'>
                        <div className='box'>
                            <img className='followingImg' src="http://via.placeholder.com/100X100"></img>
                            <p className='folowingID'>@celebID</p>
                        </div>
                        <div className='box'>
                            <img className='followingImg' src="http://via.placeholder.com/100X100"></img>
                            <p className='folowingID'>@celebID</p>
                        </div>
                        <div className='box'>
                            <img className='followingImg' src="http://via.placeholder.com/100X100"></img>
                            <p className='folowingID'>@celebID</p>
                        </div>
                        <div className='box'>
                            <img className='followingImg' src="http://via.placeholder.com/100X100"></img>
                            <p className='folowingID'>@celebID</p>
                        </div>
                    </div>

                    <div className='textBox'>
                        <p>좋아요</p>
                        <p>더보기</p>
                    </div>

                    <div className='likeBox'>
                        <div className='boxes'>
                            <img className='boxComponent' id='itemImg' src="http://via.placeholder.com/100X100"></img>

                            <p className='boxComponent' id='brandName'>브랜드이름</p>
                            <div className='itemBox'>
                                <p id='itemName'>아이템이름</p> -
                                <p id='itemOption'>옵션명</p>
                            </div>
                            <p className='boxComponent' id='price'>가격</p>
                            <div className='heartBox'>
                                <img id='heartImg' src="img/fullHeart.png"></img>
                                <p id='likeCount'>좋아요수</p>
                            </div>
                        </div>
                        <div className='boxes'>
                            <img className='boxComponent' id='itemImg' src="http://via.placeholder.com/100X100"></img>

                            <p className='boxComponent' id='brandName'>브랜드이름</p>
                            <div className='itemBox'>
                                <p id='itemName'>아이템이름</p> -
                                <p id='itemOption'>옵션명</p>
                            </div>
                            <p className='boxComponent' id='price'>가격</p>
                            <div className='heartBox'>
                                <img id='heartImg' src="img/fullHeart.png"></img>
                                <p id='likeCount'>좋아요수</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </body>
    );
}