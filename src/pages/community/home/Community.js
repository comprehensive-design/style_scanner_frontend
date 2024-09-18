import React from 'react';
import styles from './Community.module.css';
import ComFeed from './feed/comfeed';
import { useCommunity } from '../../../hooks/useCommunity'; 
import Loading from '../../../Components/loading/loading';

export default function Community() {
  const { posts, loading, error} = useCommunity(); 

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.ComFeedScroll}>
      <div className={styles.ComFeedList} >
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <ComFeed 
              key={post.id} // key 추가
              postId={post.id} 
              feedUrl={post.feedUrl} 
              userId={post.userId} 
              content={post.content} 
              displayName={post.displayName} 
              profilePictureUrl={post.profilePictureUrl} 
              goDir={"navigateToCommunityComment"} 
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
