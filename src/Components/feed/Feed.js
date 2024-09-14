import React, { useState} from 'react';
import styled from 'styled-components';
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';
import { useFeedLogic } from '../../hooks/feed/useFeedLogic';
import  '../../style/style.css';

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


function Feed({ key, thumbnail_url, profile_url,  currentIndex, username, feed_code, home, width, height }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    // const feedLogic = useFeedLogic({thumbnail_url, currentIndex, username, key, home });

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
            <img src={thumbnail_url} />
            {/* <div className='feedLayerDiv'>
                {media_url_list.length > 1 && home && (
                    <img src={`img/layer.png`} alt="layer" />
                )}
                {media_url_list.length > 1 && !home && (
                    <NumberLabel currentPage={currentIndex+1} pageLength={media_url_list.length} />
                )}
            </div> */}
        </FeedMain>
    </FeedDiv>
    );
}

export default Feed;
