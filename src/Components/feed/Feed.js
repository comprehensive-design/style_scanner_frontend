import React, { useState} from 'react';
import styled from 'styled-components';
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';

function Feed({ thumbnail_url, profile_url, currentIndex, username, className, handleImageClick, width, height }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <FeedDiv className= 'borderRad boxShadow' width={width} height={height}>
        <ProfileDiv onClick={openPopup}>
            {isPopupOpen && <FeedPopup onClose={closePopup} user={{ profileName: username }} />}
            {profile_url ? (
                <img className='feedProfile' src={profile_url} alt="Profile" />
            ) : (
                <img className='feedProfileDefault'/>
            )}
            <p className='boldContent'>@{username}</p>
        </ProfileDiv>

        <FeedMain  width={width}>
            <img src={thumbnail_url} onClick={handleImageClick}/>

            {/* api수정 후 다시 작성 */}
            {/* <div className='feedLayerDiv'>
                {carousel_count > 1 && className==='homefeed' && (
                    <img src={`img/layer.png`} alt="layer" />
                )}
                {carousel_count > 1 && className==='homeitem' && (
                    <NumberLabel currentPage={currentIndex+1} pageLength={carousel_count} />
                )}
            </div> */}
        </FeedMain>
    </FeedDiv>
    );
}
//공통 컴포넌트 -> prop을 위해 styled component로
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
    width: ${({ width }) => width || '25em'};   
    height: ${({ height }) => height || 'auto'}; 

    img {
        width: 100%;
        height: auto;
    }
`;
export default Feed;
