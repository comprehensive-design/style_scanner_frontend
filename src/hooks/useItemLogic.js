import { useState, useEffect } from 'react';
import axios from 'axios';

export const useItemLogic = ({ itemId, image }) => {
  const [imageSrc, setImageSrc] = useState(image);
  const [isClicked, setIsClicked] = useState(false);

  // Token을 한 번만 가져오고 상태에 저장
  const getToken = () => localStorage.getItem('accessToken');

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  const handleHeartClick = async (e) => {
    e.preventDefault();
    const token = getToken();
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
          setIsClicked(false);
        }
      }
    } catch (error) {
      console.error('Error processing like/unlike:', error.response ? error.response.data : error.message);
    }
  };

  const checkLikeStatus = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(`/api/itemLike/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200 && response.data === true) {
        setIsClicked(true);
      }
    } catch (error) {
      console.error('Error fetching like status:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    checkLikeStatus();
  }, [itemId]);

  return { imageSrc, isClicked, handleHeartClick };
};
