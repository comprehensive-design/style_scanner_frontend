import React from 'react';
import { useItemLogic } from '../../hooks/useItemLogic';
import '../../style/style.css';
import styled from 'styled-components';
import { FaHeart } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { theme } from '../../style/theme';

const ItemDiv = styled.div`
    width: ${({ width }) => width || '20em'};
    background-color: ${({ theme }) => theme.colors.lightGray};
    
    overflow: auto; 
    position: relative;
    margin: 1em;
    flex-shrink: 0;
`;
const ItemImg = styled.img`
    width: ${({ width }) => width || '20em'};
    height: ${({ height }) => height || '20em'};
    object-fit: cover;

`;
const ItemInfoTopWrapper = styled.div`
  width: 100%;
  
  height: 20%;
  text-align: start;
  margin-top: 1em;
`;

const ItemInfoBottomWrapper = styled.div`
  display: flex;
  height: 20%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;
export default function Item({ itemId, brand, name, price, image, shoppingLink, width, height }) {
    const { imageSrc, isClicked, handleHeartClick } = useItemLogic({ itemId, image });

    const shoppingClick = () => {
        window.location.href = shoppingLink;
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ko-KR');
    };

    return (
        <ItemDiv className='borderRad' width={width} height={height}>
            <ItemImg src={imageSrc} alt={name} width={width} height={height}/>
            <AiOutlineShopping className='feedLayerDiv textShadow' style={{ cursor: 'pointer' }} size='1.5em' color={theme.colors.white} onClick={shoppingClick} />
            <ItemInfoTopWrapper className='p1'>
                <p className='boldContent mb05'>{brand}</p>
                <p className='content'>{name}</p>
            </ItemInfoTopWrapper>
            <ItemInfoBottomWrapper className='boldContent p1'>
                <p>{formatPrice(price)}₩</p>
                <div className='itemLikeWrapper'>
                    <FaHeart size='1.5em' style={{ cursor: 'pointer' }} onClick={handleHeartClick} color={isClicked ? theme.colors.red : theme.colors.black} alt="Like"></FaHeart>
                    <p className='m103' style={{ color: isClicked ? theme.colors.red : theme.colors.black }}>
                        {formatPrice(100000)}
                    </p>
                </div>
            </ItemInfoBottomWrapper>

        </ItemDiv>
    );
}
