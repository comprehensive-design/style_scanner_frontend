import styles from '../css/CommentBox.module.css';
import Button from './Button';


export default function CommentBox({commentId,feedImg, title, content,date, onDelete, onEdit }) {

    return (
        <div className={styles.writingBox}>
            <div className={styles.feedDiv}>
                <img className={styles.feedImage} src={feedImg}></img>
            </div>

            <div className={styles.textDiv}>
                <p className={styles.title}>{title}</p>
                <p className={styles.contents}>{content}</p>
            </div>
            {/* 날짜 필드 추가 필요 */}
            {/* <div className={styles.dateDiv}>
                <p className={styles.date}>{}</p>
            </div> */}
            <div className={styles.buttonDiv}>
                <Button onClick={() => onEdit(commentId)} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>수정</Button>
                &nbsp;
                <Button onClick={() => onDelete(commentId)} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>삭제</Button>
            </div>
        </div>
    );
}