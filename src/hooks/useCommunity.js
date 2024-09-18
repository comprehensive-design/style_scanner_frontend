import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const useCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postListRef = useRef();

  // API 호출 함수
  const getPosts = async () => {
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

  // useEffect로 API 호출 관리
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // 로딩 상태를 true로 설정
        const data = await getPosts(); // API 호출 함수 사용
        setPosts(data);
      } catch (error) {
        setError('포스트를 가져오는 중 에러 발생');
      } finally {
        setLoading(false); // 로딩 상태를 false로 설정
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error, postListRef };
};
