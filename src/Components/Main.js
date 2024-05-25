import { useEffect, useRef, useState } from "react";
import styles from '../css/Main.module.css';
import { Link } from "react-router-dom";
import Footer from './Footer';


function Main() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // Scroll down
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // Scroll up
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
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
        <div className={`${styles.inner} ${styles.bg}`} style={{ backgroundImage: "url('/img/Main1.png')" }}></div>
        <div className={styles.divider}></div>
        <div className={`${styles.inner} ${styles.bg}`} style={{ backgroundImage: "url('/img/Main2.png')" }}></div>
        <div className={styles.divider}></div>
        <div className={`${styles.inner} ${styles.bg}`} style={{ backgroundImage: "url('/img/Main3.png')" }}></div>
        <div className={styles.divider}></div>
        <div className={`${styles.inner} ${styles.bg}`} style={{ backgroundImage: "url('/img/Main4.png')" }}></div>
        <div className={styles.divider}></div>

        <div className={`${styles.inner} ${styles.bg2}`} style={{ backgroundImage: "url('/img/Main5.png')" }}>
          <div className={styles.link}><Link to="/Login">지금 바로 시작하기</Link></div>
          <div className={styles.footer}><Footer></Footer></div>
        </div>
      </div>
    </>

  );
}

export default Main;