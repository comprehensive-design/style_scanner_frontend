import styles from '../css/CommunityFeed.module.css';
import React, { useState, useEffect, useRef } from 'react';
import ComFeed from './comfeed';
import axios from 'axios';
import SlideBtn from './SlideButton';

export const getPosts = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("토큰이 없습니다.");
    throw new Error("토큰이 없습니다.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('/api/post', config);
    console.log('Full response:', response); // 전체 응답 로깅
    console.log('Fetched posts:', response.data); // 데이터 로깅
    return response.data || []; // data가 undefined인 경우 빈 배열 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러: 글 가져오기 실패:', error.response?.data || error.message);
    } else {
      console.error('예상치 못한 에러: 글 가져오기 실패:', error);
    }
    throw error;
  }
};

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [error, setError] = useState(null);
  const postListRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // 로딩 상태를 true로 설정
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        setError('포스트를 가져오는 중 에러 발생');
      } finally {
        setLoading(false); // 로딩 상태를 false로 설정
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.ComFeedScroll}>
      <div className={styles.ComFeedList} ref={postListRef}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <ComFeed 
              key={post.id} 
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
      <SlideBtn />
    </div>
  );
}
