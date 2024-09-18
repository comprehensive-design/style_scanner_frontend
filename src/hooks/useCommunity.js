import { useState, useEffect} from 'react';
import api from '../utils/axios';
import {fetchProxyImages} from '../utils/ConvertProxyImage'

export const useCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [proxyImageUrls, setProxyImageUrls] = useState([]);
  const [proxyProfileImageUrl, setProxyProfileImageUrl] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const getPosts = async () => {
    const response = await api.get('/api/post');
    return response.data;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setError('포스트를 가져오는 중 에러 발생');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  //사진 프록시 변환
  useEffect(() => {
    const loadImages = async () => {
      if (posts.length > 0) {
        try {
          const feedUrls = posts.map(post => post.feedUrl);
          const profileUrls = posts.map(post => post.profilePictureUrl);

          const urls = await fetchProxyImages(feedUrls);
          const pUrls = await fetchProxyImages(profileUrls);

          setProxyImageUrls(urls);
          setProxyProfileImageUrl(pUrls);
          setImagesLoaded(true);

        } catch (error) {
          console.error(error);
        }
      }
    };
    loadImages();
  }, [posts]);

  return {
    posts, 
    error,
    loading, 
    proxyImageUrls,
    proxyProfileImageUrl, 
    imagesLoaded
  };
};
