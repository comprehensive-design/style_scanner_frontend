import React,{useState} from 'react';
import styles from './Community.module.css';
import ComFeed from './feed/comfeed';
import { useCommunity } from '../../../hooks/useCommunity';
import Loading from '../../../Components/loading/loading';

export default function Community() {

  const [page, setPage] = useState(0);
  const size = 12;
  const { posts, loading, error, proxyImageUrls, proxyProfileImageUrl, imagesLoaded } = useCommunity();

  if (loading || !imagesLoaded) {
    return <Loading />
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.ComFeedScroll}>
      <div className={styles.ComFeedList} >
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => (
            <ComFeed
              key={post.id}
              postId={post.id}
              feedUrl={proxyImageUrls[index]}
              content={post.content}
              displayName={post.displayName}
              profilePictureUrl={proxyProfileImageUrl[index]}
            />
          ))
        ) : (
          <div>포스트가 없습니다.</div>
        )}
        <div style={{ height: '10px' }} />
      </div>
    </div>
  );
}
