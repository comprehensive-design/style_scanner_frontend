import { useState, useEffect } from 'react';
import styles from "../css/MyPageComments.module.css";
import Sidebar from './Sidebar';
import CommentBox from './CommentBox';
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export default function MyPageComments() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <body>
      <Sidebar></Sidebar>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>내가 작성한 댓글</h3>
          <hr></hr>
        </div>
        {/* 5개씩 보여주고, 페이지네이션으로 넘기기 */}
        {Array.isArray(posts)  && posts.slice(0, 5).map((post, index) => (
        //   <CommentBox key={index} feedId= "@roses_are_rosie" title={post.title} contents={post.body} date="2024.05.13"/>
            <CommentBox key={index} feedId= "@roses_are_rosie" title="로제 반지 어디 건가요?" contents="까르띠에입니다!!!!! " date="2024.05.13"/>
        ))}
      </div>
    </body>
  );
}
