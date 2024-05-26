import React, { useState, useEffect, useRef } from 'react';
import styles from "../css/CommunityInfo.module.css";
import axios from "axios";
import Button from './Button';
import CommentInfo from "./CommentInfo";


export const getComments = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function CommunityInfo({onClose}) {
  
  //댓글 post
  const [question, setQuestion] = useState("");
  const textarea = useRef();

  //댓글 get
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const commentListRef = useRef();

  //사진
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    // "http://via.placeholder.com/370X465",
    // "http://via.placeholder.com/370X465",
    // "http://via.placeholder.com/370X465"
    'img/feed1.png',
    'img/feed2.png',
    'img/feed3.png'
  ];
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchComments();

  }, [loading]);

  const handleSubmit = () => {
    if (!question.trim()) {
      console.error("댓글을 입력하세요.");
      return;
    }

    //댓글쓰기
    axios
      .post('/api/comment/create', {
        feedId: "hi_sseulgi",
        writerId: "nwbd_we",
        content: question,
      })
      .then(function (response) {
        console.log("성공", response);
        
      })
      .catch(function (error) {
        console.error("실패", error);
      })
      .then(function () {
        console.log("데이터 요청 완료");
      });
  };

  const okClick = () => {
    alert("버튼 누름");
    // handleSubmit(); // 작성 버튼 클릭 시 데이터 전송
  };
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      console.log(`다음 이미지 index: ${nextIndex}`);
      return nextIndex;
    });
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      //0번 인덱스에서 이전 x
      const nextIndex = prevIndex === 0 ? 0 : prevIndex - 1;
      console.log(`이전 이미지 index: ${nextIndex}`);
      return nextIndex;
    });
  };
  return (
    <div className={styles.popup}>
      <div className={styles.feedDiv}>

      <div className={styles.feedImg}>
          <div className={styles.imageWrapper}>
            <img src={images[currentImageIndex]} alt={`Feed ${currentImageIndex}`} />
          </div>
          <div className={styles.dirBtn}>
            {/* 사진 넘어가는 버튼 */}
            {images.length > 1 && ( // 이미지가 2개 이상 일 때만 버튼 표시
              <>
                {currentImageIndex !== 0 && ( // 첫 번째 사진이 아닐 때만 왼쪽 버튼 표시
                  <button className={styles.prevBtn} onClick={goToPrevImage}>{'<'}</button>
                )}
                {currentImageIndex !== images.length - 1 && ( // 마지막 사진이 아닐 때만 오른쪽 버튼 표시
                  <button className={styles.nextBtn} onClick={goToNextImage}>{'>'}</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.popupContent}>
        

        <div className={styles.titleDiv}>
          <p className={styles.closeButton} onClick={onClose}>×</p>
          
          <p className={styles.title}>댓글</p>
        </div>
        <div className={styles.comWriterBox}>
          <div className={styles.writerProfile}>
            <img
              id={styles.writerImage}
              src={process.env.PUBLIC_URL + "img/profile.png"}
              alt="Profile"
            />
          </div>
          <p id={styles.writerId}>hi_sseulgi</p>
        </div>

        <div className={styles.mainDiv}>
          <div className={styles.totalItem} ref={commentListRef}>
            {comments.map(comment => (
              <CommentInfo key={comment.id} image={comment.image} />
            ))}
          </div>

          <div className={styles.bottomDiv}>
            <input className={styles.comInput} type="text" placeholder="댓글을 입력하세요"></input>
            <div className={styles.btn}>
              <Button onClick={okClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>작성</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
