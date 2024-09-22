import { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import api from "../utils/axios";

export const useComment = () => {
  const location = useLocation();
  const {postId, feedUrl, postContent, displayName, profilePictureUrl, username} = location.state || {};
  const [comments, setComments] = useState([]);
  const [celebProfile, setCelebProfile] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const getComments = async (postId) => {
    try {
      const response = await api.get(`/api/comment/${postId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getCelebProfile = async (username) => {
    try {
      const response = await api.get(`/api/follow/search?keyword=${username}`);
      console.log(username, response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const data = await getComments(postId); 
        setComments(data);

        const celebData = await getCelebProfile(username);
        setCelebProfile(celebData);
      } catch (error) {}
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e, content) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/comment/create",
        { postId, content }
      );

      if (response.status === 200) {
        alert("등록되었습니다.");

        const data = await getComments(postId);
        setComments(data);
        setContent("");
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { feedUrl, displayName, profilePictureUrl, postContent, content, comments, celebProfile, setContent, handleSubmit };
};
