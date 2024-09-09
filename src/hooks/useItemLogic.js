import { useState, useEffect } from 'react';
import axios from 'axios';

export const useItemLogic = ({ itemId, image }) => {
  const [imageSrc, setImageSrc] = useState(image);
  const [heartSrc, setHeartSrc] = useState('img/heart.png');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  const handleHeartClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (!isClicked) {
        const response = await axios.post(`/api/itemLike/${itemId}`, {}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.status === 200) {
          setHeartSrc('img/fullHeart.png');
          setIsClicked(true);
        }
      } else {
        const response = await axios.delete(`/api/itemLike/${itemId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.status === 200) {
          setHeartSrc('img/heart.png');
          setIsClicked(false);
        }
      }
    } catch (error) {
      console.error('Error processing like/unlike:', error.response ? error.response.data : error.message);
    }
  };

  const checkLikeStatus = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const response = await axios.get(`/api/itemLike/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200 && response.data === true) {
        setHeartSrc('img/fullHeart.png');
        setIsClicked(true);
      }
    } catch (error) {
      console.error('Error fetching like status:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    checkLikeStatus();
  }, [itemId]);

  return { imageSrc, heartSrc, isClicked, handleHeartClick };
};
