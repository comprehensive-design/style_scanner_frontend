import { useState, useEffect, useCallback } from "react";
import CommentBox from "./CommentBox";
import Sidebar from "../../../Components/Sidebar";
import Pagination from "../../../Components/Pagination";
import api from "../../../utils/axios.jsx";

export default function MyComment() {
  const [comments, setComments] = useState([]);
  const [feedImages, setFeedImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const [commentSaved, setCommentSaved] = useState(false);

  const firstItemIndex = (currentPage - 1) * commentsPerPage;
  const lastItemIndex = firstItemIndex + commentsPerPage;
  const currentComments = comments.slice(firstItemIndex, lastItemIndex);

  const getComments = async () => {
    const response = await api.get("/api/comment/me");
    return response.data;
  };
  const getFeedImages = async (feedCode) => {
    const response = await api.get(`/api/insta/getImage?feedCode=${feedCode}`, { responseType: 'blob' });
    return response.data;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
        const feedImagesUrls = await Promise.all(
          data.map(async (comment) => {
            const feedImageBlob = await getFeedImages(comment.feedCode);
            return URL.createObjectURL(feedImageBlob);
          })
        );
        setFeedImages(feedImagesUrls);
      } catch (error) {
        console.error(error);
      }
    };

    if (commentSaved) {
      setCommentSaved(false);
    }
    fetchComments();
  }, [currentPage, commentSaved]);

  const handleDelete = async (commentId) => {
    try {
      const response = await api.delete(`/api/comment/delete/${commentId}`);
      if (response.status === 200) {
        alert("삭제되었습니다.");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        setCommentSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mainWrapper">
      <div className="mypageWrapper">
        <Sidebar />
        <div className="mypageMain">
          <div>
            <p className="title left mb05 ml03">내가 작성한 댓글</p>
            <hr />
          </div>
          <p className="content left mt1 mb1 ml03">전체 </p>
          <div className="ml03 mb3">
            <div>
              {currentComments.map((data, index) => {
                const commentdata = data.comment;
                return (
                  <CommentBox
                    key={commentdata.id}
                    commentId={commentdata.id}
                    feedImg={feedImages[index]}
                    title={data.feedTitle}
                    content={commentdata.content}
                    onDelete={() => handleDelete(commentdata.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Pagination
          itemsNum={comments.length}
          itemsPerPage={5}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
    </div>
  );
}
