// import { Link } from 'react-router-dom';
// import Footer from './Footer';

// const Main = () => {
//   return (
//     <>
//       <div>

//       </div>
//       <Footer></Footer>
//     </>
//   );
// };

// export default Main;

//https://codingbroker.tistory.com/128

import { useEffect, useRef, useState } from "react";
import styles from '../css/Main.module.css';

import Dots from './Dot';

function Main() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <>
  <div ref={outerDivRef} className={styles.outer}>
    {/* <Dots currentPage={currentPage} /> */}
    <div className={`${styles.inner} ${styles.bgYellow}`} style={{backgroundImage:"url('/img/Main1.png')"}}></div>
    <div className={styles.divider}></div>
    <div className={`${styles.inner} ${styles.bgBlue}`}  style={{backgroundImage:"url('/img/Main2.png')"}}></div>
    <div className={styles.divider}></div>
    <div className={`${styles.inner} ${styles.bgPink}`}  style={{backgroundImage:"url('/img/Main3.png')"}}></div>
    <div className={styles.divider}></div>
    <div className={`${styles.inner} ${styles.bgPink}`}  style={{backgroundImage:"url('/img/Main4.png')"}}></div>
    <div className={styles.divider}></div>
    <div className={`${styles.inner} ${styles.bgPink}`}  style={{backgroundImage:"url('/img/Main5.png')"}}></div>
  </div>

</>

  );
}

export default Main;