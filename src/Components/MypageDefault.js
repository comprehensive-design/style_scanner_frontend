
import '../css/MypageDefault.css';
import Sidebar from './Sidebar';

export default function MypageDefault() {
    return (
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className='wrap'>
                
                {/* <div className='sideBar'>사이드바입니다</div> */}
                <Sidebar></Sidebar>

                <div className='content'>
                    <div className='profileBox'>
                        <img className='profileImg' src="http://via.placeholder.com/100X100"></img>
                        <div>
                            <p id='userName'>username</p>
                            <small id='userId'>@userid</small>
                        </div>
                        <div>
                            <p id='followNum'>256</p>
                            <small>팔로잉</small>
                        </div>
                    </div>

                    <div className='textBox'>
                        <p>팔로잉</p>
                        <p>더보기</p>
                    </div>

                    <div className='following'>
                        <div>
                            <img id='celebImg1' src="http://via.placeholder.com/100X100"></img>
                            <p id='celebID1'>@celebID</p>
                        </div>
                        <div>
                            <img id='celebImg2' src="http://via.placeholder.com/100X100"></img>
                            <p id='celebID2'>@celebID</p>
                        </div>
                        <div>
                            <img id='celebImg3' src="http://via.placeholder.com/100X100"></img>
                            <p id='celebID3'>@celebID</p>
                        </div>
                        <div>
                            <img id='celebImg4' src="http://via.placeholder.com/100X100"></img>
                            <p id='celebID4'>@celebID</p>
                        </div>
                    </div>


                    <div className='textBox'>
                        <p>좋아요</p>
                        <p>더보기</p>
                    </div>


                    <div className='like'>
                        <div>
                            <img className='likeComponent' id='itemImg' src="http://via.placeholder.com/100X100"></img>

                            <p className='likeComponent' id='brandName'>브랜드이름</p>
                            <div className='item'>
                                <p id='itemName'>아이템이름</p> -
                                <p id='itemOption'>옵션명</p>
                            </div>
                            <p className='likeComponent' id='itemPrice'>가격</p>
                            <div className='heartBox'>
                                <img src="img/fullHeart.png"></img>
                                <p id='likeCount'>좋아요수</p>
                            </div>
                        </div>

                        <div>
                            <img className='likeComponent' id='itemImg' src="http://via.placeholder.com/100X100"></img>

                            <p className='likeComponent' id='brandName'>브랜드이름</p>
                            <div className='item'>
                                <p id='itemName'>아이템이름</p> -
                                <p id='itemOption'>옵션명</p>
                            </div>
                            <p className='likeComponent' id='itemPrice'>가격</p>
                            <div className='heartBox'>
                                <img src="img/fullHeart.png"></img>
                                <p id='likeCount'>좋아요수</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </body>
    );
}