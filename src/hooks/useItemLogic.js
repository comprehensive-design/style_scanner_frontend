import { useState, useEffect } from 'react';
import api from '../utils/axios';

export const useItemLogic = ({ itemId, likeCount}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter]= useState(likeCount);

  useEffect(() => {
    checkLikeStatus();
  }, [itemId]);

  //좋아요 누름
  const handleHeartClick = async (e) => {
    e.preventDefault();
    try {
      if (!isClicked) {
        // const response = await api.post(`/api/itemLike/${itemId}`, {});
        // if (response.status === 200) {
        //   setIsClicked(true);
        // }
        setIsClicked(true);
        setCounter(counter+1);
      } else {
        // const response = await api.delete(`/api/itemLike/${itemId}`);
        // if (response.status === 200) {
        //   setIsClicked(false);
        // }
        setIsClicked(false);
        setCounter(counter-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //좋아요 했는 지 확인
  const checkLikeStatus = async () => {
    try {
      const response = await api.get(`/api/itemLike/${itemId}`);
      if (response.status === 200 && response.data === true) {
        setIsClicked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {isClicked, counter, handleHeartClick };
};
