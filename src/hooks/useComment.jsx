import { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import api from "../api/axios";
import { fetchProxyImages } from "../utils/ConvertProxyImage";

export const useComment = () => {
  const location = useLocation();
  
  const {postId, feedUrl, postContent, displayName, profilePictureUrl, username, postCreatedAt} = location.state || {};
  const [comments, setComments] = useState([]);
  const [celebProfile, setCelebProfile] = useState(null);
  const [celebProfileUrl, setCelebProfileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

        const proxyImage = await fetchProxyImages(celebData.profilePictureUrl);
        setCelebProfileUrl(proxyImage);

      } catch (error) {
      }
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
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { feedUrl, postCreatedAt, displayName, profilePictureUrl, postContent ,comments, celebProfile, celebProfileUrl, handleSubmit };
};
