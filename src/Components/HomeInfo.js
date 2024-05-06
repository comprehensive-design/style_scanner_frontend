import Feed from './feed.js';
import ItemInfo from './ItemInfo.js';
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
                    <ItemInfo></ItemInfo>
                    <ItemInfo></ItemInfo>
                    <ItemInfo></ItemInfo>
                    
                </div>
                <div className="decoBox"></div>
               
            </div>
        </body>
    )
}