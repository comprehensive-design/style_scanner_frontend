import Feed from './feed.js';
import '../css/HomeInfo.css';

export default function HomeInfo(){
    
    return(
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className="contents">
                <Feed></Feed>
                <div className="totalItem">
                    {/* item 정보  */}
                    <div className='infoBox'>
                        <img id='item' src="http://via.placeholder.com/120X120"></img>
                        <div className="infoText">
                            <p id='itemName'><b>Gentle Monster</b></p>
                            <p id="itemDetail">Vonzo01 - Black</p>
                            <br></br>
                            <br></br>
                            <p id="itemPrice">320,000원</p>
                        </div>
                        <img id="itemHeart" src={process.env.PUBLIC_URL + 'img/heart.png'}></img>
                    </div>
                </div>
                <div className="decoBox"></div>
               
            </div>
        </body>
    )
}