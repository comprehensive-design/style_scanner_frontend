// import { useState, useEffect } from 'react';
// import styles from "../css/MyPageComments.module.css";
// import Sidebar from './Sidebar';
// import CommentBox from './CommentBox';
// import Pagination from './Pagination';
// import axios from 'axios';
// import Footer from './Footer';

// const getPosts = async () => {
//   const token = localStorage.getItem("accessToken");
  
//   if (!token) {
//       console.error("토큰이 없습니다.");
//       throw new Error("토큰이 없습니다.");
//   }
//   const config = {
//       headers: {
//           Authorization: `Bearer ${token}`,
//       },
//   };

//   console.log("Access Token:", token); // 토큰 값 확인

//   try {
//      //api 추가 시 수정 필요
//       const response = await axios.get('/api/comment', config);
//       return response.data.feeds; // feeds 배열을 직접 반환
//   } catch (error) {
//       if (axios.isAxiosError(error)) {
//           console.error('Axios 에러: 게시물 가져오기 실패:', error.response?.data || error.message);
//           console.error('응답 상태:', error.response?.status); // 상태 코드 로그
//           console.error('응답 헤더:', error.response?.headers); // 헤더 로그
//       } else {
//           console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
//       }
//       throw error;
//   }
// };
// export default function MyPageComments() {
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const firstItemIndex = (currentPage - 1) * itemsPerPage;
//   const lastItemIndex = firstItemIndex + itemsPerPage;
//   const currentItems = posts.slice(firstItemIndex, lastItemIndex);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const data = await getPosts(currentPage, itemsPerPage);
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, [currentPage, itemsPerPage]);

//   return (

//     <body>

//       <div className={styles.total}>
//         <Sidebar />
//         <div className={styles.content}>
//           <div className={styles.title}>
//             <h2>내가 작성한 댓글</h2>
//             <hr />
//           </div>
//           <div className={styles.commentList}>
//             {currentItems.map((post, index) => (
//               <CommentBox key={index} feedId="@roses_are_rosie" feedImg="" title="로제 반지 어디 건가요?" contents="까르띠에입니다!!!!! " date="2024.05.13" />
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className={styles.heightPadding}></div>
//       <div className={styles.footerBox}>
//                 <div className={styles.leftBtween} />
//                 <div className={styles.footer}>
//                     <Pagination
//                         itemsNum={posts.length}
//                         itemsPerPage={itemsPerPage}
//                         setCurrentPage={setCurrentPage}
//                         currentPage={currentPage}
//                     />
//                 </div>
//             </div>
//       <Footer />

//     </body>


//   );
// }
