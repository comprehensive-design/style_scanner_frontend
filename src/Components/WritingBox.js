import styles from '../css/WritingBox.module.css';
import Button from './Button';
import axios from 'axios';


const formatDate = (dateArray) => {
    const year = dateArray[0];
    const month = String(dateArray[1]).padStart(2, '0');
    const day = String(dateArray[2]).padStart(2, '0');
    const formDate = `${year}-${month}-${day}`;
    return formDate;
};

const editClick = async(e) => {
    e.preventDefault();

   


};

export default function WritingBox({ postId, feedImg, commentCnt, title, date, onDelete }) {
       return (
        <div className={styles.writingBox}>
            <div className={styles.feedDiv}>
                {/* src={feedImg} 로 변경해야함 */}
                <img className={styles.feedImage} src={feedImg}></img>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.title}>{title}</p>
                {/* <p className={styles.contents}>{content} </p> */}
            </div>
            <div className={styles.commentDiv}>
                <img className={styles.commentImage} src={`img/reply.png`}></img>
                <p id={styles.commentCnt}>{commentCnt}</p>
            </div>
            <div className={styles.dateDiv}>
                <p className={styles.date}>{formatDate(date)}</p>
            </div>
            <div className={styles.buttonDiv}>
                <Button onClick={editClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>수정</Button>
                &nbsp;
                <Button onClick={() => onDelete(postId)} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>삭제</Button>
            </div>
        </div>
    );
}