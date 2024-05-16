import { useState, useEffect } from 'react';
import styles from "../css/MyPageWritings.module.css";
import Sidebar from './Sidebar';
import WritingBox from './WritingBox';
import Pagination from './Pagination';
import axios from 'axios';
import Footer from './Footer';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export default function MyPageWritings() {
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
        <Sidebar></Sidebar>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>내가 작성한 글</h3>
            <hr></hr>
          </div>
          <div className={styles.writingList}>
            {currentItems.map((post, index) => (
              // <WritingBox
              //   key={index}
              //   feedId="@roses_are_rosie"
              //   feedImg=''
              //   commentCnt='20'
              //   title={post.title}
              //   contents={post.body}
              //   date="2024.05.14"
              // />

              <WritingBox key={index} feedId="@roses_are_rosie" feedImg='' commentCnt='15' title="로제 반지 어디 건가요?" contents="따라 사고 싶은데 어디 건지 잘 모르겠어요 ㅠㅠ.. ..;; " date="2024.05.14" />
            ))}
          </div>
        </div>
      </div>
      <footer>
        <Pagination
          itemsNum={posts.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <Footer />
      </footer>
    </body>
  );
}