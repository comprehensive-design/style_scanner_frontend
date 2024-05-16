import { useState, useEffect } from 'react';
import styles from "../css/MyPageComments.module.css";
import Sidebar from './Sidebar';
import CommentBox from './CommentBox';
import Pagination from './Pagination';
import axios from 'axios';
import Footer from './Footer';
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export default function MyPageComments() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = posts.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(currentPage, itemsPerPage);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage]);

  return (

    <body>

      <div className={styles.total}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>내가 작성한 댓글</h3>
            <hr />
          </div>
          <div className={styles.commentList}>
            {currentItems.map((post, index) => (
              <CommentBox key={index} feedId="@roses_are_rosie" feedImg="" title="로제 반지 어디 건가요?" contents="까르띠에입니다!!!!! " date="2024.05.13" />
            ))}
          </div>

        </div>
      </div>

      <div className={styles.heightPadding}></div>
      <div>
        <Pagination
          itemsNum={posts.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </body>


  );
}
