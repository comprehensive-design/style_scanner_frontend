import React from 'react';
import { useItemLogic } from '../../hooks/useItemLogic';
import '../../style/style.css';
import styled from 'styled-components';
import { FaHeart } from "react-icons/fa6";
import { theme } from '../../style/theme';

const ItemDiv = styled.div`
    width: ${({ width }) => width || '20em'};
    height: ${({ height }) => height || 'auto'};
    background-color: ${theme.colors.lightGray};
    
    img {
        width: 100%;
    }
    overflow: auto;
`;
const ItemInfoTopWrapper = styled.div`
  width: 100%;
  height: auto;
  text-align: start;
  margin-top: 1em;
`;

const ItemInfoBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;
export default function Item({ itemId, brand, name, price, image, shoppingLink }) {
    const { imageSrc, handleHeartClick } = useItemLogic({ itemId, image });

    const shoppingClick = () => {
        window.location.href = shoppingLink;
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ko-KR');
    };

    return (
        <ItemDiv className='borderRad'>
            <img src={imageSrc} alt={name}/>
            <ItemInfoTopWrapper className='p1'>
                <p className='boldContent mb05'>{brand}</p>
                <p className='content'>{name}</p>
            </ItemInfoTopWrapper>
            <ItemInfoBottomWrapper className='boldContent p1'>
                <p>{formatPrice(price)}₩</p>
                <div className='itemLikeWrapper'>
                    <FaHeart size='1.5em' onClick={handleHeartClick} alt="Like"></FaHeart>
                    <p className='m103 ellipsis'>{formatPrice(100000)}</p>
                </div>
            </ItemInfoBottomWrapper>
        </ItemDiv>
    );
}
