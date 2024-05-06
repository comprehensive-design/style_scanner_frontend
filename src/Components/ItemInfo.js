import '../css/ItemInfo.css'
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  overflow: auto;
  height: 45px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
export default function HomeInfo(){
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
            <img id="itemHeart" src={process.env.PUBLIC_URL + 'img/heart.png'}></img>
        </div>
    )

}