import styles from '../css/CommentBox.module.css';
import Button from './Button';

export default function CommentBox({feedId, title, contents, date }){
    
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
                <p className={styles.feedId}>{feedId}</p>
            </div>
            <div className={styles.textDiv}>
                <p className={styles.title}>{title}</p>
                <p className={styles.contents}>{contents} </p>
            </div>
        
            <div className={styles.dateDiv}>
                <p className={styles.date}>{date}</p>
            </div>
            <div className={styles.buttonDiv}>
                <Button onClick={editClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>수정</Button>
                &nbsp;
                <Button  onClick={deleteClick} BackColor="#d9d9d9" txtColor='black' border='none' hovColor='black' hovTxtColor='white'>삭제</Button>
            </div>
        </div>
    );
}