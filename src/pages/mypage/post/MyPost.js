import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../../Components/Sidebar";
import WritingBox from "../../../Components/WritingBox";
import Pagination from "../../../Components/Pagination";
import api from "../../../utils/axios.jsx";
import WritePopup from "../../community/popup/WritePopup";


export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [feedImages, setFeedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [feedUrl, setFeedUrl] = useState("");
  const [postSaved, setPostSaved] = useState(false);

  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const getPosts = async () => {
    const response = await api.get("/api/post/me");
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
      } catch (error) {
        console.error(error);
      }
    };

    if (postSaved) {
      setPostSaved(false);
    }
    fetchPosts();
  }, [currentPage, postSaved]);

  const openPopup = useCallback((content, feedImage) => {
    setCurrentPost(content);
    setFeedUrl(feedImage);
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setCurrentPost(null);
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await api.delete(`/api/post/delete/${postId}`);
      if (response.status === 200) {
        alert("삭제되었습니다.");
        setPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = (updatedPost) => {
    setPosts((prevPosts) => {
      const newPosts = prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPostSaved(true);
      return newPosts;
    });
  };

  return (
    <div className="mainWrapper">
      <div className="mypageWrapper">
        <Sidebar />
        <div className="mypageMain">
          <div>
            <p className="title left mb05 ml03">내가 작성한 글</p>
            <hr />
          </div>
          <p className="content left mt1 mb1 ml03">전체 </p>
          <div className="ml03 mb3">
            {currentPosts.map((post, index) => {
              const commentdata = Array.isArray(post.comments)
                ? post.comments
                : [];
              return (
                <WritingBox
                  key={post.id}
                  postId={post.id}
                  commentCnt={commentdata.length}
                  feedImg={feedImages[index]}
                  title={post.content}
                  date={post.createdAt}
                  onDelete={() => handleDelete(post.id)}
                  onEdit={() => openPopup(post, feedImages[index])}
                />
              );
            })}
          </div>
        </div>
        {isPopupOpen && (
          <WritePopup
            post={currentPost}
            proxy_url={feedUrl}
            onSave={handleSave}
            onClose={closePopup}
          />
        )}
      </div>
      <Pagination
            itemsNum={posts.length}
            itemsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
    </div>
  );
}
