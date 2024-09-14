import { useState, useEffect, useCallback } from 'react'; 
import Sidebar from '../../../Components/Sidebar';
import WritingBox from '../../../Components/WritingBox';
import Pagination from '../../../Components/Pagination';
import axios from 'axios';
import WritePopup from '../../community/popup/WritePopup';
import Footer from '../../../Components/Footer';

const getPosts = async (currentPage, postsPerPage) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("토큰이 없습니다.");
    throw new Error("토큰이 없습니다.");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('/api/post/me', config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러: 글 가져오기 실패:', error.response?.data || error.message);
    } else {
      console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
    }
    throw error;
  }
};

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postSaved, setPostSaved] = useState(false);

  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(currentPage, postsPerPage);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    if (postSaved) {
      closePopup();
      setPostSaved(false); // 상태를 리셋
    }

    fetchPosts();
  }, [currentPage, postSaved]);

  const openPopup = useCallback((post = null) => {
    setCurrentPost(post);
    setIsPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setCurrentPost(null);
  }, []);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.delete(
        `/api/post/delete/${postId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        alert('삭제되었습니다.');
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('삭제 오류:', error);
    }
  };

  const handleSave = (updatedPost) => {
    setPosts((prevPosts) => {
      const newPosts = prevPosts.map(post => (post.id === updatedPost.id ? updatedPost : post));
      setPostSaved(true); // 상태가 업데이트되었음을 표시
      return newPosts;
    });
  };



  return (
    <div className="mypageWrapper">
      <Sidebar />
      <div className="mypageMain">
        <div>
          <p className="title left mb05 ml03">내가 작성한 글</p>
          <hr />
        </div>
        <p className='content left mt1 mb1 ml03'>전체 </p>
        <div className='ml03 mb3'>
          {currentPosts.map(post => {
            const commentdata = Array.isArray(post.comments) ? post.comments : [];
            return (
              <WritingBox
                key={post.id}
                postId={post.id}
                commentCnt={commentdata.length}
                feedImg={post.feedUrl}
                title={post.content}
                date={post.createdAt}
                onDelete={() => handleDelete(post.id)}
                onEdit={() => openPopup(post)}
              />
            );
          })}
        </div>
      <Pagination
        itemsNum={posts.length}
        itemsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      </div>
      {isPopupOpen && (
        <WritePopup post={currentPost} onSave={handleSave} onClose={closePopup} />
      )}
    </div>
  );
}
