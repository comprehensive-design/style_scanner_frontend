import styles from '../css/Category.module.css';
import {Link} from "react-router-dom";

export default function Category() {
    const activeStyle = {
        color : 'black'
    };

    return(
        <div id = {styles.categoryDiv}>
            <p id={styles.categoryNa}>카테고리</p>
            <HorizonLine></HorizonLine>
            
            <div id={styles.categoryList}>
                <ul className={styles.categoryUl}>
                    <li><Link to="" className={`${styles.gen} ${styles.lists}`}>전체</Link></li>

                    <li><Link to="" className={`${styles.gen} ${styles.lists}`}>여성</Link></li>
                    
                    <li><Link to="" className={styles.lists}>아우터</Link></li>
                    <li><Link to="" className={styles.lists}>상의</Link></li>
                    <li><Link to="" className={styles.lists}>팬츠</Link></li>
                    <li><Link to="" className={styles.lists}>스커트</Link></li>
                    <li><Link to="" className={styles.lists}>원피스</Link></li>
                    <li><Link to="" className={styles.lists}>신발</Link></li>
                    <li><Link to="" className={styles.lists}>가방</Link></li>
                    <li><Link to="" className={styles.lists}>악세사리</Link></li>
                    <li><Link to="" className={`${styles.lastlists} ${styles.lists}`}>기타</Link></li>
                    <br></br>
                    <br></br>
                    <li><Link to="" className={`${styles.gen} ${styles.lists}`}>남성</Link></li>
                    <li><Link to="" className={styles.lists}>아우터</Link></li>
                    <li><Link to="" className={styles.lists}>상의</Link></li>
                    <li><Link to="" className={styles.lists}>팬츠</Link></li>
                    <li><Link to="" className={styles.lists}>신발</Link></li>
                    <li><Link to="" className={styles.lists}>가방</Link></li>
                    <li><Link to="" className={styles.lists}>악세사리</Link></li>
                    <li><Link to="" className={`${styles.lastlists} ${styles.lists}`}>기타</Link></li>

                </ul>
            </div>
        </div>
    )
}

const HorizonLine = () => {
    return (
      <div
        style={{
          width: "80%",
          borderBottom: "2px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
      </div>
    );
  };
  