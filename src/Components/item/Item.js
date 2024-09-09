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

export default function Item({ itemId, brand, name, price, image, shoppingLink }) {
    const { imageSrc, heartSrc, handleHeartClick } = useItemLogic({ itemId, image });

    const shoppingClick = () => {
        window.location.href = shoppingLink;
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ko-KR');
    };

    return (
        <ItemDiv className='borderRad'>
            <img src={imageSrc} alt={name}/>
            <div className='itemInfoTopWrapper p1'>
                <p className='boldContent mb05'>브랜드입니다.</p>
                <p className='content'>아주 멋진제품입니다.</p>
            </div>
            <div className='itemInfoBottomWrapper boldContent p1'>
                <p>{formatPrice(price)}₩</p>
                <div className='itemLikeWrapper'>
                    <FaHeart size='1.5em' onClick={handleHeartClick} alt="Like"></FaHeart>
                    <p className='m103 ellipsis'>{formatPrice(100000)}</p>
                </div>
            </div>
        </ItemDiv>
    );
}
