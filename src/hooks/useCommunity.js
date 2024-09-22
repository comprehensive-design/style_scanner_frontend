import { useState, useEffect} from 'react';
import api from '../utils/axios';

export const useCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [feedImages, setFeedImages]= useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    const response = await api.get('/api/post');
    return response.data;
  };
  const getFeedImages = async (feedCode) => {
    const response = await api.get(`/api/insta/getImage?feedCode=${feedCode}`, { responseType: 'blob' });
    return response.data;
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);

        const feedImagesUrls = await Promise.all(
          data.map(async (post) => {
            const feedImageBlob = await getFeedImages(post.feedCode); 
            return URL.createObjectURL(feedImageBlob); 
          })
        );
        setFeedImages(feedImagesUrls); 
        setLoading(false);

      } catch (error) {
        console.log(error);
        setError('포스트를 가져오는 중 에러 발생');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return {
    posts, 
    feedImages,
    error,
    loading, 
  };
};
