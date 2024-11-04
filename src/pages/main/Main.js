import { useEffect, useRef, useState } from "react";
import styles from './Main.module.css';
import { Link } from "react-router-dom";
import Footer from '../../Components/Footer';
import styled from 'styled-components';


function Main() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      let newScrollTop = 0;

      if (deltaY > 0) {
        // Scroll down
        newScrollTop = Math.min(scrollTop + pageHeight + DIVIDER_HEIGHT, outerDivRef.current.scrollHeight - pageHeight);
      } else {
        // Scroll up
        newScrollTop = Math.max(scrollTop - pageHeight - DIVIDER_HEIGHT, 0);
      }

      outerDivRef.current.scrollTo({
        top: newScrollTop,
        left: 0,
        behavior: "smooth",
      });
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: gray;
  }
`;
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
          <div className={styles.link}><StyledLink to="/Login">지금 바로 시작하기</StyledLink></div>
          <div className={styles.footer}><Footer></Footer></div>
        </div>
      </div>
    </>

  );
}

export default Main;