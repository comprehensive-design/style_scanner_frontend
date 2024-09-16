import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHomeFeedLogic from '../../hooks/useHomeFeedLogic';
import Feed from '../../Components/feed/Feed';
import Loading from '../../Components/loading/loading';
import { GoHomeFill } from "react-icons/go";
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';
import api from '../../utils/axios';


const HomeFeed = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const size = 12;    

    const { feeds, loading, error, feedListRef, proxyImageUrls, proxyProfileImageUrl, imagesLoaded} = useHomeFeedLogic(page, size);

    const handleImageClick = async (username, profile_url, feed_code) => {
        try {
            const response = await api.get('/api/insta/getCarouselMedia', {
                params: {
                    feed_code: feed_code
                }
            });
            alert("click");
            navigate("/HomeItem", {
                state: {
                    mediaUrls: response.data,
                    username: username,
                    profile_url: profile_url,
                    feed_code: feed_code
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (loading || !imagesLoaded) {
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
                    {feeds.map((feed, index) => (
                        <Feed
                            key={feed.feed_code}
                            thumbnail_url={proxyImageUrls[index]} 
                            profile_url={proxyProfileImageUrl[index]}
                            username={feed.username}
                            className={'homefeed'}
                            handleImageClick={() => handleImageClick(feed.username, proxyProfileImageUrl[index], feed.feed_code)}
                            carousel_count={feed.carousel_count}
                            currentIndex={0}
                            width='25em'
                            height='30em'
                        />
                    ))}
                    <div style={{ height: '10px' }} />
                </div>
            </div>
            <Pagination />
        </div>
    );
};

export default HomeFeed;
