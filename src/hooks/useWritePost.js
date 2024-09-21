import api from "../utils/axios";
import { useMe } from "../hooks/useMe";

const useWritePost = (post, feed_code, onSave, username) => {
  const {myProfilePictureUrl} = useMe();
  console.log(feed_code);
  const handleSubmit = async (e, question) => {
    e.preventDefault();
    try {
      let response;
      if (post && post.id) {
        response = await api.post(`/api/post/update/${post.id}`, { content: question });
      } else {
        response = await api.post("/api/post/create", { feedCode: feed_code, content: question, username: username});
      }

      if (response.status === 200) {
        alert(post ? "수정되었습니다." : "등록되었습니다.");
        if (post) onSave(response.data);
      } else {
        console.log(response.statusText); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    myProfilePictureUrl,
    handleSubmit
  };
};

export default useWritePost;
