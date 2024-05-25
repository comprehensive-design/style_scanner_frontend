// import styles from '../css/WritingBox.module.css';
// import Button from './Button';
// import axios from 'axios';

// const getComment = async (id) => {
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//         console.error("토큰이 없습니다.");
//         throw new Error("토큰이 없습니다.");
//     }
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     console.log("Access Token:", token); // 토큰 값 확인

//     try {
//         //api 추가 시 수정 필요
//         const response = await axios.get('/api/comment', {
//             params: { id: id },
//             ...config,
//         });
//         return response.data;

//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Axios 에러: 댓글 가져오기 실패:', error.response?.data || error.message);
//             console.error('응답 상태:', error.response?.status); // 상태 코드 로그
//             console.error('응답 헤더:', error.response?.headers); // 헤더 로그
//         } else {
//             console.error('예상치 못한 에러: 게시물 가져오기 실패:', error);
//         }
//         throw error;
//     }
// };

// //날짜 포맷
// const formatDate = (date) => {
//     const fdate = new Date(date);
//     const fyear = fdate.getFullYear();
//     const fmonth = String(fdate.getMonth() + 1).padStart(2, '0');
//     const fday = String(fdate.getDate()).padStart(2, '0');
//     return `${fyear}-${fmonth}-${fday}`;
// };

// export default function WritingBox({ key, feedImg, userdata, title, date }) {
//     const editClick = () => {
//         alert("edit버튼 누름")
//     };
//     const deleteClick = () => {
//         alert("delete버튼 누름")
//     };

//     return (
//         <div className={styles.writingBox}>
//             <div className={styles.feedDiv}>
//                 {/* src={feedImg} 로 변경해야함 */}
//                 <img className={styles.feedImage} src={feedImg}></img>
//                 <p className={styles.feedId}>{feedId}</p>
//             </div>
//             <div className={styles.textDiv}>
//                 <p className={styles.title}>{title}</p>
//                 {/* <p className={styles.contents}>{content} </p> */}
//             </div>
//             <div className={styles.commentDiv}>
//                 <img className={styles.commentImage} src={`img/reply.png`}></img>
//                 {currentItems.map(post => {
//                     return (
//                         <p id={styles.commentCnt}>{post.commentCnt}</p>
//                     );
//                     // <WritingBox key={index} feedId="@roses_are_rosie" feedImg='' commentCnt='15' title="로제 반지 어디 건가요?" contents="따라 사고 싶은데 어디 건지 잘 모르겠어요 ㅠㅠ.. ..;; " date="2024.05.14" />
//                 })}
               
//             </div>
//             <div className={styles.dateDiv}>
//                 <p className={styles.date}>{formatDate(date)}</p>
//             </div>
//             <div className={styles.buttonDiv}>
//                 <Button onClick={editClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>수정</Button>
//                 &nbsp;
//                 <Button onClick={deleteClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>삭제</Button>
//             </div>
//         </div>
//     );
// }