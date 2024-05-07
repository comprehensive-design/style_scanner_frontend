import '../css/CommunityWrite.css';
import {  useRef } from "react";
import Feed from './feed.js';
import { useNavigate } from "react-router-dom";

export default function MypageDefault(){
    const textarea = useRef();
    //textarea 가변길이
    const handleResizeHeight = () => {
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
    };
    //작성 버튼 이벤트
    const navigate = useNavigate();
    const navigateToCommunity = () => {
        console.log("버튼 누름");
      };
    return(
        <body>
            <header>
                <div className='menuBar'>메뉴바입니다</div>
            </header>

            <div className="writeContents">
                <Feed></Feed>
                <div className="comDecoBox">
                    <div className="comWriterBox">
                        <div className="writerProfile">
                            <img id='writerImage' src={process.env.PUBLIC_URL + 'img/profile.png'}></img>
                        </div>
                        <p  id='writerId'><b>nwbd_we</b></p>
                    </div>
                    <textarea ref={textarea} onInput={handleResizeHeight} rows={1} className="questionBox" placeholder='질문을 작성해주세요...(100자 이내)'></textarea>
                    <div className="comButtonBox">
                    <input type="button" className='comWriteButton' value="작성" onClick={navigateToCommunity}></input>
                    </div>
                </div>
                
            </div>
            
        </body>
        
    )
    
}