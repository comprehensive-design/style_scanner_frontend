import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHomeLogic from "../../hooks/useHomeLogic";
import Feed from "../../Components/feed/Feed";
import Loading from "../../Components/loading/loading";
import { GoHomeFill } from "react-icons/go";
import Pagination from "../../Components/Pagination";
import api from "../../utils/axios";

const HomeFeed = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const size = 12;

  const { feeds, loading, error, feedListRef, proxyImageUrls, proxyProfileImageUrl, imagesLoaded, totalCount } = useHomeLogic(page, size);

  const handleImageClick = async (username, profile_url, feed_code) => {
    alert("click");
    try {
      const response = await api.get('/api/insta/getCarouselMedia', {
        params: {
          feed_code: feed_code
        }
      });
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

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
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
            <div>No feeds available</div>
          )}
          <div style={{ height: '10px' }} />
        </div>
      </div>
      <Pagination itemsNum={totalCount} itemsPerPage={size} currentPage={page + 1} setCurrentPage={handlePageChange} />
    </div>
  );
};

export default HomeFeed;
