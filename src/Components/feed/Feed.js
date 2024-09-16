import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';

function Feed({ thumbnail_url, profile_url, currentIndex, username, className, handleImageClick, carousel_count, width, height, imgRef }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    

    return (
        <FeedDiv className='borderRad boxShadow' width={width}>
            <ProfileDiv onClick={openPopup}>
                {isPopupOpen && <FeedPopup onClose={closePopup} user={{ profileName: username }} />}
                {profile_url ? (
                    <img className='feedProfile' src={profile_url} alt="Profile" />
                ) : (
                    <img className='feedProfileDefault' />
                )}
                <p className='boldContent'>@{username}</p>
            </ProfileDiv>

            <FeedMain ref={imgRef} width={width} height={height}>
                <img id='feedImage' src={thumbnail_url} onClick={handleImageClick} />

                <div className='feedLayerDiv'>
                {carousel_count > 1 && className==='homefeed' && (
                    <img src={`img/layer.png`} alt="layer" />
                )}
                {carousel_count > 1 && className==='homeitem' && (
                    <NumberLabel currentPage={currentIndex+1} pageLength={carousel_count} />
                )}
            </div>
            </FeedMain>
        </FeedDiv>
    );
}
////css수정 해라.
const FeedDiv = styled.div`
    width: ${({ width }) => width};
    overflow: hidden;
`;

const ProfileDiv = styled.div`
    display: flex;
    float: left;
    align-items: center;
`;
const FeedMain = styled.div`
    display: flex;
    position: relative;
    width: ${({ width }) => width};   
    height: ${({ height }) => height}; 
    align-items: center;
    justify-content: center;
    
    img {
        width: 100%;
        height: 100%; 
        object-fit: cover;
        cursor: pointer;
    }
`;

export default Feed;
