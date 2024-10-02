import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFeed from "../../hooks/useFeed";
import Feed from "../../Components/feed/Feed";
import Loading from "../../Components/loading/loading";
import { GoHomeFill } from "react-icons/go";
import Pagination from "../../Components/Pagination";
import api from "../../api/axios";
import FeedStore from "../../stores/FeedStore"; 

const HomeFeed = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const size = 12;

  const {
    feeds,
    error,
    feedListRef,
    proxyImageUrls,
    proxyProfileImageUrl,
    imagesLoaded,
    totalCount
  } = useFeed(page, size);

  const { setFeeds } = FeedStore();

  // 이미지 클릭 이벤트 처리
  const handleImageClick = async (username, profile_url, feed_code) => {
    alert("click");
    try {
      const response = await api.get('/api/insta/getCarouselMedia', {
        params: {
          feed_code: feed_code
        }
      });
      const mediaUrls = response.data.map(selectFeed => selectFeed.feed_url);
      const feedCodes = response.data.map(selectFeed => selectFeed.feedCode);
      navigate("/HomeItem", {
        state: {
          mediaUrls: mediaUrls,
          username: username,
          profile_url: profile_url,
          feedCodes: feedCodes
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage - 1); 
  };

  useEffect(() => {
    if (feeds.length > 0) {
      setFeeds(feeds);
    }
  }, [feeds, setFeeds]);
  
  if (!imagesLoaded) {
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
          {feeds && feeds.length > 0 ? (
            feeds.map((feed, index) => (
              <Feed
                key={feed.feed_code}
                thumbnail_url={proxyImageUrls[index]}
                profile_url={proxyProfileImageUrl[index]}
                username={feed.username}
                className={"homefeed"}
                handleImageClick={() => handleImageClick(feed.username, proxyProfileImageUrl[index], feed.feed_code)}
                carousel_count={feed.carousel_count}
                currentIndex={0}
                width="25em"
                height="30em"
              />
            ))
          ) : (
            <div>셀럽을 팔로우해보세요!</div>
          )}
          <div style={{ height: '10px' }} />
        </div>
      </div>
      <Pagination
        itemsNum={totalCount}
        itemsPerPage={size}
        currentPage={page + 1}
        setCurrentPage={handlePageChange}
      />
    </div>
  );
};

export default HomeFeed;
