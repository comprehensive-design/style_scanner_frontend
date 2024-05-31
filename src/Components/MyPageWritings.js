import { useState, useEffect } from 'react';
import styles from "../css/MyPageWritings.module.css";
import Sidebar from './Sidebar';
import WritingBox from './WritingBox';
import Pagination from './Pagination';
import axios from 'axios';


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
  console.log("Access Token:", token); // 토큰 값 확인

  try {
    const response = await axios.get('/api/post/me',config);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios 에러: 글 가져오기 실패:', error.response?.data || error.message);
      console.error('응답 상태:', error.response?.status); // 상태 코드 로그
      console.error('응답 헤더:', error.response?.headers); // 헤더 로그
    } else {
      console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
    }
    throw error;
  }
};

export default function MyPageWritings() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
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

    fetchPosts();
  }, [currentPage, postsPerPage]);
  
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
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Proper token format
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

  return (
    <body>
      <div className={styles.total}>
        <Sidebar></Sidebar>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>내가 작성한 글</h2>
            <hr></hr>
          </div>
          <div className={styles.writingList}>

            {currentPosts.map(post => {
              const commentdata = Array.isArray(post.comments) ? post.comments : [];
              return (
                <WritingBox
                  postId={post.id}
                  commentCnt={commentdata.length}
                  feedImg={post.feedUrl}
                  title={post.content}
                  date={post.createdAt}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>

        </div>
      </div>

      <div className={styles.heightPadding}></div>
      <div className={styles.footerBox}>
        <div className={styles.leftBtween} />
        <div className={styles.footer}>
          <Pagination
            itemsNum={posts.length}
            itemsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>

    </body>
  );
}