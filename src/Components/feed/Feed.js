import React from 'react';
import styled from 'styled-components';
import FeedPopup from '../FeedPopup';
import NumberLabel from '../numberLabel';
import { useFeedLogic } from '../../hooks/useFeedLogic';

// 공통 스타일과 텍스트 스타일을 가져옴
import { Username, ProfileEllipse, ProfileEllipseDefaultStyle } from '../../style/commonStyle';

const FeedDiv = styled.div`
    width: 350px;
    height: 542.5px;
    border-radius: 20px;
    box-shadow: 2px 0px 20px rgba(0, 0, 0, 0.25);
    margin: 20px 20px;
`;

const ProfileDiv = styled.div`
    display: flex;
    float: left;
    align-items: center;
`;

const FeedMain = styled.div`
    display: flex;
    position: relative;
    width: 350px;

    img {
        width: 100%;
        height: auto; 
    }
`;

const LayerDiv = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
`;

const LayerImage = styled.img`
    width: 20px;
    height: 20px;
`;

function Feed({ media_url_list, profile_url, currentIndex, username, media_id, home }) {
    const feedLogic = useFeedLogic({ media_url_list, profile_url, currentIndex, username, media_id, home });

    return (
        <FeedDiv>
            <ProfileDiv onClick={feedLogic.openPopup}>
                {feedLogic.isPopupOpen && <FeedPopup onClose={feedLogic.closePopup} user={{ profileName: username }} />}
                {profile_url ? (
                    <ProfileEllipse src={profile_url} alt="Profile" />
                ) : (
                    <ProfileEllipseDefaultStyle />
                )}
                <Username>{username}</Username> {/* 공통 스타일 적용 */}
            </ProfileDiv>

            <FeedMain>
                <div ref={feedLogic.imageWrapperRef} onClick={feedLogic.handleClick}>
                    <img src={media_url_list[currentIndex]} alt={`Feed ${currentIndex}`} />
                </div>
                <LayerDiv>
                    {media_url_list.length > 1 && home && (
                        <LayerImage src={`img/layer.png`} alt="layer" />
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
