import api from "../utils/axios";
import { useState, useEffect } from "react";

const useWritePost = (post, feedUrl, onSave) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const profileResponse = await api.get('/api/user/me');
      const profilePicUrl = profileResponse.data.profilePictureUrl || "/img/profile.png";
      setProfilePictureUrl(profilePicUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, question) => {
    e.preventDefault();
    try {
      let response;
      if (post && post.id) {
        response = await api.post(`/api/post/update/${post.id}`, { content: question });
      } else {
        response = await api.post("/api/post/create", { feedUrl, content: question });
      }

      if (response.status === 200) {
        alert(post ? "수정되었습니다." : "등록되었습니다.");
        if (post) onSave(response.data);
      } else {
        console.log(response.statusText); // 오류 메시지
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    profilePictureUrl,
    handleSubmit
  };
};

export default useWritePost;
