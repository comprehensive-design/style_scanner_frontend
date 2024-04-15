
import '../css/MypageDefault.css';


export default function MypageDefault() {
    return (
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className='sideBar'>사이드바입니다</div>
            <div className='content'>
                <div className='profileBox'>프로필박스</div>
                <div className='followingBox'>팔로잉박스</div>
                <div className='likeBox'>좋아요박스</div>
            </div>
        </body>
    );
}