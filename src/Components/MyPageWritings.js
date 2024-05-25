// import { useState, useEffect } from 'react';
// import styles from "../css/MyPageWritings.module.css";
// import Sidebar from './Sidebar';
// import WritingBox from './WritingBox';
// import Pagination from './Pagination';
// import axios from 'axios';
// import Footer from './Footer';


// const getPosts = async (id) => {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     console.error("토큰이 없습니다.");
//     throw new Error("토큰이 없습니다.");
//   }
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   console.log("Access Token:", token); // 토큰 값 확인

//   try {
//     //api 추가 시 수정 필요
//     const response = await axios.get('/api/post', {
//       params: { id: id },
//       ...config,
//     });
//     return response.data;

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Axios 에러: 글 가져오기 실패:', error.response?.data || error.message);
//       console.error('응답 상태:', error.response?.status); // 상태 코드 로그
//       console.error('응답 헤더:', error.response?.headers); // 헤더 로그
//     } else {
//       console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
//     }
//     throw error;
//   }
// };

// export default function MyPageWritings() {
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
//         <Sidebar></Sidebar>
//         <div className={styles.content}>
//           <div className={styles.title}>
//             <h2>내가 작성한 글</h2>
//             <hr></hr>
//           </div>
//           <div className={styles.writingList}>

//             {currentItems.map(post => {
//               const userdata = Array.isArray(post.user) ? feed.user : [];
//               return (
//                 <WritingBox
//                   key={post.id}
//                   userdata={userdata}
//                   feedImg={post.feedUrl}
//                   title={post.content}
//                   date={post.createdAt}
//                 />
//               );
//               // <WritingBox key={index} feedId="@roses_are_rosie" feedImg='' commentCnt='15' title="로제 반지 어디 건가요?" contents="따라 사고 싶은데 어디 건지 잘 모르겠어요 ㅠㅠ.. ..;; " date="2024.05.14" />
//             })}


//           </div>

//         </div>
//       </div>

//       <div className={styles.heightPadding}></div>
//       <div className={styles.footerBox}>
//         <div className={styles.leftBtween} />
//         <div className={styles.footer}>
//           <Pagination
//             itemsNum={posts.length}
//             itemsPerPage={itemsPerPage}
//             setCurrentPage={setCurrentPage}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>

//       <Footer></Footer>
//     </body>
//   );
// }