import React from 'react';
import  '../../style/style.css';
import useHomeFeedLogic from '../../hooks/useHomeFeedLogic'; // Hook을 임포트
import Feed from '../../Components/feed/Feed';
import Loading from '../../Components/loading/loading';
import { GoHomeFill } from "react-icons/go";
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';


const HomeFeed = () => {
    const { feeds, loading, error, feedListRef } = useHomeFeedLogic();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='mainWrapper'>
            <div className='feedScroll'>
                <div className='pageTitleDiv mb3'>
                    <GoHomeFill size="2em" />
                    <h1 className='title mb105'>홈</h1>
                </div>

                <div className='feedList mb3' ref={feedListRef}>
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
                </div>
            </div>
            <Pagination/>
            <Footer/>
        </div>
    );
};

export default HomeFeed;
