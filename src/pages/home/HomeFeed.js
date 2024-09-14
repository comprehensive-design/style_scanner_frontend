import React, { useState } from 'react';
import useHomeFeedLogic from '../../hooks/useHomeFeedLogic';
import Feed from '../../Components/feed/Feed';
import Loading from '../../Components/loading/loading';
import { GoHomeFill } from "react-icons/go";
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';


const HomeFeed = () => {
    const [page, setPage] = useState(0);
    const size = 12;

    const { feeds, loading, error, feedListRef } = useHomeFeedLogic(page, size);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='body'>
            <div className='feedScroll'>
                <div className='pageTitleDiv ml3 mb3'>
                    <GoHomeFill size="2em" />
                    <h1 className='title ml03'>홈</h1>
                </div>

                <div className='feedList mb3' ref={feedListRef}>
                    {feeds.map(feed => (
                        <Feed
                            key={feed.feed_code}
                            thumbnail_url={feed.thumbnail_url} 
                            profile_url={feed.profile_url} 
                            username={feed.username}
                            feed_code={feed.feed_code}
                            home={true}
                            currentIndex={0}
                            width="25em"
                            height="35em"
                        />
                    ))}
                    <div style={{ height: '10px' }} />
                </div>
            </div>
            <Pagination />
            <Footer />
        </div>
    );
};

export default HomeFeed;
