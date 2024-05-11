import styles from '../css/CommentBox.module.css';
import Button from './Button';

export default function CommentBox(){
    
    const editClick = () => {
       alert("edit버튼 누름")
    };
    const deleteClick = () => {
        alert("delete버튼 누름")
     };
    return(
        <div className={styles.writingBox}>
            <div className={styles.feedDiv}>
                <img className={styles.feedImage} src="http://via.placeholder.com/150X200"></img>
                <p className={styles.feedId}>@roses_are_rosie</p>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.title}>로제 반지 어디 건가요?</p>
                <p className={styles.contents}>까르띠에입니다!!!!! </p>
            </div>
        
            <div className={styles.dateDiv}>
                <p className={styles.date}>2024.04.06</p>
            </div>
            <div className={styles.buttonDiv}>
                <Button onClick={editClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>수정</Button>
                &nbsp;
                <Button  onClick={deleteClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>삭제</Button>
            </div>
        </div>
    );
}