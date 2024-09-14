import api from "../../../utils/axios";
import { useState, useEffect } from "react";
import api from "../../../utils/axios";

const useWritePost = (post, feedUrl, onSave) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile({ profilePictureUrl: data.profilePictureUrl, displayName: data.displayName });
      } catch (error) {
        console.log("Error");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      let response;
      if (post && post.id) {
        response = await api.post(`/api/post/update/${post.id}`, { content: question });
      } else {
        response = await api.post(
          "/api/post/create",
          { feedUrl, content: question }
        );
      }

      if (response.status === 200) {
        alert(post ? "수정되었습니다." : "등록되었습니다.");
        setQuestion(""); // 입력란 초기화
        if (post) onSave(response.data); // 저장 콜백 호출
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error");
    }
  };

  const okClick = (e) => handleSubmit(e);

  return {
    profile,
    question,
    setQuestion,
    okClick
  };
};

export default useWritePost;
