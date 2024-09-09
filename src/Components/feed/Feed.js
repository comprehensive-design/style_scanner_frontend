import React from 'react';
import styled from 'styled-components';
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';
import { useFeedLogic } from '../../hooks/useFeedLogic';
import  '../../style/style.css';

const FeedDiv = styled.div`
    width: ${({ width }) => width};
    height: ${({ height }) => `calc(${height} + 3em)`};
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

const LayerDiv = styled.div`
    position: absolute;
    top: 1em;
    right: 1.5em;
    width: 1.5em;
    height: 1.5em;
    img {
        width: 100%;
        height: auto; 
    }
`;

function Feed({ media_url_list, profile_url, currentIndex, username, media_id, home, width, height }) {
    const feedLogic = useFeedLogic({ media_url_list, profile_url, currentIndex, username, media_id, home });
    return (
        <FeedDiv className= 'borderRad boxShadow' width={width} height={height}>
        <ProfileDiv onClick={feedLogic.openPopup}>
            {feedLogic.isPopupOpen && <FeedPopup onClose={feedLogic.closePopup} user={{ profileName: username }} />}
            {profile_url ? (
                <img className='profileEllipse' src={profile_url} alt="Profile" />
            ) : (
                <img className='ProfileEllipseDefault' />
            )}
            <p className='boldContent'>@{username}</p>
        </ProfileDiv>

        <FeedMain ref={feedLogic.imageWrapperRef} onClick={feedLogic.handleClick} width={width}>
            <img src={media_url_list[currentIndex]} alt={`Feed ${currentIndex}`} />
            <LayerDiv>
                {media_url_list.length > 1 && home && (
                    <img src={`img/layer.png`} alt="layer" />
                )}
                {media_url_list.length > 1 && !home && (
                    <NumberLabel currentPage={currentIndex} pageLength={media_url_list.length} />
                )}
            </LayerDiv>
        </FeedMain>
    </FeedDiv>
    );
}

export default Feed;
