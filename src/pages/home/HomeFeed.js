import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHomeFeedLogic from '../../hooks/useHomeFeedLogic';
import Feed from '../../Components/feed/Feed';
import Loading from '../../Components/loading/loading';
import { GoHomeFill } from "react-icons/go";
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';
import api from '../../utils/axios'

const HomeFeed = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const size = 12;
    const [images, setImages] = useState(null);

    const { feeds, loading, error, feedListRef } = useHomeFeedLogic(page, size);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleImageClick = async (username, profile_url, feed_code) => {
        try {
            const response = await api.get('/api/insta/getCarouselMedia', {
                params: {
                    feed_code: feed_code
                }
            });
            console.log(response.data);
            setImages(response.data);
            
        } catch (error) {
            console.error(error);
        }
        
        navigate("/HomeItem", {
            state: {
                mediaUrls: images,
                username: username,
                profile_url: profile_url
            }
        });
    };
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
                            className={'home'}
                            handleImageClick={ () => handleImageClick(feed.profile_url, feed.username, feed.feed_code)}
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
