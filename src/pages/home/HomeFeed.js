import React from 'react';
import useHomeFeedLogic from '../../hooks/useHomeFeedLogic'; // Hook을 임포트
import styled from 'styled-components';
import Feed from '../../Components/feed/Feed';
import Loading from '../../Components/loading/loading';
import { HomeTitleDiv, Title, MainWrapper } from '../../style/commonStyle';
import { GoHomeFill } from "react-icons/go";
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';

// UI 스타일 정의
const HomeTitle = styled.h1`
    ${Title}
    line-height: 3em;
    margin-left: 0.5em;
`;

const FeedScroll = styled.div`
 overflow: hidden; /* 스크롤바 숨기기 */
`;

const FeedList = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 25em);
    gap: 2em;
    justify-content: center;
    margin: 2em 0;
`;

const HomeFeed = () => {
    const { feeds, loading, error, feedListRef } = useHomeFeedLogic();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <MainWrapper>
            <FeedScroll>
                <HomeTitleDiv>
                    <GoHomeFill size="3em" />
                    <HomeTitle>홈</HomeTitle>
                </HomeTitleDiv>

                <FeedList ref={feedListRef}>
                    {feeds.map(feed => (
                        <Feed
                            key={feed.media_id}
                            media_url_list={feed.media_url_list}
                            profile_url={feed.profile_url}
                            username={feed.username}
                            media_id={feed.media_id}
                            currentIndex={0}
                            home={true}
                            width="25em"
                            height="35em"
                        />
                    ))}
                    <div style={{ height: '10px' }} />
                </FeedList>
            </FeedScroll>
            <Pagination />
            <Footer />
        </MainWrapper>
    );
};

export default HomeFeed;
