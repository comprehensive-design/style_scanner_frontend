import '../css/ItemInfo.css'
export default function HomeInfo(){
    // 수정 요망..
    const handleClick = () => {
        alert('하트 눌렀다!');
    };
    return(
        <div className='infoBox'>
            <img id='item' src="http://via.placeholder.com/120X120"></img>
                <div className="infoText">
                    <p id='itemName'><b>Gentle Monster</b></p>
                    <p id="itemDetail">Vonzo01 - Black</p>
                    <br></br>
                    <br></br>
                    <p id="itemPrice">320,000원</p>
                </div>
            {/* 하트 버튼 누르기 */}
            <div onClick={handleClick}>
                <img id="itemHeart" src={process.env.PUBLIC_URL + 'img/heart.png'}></img>
            </div>
        </div>
    )

}